package com.teamtop.system.crossDynastyWarriors.model;

import java.util.Map;

public class DynastyWarriorsModel {

	private long hid;

	/** 当前下注 key:round(轮数), value:被下注玩家id */
	private Map<Integer, Long> betMap;

	/** 已领取奖池奖励 */
	private Map<Integer, Integer> pondAward;

	/** 周重置时间 */
	private int weekResetTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Long> getBetMap() {
		return betMap;
	}

	public void setBetMap(Map<Integer, Long> betMap) {
		this.betMap = betMap;
	}

	public Map<Integer, Integer> getPondAward() {
		return pondAward;
	}

	public void setPondAward(Map<Integer, Integer> pondAward) {
		this.pondAward = pondAward;
	}

	public int getWeekResetTime() {
		return weekResetTime;
	}

	public void setWeekResetTime(int weekResetTime) {
		this.weekResetTime = weekResetTime;
	}

}
