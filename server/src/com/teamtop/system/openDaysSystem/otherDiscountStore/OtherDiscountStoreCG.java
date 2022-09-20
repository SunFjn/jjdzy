package com.teamtop.system.openDaysSystem.otherDiscountStore;
import com.teamtop.system.hero.Hero;

/**
 * OtherDiscountStoreCG.java
 * 折扣商店（8~28）
 */
public class OtherDiscountStoreCG{

	private static OtherDiscountStoreCG ins = null;

	public static OtherDiscountStoreCG getIns(){
		if(ins == null){
			ins = new OtherDiscountStoreCG();
		}
		return ins;
	}

	/**
	 * 购买 4771
	 * @param goodsId| 商品id| int
	 */
	public void buy(Hero hero, Object[] datas){
		int goodsId = (int)datas[0];
		OtherDiscountStoreManager.getIns().buy(hero, goodsId);
	} 
}