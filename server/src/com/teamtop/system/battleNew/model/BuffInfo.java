package com.teamtop.system.battleNew.model;

public class BuffInfo {

	private int buffId;

	private long effectEndTime;

	private long cdEndTime;

	public int getBuffId() {
		return buffId;
	}

	public void setBuffId(int buffId) {
		this.buffId = buffId;
	}

	public long getEffectEndTime() {
		return effectEndTime;
	}

	public void setEffectEndTime(long effectEndTime) {
		this.effectEndTime = effectEndTime;
	}

	public long getCdEndTime() {
		return cdEndTime;
	}

	public void setCdEndTime(long cdEndTime) {
		this.cdEndTime = cdEndTime;
	}

}
