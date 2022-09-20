package com.teamtop.system.activity.ativitys.consumeSmashEgg;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ConsumeSmashEggEvent extends AbsSystemEvent {
	public static ConsumeSmashEggEvent ins;
	public static synchronized ConsumeSmashEggEvent getIns() {
		if(ins == null){
			ins = new ConsumeSmashEggEvent();
		}
		return ins;
	}
	private ConsumeSmashEggEvent() {
	}
	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		ConsumeSmashEggFunction.getIns().loginRed(hero);
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
	}

}
