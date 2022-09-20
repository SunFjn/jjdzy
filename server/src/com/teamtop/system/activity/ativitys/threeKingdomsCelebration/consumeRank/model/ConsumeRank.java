package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank.model;

import com.teamtop.system.crossCommonRank.model.CommonActivityRank;

public class ConsumeRank extends CommonActivityRank {
	/** 消费数 */
	private int consume;
	/** 上一次的更新时间 */
	private int lastTime;

	public ConsumeRank() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ConsumeRank(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getConsume() {
		return consume;
	}

	public int getLastTime() {
		return lastTime;
	}

	public void setConsume(int consume) {
		this.consume = consume;
	}

	public void setLastTime(int lastTime) {
		this.lastTime = lastTime;
	}

}
