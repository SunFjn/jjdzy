package com.teamtop.system.skill;

import java.util.HashSet;
import java.util.Set;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;

public class SkillSysEvent extends AbsSystemEvent {

	private static SkillSysEvent skillSysEvent;

	private SkillSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SkillSysEvent getIns() {
		if (skillSysEvent == null) {
			skillSysEvent = new SkillSysEvent();
		}
		return skillSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// 触发技能开启检测
		SkillFunction.getIns().openSkillSite(hero, passGuanqia);
		Set<Integer> photoCenterSet = hero.getSkill().getPhotoCenterSet();
		if(photoCenterSet==null) {
			if(HeroFunction.getIns().checkSystemOpen(hero, SkillConst.GodSkill_SysId)) {
				photoCenterSet = new HashSet<>();
				hero.getSkill().setPhotoCenterSet(photoCenterSet);
				photoCenterSet.add(1000);
				photoCenterSet.add(2000);
				photoCenterSet.add(3000);
			}
			FightCalcFunction.setRecalcAll(hero,FightCalcConst.SKILL_OPEN,SystemIdConst.GodSkill_SYSID);
		}
	}

}
