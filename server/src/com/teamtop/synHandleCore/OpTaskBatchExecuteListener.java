package com.teamtop.synHandleCore;

public interface OpTaskBatchExecuteListener {
	/**
	 * 批量执行完成后
	 */
	void finished();

	/**
	 * 指定任务执行前
	 * 
	 * @param runnable
	 * @param t
	 */
	void beforeExecute(OpTaskRunnable runnable, Thread t);

	/**
	 * 指定任务执行后
	 * 
	 * @param runnable
	 */
	void afterExecuted(OpTaskRunnable runnable);
}
