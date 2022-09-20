package com.teamtop.system.openDaysSystem.saintMonsterWashRank.model;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.util.db.trans.FieldOrder;

public class SaintMonsterWashRankModel extends AbsOpenDaysSystemModel {
	/** 玩家id */
	@FieldOrder(order = 1)
	private long hid;
	/** 玩家名称 */
	@FieldOrder(order = 2)
	private String name;
	/** 洗练次数 */
	@FieldOrder(order = 3)
	private int totalTimes;
	/** 玩家排名达到时间 */
	@FieldOrder(order = 4)
	private int reachTime;
	/** 玩家职业 */
	@FieldOrder(order = 5)
	private int job;
	/** 玩家icon */
	@FieldOrder(order = 6)
	private int icon;
	/** 玩家头像框 */
	@FieldOrder(order = 7)
	private int frame;
	/** 玩家VIP */
	@FieldOrder(order = 8)
	private int vip;
	/** 玩家国家 */
	@FieldOrder(order = 9)
	private int country;
	/** 是否发了邮件 */
	@FieldOrder(order = 10)
	private int state;

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getFrame() {
		return frame;
	}

	public void setFrame(int frame) {
		this.frame = frame;
	}

	public int getVip() {
		return vip;
	}

	public void setVip(int vip) {
		this.vip = vip;
	}

	public int getCountry() {
		return country;
	}

	public void setCountry(int country) {
		this.country = country;
	}

	public int getIcon() {
		return icon;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public SaintMonsterWashRankModel() {
		super();
	}

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

	public int getTotalTimes() {
		return totalTimes;
	}

	public void setTotalTimes(int totalTimes) {
		this.totalTimes = totalTimes;
	}

	public int getReachTime() {
		return reachTime;
	}

	public void setReachTime(int reachTime) {
		this.reachTime = reachTime;
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		SaintMonsterWashRankModel model = (SaintMonsterWashRankModel) obj;
		if (this.hid != model.getHid()) {
			return false;
		}
		return true;
	}
}
