package com.teamtop.system.quickBuy;
import com.teamtop.system.hero.Hero;

/**
 * QuickBuyCG.java
 * 快速购买
 */
public class QuickBuyCG{

	private static QuickBuyCG ins = null;

	public static QuickBuyCG getIns(){
		if(ins == null){
			ins = new QuickBuyCG();
		}
		return ins;
	}

	/**
	 * 购买商品 5251
	 * @param id| 商品id| int
	 * @param num| 购买数量| int
	 */
	public void buy(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int num = (int)datas[1];
		QuickBuyManager.getIns().buy(hero, id, num);
	} 
	/**
	 * 打开界面 5253
	 */
	public void openUI(Hero hero, Object[] datas){
		QuickBuyManager.getIns().openUI(hero);
	} 
}