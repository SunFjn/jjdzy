package com.teamtop.system.activity.ativitys.totalRecharge;
import com.teamtop.system.hero.Hero;

/**
 * TotalRechargeCG.java
 * 累计充值(活动)
 */
public class TotalRechargeCG{

	private static TotalRechargeCG ins = null;

	public static TotalRechargeCG getIns(){
		if(ins == null){
			ins = new TotalRechargeCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2471
	 */
	public void openUI(Hero hero, Object[] datas){
		TotalRechargeManager.getIns().openUI(hero);
	} 
	/**
	 * GC 获取奖励 2473
	 * @param index| 奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		TotalRechargeManager.getIns().getreward(hero, index);
	} 
}