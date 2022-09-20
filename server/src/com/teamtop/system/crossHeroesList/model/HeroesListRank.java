package com.teamtop.system.crossHeroesList.model;

import com.teamtop.util.db.trans.FieldOrder;

public class HeroesListRank implements Comparable<HeroesListRank> {

	@FieldOrder(order = 1)
	private long hid;

	/** 玩家名字 */
	@FieldOrder(order = 2)
	private String name;

	/** 头像 */
	@FieldOrder(order = 3)
	private int icon;

	/** 框架 */
	@FieldOrder(order = 4)
	private int frame;

	/** 积分 */
	@FieldOrder(order = 5)
	private int score;

	/** 更新时间 */
	@FieldOrder(order = 6)
	private int updateTime;

	@FieldOrder(order = 7)
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

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(int updateTime) {
		this.updateTime = updateTime;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	@Override
	public int compareTo(HeroesListRank o) {
		if (o.getHid() == getHid()) {
			return 0;
		}
		if (o.getScore() > this.score) {
			return 1;
		} else if (o.getScore() == this.score) {
			if (o.getUpdateTime() < this.updateTime) {
				return 1;
			} else if (o.getUpdateTime() == this.updateTime) {
				return 0;
			}
		}
		return -1;
	}

}
