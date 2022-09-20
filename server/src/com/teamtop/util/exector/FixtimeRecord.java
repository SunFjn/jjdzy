package com.teamtop.util.exector;

public class FixtimeRecord {
	/**
	 * 1 每隔几分钟，2 每天， 3 周， 4 特殊时期 如光棍节
	 */
	private int type;
	/**
	 * 执行时间
	 */
	private int time;
	/**
	 * 周
	 */
	private int week;
	/**
	 * 触发时间戳
	 */
	private int opTime;
	
	public FixtimeRecord() {
		super();
	}
	public FixtimeRecord(int type, int time, int week) {
		super();
		this.type = type;
		this.time = time;
		this.week = week;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getWeek() {
		return week;
	}
	public void setWeek(int week) {
		this.week = week;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + time;
		result = prime * result + type;
		result = prime * result + week;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FixtimeRecord other = (FixtimeRecord) obj;
		if (opTime != other.getOpTime())
			return false;
		if (time != other.getTime())
			return false;
		if (type != other.getType())
			return false;
		if (week != other.getWeek())
			return false;
		return true;
	}
	public int getOpTime() {
		return opTime;
	}
	public void setOpTime(int opTime) {
		this.opTime = opTime;
	}
	

}