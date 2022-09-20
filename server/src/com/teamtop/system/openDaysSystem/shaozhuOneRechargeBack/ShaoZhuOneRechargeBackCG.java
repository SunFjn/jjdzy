package com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack;
import com.teamtop.system.hero.Hero;

/**
 * ShaoZhuOneRechargeBackCG.java
 * 少主活动-单笔返利
 */
public class ShaoZhuOneRechargeBackCG{

	private static ShaoZhuOneRechargeBackCG ins = null;

	public static ShaoZhuOneRechargeBackCG getIns(){
		if(ins == null){
			ins = new ShaoZhuOneRechargeBackCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 5643
	 * @param awardId| 索引id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		ShaoZhuOneRechargeBackManager.getIns().getAward(hero, awardId);
	} 
	/**
	 * 打开记录界面 5647
	 */
	public void openRecordUI(Hero hero, Object[] datas){
		ShaoZhuOneRechargeBackManager.getIns().openRecordUI(hero);
	} 
	/**
	 * 转盘 5645
	 */
	public void turnAward(Hero hero, Object[] datas){
		ShaoZhuOneRechargeBackManager.getIns().turnAward(hero);
	} 
}