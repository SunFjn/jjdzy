package com.teamtop.system.openDaysSystem.otherFightToLast;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;

public class OtherFightToLastEvent extends AbsSystemEvent {

	private static OtherFightToLastEvent ins;
	public static OtherFightToLastEvent getIns(){
		if(ins == null) {
			ins = new OtherFightToLastEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		
	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_FIGHT_TO_LAST)) {
			return;
		}
		OtherFightToLastManager.getIns().openUI(hero);
	}

}
