package com.teamtop.system.firstRechargeNew;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class FirstRechargeNewEvent extends AbsSystemEvent {

	private static FirstRechargeNewEvent ins;

	private FirstRechargeNewEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FirstRechargeNewEvent getIns() {
		if (ins == null) {
			ins = new FirstRechargeNewEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		Map<Integer, Integer> firstRechargeAward = hero.getFirstRechargeAward();
		if (firstRechargeAward != null) {
			return;
		}
		firstRechargeAward = new HashMap<>();
		hero.setFirstRechargeAward(firstRechargeAward);
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, FirstRechargeNewConst.SysId)) {
			return;
		}
		FirstRechargeNewManager.getIns().openUI(hero);
		boolean redPoint = FirstRechargeNewFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, FirstRechargeNewConst.SysId,
					FirstRechargeNewConst.RedPoint, RedPointConst.HAS_RED);
		}
		FirstRechargeNewFunction.getIns().checkIcon(hero);
		FirstRechargeNewFunction.getIns().fristLoginToday(hero, 0);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		FirstRechargeNewFunction.getIns().fristLoginToday(hero, 0);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		FirstRechargeNewFunction.getIns().fristLoginToday(hero, passGuanqia);
	}

	
}
