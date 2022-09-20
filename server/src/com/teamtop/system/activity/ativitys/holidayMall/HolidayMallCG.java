package com.teamtop.system.activity.ativitys.holidayMall;
import com.teamtop.system.hero.Hero;

/**
 * HolidayMallCG.java
 * 新活动-节日商店
 */
public class HolidayMallCG{

	private static HolidayMallCG ins = null;

	public static HolidayMallCG getIns(){
		if(ins == null){
			ins = new HolidayMallCG();
		}
		return ins;
	}

	/**
	 * 刷新商店数据 10801
	 */
	public void refreshShopData(Hero hero, Object[] datas){
		HolidayMallManager.getIns().refreshShopData(hero);
	} 
	/**
	 * 刷新商店折扣数据 10803
	 */
	public void refreshCutDownData(Hero hero, Object[] datas){
		HolidayMallManager.getIns().refreshCutDownData(hero);
	} 
	/**
	 * 购买商品 10805
	 * @param id| 商品id| int
	 */
	public void buy(Hero hero, Object[] datas){
		int id = (int)datas[0];
		HolidayMallManager.getIns().buy(hero, id);
	} 
}