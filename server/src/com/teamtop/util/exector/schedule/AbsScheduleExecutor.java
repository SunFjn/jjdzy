package com.teamtop.util.exector.schedule;

public abstract class AbsScheduleExecutor {
	private long delay;
	private long interval;
	private boolean useLong;
	/**
	 * 执行定时逻辑
	 * @param now 当前时间
	 */
	public abstract void execute(int now);
	/**
	 * 执行定时逻辑
	 * @param now 当前时间
	 */
	public void execute(long now){
		
	}
	public AbsScheduleExecutor(long delay, long interval,boolean useLong) {
		super();
		this.delay = delay;
		this.interval = interval;
		this.useLong = useLong;
	}
	
	public boolean isUseLong() {
		return useLong;
	}
	public long getDelay() {
		return delay;
	}
	public void setDelay(long delay) {
		this.delay = delay;
	}
	public long getInterval() {
		return interval;
	}
	public void setInterval(long interval) {
		this.interval = interval;
	}

}
