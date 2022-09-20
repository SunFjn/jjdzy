package com.teamtop.system.openDaysSystem.otherNewDayRecharge;
import com.teamtop.system.hero.Hero;

/**
 * OtherNewDayRechargeCG.java
 * 新单日累充（8~28）
 */
public class OtherNewDayRechargeCG{

	private static OtherNewDayRechargeCG ins = null;

	public static OtherNewDayRechargeCG getIns(){
		if(ins == null){
			ins = new OtherNewDayRechargeCG();
		}
		return ins;
	}

	/**
	 * 获取奖励 4691
	 * @param index| 奖励序号| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		OtherNewDayRechargeManager.getIns().getReward(hero, index);
	} 
}