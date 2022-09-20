package com.teamtop.system.event.useAddEvent.addHandleEvents;

import com.teamtop.system.event.useAddEvent.AbsAddHandleEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.reincarnationGodfate.ReincarnationGodFateFunction;

/**
 * 轮回-天命道具增加事件
 * 
 * @author 13640
 *
 */
public class ReincarnationGodFateAddEvent extends AbsAddHandleEvent {

	@Override
	public void addFunctionHandle(Hero hero, int type, int itemId, long num) {
		ReincarnationGodFateFunction.getIns().addToolRedPointHandle(hero, type, itemId);
	}

}
