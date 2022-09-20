package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model;

import java.util.Map;

import com.teamtop.system.crossCommonRank.model.CommonActivityRank;

public class CelebrationHaoLiZhuanPan extends CommonActivityRank {

	private Map<Integer, Integer> gettedBigAwardMap;//已取大奖Map key：表
	private int numBigAward;//本轮抽奖总次数，大奖用，大奖抽完重新一轮
	/**奖励状态key:配置表id value:1：可领取，2：已领取 */
	private Map<Integer, Integer> targetAwardStateMap;

	public CelebrationHaoLiZhuanPan() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CelebrationHaoLiZhuanPan(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public Map<Integer, Integer> getGettedBigAwardMap() {
		return gettedBigAwardMap;
	}
	public void setGettedBigAwardMap(Map<Integer, Integer> gettedBigAwardMap) {
		this.gettedBigAwardMap = gettedBigAwardMap;
	}
	public int getNumBigAward() {
		return numBigAward;
	}
	public void setNumBigAward(int numBigAward) {
		this.numBigAward = numBigAward;
	}
	public Map<Integer, Integer> getTargetAwardStateMap() {
		return targetAwardStateMap;
	}
	public void setTargetAwardStateMap(Map<Integer, Integer> targetAwardStateMap) {
		this.targetAwardStateMap = targetAwardStateMap;
	}
}
