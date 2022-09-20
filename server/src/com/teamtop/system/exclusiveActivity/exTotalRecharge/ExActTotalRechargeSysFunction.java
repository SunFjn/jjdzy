package com.teamtop.system.exclusiveActivity.exTotalRecharge;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.exTotalRecharge.model.ExActTotalRechargeSys;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_zshdljcz_315;

public class ExActTotalRechargeSysFunction {
	public static ExActTotalRechargeSysFunction ins;

	public static ExActTotalRechargeSysFunction getIns() {
		if (ins == null) {
			ins = new ExActTotalRechargeSysFunction();
		}
		return ins;
	}

	public ExActTotalRechargeSysFunction() {
		// TODO Auto-generated constructor stub
	}

	public void recharge(Hero hero, int money, int product_id, int id) {
//		if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//			return;
//		}
		if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
			return;
		}
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActTotalRechargeSys totalRechargeSys = (ExActTotalRechargeSys) activityData.getExActivityMap().get(id);
		totalRechargeSys.setRewardNum(totalRechargeSys.getRewardNum() + money);
		HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
		int qs = totalRechargeSys.getQs();
		Map<Integer, Struct_zshdljcz_315> map = ExActTotalRechargeCache.getQsMap().get(qs);
		for (int rewardKey : map.keySet()) {
			Integer rewardSate = rewardMap.get(rewardKey);
			int rewardNum = map.get(rewardKey).getCoin();
			if (rewardSate == null && totalRechargeSys.getRewardNum() >= rewardNum) {
				rewardMap.put(rewardKey, GameConst.REWARD_1);
				ExActTotalRechargeSysSender.sendCmd_8302(hero.getId(), id, rewardKey, GameConst.REWARD_1);
				ExActTotalRechargeSysFunction.getIns().updateRedPoint(hero, id);
			}
		}
		ExActTotalRechargeSysSender.sendCmd_8304(hero.getId(), id, totalRechargeSys.getRewardNum());
	}

	/**
	 * 检测红点
	 * @param hero
	 * @param id 活动唯一id
	 * @return
	 */
	public boolean checkRedPoint(Hero hero, int id) {
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return false;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return false;
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActTotalRechargeSys totalRechargeSys = (ExActTotalRechargeSys) activityData.getExActivityMap().get(id);
			HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
			for (int rewardKey : rewardMap.keySet()) {
				Integer state = totalRechargeSys.getRewardMap().get(rewardKey);
				if (state != null && state == GameConst.REWARD_1) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ExActTotalRechargeSysFunction checkRedPoint id=" + id);
		}
		return false;
	}

	/**
	 * 更新红点
	 * @param hero
	 * @param id
	 */
	public void updateRedPoint(Hero hero, int id) {
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			boolean checkRedPoint = checkRedPoint(hero, id);
			if (checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXCLUSIVE_TOTAL_RECHARGE, id,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.NO_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXCLUSIVE_TOTAL_RECHARGE, id,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ExActTotalRechargeSysFunction updateRedPoint id=" + id);
		}
	}

}
