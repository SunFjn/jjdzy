package com.teamtop.system.exclusiveActivity.exOneRechargeBack;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.exOneRechargeBack.model.ExActOneRechargeBack;
import com.teamtop.system.exclusiveActivity.exOneRechargeBack.model.RewardInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

public class ExActOneRechargeBackFunction {

	private static ExActOneRechargeBackFunction ins;

	private ExActOneRechargeBackFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExActOneRechargeBackFunction getIns() {
		if (ins == null) {
			ins = new ExActOneRechargeBackFunction();
		}
		return ins;
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 */
	public boolean checkRedPoint(Hero hero, int id) {
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return false;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return false;
			}
			ExclusiveActivityData exActData = hero.getExclusiveActivityData();
			ExActOneRechargeBack newOneReCharge = (ExActOneRechargeBack) exActData.getExActivityMap().get(id);
			Map<Integer, RewardInfo> rewardMap = newOneReCharge.getRewardMap();
			Iterator<RewardInfo> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				RewardInfo rewardInfo = iterator.next();
				int canGet = rewardInfo.getCanGet();
				if (canGet > 0) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeBackFunction.class, hero.getId(), hero.getName(),
					"CelebrationOneRechargeBackFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero, int id) {
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero, id);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXCLUSIVE_ONE_BACK,
						id, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.NO_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXCLUSIVE_ONE_BACK,
						id, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, ExActOneRechargeBackFunction.class, hero.getId(), hero.getName(),
					"CelebrationOneRechargeBackFunction updateRedPoint");
		}
	}

}
