package com.teamtop.system.openDaysSystem.shaozhuTotalRecharge;
import com.teamtop.system.hero.Hero;

/**
 * ShaoZhuTotalRechargeCG.java
 * 少主活动-累计充值
 */
public class ShaoZhuTotalRechargeCG{

	private static ShaoZhuTotalRechargeCG ins = null;

	public static ShaoZhuTotalRechargeCG getIns(){
		if(ins == null){
			ins = new ShaoZhuTotalRechargeCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 5593
	 * @param awardId| 要领取的奖励id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		ShaoZhuTotalRechargeManager.getIns().getAward(hero, awardId);
	} 
}