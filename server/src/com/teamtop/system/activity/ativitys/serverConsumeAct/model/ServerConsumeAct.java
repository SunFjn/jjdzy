package com.teamtop.system.activity.ativitys.serverConsumeAct.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class ServerConsumeAct extends ActivityData {
	/**
	 * 奖励状态key:配置表id value:1：可领取，2：已领取
	 */
	private Map<Integer, Byte> awardStateMap;

	/**
	 * 消费元宝(玩家未开启活动,但只要是在活动期间消费就要计算.注意外网当天更新前的消费也要记录)
	 */
	private int consumeYb;

	public ServerConsumeAct() {
	}

	public ServerConsumeAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public Map<Integer, Byte> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Byte> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

	public int getConsumeYb() {
		return consumeYb;
	}

	public void setConsumeYb(int consumeYb) {
		this.consumeYb = consumeYb;
	}

}
