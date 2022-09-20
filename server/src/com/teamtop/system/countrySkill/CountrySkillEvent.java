package com.teamtop.system.countrySkill;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CountrySkillEvent extends AbsSystemEvent {

	public static CountrySkillEvent ins;

	public static CountrySkillEvent getIns() {
		if (ins == null) {
			ins = new CountrySkillEvent();
		}
		return ins;
	}

	private CountrySkillEvent() {

	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		CountrySkillFunction.getIns().redPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		CountrySkillFunction.getIns().redPoint(hero, false);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		// 达到关卡开启条件重算国家技能战力
		CountrySkillFunction.getIns().countrySkillFightCalc(hero);
	}

}
