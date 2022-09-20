package com.teamtop.system.boss.specialAnimalBoss.model;

public class SpecialAnimalBossRank implements Comparable<SpecialAnimalBossRank> {

	private long hid;

	private String name;

	private int passGq;

	private long updateTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPassGq() {
		return passGq;
	}

	public void setPassGq(int passGq) {
		this.passGq = passGq;
	}

	public long getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(long updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public int compareTo(SpecialAnimalBossRank o) {
		if (hid == o.getHid()) {
			return 0;
		}
		// 通关数
		if (passGq != o.getPassGq()) {
			return passGq < o.getPassGq() ? 1 : -1;
		}
		// 比较达到时间
		if (updateTime != o.getUpdateTime()) {
			return updateTime > o.getUpdateTime() ? 1 : -1;
		}
		if (hid != o.getHid()) {
			return hid < o.getHid() ? 1 : -1;
		}
		return 1;
	}

}
