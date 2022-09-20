package com.teamtop.system.activity.ativitys.overTurntable.model;

import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class OverTurntable extends ActivityData {
	/** 剩余抽奖次数 */
	private int restTimes;
	/** 消费值 */
	private int consumeYb;
	/** 积分宝箱奖励状态列表 0：不可领取，1：可领取，2：已领取 */
	private Map<Integer, Integer> bxAwardStateMap;
	/** 抽奖记录 */
	private List<RandAwardRecordModel> randAwardRecordList;

	public OverTurntable() {
		super();
	}

	public OverTurntable(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public int getRestTimes() {
		return restTimes;
	}

	public void setRestTimes(int restTimes) {
		this.restTimes = restTimes;
	}

	public int getConsumeYb() {
		return consumeYb;
	}

	public void setConsumeYb(int consumeYb) {
		this.consumeYb = consumeYb;
	}

	public Map<Integer, Integer> getBxAwardStateMap() {
		return bxAwardStateMap;
	}

	public void setBxAwardStateMap(Map<Integer, Integer> bxAwardStateMap) {
		this.bxAwardStateMap = bxAwardStateMap;
	}

	public List<RandAwardRecordModel> getRandAwardRecordList() {
		return randAwardRecordList;
	}

	public void setRandAwardRecordList(List<RandAwardRecordModel> randAwardRecordList) {
		this.randAwardRecordList = randAwardRecordList;
	}

}
