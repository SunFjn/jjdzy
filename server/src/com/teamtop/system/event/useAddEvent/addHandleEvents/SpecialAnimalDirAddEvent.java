package com.teamtop.system.event.useAddEvent.addHandleEvents;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.useAddEvent.AbsAddHandleEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.specialAnimalDir.SpecialAnimalDirFunction;

/**
 * 异兽录道具增加事件
 * 
 * @author 13640
 *
 */
public class SpecialAnimalDirAddEvent extends AbsAddHandleEvent {

	@Override
	public void addFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (type == GameConst.TOOL) {
			SpecialAnimalDirFunction.getIns().addToolRedPointHandle(hero, itemId);
		}
	}

}
