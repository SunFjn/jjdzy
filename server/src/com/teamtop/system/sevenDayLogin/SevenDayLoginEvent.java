package com.teamtop.system.sevenDayLogin;

import java.util.ArrayList;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.sevenDayLogin.model.SevenDayLogin;

public class SevenDayLoginEvent extends AbsSystemEvent {
	private static SevenDayLoginEvent ins;

	public static SevenDayLoginEvent getIns() {
		if (ins == null) {
			ins = new SevenDayLoginEvent();
		}
		return ins;
	}

	private SevenDayLoginEvent() {
	}

	@Override
	public void init(Hero hero) {
		SevenDayLogin sevenDayLogin = hero.getSevenDayLogin();
		if (sevenDayLogin == null) {
			sevenDayLogin = new SevenDayLogin();
			sevenDayLogin.setHid(hero.getId());
			ArrayList<Integer> getteList = new ArrayList<Integer>();
			sevenDayLogin.setGetteList(getteList);
			hero.setSevenDayLogin(sevenDayLogin);
		}
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		int loginDay = hero.getSevenDayLogin().getLoginDay();
		loginReset(hero, now);
		if (HeroFunction.getIns().checkSystemOpen(hero, SevenDayLoginConst.SEVENDAYLOGIN)) {
			if (loginDay < SevenDayLoginConst.LOGINDAY) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SevenDayLoginConst.SEVENDAYLOGIN,
						SevenDayLoginConst.REDPOINT_AWARD, RedPointConst.HAS_RED);
			}
		}
		SevenDayLoginManager.getIns().openUI(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		if (HeroFunction.getIns().checkSystemOpen(hero, SevenDayLoginConst.SEVENDAYLOGIN)) {
			SevenDayLogin sevenDayLogin = hero.getSevenDayLogin();
			int loginDay = sevenDayLogin.getLoginDay();
			if (loginDay < SevenDayLoginConst.LOGINDAY) {
				sevenDayLogin.setLoginDay(loginDay + 1);
			}
		}
	}

	@Override
	public void login(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, SevenDayLoginConst.SEVENDAYLOGIN)) {
			SevenDayLogin sevenDayLogin = hero.getSevenDayLogin();
			int size = sevenDayLogin.getGetteList().size();
			if (size < SevenDayLoginConst.LOGINDAY) {
				HeroFunction.getIns().addLoginSytemState(hero, SevenDayLoginConst.SEVENDAYLOGIN,
						SystemStateEnum.StateEnum.OPEN_NOW.getState());
			}
			int loginDay = sevenDayLogin.getLoginDay();
			if (loginDay > size) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SevenDayLoginConst.SEVENDAYLOGIN,
						SevenDayLoginConst.REDPOINT_AWARD, RedPointConst.HAS_RED);
			}
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (HeroFunction.getIns().checkSystemOpen(hero, SevenDayLoginConst.SEVENDAYLOGIN)) {
			SevenDayLogin sevenDayLogin = hero.getSevenDayLogin();
			int loginDay = sevenDayLogin.getLoginDay();
			sevenDayLogin.setLoginDay(loginDay + 1);
			HeroFunction.getIns().sendSystemState(hero.getId(), SevenDayLoginConst.SEVENDAYLOGIN,
					SystemStateEnum.StateEnum.OPEN_NOW.getState());
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SevenDayLoginConst.SEVENDAYLOGIN,
					SevenDayLoginConst.REDPOINT_AWARD, RedPointConst.HAS_RED);
		}
	}

}
