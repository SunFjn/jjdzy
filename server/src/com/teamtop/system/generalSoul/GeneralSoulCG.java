package com.teamtop.system.generalSoul;
import com.teamtop.system.hero.Hero;

/**
 * GeneralSoulCG.java
 * 将魂
 */
public class GeneralSoulCG{

	private static GeneralSoulCG ins = null;

	public static GeneralSoulCG getIns(){
		if(ins == null){
			ins = new GeneralSoulCG();
		}
		return ins;
	}

	/**
	 * 打开将魂 1151
	 */
	public void openGeneralSoul(Hero hero, Object[] datas){
		GeneralSoulManager.getIns().openGeneralSoul(hero);
	} 
	/**
	 * 升级将魂 1153
	 * @param generalSoulId| 将魂id| int
	 */
	public void upgradeLevel(Hero hero, Object[] datas){
		int generalSoulId = (int)datas[0];
		GeneralSoulManager.getIns().upgradeLevel(hero, generalSoulId);
	} 
	/**
	 * 套装升阶 1155
	 * @param setId| 套装id| int
	 */
	public void upgradeSet(Hero hero, Object[] datas){
		int setId = (int)datas[0];
		GeneralSoulManager.getIns().upgradeSet(hero, setId);
	} 
}