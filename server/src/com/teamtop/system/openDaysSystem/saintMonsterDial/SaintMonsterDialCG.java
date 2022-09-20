package com.teamtop.system.openDaysSystem.saintMonsterDial;
import com.teamtop.system.hero.Hero;

/**
 * SaintMonsterDialCG.java
 * 圣兽降临-圣兽转盘
 */
public class SaintMonsterDialCG{

	private static SaintMonsterDialCG ins = null;

	public static SaintMonsterDialCG getIns(){
		if(ins == null){
			ins = new SaintMonsterDialCG();
		}
		return ins;
	}

	/**
	 * 转盘抽奖 5031
	 */
	public void turnDial(Hero hero, Object[] datas){
		SaintMonsterDialManager.getIns().turnDial(hero);
	} 
}