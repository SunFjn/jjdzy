package com.teamtop.system.crossSelectKing.cross;

import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;

public class CrossSelectKingCrossEvent extends AbsSystemEvent{
	
	private static CrossSelectKingCrossEvent ins;
	public static CrossSelectKingCrossEvent getIns(){
		if(ins == null) {
			ins = new CrossSelectKingCrossEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		
		
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.CROSS_SELECT_KING)) {
			return;
		}
		CrossSelectKingCrossFunction.getIns().activityOper(cmdId);
	}

}
