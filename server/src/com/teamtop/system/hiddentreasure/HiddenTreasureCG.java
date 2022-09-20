package com.teamtop.system.hiddentreasure;
import com.teamtop.system.hero.Hero;

/**
 * HiddenTreasureCG.java
 * 藏宝阁
 */
public class HiddenTreasureCG{

	private static HiddenTreasureCG ins = null;

	public static HiddenTreasureCG getIns(){
		if(ins == null){
			ins = new HiddenTreasureCG();
		}
		return ins;
	}

	/**
	 * 打开藏宝阁界面 2731
	 */
	public void openUI(Hero hero, Object[] datas){
		HiddenTreasureManager.getIns().openUI(hero);
	} 
	/**
	 * 抽奖 2733
	 * @param type| 0：抽一次，1：抽10次| byte
	 */
	public void lottery(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		HiddenTreasureManager.getIns().lottery(hero, type);
	} 
}