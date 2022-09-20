package com.teamtop.system.activity.ativitys.countryTreasure;
import com.teamtop.system.hero.Hero;

/**
 * CountryTreasureCG.java
 * 三国宝藏
 */
public class CountryTreasureCG{

	private static CountryTreasureCG ins = null;

	public static CountryTreasureCG getIns(){
		if(ins == null){
			ins = new CountryTreasureCG();
		}
		return ins;
	}

	/**
	 * CG 选择道具 8651
	 * @param items| | Object[]
	 */
	public void chooseItem(Hero hero, Object[] datas){
		Object[] items = (Object[])datas[0];
		CountryTreasureManager.getIns().chooseItem(hero, items);
	} 
	/**
	 * CG 抽奖 8653
	 * @param index| 抽的位置（1-12）| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		CountryTreasureManager.getIns().getreward(hero, index);
	} 
	/**
	 * CG 获取额外奖励 8655
	 * @param index| 奖励序号| int
	 */
	public void getExrReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		CountryTreasureManager.getIns().getExrReward(hero, index);
	} 
	/**
	 * CG 获得剩余奖励 8657
	 */
	public void getleftReward(Hero hero, Object[] datas){
		CountryTreasureManager.getIns().getleftReward(hero);
	} 
}