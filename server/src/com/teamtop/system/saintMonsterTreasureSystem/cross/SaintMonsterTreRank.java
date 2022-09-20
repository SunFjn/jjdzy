package com.teamtop.system.saintMonsterTreasureSystem.cross;

import com.teamtop.util.db.trans.FieldOrder;

public class SaintMonsterTreRank implements Comparable<SaintMonsterTreRank> {

	/**
	 * 玩家id
	 */
	@FieldOrder(order = 1)
	private long hid;

	/**
	 * 角色名
	 */
	@FieldOrder(order = 2)
	private String name;

	/**
	 * 当前圈数
	 */
	@FieldOrder(order = 3)
	private int round;

	/**
	 * 更新时间
	 */
	@FieldOrder(order = 4)
	private long updateTime;

	/**
	 * 区号
	 */
	@FieldOrder(order = 5)
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
