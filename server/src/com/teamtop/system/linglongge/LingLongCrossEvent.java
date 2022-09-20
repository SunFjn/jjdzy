package com.teamtop.system.linglongge;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class LingLongCrossEvent extends AbsSystemEvent{

	private static LingLongCrossEvent ins;
	public static LingLongCrossEvent getIns(){
		if(ins == null) {
			ins = new LingLongCrossEvent();
		}
		return ins;
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
	public void zeroPub(int now) {
		LingLongCrossSysCache.getpZoneidRankList().clear();
		LingLongCrossSysCache.getpLingLongGeRankList().clear();
	}

}
