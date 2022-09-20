package com.teamtop.system.discountStore;
import com.teamtop.system.hero.Hero;

/**
 * DiscountStoreCG.java
 * 折扣商店
 */
public class DiscountStoreCG{

	private static DiscountStoreCG ins = null;

	public static DiscountStoreCG getIns(){
		if(ins == null){
			ins = new DiscountStoreCG();
		}
		return ins;
	}

	/**
	 * 打开界面 2631
	 */
	public void openUI(Hero hero, Object[] datas){
		DiscountStoreManager.getIns().openUI(hero);
	} 
	/**
	 * 购买 2633
	 * @param goodsId| 商品id| int
	 */
	public void buy(Hero hero, Object[] datas){
		int goodsId = (int)datas[0];
		DiscountStoreManager.getIns().buy(hero, goodsId);
	} 
}