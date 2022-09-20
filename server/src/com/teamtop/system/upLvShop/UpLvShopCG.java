package com.teamtop.system.upLvShop;
import com.teamtop.system.hero.Hero;

/**
 * UpLvShopCG.java
 * 升阶商店
 */
public class UpLvShopCG{

	private static UpLvShopCG ins = null;

	public static UpLvShopCG getIns(){
		if(ins == null){
			ins = new UpLvShopCG();
		}
		return ins;
	}

	/**
	 * 打开界面 4501
	 */
	public void openUI(Hero hero, Object[] datas){
		UpLvShopManager.getIns().openUI(hero);
	} 
	/**
	 * 购买 4503
	 * @param id| 购买的配置表id| int
	 */
	public void buy(Hero hero, Object[] datas){
		int id = (int)datas[0];
		UpLvShopManager.getIns().buy(hero, id);
	} 
}