package com.teamtop.system.totalRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.totalRecharge.model.TotalRechargeSys;

import excel.config.Config_leichong_725;

public class TotalRechargeSysFunction {
	public static TotalRechargeSysFunction ins;

	public static TotalRechargeSysFunction getIns() {
		if (ins == null) {
			ins = new TotalRechargeSysFunction();
		}
		return ins;
	}

	public TotalRechargeSysFunction() {
		// TODO Auto-generated constructor stub
	}

	public void recharge(Hero hero, int money, int product_id) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, TotalRechargeSysConst.SYS_ID)) {
			return;
		}
		TotalRechargeSys totalRechargeSys = hero.getTotalRechargeSys();
		totalRechargeSys.setRewardNum(totalRechargeSys.getRewardNum() + money);
		HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
		for (int rewardKey : rewardMap.keySet()) {
			int rewardSate = rewardMap.get(rewardKey);
			int rewardNum = Config_leichong_725.getIns().get(rewardKey).getCoin();
			if (rewardSate == GameConst.REWARD_0 && totalRechargeSys.getRewardNum() >= rewardNum) {
				rewardMap.put(rewardKey, GameConst.REWARD_1);
				TotalRechargeSysSender.sendCmd_4354(hero.getId(), rewardKey, GameConst.REWARD_1);
			}
		}
		TotalRechargeSysSender.sendCmd_4356(hero.getId(), totalRechargeSys.getRewardNum());
	}
}
