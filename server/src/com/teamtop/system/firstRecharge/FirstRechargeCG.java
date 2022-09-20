package com.teamtop.system.firstRecharge;
import com.teamtop.system.hero.Hero;

/**
 * FirstRechargeCG.java
 * 首充
 */
public class FirstRechargeCG{

	private static FirstRechargeCG ins = null;

	public static FirstRechargeCG getIns(){
		if(ins == null){
			ins = new FirstRechargeCG();
		}
		return ins;
	}

	/**
	 * 首充奖励 1961
	 */
	public void getAwards(Hero hero, Object[] datas){
		FirstRechargeManager.getIns().getAwards(hero);
	} 
}