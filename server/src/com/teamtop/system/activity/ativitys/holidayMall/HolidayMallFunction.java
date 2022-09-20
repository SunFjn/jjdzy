package com.teamtop.system.activity.ativitys.holidayMall;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

public class HolidayMallFunction {
	private static volatile HolidayMallFunction ins = null;

	public static HolidayMallFunction getIns() {
		if (ins == null) {
			synchronized (HolidayMallFunction.class) {
				if (ins == null) {
					ins = new HolidayMallFunction();
				}
			}
		}
		return ins;
	}

	private HolidayMallFunction() {
	}

	public HolidayMall getModel(Hero hero) {
		HolidayMall model = (HolidayMall) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.HOLIDAY_MALL_ACT);
		return model;
	}

	/**
	 * 登录推送图标显示红点
	 * 
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HOLIDAY_MALL_ACT);
			if (!checkHeroActOpen) {
				return;
			}
			HolidayMall model = getModel(hero);
			if (model == null) {
				return;
			}
			if (model.getTimes() > 0) {
				// 有免费次数的时候
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.HOLIDAY_MALL_ACT,
					HolidayMallConst.RED_POINT, RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "HolidayMallFunction loginRed");
		}
	}

}
