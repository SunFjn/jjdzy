package com.teamtop.system.recharge.events;

import java.util.Map;

import com.teamtop.system.LoginLuxuryGifts.LoginLuxuryGiftsConst;
import com.teamtop.system.LoginLuxuryGifts.model.LoginLuxuryGifts;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class LoginLuxuryGiftsHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, LoginLuxuryGiftsConst.SysId)) {
			return;
		}
		LoginLuxuryGifts loginLuxuryGifts = hero.getLoginLuxuryGifts();
		Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
		int state = rewardMap.get(LoginLuxuryGiftsConst.RECHARGE_REWARD);
		if (state == LoginLuxuryGiftsConst.State_Cannot_Get) {
			rewardMap.put(LoginLuxuryGiftsConst.RECHARGE_REWARD, LoginLuxuryGiftsConst.State_Can_Get);
		}
	}

}
