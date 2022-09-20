package com.teamtop.system.activity.ativitys.hefuGodGift;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 大神送礼
 * @author jjjjyyy
 *
 */
public class HeFuGodGift extends ActivityData{
	/**充值*/
	private int recharge;
	/**普通奖励 101 102 103 —》奖励状态*/
	private HashMap<Integer, Integer> ptReward;
	/**高级奖励  —》已经领取个数*/
	private HashMap<Integer, Integer> vipnumReward;
	
	public HeFuGodGift() {
	}

	public HeFuGodGift(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}
	
	public int getRecharge() {
		return recharge;
	}
	public void setRecharge(int recharge) {
		this.recharge = recharge;
	}
	public HashMap<Integer, Integer> getPtReward() {
		return ptReward;
	}
	public void setPtReward(HashMap<Integer, Integer> ptReward) {
		this.ptReward = ptReward;
	}
	public HashMap<Integer, Integer> getVipnumReward() {
		return vipnumReward;
	}
	public void setVipnumReward(HashMap<Integer, Integer> vipnumReward) {
		this.vipnumReward = vipnumReward;
	}
	
	
	
	
}
