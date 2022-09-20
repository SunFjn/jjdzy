package com.teamtop.synHandleCore;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Callable;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.RunnableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.locks.LockSupport;

import org.apache.log4j.Logger;

import com.teamtop.synHandleCore.ExecutorLifeCycle.ErrorFrom;

/**
 * 顺序线程池。会按照给定的session顺序执行提交的任务，支持批量同步执行。 
 * @author hzp
 *
 */
public class OpTaskExecutorService implements ExecutorService {
	private static final Logger logger = Logger.getLogger(OpTaskExecutorService.class);
	public static final int DefaultBatchTimeOut = 30;
	public static final TimeUnit DefaultBatchTimeUnit = TimeUnit.SECONDS;
	public static final int DefaultParkNanos = 1000;
	public static final int defaultQueueSize = Integer.MAX_VALUE;
	public static final int defaultTimeout = 5;
	public static final int defaultPoolSize = 8;

	private static int threadInitNumber;
	private List<Work> works = new ArrayList<>();
	private AtomicBoolean shutdown = new AtomicBoolean(false);
	private boolean terminated = false;
	private final int poolSize;
	private final int queueSize;
	private final int timeout;
	private final TimeUnit timeUnit;
	private final IBlockingQueueCreator blockingQueueCreator;

	public static final OpTaskExecutorService DefaultService = new OpTaskExecutorService();
	public static final OpTaskExecutorService PublicOrderService = new OpTaskExecutorService();
//	public static final ExecutorService UnorderedDefaultService = Executors.newFixedThreadPool(defaultPoolSize);

	public OpTaskExecutorService() {
		this(defaultPoolSize);
	}

	public OpTaskExecutorService(IBlockingQueueCreator blockingQueueCreator) {
		this(defaultPoolSize, blockingQueueCreator);
	}

	public OpTaskExecutorService(int poolSize) {
		this(poolSize, defaultQueueSize);
	}

	public OpTaskExecutorService(int poolSize, IBlockingQueueCreator blockingQueueCreator) {
		this(poolSize, defaultQueueSize, defaultTimeout, TimeUnit.MILLISECONDS, blockingQueueCreator);
	}

	public OpTaskExecutorService(int poolSize, int queueSize) {
		this(poolSize, queueSize, defaultTimeout, TimeUnit.MILLISECONDS, null);
	}

	public OpTaskExecutorService(int poolSize, int queueSize, int timeout, TimeUnit timeUnit, IBlockingQueueCreator blockingQueueCreator) {
		if (poolSize < 1) {
			throw new IllegalArgumentException("poolSize must not be less than 1");
		}
		if (Integer.bitCount(poolSize) != 1) {
			throw new IllegalArgumentException("poolSize must be a power of 2");
		}

		this.poolSize = poolSize;
		this.queueSize = queueSize;
		this.timeout = timeout;
		this.timeUnit = timeUnit;
		this.blockingQueueCreator = blockingQueueCreator;

		for (int i = 0; i < poolSize; i++) {
			Work work = new Work();
			Thread thread = new Thread(work, "OpTaskExecutorService-thread-" + nextThreadNum());
			work.thread = thread;

			works.add(work);
			thread.start();
		}
	}

	public OpTaskExecutorService(int poolSize, String threadNamePrefix) {
		this(poolSize, defaultQueueSize, defaultTimeout, TimeUnit.MILLISECONDS, null, threadNamePrefix);
	}

	public OpTaskExecutorService(int poolSize, int queueSize, int timeout, TimeUnit timeUnit, IBlockingQueueCreator blockingQueueCreator, String threadNamePrefix) {
		if (poolSize < 1) {
			throw new IllegalArgumentException("poolSize must not be less than 1");
		}
		if (Integer.bitCount(poolSize) != 1) {
			throw new IllegalArgumentException("poolSize must be a power of 2");
		}

		this.poolSize = poolSize;
		this.queueSize = queueSize;
		this.timeout = timeout;
		this.timeUnit = timeUnit;
		this.blockingQueueCreator = blockingQueueCreator;

		for (int i = 0; i < poolSize; i++) {
			Work work = new Work();
			Thread thread = new Thread(work, threadNamePrefix + nextThreadNum());
			work.thread = thread;

			works.add(work);
			thread.start();
		}
	}

	private static synchronized int nextThreadNum() {
		return threadInitNumber++;
	}

	private void checkRunnable(Runnable command) {
		if (command == null)
			throw new NullPointerException();
		if (terminated)
			throw new RuntimeException("OpTaskExecutorService is terminated.");
		if (shutdown.get())
			throw new RuntimeException("OpTaskExecutorService is shutdowned.");
		if (!(command instanceof OpTaskRunnable))
			throw new RuntimeException(command + "is not implement from OrderedRunnable");
	}

	private <V> void checkCallable(Callable<V> command) {
		if (command == null)
			throw new NullPointerException();
		if (terminated)
			throw new RuntimeException("OpTaskExecutorService is terminated.");
		if (shutdown.get())
			throw new RuntimeException("OpTaskExecutorService is shutdowned.");
		if (!(command instanceof OpTaskCallable))
			throw new RuntimeException(command + "is not implement from OrderedCallable");
	}

	private static int indexFor(Object k, int length) {
		// assert Integer.bitCount(length) == 1 :
		// "length must be a non-zero power of 2";
		return (k == null ? 0 : k.hashCode()) & (length - 1);
	}

	public void execute(Runnable command) {
		checkRunnable(command);
		OpTaskRunnable runner = (OpTaskRunnable) command;
		execute0(runner, indexFor(runner.getSession(), poolSize));
	}

	private void execute0(OpTaskRunnable runner, int index) {
		works.get(index).queue.offer(runner);
	}

	public <T extends OpTaskRunnable> void execute(Collection<T> runnables) {
		for (OpTaskRunnable runnable : runnables) {
			execute(runnable);
		}
	}

	public void execute(OpTaskRunnable... runnables) {
		for (OpTaskRunnable runnable : runnables) {
			execute(runnable);
		}
	}

	public <T extends OpTaskRunnable> void execute(final OpTaskBatchExecuteListener handler, Collection<T> runnables) {
		OpTaskRunnable[] arr = new OpTaskRunnable[runnables.size()];
		runnables.toArray(arr);
		execute(handler, arr);
	}

	public void execute(final OpTaskBatchExecuteListener handler, OpTaskRunnable... runnables) {
		execute(handler, DefaultBatchTimeOut, DefaultBatchTimeUnit, runnables);
	}

	public <T extends OpTaskRunnable> void execute(final OpTaskBatchExecuteListener handler, final int timeOut, final TimeUnit timeUnit, Collection<T> runnables) {
		OpTaskRunnable[] arr = new OpTaskRunnable[runnables.size()];
		runnables.toArray(arr);
		execute0(handler, timeOut, timeUnit, arr);
	}

	public void execute(final OpTaskBatchExecuteListener handler, final int timeOut, final TimeUnit timeUnit, OpTaskRunnable... runnables) {
		execute0(handler, timeOut, timeUnit, runnables);
	}

	private void execute0(final OpTaskBatchExecuteListener handler, final int timeOut, final TimeUnit timeUnit, OpTaskRunnable... runnables) {
		List<Integer> waitIndex = new ArrayList<>();
		List<InnerOrderedRunnable> wait = new ArrayList<>();
		for (OpTaskRunnable runnable : runnables) {
			int index = indexFor(runnable.getSession(), poolSize);

			InnerOrderedRunnable ior = new InnerOrderedRunnable();
			ior.barrier = null;
			ior.handler = handler;
			ior.runnable = runnable;
			ior.timeOut = timeOut;
			ior.timeUnit = timeUnit;
			ior.index = index;

			if (waitIndex.contains(index)) {
				execute0(ior, index);
			} else {
				waitIndex.add(index);
				wait.add(ior);
			}
		}
		int length = wait.size();
		if (length > getPoolSize()) {
			throw new IllegalArgumentException("runnables size large than threadPool MaximumPoolSize!");
		}
		CyclicBarrier barrier = new CyclicBarrier(length, new Runnable() {
			@Override
			public void run() {
				handler.finished();
			}
		});
		for (InnerOrderedRunnable runnable : wait) {
			runnable.barrier = barrier;
			execute0(runnable, runnable.index);
		}
	}

	private static class InnerOrderedRunnable implements OpTaskRunnable {
		OpTaskRunnable runnable;
		CyclicBarrier barrier;
		OpTaskBatchExecuteListener handler;
		int timeOut;
		TimeUnit timeUnit;
		int index;

		@Override
		public void run() {
			runnable.run();
			handler.afterExecuted(runnable);
			try {
				if (barrier != null)
					barrier.await(timeOut, timeUnit);
			} catch (Exception e) {
				logger.error("", e);
			}
		}

		@Override
		public Object getSession() {
			return runnable.getSession();
		}

		@Override
		public void beforeExecute(Thread thread) {
			runnable.beforeExecute(thread);
		}

		@Override
		public void afterExecute() {
			runnable.afterExecute();
		}

		@Override
		public void onError(Throwable t, ErrorFrom ef) {
			runnable.onError(t, ef);
			logger.error("ErrorFrom." + ef, t);
		}

	}

	public int getPoolSize() {
		return poolSize;
	}

	public int getQueueSize() {
		return queueSize;
	}

	public int getTimeout() {
		return timeout;
	}

	public TimeUnit getTimeUnit() {
		return timeUnit;
	}

	private BlockingQueue<OpTaskRunnable> newBlockingQueue() {
		return blockingQueueCreator == null ? new LinkedBlockingQueue<OpTaskRunnable>(getQueueSize()) : blockingQueueCreator.newQueue();
	}

	private class Work implements Runnable {
		BlockingQueue<OpTaskRunnable> queue = newBlockingQueue();
		Thread thread;

		public Work() {
		}

		@Override
		public void run() {
			while (true) {
				try {
					final OpTaskRunnable runner = queue.poll(getTimeout(), getTimeUnit());
					if (runner != null) {
						beforeExecute(thread, runner);
						try {
							runner.run();
						} catch (Throwable t) {
							runner.onError(t, ErrorFrom.run);
							logger.error("ErrorFrom.run", t);
						}
						afterExecute(runner);
					} else {
						// Thread.sleep(6);
						LockSupport.parkNanos(DefaultParkNanos);
					}
				} catch (Throwable t) {
					logger.error("", t);
				}
			}
		}

	}

	@Override
	public void shutdown() {
		shutdown.set(true);
		for (Work work : works) {
			while (!work.queue.isEmpty()) {
				synchronized (work) {
					try {
						work.wait(10);
					} catch (InterruptedException e) {
						logger.error("", e);
					}
				}
			}
			work.thread.interrupt();
		}
		terminated = true;
	}

	@Override
	public List<Runnable> shutdownNow() {
		shutdown.set(true);
		List<Runnable> list = new ArrayList<>();
		for (Work work : works) {
			work.thread.interrupt();
			work.queue.drainTo(list);
		}
		terminated = true;
		return list;
	}

	@Override
	public boolean isShutdown() {
		return shutdown.get();
	}

	@Override
	public boolean isTerminated() {
		return terminated;
	}

	@Override
	public boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException {
		long nanos = unit.toNanos(timeout);
		long t = System.currentTimeMillis();
		while (!isTerminated()) {
			if ((System.currentTimeMillis() - t) * 1000 > nanos)
				break;
			synchronized (this) {
				this.wait(10);
			}
		}
		return isTerminated();
	}

	protected <T> RunnableFuture<T> newTaskFor(Runnable runnable, T value) {
		return new OpTaskFutureTask<T>(runnable, value);
	}

	protected <T> RunnableFuture<T> newTaskFor(Callable<T> callable) {
		return new OpTaskFutureTask<T>(callable);
	}

	@Override
	public <T> Future<T> submit(Callable<T> task) {
		checkCallable(task);
		RunnableFuture<T> future = newTaskFor(task);
		execute(future);
		return future;
	}

	@Override
	public <T> Future<T> submit(Runnable task, T result) {
		checkRunnable(task);
		RunnableFuture<T> future = newTaskFor(task, result);
		execute(future);
		return future;
	}

	@Override
	public Future<?> submit(Runnable task) {
		checkRunnable(task);
		RunnableFuture<Void> future = newTaskFor(task, null);
		execute(future);
		return future;
	}

	@Override
	public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks) throws InterruptedException {
		if (tasks == null)
			throw new NullPointerException();
		ArrayList<Future<T>> futures = new ArrayList<Future<T>>(tasks.size());
		boolean done = false;
		try {
			for (Callable<T> t : tasks) {
				RunnableFuture<T> f = newTaskFor(t);
				futures.add(f);
				execute(f);
			}
			for (int i = 0, size = futures.size(); i < size; i++) {
				Future<T> f = futures.get(i);
				if (!f.isDone()) {
					try {
						f.get();
					} catch (CancellationException ignore) {
					} catch (ExecutionException ignore) {
					}
				}
			}
			done = true;
			return futures;
		} finally {
			if (!done)
				for (int i = 0, size = futures.size(); i < size; i++)
					futures.get(i).cancel(true);
		}
	}

	@Override
	public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException {
		if (tasks == null)
			throw new NullPointerException();
		long nanos = unit.toNanos(timeout);
		ArrayList<Future<T>> futures = new ArrayList<Future<T>>(tasks.size());
		boolean done = false;
		try {
			for (Callable<T> t : tasks)
				futures.add(newTaskFor(t));

			final long deadline = System.nanoTime() + nanos;
			final int size = futures.size();

			// Interleave time checks and calls to execute in case
			// executor doesn't have any/much parallelism.
			for (int i = 0; i < size; i++) {
				execute((Runnable) futures.get(i));
				nanos = deadline - System.nanoTime();
				if (nanos <= 0L)
					return futures;
			}

			for (int i = 0; i < size; i++) {
				Future<T> f = futures.get(i);
				if (!f.isDone()) {
					if (nanos <= 0L)
						return futures;
					try {
						f.get(nanos, TimeUnit.NANOSECONDS);
					} catch (CancellationException ignore) {
					} catch (ExecutionException ignore) {
					} catch (TimeoutException toe) {
						return futures;
					}
					nanos = deadline - System.nanoTime();
				}
			}
			done = true;
			return futures;
		} finally {
			if (!done)
				for (int i = 0, size = futures.size(); i < size; i++)
					futures.get(i).cancel(true);
		}
	}

	@Override
	public <T> T invokeAny(Collection<? extends Callable<T>> tasks) throws InterruptedException, ExecutionException {
		try {
			return doInvokeAny(tasks, false, 0);
		} catch (TimeoutException cannotHappen) {
			assert false;
			return null;
		}
	}

	@Override
	public <T> T invokeAny(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException {
		return doInvokeAny(tasks, true, unit.toNanos(timeout));
	}

	/**
	 * the main mechanics of invokeAny.
	 */
	private <T> T doInvokeAny(Collection<? extends Callable<T>> tasks, boolean timed, long nanos) throws InterruptedException, ExecutionException, TimeoutException {
		if (tasks == null)
			throw new NullPointerException();
		int ntasks = tasks.size();
		if (ntasks == 0)
			throw new IllegalArgumentException();
		ArrayList<Future<T>> futures = new ArrayList<Future<T>>(ntasks);
		OpTaskExecutorCompletionService<T> ecs = new OpTaskExecutorCompletionService<T>(this);

		try {
			ExecutionException ee = null;
			final long deadline = timed ? System.nanoTime() + nanos : 0L;
			Iterator<? extends Callable<T>> it = tasks.iterator();

			futures.add(ecs.submit(it.next()));
			--ntasks;
			int active = 1;

			for (;;) {
				Future<T> f = ecs.poll();
				if (f == null) {
					if (ntasks > 0) {
						--ntasks;
						futures.add(ecs.submit(it.next()));
						++active;
					} else if (active == 0)
						break;
					else if (timed) {
						f = ecs.poll(nanos, TimeUnit.NANOSECONDS);
						if (f == null)
							throw new TimeoutException();
						nanos = deadline - System.nanoTime();
					} else
						f = ecs.take();
				}
				if (f != null) {
					--active;
					try {
						return f.get();
					} catch (ExecutionException eex) {
						ee = eex;
					} catch (RuntimeException rex) {
						ee = new ExecutionException(rex);
					}
				}
			}

			if (ee == null)
				ee = new ExecutionException("", null);
			throw ee;

		} finally {
			for (int i = 0, size = futures.size(); i < size; i++)
				futures.get(i).cancel(true);
		}
	}

	private void beforeExecute(Thread thread, OpTaskRunnable runner) {
		try {
			runner.beforeExecute(thread);
		} catch (Throwable t) {
			runner.onError(t, ErrorFrom.beforeExecute);
			logger.error("ErrorFrom.beforeExecute", t);
		}
	}

	private void afterExecute(OpTaskRunnable runner) {
		try {
			runner.afterExecute();
		} catch (Throwable t) {
			runner.onError(t, ErrorFrom.afterExecute);
			logger.error("ErrorFrom.afterExecute", t);
		}
	}

	public IBlockingQueueCreator getBlockingQueueNewer() {
		return blockingQueueCreator;
	}

}
