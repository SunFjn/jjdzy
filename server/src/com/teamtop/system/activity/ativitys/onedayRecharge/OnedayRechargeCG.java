package com.teamtop.system.activity.ativitys.onedayRecharge;
import com.teamtop.system.hero.Hero;

/**
 * OnedayRechargeCG.java
 * 单日累值
 */
public class OnedayRechargeCG{

	private static OnedayRechargeCG ins = null;

	public static OnedayRechargeCG getIns(){
		if(ins == null){
			ins = new OnedayRechargeCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2521
	 */
	public void openUI(Hero hero, Object[] datas){
		//OnedayRechargeManager.getIns().openUI(hero);
	} 
	/**
	 * CG 获取奖励 2523
	 * @param index| 奖励索引| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		//OnedayRechargeManager.getIns().getreward(hero, index);
	} 
}