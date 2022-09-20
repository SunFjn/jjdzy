package com.teamtop.system.huoShaoChiBi;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class HuoShaoChiBiEvent extends AbsSystemEvent {
	
	public static HuoShaoChiBiEvent ins;

	public static HuoShaoChiBiEvent getIns() {
		if(ins == null){
			ins = new HuoShaoChiBiEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		if (hero.getHuoShaoChiBi() == null) {
			HuoShaoChiBi huoShaoChiBi = new HuoShaoChiBi();
			huoShaoChiBi.setHid(hero.getId());
			huoShaoChiBi.setFloorNum(0);
			hero.setHuoShaoChiBi(huoShaoChiBi);
		}
		
	}

	@Override
	public void login(Hero hero) {
	}

}
