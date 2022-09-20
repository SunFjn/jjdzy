package com.teamtop.system.activity.ativitys.themeConsume;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ThemeConsumeEvent extends AbsSystemEvent {
	public static ThemeConsumeEvent ins;
	public static synchronized ThemeConsumeEvent getIns() {
		if(ins == null){
			ins = new ThemeConsumeEvent();
		}
		return ins;
	}
	private ThemeConsumeEvent() {
	}
	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		ThemeConsumeFunction.getIns().loginRed(hero);
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
	}

}
