package com.teamtop.system.openDaysSystem.otherTotalRecharge;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.otherTotalRecharge.model.OtherTotalRechargeSys;

import excel.struct.Struct_leichong3_725;

public class OtherTotalRechargeSysFunction {
	public static OtherTotalRechargeSysFunction ins;

	public static OtherTotalRechargeSysFunction getIns() {
		if (ins == null) {
			ins = new OtherTotalRechargeSysFunction();
		}
		return ins;
	}

	public OtherTotalRechargeSysFunction() {
		// TODO Auto-generated constructor stub
	}

	public void recharge(Hero hero, int money, int product_id) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_TOTAL_RECHARGE)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_TOTAL_RECHARGE);
		OtherTotalRechargeSys totalRechargeSys = (OtherTotalRechargeSys) OtherTotalRechargeSysManager.getIns().getSystemModel(hero, uid);
		totalRechargeSys.setRewardNum(totalRechargeSys.getRewardNum() + money);
		HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
		int qs = totalRechargeSys.getQs();
		Map<Integer, Struct_leichong3_725> map = OtherTotalRechargeCache.getQsMap().get(qs);
		for (int rewardKey : rewardMap.keySet()) {
			int rewardSate = rewardMap.get(rewardKey);
			int rewardNum = map.get(rewardKey).getCoin();
			if (rewardSate == GameConst.REWARD_0 && totalRechargeSys.getRewardNum() >= rewardNum) {
				rewardMap.put(rewardKey, GameConst.REWARD_1);
				OtherTotalRechargeSysSender.sendCmd_4672(hero.getId(), rewardKey, GameConst.REWARD_1);
			}
		}
		OtherTotalRechargeSysSender.sendCmd_4674(hero.getId(), totalRechargeSys.getRewardNum());
	}
}
