package com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew.model.LoginLuxuryGiftsNew;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class LoginLuxuryGiftsNewSysEvent extends AbsSystemEvent {

	private static LoginLuxuryGiftsNewSysEvent loginLuxuryGiftsSysEvent;

	private LoginLuxuryGiftsNewSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LoginLuxuryGiftsNewSysEvent getIns() {
		if (loginLuxuryGiftsSysEvent == null) {
			loginLuxuryGiftsSysEvent = new LoginLuxuryGiftsNewSysEvent();
		}
		return loginLuxuryGiftsSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// 在 manager的getActivityData 中初始化
	}

	@Override
	public void login(Hero hero) {
		LoginLuxuryGiftsNewFunction.getIns().checkRewardState(hero);
		boolean redPoint = LoginLuxuryGiftsNewFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					LoginLuxuryGiftsNewConst.RedPoint, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_LoginLuxuryGiftsNew,
					LoginLuxuryGiftsNewConst.RedPoint, RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
	}

	public void dailyReset(Hero hero, int now) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_LoginLuxuryGiftsNew)) {
			return;
		}
		LoginLuxuryGiftsNewFunction.getIns().sendAward(hero);
		LoginLuxuryGiftsNew activityData = (LoginLuxuryGiftsNew) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_LoginLuxuryGiftsNew);
		Map<Integer, Integer> rewardMap = activityData.getRewardMap();
		Iterator<Integer> iterator = rewardMap.keySet().iterator();
		int actId = 0;
		for (; iterator.hasNext();) {
			actId = iterator.next();
			if (actId == LoginLuxuryGiftsNewConst.LOGIN_REWARD) {
				rewardMap.put(actId, LoginLuxuryGiftsNewConst.State_Can_Get);
			} else {
				rewardMap.put(actId, LoginLuxuryGiftsNewConst.State_Cannot_Get);
			}
		}
		LoginLuxuryGiftsNewFunction.getIns().checkRewardState(hero);
	}

}
