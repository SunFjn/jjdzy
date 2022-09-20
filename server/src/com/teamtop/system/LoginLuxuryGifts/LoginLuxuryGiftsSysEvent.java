package com.teamtop.system.LoginLuxuryGifts;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.LoginLuxuryGifts.model.LoginLuxuryGifts;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

public class LoginLuxuryGiftsSysEvent extends AbsSystemEvent {

	private static LoginLuxuryGiftsSysEvent ins;

	private LoginLuxuryGiftsSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LoginLuxuryGiftsSysEvent getIns() {
		if (ins == null) {
			ins = new LoginLuxuryGiftsSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		LoginLuxuryGifts loginLuxuryGifts = hero.getLoginLuxuryGifts();
		if (loginLuxuryGifts == null) {
			loginLuxuryGifts = new LoginLuxuryGifts();
			Map<Integer, Integer> rewardMap = new HashMap<>();
			Iterator<Integer> iterator = LoginLuxuryGiftsCache.getRewardTypeSet().iterator();
			int type = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				rewardMap.put(type, 0);
			}
			loginLuxuryGifts.setRewardMap(rewardMap);
			hero.setLoginLuxuryGifts(loginLuxuryGifts);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, LoginLuxuryGiftsConst.SysId)) {
			return;
		}
		boolean redPoint = LoginLuxuryGiftsFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, LoginLuxuryGiftsConst.SysId,
					LoginLuxuryGiftsConst.RedPoint, RedPointConst.HAS_RED);
		}
		LoginLuxuryGiftsFunction.getIns().checkRewardState(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
		LoginLuxuryGiftsFunction.getIns().checkRewardState(hero);
	}

	public void dailyReset(Hero hero, int now) {
		int openDays = TimeDateUtil.betweenOpen();
		if (openDays <= LoginLuxuryGiftsConst.END_DAYS) {
			LoginLuxuryGiftsFunction.getIns().sendAward(hero, openDays);
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LoginLuxuryGiftsConst.SysId)) {
			return;
		}
		LoginLuxuryGifts loginLuxuryGifts = hero.getLoginLuxuryGifts();
		Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
		Iterator<Integer> iterator = rewardMap.keySet().iterator();
		int type = 0;
		for (; iterator.hasNext();) {
			type = iterator.next();
			if (type == LoginLuxuryGiftsConst.LOGIN_REWARD) {
				rewardMap.put(type, LoginLuxuryGiftsConst.State_Can_Get);
			} else {
				rewardMap.put(type, LoginLuxuryGiftsConst.State_Cannot_Get);
			}
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, LoginLuxuryGiftsConst.SysId)) {
			return;
		}
		LoginLuxuryGiftsFunction.getIns().checkRewardState(hero);
	}

}
