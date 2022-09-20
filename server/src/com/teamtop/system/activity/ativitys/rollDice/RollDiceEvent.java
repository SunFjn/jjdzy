package com.teamtop.system.activity.ativitys.rollDice;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class RollDiceEvent extends AbsSystemEvent {
	public static RollDiceEvent ins;
	public static synchronized RollDiceEvent getIns() {
		if(ins == null){
			ins = new RollDiceEvent();
		}
		return ins;
	}
	private RollDiceEvent() {
	}
	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		RollDiceFunction.getIns().loginRed(hero);
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
	}

}
