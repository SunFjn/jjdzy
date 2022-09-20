package com.teamtop.system.exclusiveActivity.exOneRecharge;
import com.teamtop.system.hero.Hero;

/**
 * ExActOneRechargeCG.java
 * 专属活动-单笔充值
 */
public class ExActOneRechargeCG{

	private static ExActOneRechargeCG ins = null;

	public static ExActOneRechargeCG getIns(){
		if(ins == null){
			ins = new ExActOneRechargeCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 8101
	 * @param id| 活动唯一id| int
	 * @param index| 奖励编号| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int index = (int)datas[1];
		ExActOneRechargeManager.getIns().getReward(hero, id, index);
	} 
}