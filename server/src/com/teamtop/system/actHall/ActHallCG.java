package com.teamtop.system.actHall;
import com.teamtop.system.hero.Hero;

/**
 * ActHallCG.java
 * 活动大厅
 */
public class ActHallCG{

	private static ActHallCG ins = null;

	public static ActHallCG getIns(){
		if(ins == null){
			ins = new ActHallCG();
		}
		return ins;
	}

	/**
	 * 打开活动大厅 3751
	 */
	public void openActHall(Hero hero, Object[] datas){
		ActHallManager.getIns().openActHall(hero);
	} 
}