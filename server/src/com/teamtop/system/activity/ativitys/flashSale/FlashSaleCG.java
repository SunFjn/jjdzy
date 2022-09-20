package com.teamtop.system.activity.ativitys.flashSale;
import com.teamtop.system.hero.Hero;

/**
 * FlashSaleCG.java
 * 限时抢购(活动)
 */
public class FlashSaleCG{

	private static FlashSaleCG ins = null;

	public static FlashSaleCG getIns(){
		if(ins == null){
			ins = new FlashSaleCG();
		}
		return ins;
	}

	/**
	 * 打开限时抢购界面 8671
	 */
	public void openUI(Hero hero, Object[] datas){
		FlashSaleManager.getIns().openUI(hero);
	} 
	/**
	 * 立即抢购 8673
	 * @param id| 抢购ID| int
	 */
	public void buy(Hero hero, Object[] datas){
		int id = (int)datas[0];
		FlashSaleManager.getIns().buy(hero, id);
	} 
}