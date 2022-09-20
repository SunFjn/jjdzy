package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack.model.CelebrationOneRechargeBack;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack.model.RewardInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

public class CelebrationOneRechargeBackFunction {

	private static CelebrationOneRechargeBackFunction ins;

	private CelebrationOneRechargeBackFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationOneRechargeBackFunction getIns() {
		if (ins == null) {
			ins = new CelebrationOneRechargeBackFunction();
		}
		return ins;
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK)) {
				return false;
			}
			CelebrationOneRechargeBack actData = (CelebrationOneRechargeBack) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK);
			Map<Integer, RewardInfo> rewardMap = actData.getRewardMap();
			Iterator<RewardInfo> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				RewardInfo rewardInfo = iterator.next();
				int canGet = rewardInfo.getCanGet();
				if (canGet > 0) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CelebrationOneRechargeBackFunction.class, hero.getId(), hero.getName(),
					"CelebrationOneRechargeBackFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.CELEBRATION_ONERECHARGE_BACK,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, CelebrationOneRechargeBackFunction.class, hero.getId(), hero.getName(),
					"CelebrationOneRechargeBackFunction updateRedPoint");
		}
	}

}
