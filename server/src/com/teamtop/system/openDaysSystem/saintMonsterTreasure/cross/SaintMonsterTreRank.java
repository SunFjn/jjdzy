package com.teamtop.system.openDaysSystem.saintMonsterTreasure.cross;

public class SaintMonsterTreRank implements Comparable<SaintMonsterTreRank> {

	private long hid;

	private String name;

	private int round;

	private long updateTime;

	private int zoneid;

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

	public int getRound() {
		return round;
	}

	public void setRound(int round) {
		this.round = round;
	}

	public long getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(long updateTime) {
		this.updateTime = updateTime;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	@Override
	public int compareTo(SaintMonsterTreRank o) {
		if (o.getHid() == getHid()) {
			return 0;
		}
		if (o.getRound() > getRound()) {
			return 1;
		} else if (o.getRound() == getRound()) {
			if (o.getUpdateTime() < getUpdateTime()) {
				return 1;
			} else if (o.getUpdateTime() == getUpdateTime()) {
				if (o.getHid() > getHid()) {
					return 1;
				} else {
					return -1;
				}
			}
		}
		return -1;
	}

}
