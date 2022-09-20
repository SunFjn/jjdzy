package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack.model.CelebrationTotalRechargeBack;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_sglcfl_261;

public class CelebrationTotalRechargeBackFunction {

	private static CelebrationTotalRechargeBackFunction ins;

	private CelebrationTotalRechargeBackFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationTotalRechargeBackFunction getIns() {
		if (ins == null) {
			ins = new CelebrationTotalRechargeBackFunction();
		}
		return ins;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, CelebrationTotalRechargeBackFunction.class, hero.getId(), hero.getName(),
					"CelebrationTotalRechargeBackFunction updateRedPoint");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK)) {
				return false;
			}
			CelebrationTotalRechargeBack actData = (CelebrationTotalRechargeBack) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.CELEBRATION_TOTALRECHARGE_BACK);
			int totalRecharge = actData.getTotalRecharge();
			Set<Integer> rewardSet = actData.getRewardSet();
			int qs = actData.getPeriods();
			Map<Integer, Struct_sglcfl_261> map = CelebrationTotalRechargeBackSysCache.getQsMap().get(qs);
			Iterator<Struct_sglcfl_261> iterator = map.values().iterator();
			for (; iterator.hasNext();) {
				Struct_sglcfl_261 sglcfl_261 = iterator.next();
				int id = sglcfl_261.getId();
				int lj = sglcfl_261.getLj();
				if (totalRecharge >= lj && (!rewardSet.contains(id))) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CelebrationTotalRechargeBackFunction.class, hero.getId(), hero.getName(),
					"CelebrationTotalRechargeBackFunction checkRedPoint");
		}
		return false;
	}


}
