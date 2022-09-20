package com.teamtop.system.sevenAwayRecharge;
import com.teamtop.system.hero.Hero;

/**
 * SevenAwayRechargeCG.java
 * 七日连续累充
 */
public class SevenAwayRechargeCG{

	private static SevenAwayRechargeCG ins = null;

	public static SevenAwayRechargeCG getIns(){
		if(ins == null){
			ins = new SevenAwayRechargeCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2771
	 */
	public void openUi(Hero hero, Object[] datas){
		SevenAwayRechargeManager.getIns().openUi(hero);
	} 
	/**
	 * CG获取大奖奖励 2773
	 * @param index| 大奖奖励序号| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		SevenAwayRechargeManager.getIns().getreward(hero, index);
	} 
	/**
	 * CG 获取今日奖励 2777
	 */
	public void gettodayRew(Hero hero, Object[] datas){
		SevenAwayRechargeManager.getIns().gettodayRew(hero);
	} 
}