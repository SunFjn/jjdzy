package com.teamtop.system.activity.ativitys.totalRebate;
import com.teamtop.system.hero.Hero;

/**
 * TotalRebateCG.java
 * 新活动-累计返利
 */
public class TotalRebateCG{

	private static TotalRebateCG ins = null;

	public static TotalRebateCG getIns(){
		if(ins == null){
			ins = new TotalRebateCG();
		}
		return ins;
	}

	/**
	 * 领取累计返利奖励 10751
	 * @param id| 充值商品ID| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		TotalRebateManager.getIns().getAward(hero, id);
	} 
}