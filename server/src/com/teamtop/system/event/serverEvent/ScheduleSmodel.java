package com.teamtop.system.event.serverEvent;

public class ScheduleSmodel extends Smodel {
	private String type;
	private long delay;
	private long interval;
	private boolean useLong;
	private String method;
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
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
	public boolean isUseLong() {
		return useLong;
	}
	public void setUseLong(boolean useLong) {
		this.useLong = useLong;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public ScheduleSmodel(String className, String desc, String pf, String type, long delay,
			long interval, boolean useLong, String method) {
		super(className, desc, pf);
		this.type = type;
		this.delay = delay;
		this.interval = interval;
		this.useLong = useLong;
		this.method = method;
	}
	
}
