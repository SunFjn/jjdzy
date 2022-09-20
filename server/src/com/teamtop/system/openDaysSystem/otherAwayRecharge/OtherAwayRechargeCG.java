package com.teamtop.system.openDaysSystem.otherAwayRecharge;
import com.teamtop.system.hero.Hero;

/**
 * OtherAwayRechargeCG.java
 * 连续累充（8-28天）
 */
public class OtherAwayRechargeCG{

	private static OtherAwayRechargeCG ins = null;

	public static OtherAwayRechargeCG getIns(){
		if(ins == null){
			ins = new OtherAwayRechargeCG();
		}
		return ins;
	}

	/**
	 * CG 获取奖励 7051
	 * @param index| 大奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		OtherAwayRechargeManager.getIns().getreward(hero, index);
	} 
	/**
	 * CG 获取今日奖励 7055
	 */
	public void gettodayRew(Hero hero, Object[] datas){
		OtherAwayRechargeManager.getIns().gettodayRew(hero);
	} 
}