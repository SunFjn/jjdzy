package com.teamtop.system.activity.ativitys.oneRecharge;

import java.util.List;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.oneRecharge.model.OneRecharge;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class OneRechargeFunction {
	private static OneRechargeFunction ins = null;

	public static OneRechargeFunction getIns() {
		if (ins == null) {
			ins = new OneRechargeFunction();
		}
		return ins;
	}

	/**
	 * 取得配置表首索引
	 * @param hero
	 * @return
	 */
	public int getFirstIndex(Hero hero) {
		OneRecharge oneRecharge = (OneRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_ONERECHARGE);
		return (oneRecharge.getPeriods() - 1) * OneRechargeConst.CONFIG_WEEK_LEN;
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		OneRecharge oneRecharge = (OneRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_ONERECHARGE);
		List<Integer> awardStateList = oneRecharge.getAwardStateList();
		for (int state : awardStateList) {
			if (state == OneRechargeConst.CAN_GET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
						OneRechargeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_ONERECHARGE,
						OneRechargeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				break;
			}
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		OneRecharge oneRecharge = (OneRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_ONERECHARGE);
		List<Integer> awardStateList = oneRecharge.getAwardStateList();
		for (int state : awardStateList) {
			if (state == OneRechargeConst.CAN_GET) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
						OneRechargeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_ONERECHARGE,
						OneRechargeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				break;
			}
		}
	}
}
