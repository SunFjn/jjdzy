package com.teamtop.synHandleCore;

import java.lang.reflect.Field;
import java.security.AccessController;
import java.security.PrivilegedExceptionAction;
import java.util.concurrent.Callable;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;
import java.util.concurrent.RunnableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.locks.LockSupport;

import org.apache.log4j.Logger;

import sun.misc.Unsafe;

public class OpTaskFutureTask<V> implements RunnableFuture<V>, OpTaskRunnable {
	private static final Logger logger = Logger.getLogger(OpTaskFutureTask.class);
	private volatile int state;
	private static final int NEW = 0;
	private static final int COMPLETING = 1;
	private static final int NORMAL = 2;
	private static final int EXCEPTIONAL = 3;
	private static final int CANCELLED = 4;
	private static final int INTERRUPTING = 5;
	private static final int INTERRUPTED = 6;

	/** The underlying callable; nulled out after running */
	private Callable<V> callable;
	/** The result to return or exception to throw from get() */
	private Object outcome; // non-volatile, protected by state reads/writes
	/** The thread running the callable; CASed during run() */
	private volatile Thread runner;
	/** Treiber stack of waiting threads */
	private volatile WaitNode waiters;
	private OpTaskRunnable iRunnable;

	@SuppressWarnings("unchecked")
	private V report(int s) throws ExecutionException {
		Object x = outcome;
		if (s == NORMAL)
			return (V) x;
		if (s >= CANCELLED)
			throw new CancellationException();
		throw new ExecutionException((Throwable) x);
	}

	private void checkRunnable(Runnable command) {
		if (command == null)
			throw new NullPointerException();
		if (!(command instanceof OpTaskRunnable))
			throw new RuntimeException(command + "is not implement from OrderedRunnable");
	}

	private void checkCallable(Callable<V> command) {
		if (command == null)
			throw new NullPointerException();
		if (!(command instanceof OpTaskCallable))
			throw new RuntimeException(command + "is not implement from OrderedCallable");
	}

	public OpTaskFutureTask(Callable<V> callable) {
		checkCallable(callable);
		this.callable = callable;
		this.state = NEW; // ensure visibility of callable
	}

	public OpTaskFutureTask(Runnable runnable, V result) {
		checkRunnable(runnable);
		this.iRunnable = (OpTaskRunnable) runnable;
		this.callable = Executors.callable(runnable, result);
		this.state = NEW; // ensure visibility of callable
	}

	public boolean isCancelled() {
		return state >= CANCELLED;
	}

	public boolean isDone() {
		return state != NEW;
	}

	public boolean cancel(boolean mayInterruptIfRunning) {
		if (!(state == NEW && UNSAFE.compareAndSwapInt(this, stateOffset, NEW, mayInterruptIfRunning ? INTERRUPTING : CANCELLED)))
			return false;
		try { // in case call to interrupt throws exception
			if (mayInterruptIfRunning) {
				try {
					Thread t = runner;
					if (t != null)
						t.interrupt();
				} finally { // final state
					UNSAFE.putOrderedInt(this, stateOffset, INTERRUPTED);
				}
			}
		} finally {
			finishCompletion();
		}
		return true;
	}

	public V get() throws InterruptedException, ExecutionException {
		int s = state;
		if (s <= COMPLETING)
			s = awaitDone(false, 0L);
		return report(s);
	}

	public V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException {
		if (unit == null)
			throw new NullPointerException();
		int s = state;
		if (s <= COMPLETING && (s = awaitDone(true, unit.toNanos(timeout))) <= COMPLETING)
			throw new TimeoutException();
		return report(s);
	}

	protected void done() {
	}

	protected void set(V v) {
		if (UNSAFE.compareAndSwapInt(this, stateOffset, NEW, COMPLETING)) {
			outcome = v;
			UNSAFE.putOrderedInt(this, stateOffset, NORMAL); // final state
			finishCompletion();
		}
	}

	protected void setException(Throwable t) {
		if (UNSAFE.compareAndSwapInt(this, stateOffset, NEW, COMPLETING)) {
			outcome = t;
			UNSAFE.putOrderedInt(this, stateOffset, EXCEPTIONAL); // final state
			finishCompletion();
		}
	}

	public void run() {
		if (state != NEW || !UNSAFE.compareAndSwapObject(this, runnerOffset, null, Thread.currentThread()))
			return;
		try {
			Callable<V> c = callable;
			if (c != null && state == NEW) {
				V result;
				boolean ran;
				try {
					result = c.call();
					ran = true;
				} catch (Throwable ex) {
					result = null;
					ran = false;
					setException(ex);
				}
				if (ran)
					set(result);
			}
		} finally {
			runner = null;
			int s = state;
			if (s >= INTERRUPTING)
				handlePossibleCancellationInterrupt(s);
		}
	}

	protected boolean runAndReset() {
		if (state != NEW || !UNSAFE.compareAndSwapObject(this, runnerOffset, null, Thread.currentThread()))
			return false;
		boolean ran = false;
		int s = state;
		try {
			Callable<V> c = callable;
			if (c != null && s == NEW) {
				try {
					c.call(); // don't set result
					ran = true;
				} catch (Throwable ex) {
					setException(ex);
				}
			}
		} finally {
			runner = null;
			s = state;
			if (s >= INTERRUPTING)
				handlePossibleCancellationInterrupt(s);
		}
		return ran && s == NEW;
	}

	private void handlePossibleCancellationInterrupt(int s) {
		if (s == INTERRUPTING)
			while (state == INTERRUPTING)
				Thread.yield(); // wait out pending interrupt
	}

	static final class WaitNode {
		volatile Thread thread;
		volatile WaitNode next;

		WaitNode() {
			thread = Thread.currentThread();
		}
	}

	private void finishCompletion() {
		// assert state > COMPLETING;
		for (WaitNode q; (q = waiters) != null;) {
			if (UNSAFE.compareAndSwapObject(this, waitersOffset, q, null)) {
				for (;;) {
					Thread t = q.thread;
					if (t != null) {
						q.thread = null;
						LockSupport.unpark(t);
					}
					WaitNode next = q.next;
					if (next == null)
						break;
					q.next = null; // unlink to help gc
					q = next;
				}
				break;
			}
		}

		done();
	}

	private int awaitDone(boolean timed, long nanos) throws InterruptedException {
		final long deadline = timed ? System.nanoTime() + nanos : 0L;
		WaitNode q = null;
		boolean queued = false;
		for (;;) {
			if (Thread.interrupted()) {
				removeWaiter(q);
				throw new InterruptedException();
			}

			int s = state;
			if (s > COMPLETING) {
				if (q != null)
					q.thread = null;
				return s;
			} else if (s == COMPLETING) // cannot time out yet
				Thread.yield();
			else if (q == null)
				q = new WaitNode();
			else if (!queued)
				queued = UNSAFE.compareAndSwapObject(this, waitersOffset, q.next = waiters, q);
			else if (timed) {
				nanos = deadline - System.nanoTime();
				if (nanos <= 0L) {
					removeWaiter(q);
					return state;
				}
				LockSupport.parkNanos(this, nanos);
			} else
				LockSupport.park(this);
		}
	}

	private void removeWaiter(WaitNode node) {
		if (node != null) {
			node.thread = null;
			retry: for (;;) { // restart on removeWaiter race
				for (WaitNode pred = null, q = waiters, s; q != null; q = s) {
					s = q.next;
					if (q.thread != null)
						pred = q;
					else if (pred != null) {
						pred.next = s;
						if (pred.thread == null) // check for race
							continue retry;
					} else if (!UNSAFE.compareAndSwapObject(this, waitersOffset, q, s))
						continue retry;
				}
				break;
			}
		}
	}

	// Unsafe mechanics
	private static final sun.misc.Unsafe UNSAFE;
	private static final long stateOffset;
	private static final long runnerOffset;
	private static final long waitersOffset;
	static {
		try {
			final PrivilegedExceptionAction<Unsafe> action = new PrivilegedExceptionAction<Unsafe>() {
				public Unsafe run() throws Exception {
					Field theUnsafe = Unsafe.class.getDeclaredField("theUnsafe");
					theUnsafe.setAccessible(true);
					return (Unsafe) theUnsafe.get(null);
				}
			};
			UNSAFE = AccessController.doPrivileged(action);
			Class<?> k = FutureTask.class;
			stateOffset = UNSAFE.objectFieldOffset(k.getDeclaredField("state"));
			runnerOffset = UNSAFE.objectFieldOffset(k.getDeclaredField("runner"));
			waitersOffset = UNSAFE.objectFieldOffset(k.getDeclaredField("waiters"));
		} catch (Exception e) {
			throw new Error(e);
		}
	}

	@SuppressWarnings("unchecked")
	protected OpTaskCallable<V> cast(Object o) {
		return (OpTaskCallable<V>) o;
	}

	@Override
	public Object getSession() {
		return iRunnable != null ? iRunnable.getSession() : cast(callable).getSession();
	}

	@Override
	public void beforeExecute(Thread thread) {
		if (iRunnable != null)
			iRunnable.beforeExecute(thread);
		else
			cast(callable).beforeExecute(thread);
	}

	@Override
	public void afterExecute() {
		if (iRunnable != null)
			iRunnable.afterExecute();
		else
			cast(callable).afterExecute();

		iRunnable = null;
		callable = null; // to reduce footprint
	}

	@Override
	public void onError(Throwable t, ErrorFrom ef) {
		if (iRunnable != null)
			iRunnable.onError(t, ef);
		else {
			cast(callable).onError(t, ef);
		}
		logger.error("ErrorFrom."+ef, t);
	}
}