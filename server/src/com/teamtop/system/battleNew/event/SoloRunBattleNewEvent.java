package com.teamtop.system.battleNew.event;

import com.teamtop.system.battleNew.model.BattleNewInfo;

public class SoloRunBattleNewEvent extends BattleNewEvent {

	private static SoloRunBattleNewEvent event;

	private SoloRunBattleNewEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SoloRunBattleNewEvent getIns() {
		if (event == null) {
			event = new SoloRunBattleNewEvent();
		}
		return event;
	}

	@Override
	public void battleEnd(BattleNewInfo battleNewInfo) {

	}

	@Override
	public int[][] battleCountWin(long battleUid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int[][] battleCountLose(long battleUid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isNomalSendBack() {
		return true;
	}

	@Override
	public void afterBattleEnd(BattleNewInfo battleNewInfo) {
		// TODO Auto-generated method stub
		
	}

}
