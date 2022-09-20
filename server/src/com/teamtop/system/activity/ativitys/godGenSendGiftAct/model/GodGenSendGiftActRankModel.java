package com.teamtop.system.activity.ativitys.godGenSendGiftAct.model;

import com.teamtop.util.db.trans.FieldOrder;

public class GodGenSendGiftActRankModel {
	/** 玩家排名 */
	private int rank;
	/** 玩家id */
	@FieldOrder(order = 1)
	private long hid;
	/** 玩家名称 */
	@FieldOrder(order = 2)
	private String name;
	/** 抽奖次数 */
	@FieldOrder(order = 3)
	private int totalTimes;
	/** 玩家排名达到时间 */
	@FieldOrder(order = 4)
	private int reachTime;
	/** 增加的次数 */
	private int addTimes;

	public GodGenSendGiftActRankModel() {
		// TODO Auto-generated constructor stub
	}

	public GodGenSendGiftActRankModel(long hid, String name, int totalTimes, int reachTime) {
		this.hid = hid;
		this.name = name;
		this.totalTimes = totalTimes;
		this.reachTime = reachTime;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
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

	public int getAddTimes() {
		return addTimes;
	}

	public void setAddTimes(int addTimes) {
		this.addTimes = addTimes;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		GodGenSendGiftActRankModel model = (GodGenSendGiftActRankModel) obj;
		if (this.hid != model.getHid()) {
			return false;
		}
		return true;
	}
}
