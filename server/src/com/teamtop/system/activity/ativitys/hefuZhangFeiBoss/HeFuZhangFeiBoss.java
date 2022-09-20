package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;

import java.util.HashMap;
import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;
/**
 * 合服-张飞醉酒
 * @author jjjjyyy
 *
 */
public class HeFuZhangFeiBoss extends ActivityData {
	/**
	 * 每日元宝买酒次数
	 */
	private HashMap<Integer, Integer> buyNumMap;
	/**
	 * 醉意
	 */
	private int zuiyiNum;
	
	/**奖励领取情况**/
	private Set<Integer> reward;
	
	public HeFuZhangFeiBoss(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public HeFuZhangFeiBoss() {
	}

	public int getZuiyiNum() {
		return zuiyiNum;
	}

	public void setZuiyiNum(int zuiyiNum) {
		this.zuiyiNum = zuiyiNum;
	}

	public Set<Integer> getReward() {
		return reward;
	}

	public void setReward(Set<Integer> reward) {
		this.reward = reward;
	}

	public HashMap<Integer, Integer> getBuyNumMap() {
		return buyNumMap;
	}

	public void setBuyNumMap(HashMap<Integer, Integer> buyNumMap) {
		this.buyNumMap = buyNumMap;
	}

	

}
