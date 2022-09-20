package com.teamtop.system.exclusiveActivity.exOneRechargeBack;
import com.teamtop.system.hero.Hero;

/**
 * ExActOneRechargeBackCG.java
 * 专属活动-单笔返利
 */
public class ExActOneRechargeBackCG{

	private static ExActOneRechargeBackCG ins = null;

	public static ExActOneRechargeBackCG getIns(){
		if(ins == null){
			ins = new ExActOneRechargeBackCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 8361
	 * @param id| 活动唯一id| int
	 * @param index| 奖励项id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int index = (int)datas[1];
		ExActOneRechargeBackManager.getIns().getReward(hero, id, index);
	} 
}