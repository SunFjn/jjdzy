package com.teamtop.system.activity.ativitys.dailyFirstRecharge;
import com.teamtop.system.hero.Hero;

/**
 * DailyFirstRechargeCG.java
 * 每日首充
 */
public class DailyFirstRechargeCG{

	private static DailyFirstRechargeCG ins = null;

	public static DailyFirstRechargeCG getIns(){
		if(ins == null){
			ins = new DailyFirstRechargeCG();
		}
		return ins;
	}

	/**
	 * 领取宝箱奖励 1931
	 * @param baoxiangId| 要领取的宝箱id| byte
	 */
	public void getBaoxiangAwards(Hero hero, Object[] datas){
		int baoxiangId = (byte)datas[0];
		DailyFirstRechargeManager.getIns().getBaoxiangAwards(hero, baoxiangId);
	} 
	/**
	 * 领取每日首充奖励 1933
	 */
	public void getAwards(Hero hero, Object[] datas){
		DailyFirstRechargeManager.getIns().getAwards(hero);
	} 
}