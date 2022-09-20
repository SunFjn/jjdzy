package com.teamtop.system.activity.ativitys.playBalloon;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class PlayBalloonEvent extends AbsSystemEvent {
	public static PlayBalloonEvent ins;
	public static synchronized PlayBalloonEvent getIns() {
		if(ins == null){
			ins = new PlayBalloonEvent();
		}
		return ins;
	}
	private PlayBalloonEvent() {
	}
	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		PlayBalloonFunction.getIns().loginRed(hero);
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
	}

}
