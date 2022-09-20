package com.teamtop.system.crossSoloRun.model;

import com.teamtop.util.db.trans.FieldOrder;

public class SoloRunRank implements Comparable<SoloRunRank> {

	@FieldOrder(order = 1)
	private long hid;

	/** 名称 */
	@FieldOrder(order = 2)
	private String name;

	/** 积分 */
	@FieldOrder(order = 3)
	private int score;

	/** 战力 */
	@FieldOrder(order = 4)
	private long strength;

	@FieldOrder(order = 5)
	private int zonid;

	@FieldOrder(order = 6)
	private int createTime;

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

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public int getZonid() {
		return zonid;
	}

	public void setZonid(int zonid) {
		this.zonid = zonid;
	}

	public int getCreateTime() {
		return createTime;
	}

	public void setCreateTime(int createTime) {
		this.createTime = createTime;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj != null && obj instanceof SoloRunRank) {
			SoloRunRank rank = (SoloRunRank) obj;
			if (rank.getHid() == getHid()) {
				return true;
			}
		}
		return super.equals(obj);
	}

	@Override
	public int compareTo(SoloRunRank o) {
		if (o.getHid() == getHid()) {
			return 0;
		}
		if (o.getScore() > getScore()) {
			return 1;
		} else if (o.getScore() == getScore()) {
			if (o.getCreateTime() < getCreateTime()) {
				return 1;
			} else if (o.getCreateTime() == getCreateTime()) {
				if(o.getHid()<getHid()) {
					return 1;
				} else if (o.getHid() == getHid()) {
					return 0;
				}
			}
		}
		return -1;
	}

}
