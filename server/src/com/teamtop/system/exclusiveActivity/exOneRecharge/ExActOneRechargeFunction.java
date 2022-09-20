package com.teamtop.system.exclusiveActivity.exOneRecharge;

import java.util.HashMap;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

public class ExActOneRechargeFunction {

	private static ExActOneRechargeFunction ins;

	private ExActOneRechargeFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExActOneRechargeFunction getIns() {
		if (ins == null) {
			ins = new ExActOneRechargeFunction();
		}
		return ins;
	}
	
	public boolean checkRedPoint(Hero hero, int id) {
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return false;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return false;
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOneRecharge newOneRecharge = (ExActOneRecharge) activityData.getExActivityMap().get(id);
			if(newOneRecharge==null) {
				return false;
			}
			HashMap<Integer,List<Integer>> hasRewardNum = newOneRecharge.getHasRewardNum();
			for(int index : hasRewardNum.keySet()) {
				HashMap<Integer, Integer> hashMap2 = newOneRecharge.getReward().get(index);
				List<Integer> integers = hasRewardNum.get(index);
				Integer canNum = integers.get(0);
				Integer hasCt = integers.get(1);
				if (canNum<=0) {
					continue;
				}
				if (hashMap2.containsKey(hasCt)&&hashMap2.get(hasCt)==GameConst.REWARD_1) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeFunction.class, hero.getId(), hero.getName(), "ExActOneRechargeFunction checkRedPoint");
		}
		return false;
	}
	
	/** 更新红点*/
	public void updateRedPoint(Hero hero, int id) {
		try {
			boolean checkRedPoint = checkRedPoint(hero, id);
			if(checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ONE_RECHARGE, id,
						RedPointConst.HAS_RED);
			}else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.NO_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ONE_RECHARGE, id,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeFunction.class, hero.getId(), hero.getName(), "ExActOneRechargeFunction updateRedPoint");
		}
	}

}
