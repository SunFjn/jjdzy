package com.teamtop.system.exclusiveActivity.exclusiveShop;
import com.teamtop.system.hero.Hero;

/**
 * ExclusiveShopCG.java
 * 专属活动-专属商店
 */
public class ExclusiveShopCG{

	private static ExclusiveShopCG ins = null;

	public static ExclusiveShopCG getIns(){
		if(ins == null){
			ins = new ExclusiveShopCG();
		}
		return ins;
	}

	/**
	 * 购买商品 8161
	 * @param id| 活动唯一id| int
	 * @param index| 商品编号| int
	 */
	public void buy(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int index = (int)datas[1];
		ExclusiveShopManager.getIns().buy(hero, id, index);
	} 
}