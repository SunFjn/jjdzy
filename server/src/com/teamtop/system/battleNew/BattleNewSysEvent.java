package com.teamtop.system.battleNew;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class BattleNewSysEvent extends AbsSystemEvent {

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void logout(Hero hero) {
		// TODO Auto-generated method stub
		super.logout(hero);
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if(cmdId==1) {
			//检测是否有超时战斗并且处理
			BattleNewFunction.getIns().checkBattle();
		} else if (cmdId == 2) {
			// 检测buff
		}
	}

}
