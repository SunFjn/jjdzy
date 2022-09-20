package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift.model.CelebrationLoginGift;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_sgdlyj_261;

public class CelebrationLoginGiftFunction {

	private static CelebrationLoginGiftFunction ins;

	private CelebrationLoginGiftFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationLoginGiftFunction getIns() {
		if (ins == null) {
			ins = new CelebrationLoginGiftFunction();
		}
		return ins;
	}

	/**
	 * 检测登录天数
	 * 
	 * @param hero
	 */
	public void checkLoginDays(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_LOGINGIFT)) {
				return;
			}
			CelebrationLoginGift actData = (CelebrationLoginGift) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.CELEBRATION_LOGINGIFT);
			int firstTime = actData.getFirstTime();
			int loginTimes = actData.getLoginTimes();
			int zeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
			if (firstTime != 0 && firstTime == zeroTime) {
				return;
			}
			if (firstTime == 0) {
				firstTime = zeroTime;
				actData.setFirstTime(firstTime);
				loginTimes++;
			} else if (firstTime < zeroTime) {
				actData.setFirstTime(zeroTime);
				loginTimes++;
			}
			actData.setLoginTimes(loginTimes);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, CelebrationLoginGiftFunction.class, hero.getId(), hero.getName(),
					"CelebrationLoginGiftFunction checkLoginDays");
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
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_LOGINGIFT)) {
				return false;
			}
			CelebrationLoginGift actData = (CelebrationLoginGift) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.CELEBRATION_LOGINGIFT);
			int qs = actData.getPeriods();
			Map<Integer, Struct_sgdlyj_261> map = CelebrationLoginGiftCache.getQsMap().get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			int loginTimes = actData.getLoginTimes();
			Set<Integer> reward = actData.getReward();
			for (; iterator.hasNext();) {
				Integer day = iterator.next();
				if (day <= loginTimes && (!reward.contains(day))) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CelebrationLoginGiftFunction.class, hero.getId(), hero.getName(),
					"CelebrationLoginGiftFunction checkRedPiont");
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
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.CELEBRATION_LOGINGIFT,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.CELEBRATION_LOGINGIFT,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, CelebrationLoginGiftFunction.class, hero.getId(), hero.getName(),
					"CelebrationLoginGiftFunction updateRedPoint");
		}
	}

}
