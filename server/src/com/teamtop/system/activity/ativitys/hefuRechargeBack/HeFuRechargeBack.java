package com.teamtop.system.activity.ativitys.hefuRechargeBack;

import java.util.HashMap;
import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 合服充值返利
 * @author jjjjyyy
 *
 */
public class HeFuRechargeBack extends ActivityData{
	
	private int recharge;
	/**奖励领取情况**/
	private Set<Integer> reward;
	/**相应任务完成数量情况**/
	private HashMap<Integer, Integer> taskInfo;
	
	public HeFuRechargeBack(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}
	

	public HeFuRechargeBack() {
		
	}


	public int getRecharge() {
		return recharge;
	}

	public void setRecharge(int recharge) {
		this.recharge = recharge;
	}

	public Set<Integer> getReward() {
		return reward;
	}

	public void setReward(Set<Integer> reward) {
		this.reward = reward;
	}

	public HashMap<Integer, Integer> getTaskInfo() {
		return taskInfo;
	}

	public void setTaskInfo(HashMap<Integer, Integer> taskInfo) {
		this.taskInfo = taskInfo;
	}
	
	

}
