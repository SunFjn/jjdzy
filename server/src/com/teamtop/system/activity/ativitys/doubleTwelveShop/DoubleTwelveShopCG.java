package com.teamtop.system.activity.ativitys.doubleTwelveShop;
import com.teamtop.system.hero.Hero;

/**
 * DoubleTwelveShopCG.java
 * 新活动-双12商城
 */
public class DoubleTwelveShopCG{

	private static DoubleTwelveShopCG ins = null;

	public static DoubleTwelveShopCG getIns(){
		if(ins == null){
			ins = new DoubleTwelveShopCG();
		}
		return ins;
	}

	/**
	 * 购买商品 10701
	 * @param itemInfos| 商品信息| Object[]
	 */
	public void buyItems(Hero hero, Object[] datas){
		Object[] itemInfos = (Object[])datas[0];
		DoubleTwelveShopManager.getIns().buyItems(hero, itemInfos);
	} 
}