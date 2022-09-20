package com.teamtop.util.exector.schedule;

import java.util.Date;

/**
 * 定时任务管理器
 * 
 * 
 */
public interface Scheduler {
	/**
	 * 秒毫秒表示
	 */
	public static final int ONE_SECOND_MILLISECOND = 1000;
	/**
	 * 分毫秒表示
	 */
	public static final int ONE_MINUTE_MILLISECOND = 60 * ONE_SECOND_MILLISECOND;
	/**
	 * 时毫秒表示
	 */
	public static final int ONE_HOUR_MILLISECOND = 60 * ONE_MINUTE_MILLISECOND;
	/**
	 * 天毫秒表示
	 */
	public static final int ONE_DAY_MILLISECOND = 24 * ONE_HOUR_MILLISECOND;

	/**
	 * 立即执行任务
	 * 
	 * @param task
	 *            运行任务
	 * @param taskId
	 *            任务ID
	 */
	void submit(String taskId, final Runnable task);

	/**
	 * 提交定时任务
	 * 
	 * @param taskId
	 *            定时任务ID
	 * @param delay
	 *            延迟时间(单位为毫秒)
	 * @param interval
	 *            间隔时间(毫秒)
	 * @param task
	 *            运行任务
	 */
	void submit(String taskId, long delay, long interval, final Runnable task);

	/**
	 * 提交定时任务
	 * 
	 * @param taskId
	 *            定时任务ID
	 * @param delay
	 *            延迟时间(单位为毫秒)
	 * @param task
	 *            运行任务
	 */
	void submit(String taskId, long delay, final Runnable task);

	/**
	 * 提交定时任务
	 * 
	 * @param time
	 *            任务时间
	 * @param interval
	 *            间隔时间(MS)
	 * @param task
	 *            运行任务
	 * @param taskId
	 *            定时任务ID
	 */
	void submit(String taskId, Date time, long interval, final Runnable task);

	/**
	 * 提交定时任务
	 * 
	 * @param time
	 *            任务时间
	 * @param task
	 *            运行任务
	 * @param taskId
	 *            定时任务ID
	 */
	void submit(String taskId, Date time, final Runnable task);

	/**
	 * 立即执行任务
	 * 
	 * @param task
	 *            运行任务
	 * @return 任务ID
	 */
	String submit(final Runnable task);

	/**
	 * 提交定时任务
	 * 
	 * @param delay
	 *            延迟时间(单位为毫秒)
	 * @param interval
	 *            间隔时间(MS)
	 * @param task
	 *            运行任务
	 * @return 定时任务ID
	 */
	String submit(long delay, long interval, final Runnable task);

	/**
	 * 提交定时任务
	 * 
	 * @param delay
	 *            延迟时间(单位为毫秒)
	 * @param task
	 *            运行任务
	 * @return 定时任务ID
	 */
	String submit(long delay, final Runnable task);

	/**
	 * 提交定时任务
	 * 
	 * @param time
	 *            执行的时间
	 * @param interval
	 *            间隔时间(MS)
	 * @param task
	 *            运行任务
	 * @return 定时任务ID
	 */
	String submit(Date time, long interval, final Runnable task);

	/**
	 * 提交定时任务
	 * 
	 * @param time
	 *            执行的时间
	 * @param task
	 *            运行任务
	 * @return 定时任务ID
	 */
	String submit(Date time, final Runnable task);

	/**
	 * 撤销定时任务
	 * 
	 * @param taskId
	 *            任务ID
	 */
	void cancel(String taskId);

	/**
	 * 获取定时任务的距离下一次执行的时间
	 * 
	 * @param taskId
	 *            任务ID
	 * @return 时间差(毫秒)
	 */
	long getDelay(String taskId);
	
	/**
	 * 初始化
	 */
	void init(int processorsCount);
}
