package com.teamtop.system.treasure;
import com.teamtop.system.hero.Hero;

/**
 * TreasureCG.java
 * 宝物
 */
public class TreasureCG{

	private static TreasureCG ins = null;

	public static TreasureCG getIns(){
		if(ins == null){
			ins = new TreasureCG();
		}
		return ins;
	}

	/**
	 * 打开宝物界面 941
	 */
	public void openTreasure(Hero hero, Object[] datas){
		TreasureManager.getIns().openTreasure(hero);
	} 
	/**
	 * 切换宝物 943
	 * @param point| 位置| byte
	 * @param treasureId| 要切换的宝物id| int
	 */
	public void switchTreasure(Hero hero, Object[] datas){
		int point = (byte)datas[0];
		int treasureId = (int)datas[1];
		TreasureManager.getIns().switchTreasure(hero, point, treasureId);
	} 
	/**
	 * 升级等级 945
	 */
	public void upgradeLevel(Hero hero, Object[] datas){
		TreasureManager.getIns().upgradeLevel(hero);
	} 
	/**
	 * 激活宝物 949
	 * @param treasureId| 宝物id| int
	 */
	public void activateTreasure(Hero hero, Object[] datas){
		int treasureId = (int)datas[0];
		TreasureManager.getIns().activateTreasure(hero, treasureId);
	} 
	/**
	 * 宝物升星 951
	 * @param treasureId| 宝物id| int
	 */
	public void upgradeStar(Hero hero, Object[] datas){
		int treasureId = (int)datas[0];
		TreasureManager.getIns().upgradeStar(hero, treasureId);
	} 
	/**
	 * 一键升级 947
	 */
	public void upgradeAll(Hero hero, Object[] datas){
		TreasureManager.getIns().upgradeAll(hero);
	} 
	/**
	 * 吞噬宝物属性丹 953
	 * @param type| 吞噬类型：0：吞噬，1：一键吞噬| byte
	 */
	public void devourElixir(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		TreasureManager.getIns().devourElixir(hero, type);
	} 
}