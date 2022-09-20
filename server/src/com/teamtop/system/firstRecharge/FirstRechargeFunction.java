package com.teamtop.system.firstRecharge;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

public class FirstRechargeFunction {

	private static FirstRechargeFunction ins;

	public static FirstRechargeFunction getIns() {
		if (ins == null) {
			ins = new FirstRechargeFunction();
		}
		return ins;
	}

	private FirstRechargeFunction() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 首充
	 * 
	 * @param hero
	 */
	public void firstRecharge(Hero hero) {
		int currentTime = TimeDateUtil.getCurrentTime();
		if (hero.getFirstRechargeTime() == 0) {
			hero.setFirstRechargeTime(currentTime);
			hero.setFrAwardsState(FirstRechargeConst.CAN_GET);// 首充可领取
			hero.setRecentlyRechargeTime(currentTime); // 设置最近一次充值时间
			RedPointFunction.getIns().fastUpdateRedPoint(hero, FirstRechargeConst.FIRSTRECHARGE,
					FirstRechargeConst.CAN_GET, RedPointConst.HAS_RED);
		}
	}

}
