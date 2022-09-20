package com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts.model.OtherLoginLuxuryGifts;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

public class OtherLoginLuxuryGiftsSysEvent extends AbsSystemEvent {

	private static OtherLoginLuxuryGiftsSysEvent ins;

	private OtherLoginLuxuryGiftsSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OtherLoginLuxuryGiftsSysEvent getIns() {
		if (ins == null) {
			ins = new OtherLoginLuxuryGiftsSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_LOGIN_LUXURY)) {
			return;
		}
		boolean redPoint = OtherLoginLuxuryGiftsFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.OTHER_LOGIN_LUXURY,
					OtherLoginLuxuryGiftsConst.RedPoint, RedPointConst.HAS_RED);
		}
		OtherLoginLuxuryGiftsFunction.getIns().checkRewardState(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
		OtherLoginLuxuryGiftsFunction.getIns().checkRewardState(hero);
	}

	public void dailyReset(Hero hero, int now) {
		int openDays = TimeDateUtil.betweenOpen();
		OtherLoginLuxuryGiftsFunction.getIns().sendAward(hero, openDays);
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_LOGIN_LUXURY)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_LOGIN_LUXURY);
		OtherLoginLuxuryGifts loginLuxuryGifts = (OtherLoginLuxuryGifts)OtherLoginLuxuryGiftsManager.getIns().getSystemModel(hero, uid);
		Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
		Iterator<Integer> iterator = rewardMap.keySet().iterator();
		int type = 0;
		for (; iterator.hasNext();) {
			type = iterator.next();
			if (type == OtherLoginLuxuryGiftsConst.LOGIN_REWARD) {
				rewardMap.put(type, OtherLoginLuxuryGiftsConst.State_Can_Get);
			} else {
				rewardMap.put(type, OtherLoginLuxuryGiftsConst.State_Cannot_Get);
			}
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_LOGIN_LUXURY)) {
			return;
		}
		OtherLoginLuxuryGiftsFunction.getIns().checkRewardState(hero);
	}

}
