package com.teamtop.system.gm.event;

import com.teamtop.system.gm.AbsGMEvent;
import com.teamtop.system.hero.Hero;
/**
 * 战斗GM事件类
 * @author lobbyer
 * @date 2017年3月29日
 */
public class BattleGMEvent extends AbsGMEvent {
	private static BattleGMEvent ins;
	public static BattleGMEvent getIns(){
		if(ins == null) {
			ins = new BattleGMEvent();
		}
		return ins;
	}

	@Override
	public void gm(Hero hero, int type, String[] param) {
		
	}

}
