package com.teamtop.system.totalRecharge;
import com.teamtop.system.hero.Hero;

/**
 * TotalRechargeSysCG.java
 * 累计充值(系统)
 */
public class TotalRechargeSysCG{

	private static TotalRechargeSysCG ins = null;

	public static TotalRechargeSysCG getIns(){
		if(ins == null){
			ins = new TotalRechargeSysCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 4351
	 */
	public void openUI(Hero hero, Object[] datas){
		TotalRechargeSysManager.getIns().openUI(hero);
	} 
	/**
	 * GC 获取奖励 4353
	 * @param index| 奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		TotalRechargeSysManager.getIns().getreward(hero, index);
	} 
}