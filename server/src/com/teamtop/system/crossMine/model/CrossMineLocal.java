package com.teamtop.system.crossMine.model;

import java.util.List;

public class CrossMineLocal {
	/** 玩家id **/
	private long hid;
	/** 协助矿矿主id **/
	private long helpMinerId;
	/** 战斗掠夺次数 **/
	private int fightTimes;
	/** 顺手牵羊次数 **/
	private int stealTimes;
	/** 已搜索矿藏id **/
	private List<Long> mineIdList;
	/** 搜索矿藏次数 **/
	private int searchTimes;

	public CrossMineLocal() {
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public long getHelpMinerId() {
		return helpMinerId;
	}

	public void setHelpMinerId(long helpMinerId) {
		this.helpMinerId = helpMinerId;
	}

	public int getFightTimes() {
		return fightTimes;
	}

	public void setFightTimes(int fightTimes) {
		this.fightTimes = fightTimes;
	}

	public int getStealTimes() {
		return stealTimes;
	}

	public void setStealTimes(int stealTimes) {
		this.stealTimes = stealTimes;
	}

	public List<Long> getMineIdList() {
		return mineIdList;
	}

	public void setMineIdList(List<Long> mineIdList) {
		this.mineIdList = mineIdList;
	}

	public int getSearchTimes() {
		return searchTimes;
	}

	public void setSearchTimes(int searchTimes) {
		this.searchTimes = searchTimes;
	}

}
