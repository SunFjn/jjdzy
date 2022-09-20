package com.teamtop.synHandleCore;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletionService;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.RunnableFuture;
import java.util.concurrent.TimeUnit;

public class OpTaskExecutorCompletionService<V> implements CompletionService<V> {
	private final OpTaskExecutorService executor;
	private final BlockingQueue<Future<V>> completionQueue;

	/**
	 * FutureTask extension to enqueue upon completion
	 */
	private class QueueingFuture extends OpTaskFutureTask<Void> {
		QueueingFuture(RunnableFuture<V> task) {
			super(task, null);
			this.task = task;
		}

		protected void done() {
			completionQueue.add(task);
		}

		private final Future<V> task;
	}

	private RunnableFuture<V> newTaskFor(Callable<V> task) {
		return executor.newTaskFor(task);
	}

	private RunnableFuture<V> newTaskFor(Runnable task, V result) {
		return executor.newTaskFor(task, result);
	}

	public OpTaskExecutorCompletionService(OpTaskExecutorService executor) {
		if (executor == null)
			throw new NullPointerException();
		this.executor = executor;
		this.completionQueue = new LinkedBlockingQueue<Future<V>>();
	}

	public OpTaskExecutorCompletionService(OpTaskExecutorService executor, BlockingQueue<Future<V>> completionQueue) {
		if (executor == null || completionQueue == null)
			throw new NullPointerException();
		this.executor = executor;
		this.completionQueue = completionQueue;
	}

	public Future<V> submit(Callable<V> task) {
		if (task == null)
			throw new NullPointerException();
		RunnableFuture<V> f = newTaskFor(task);
		executor.execute(new QueueingFuture(f));
		return f;
	}

	public Future<V> submit(Runnable task, V result) {
		if (task == null)
			throw new NullPointerException();
		RunnableFuture<V> f = newTaskFor(task, result);
		executor.execute(new QueueingFuture(f));
		return f;
	}

	public Future<V> take() throws InterruptedException {
		return completionQueue.take();
	}

	public Future<V> poll() {
		return completionQueue.poll();
	}

	public Future<V> poll(long timeout, TimeUnit unit) throws InterruptedException {
		return completionQueue.poll(timeout, unit);
	}
}
