package com.teamtop.system.activity.ativitys.oneRechargeBack;
import com.teamtop.system.hero.Hero;

/**
 * OneRechargeBackCG.java
 * 单笔返利(活动)
 */
public class OneRechargeBackCG{

	private static OneRechargeBackCG ins = null;

	public static OneRechargeBackCG getIns(){
		if(ins == null){
			ins = new OneRechargeBackCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 8473
	 * @param awardId| 索引id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		OneRechargeBackManager.getIns().getAward(hero, awardId);
	} 
	/**
	 * 转盘 8475
	 */
	public void turnAward(Hero hero, Object[] datas){
		OneRechargeBackManager.getIns().turnAward(hero);
	} 
	/**
	 * 打开记录界面 8477
	 */
	public void openRecordUI(Hero hero, Object[] datas){
		OneRechargeBackManager.getIns().openRecordUI(hero);
	} 
}