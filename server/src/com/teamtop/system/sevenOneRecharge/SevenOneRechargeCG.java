package com.teamtop.system.sevenOneRecharge;
import com.teamtop.system.hero.Hero;

/**
 * SevenOneRechargeCG.java
 * 7日单笔累充
 */
public class SevenOneRechargeCG{

	private static SevenOneRechargeCG ins = null;

	public static SevenOneRechargeCG getIns(){
		if(ins == null){
			ins = new SevenOneRechargeCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2971
	 */
	public void openUI(Hero hero, Object[] datas){
		SevenOneRechargeManager.getIns().openUI(hero);
	} 
	/**
	 * CG 获取奖励 2973
	 * @param index| 奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		SevenOneRechargeManager.getIns().getreward(hero, index);
	} 
}