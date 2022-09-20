package com.teamtop.system.activity.ativitys.actSevenFightToLast;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;


public class ActSevenFightToLastEvent extends AbsSystemEvent{

	public static ActSevenFightToLastEvent ins;
	public static synchronized ActSevenFightToLastEvent getIns() {
		if(ins == null){
			ins = new ActSevenFightToLastEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_ACTSEVENFIGHTOLAST);
		if (!checkHeroActOpen) {
			return;
		}
		ActSevenFightToLastManager.getIns().openUI(hero);
	}

}
