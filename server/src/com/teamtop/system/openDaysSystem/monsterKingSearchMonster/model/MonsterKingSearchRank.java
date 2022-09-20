package com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model;

public class MonsterKingSearchRank implements Comparable<MonsterKingSearchRank> {

	private long hid;

	private String name;

	private int job;

	private int icon;

	private int frame;

	private int country;

	private int vipLv;

	private int num;

	private int zoneid;

	private int updateTime;

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

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public int getIcon() {
		return icon;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public int getFrame() {
		return frame;
	}

	public void setFrame(int frame) {
		this.frame = frame;
	}

	public int getCountry() {
		return country;
	}

	public void setCountry(int country) {
		this.country = country;
	}

	public int getVipLv() {
		return vipLv;
	}

	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public int getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(int updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public int compareTo(MonsterKingSearchRank o) {
		if (hid == o.getHid()) {
			return 0;
		}
		// 祈愿次数
		if (num != o.getNum()) {
			return num < o.getNum() ? 1 : -1;
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
