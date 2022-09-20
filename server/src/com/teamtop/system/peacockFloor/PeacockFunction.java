package com.teamtop.system.peacockFloor;

import com.teamtop.system.hero.Hero;

public class PeacockFunction {

	private static PeacockFunction ins = null;

	public static PeacockFunction getIns() {
		if (ins == null) {
			ins = new PeacockFunction();
		}
		return ins;
	}
	/**
	 * 
	 * @param hero
	 * @param param
	 */
	public void GMPeacock(Hero hero, String[] param) {
		int num = Integer.parseInt(param[0]);
		if (num<hero.getPeacockFloor().getFloorNum()) {
			return;
		}
		hero.getPeacockFloor().setFloorNum(num);
		PeacockFloorManager.getIns().openUi(hero);
		return;
	}
	
	
	
}
