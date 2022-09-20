package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop;
import com.teamtop.system.hero.Hero;

/**
 * CelebrationShopCG.java
 * 三国庆典-庆典商城
 */
public class CelebrationShopCG{

	private static CelebrationShopCG ins = null;

	public static CelebrationShopCG getIns(){
		if(ins == null){
			ins = new CelebrationShopCG();
		}
		return ins;
	}

	/**
	 * 购买商品 8131
	 * @param index| 商品编号| int
	 */
	public void buy(Hero hero, Object[] datas){
		int index = (int)datas[0];
		CelebrationShopManager.getIns().buy(hero, index);
	} 
}