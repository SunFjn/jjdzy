package com.teamtop.system.activity.ativitys.awayRecharge;
import com.teamtop.system.hero.Hero;

/**
 * AwayRechargeCG.java
 * 活动七日连续累充
 */
public class AwayRechargeCG{

	private static AwayRechargeCG ins = null;

	public static AwayRechargeCG getIns(){
		if(ins == null){
			ins = new AwayRechargeCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2781
	 */
	public void openUI(Hero hero, Object[] datas){
		AwayRechargeManager.getIns().openUI(hero);
	} 
	/**
	 * CG 获取奖励 2783
	 * @param index| 大奖励序号| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		AwayRechargeManager.getIns().getreward(hero, index);
	} 
	/**
	 * CG 获取今日奖励 2787
	 */
	public void gettodayRew(Hero hero, Object[] datas){
		AwayRechargeManager.getIns().gettodayRew(hero);
	} 
}