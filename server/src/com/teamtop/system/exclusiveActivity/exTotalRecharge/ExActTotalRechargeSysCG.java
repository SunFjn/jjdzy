package com.teamtop.system.exclusiveActivity.exTotalRecharge;
import com.teamtop.system.hero.Hero;

/**
 * ExActTotalRechargeSysCG.java
 * 专属活动-累计充值
 */
public class ExActTotalRechargeSysCG{

	private static ExActTotalRechargeSysCG ins = null;

	public static ExActTotalRechargeSysCG getIns(){
		if(ins == null){
			ins = new ExActTotalRechargeSysCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 8301
	 * @param id| 活动唯一id| int
	 * @param index| 奖励序号| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int index = (int)datas[1];
		ExActTotalRechargeSysManager.getIns().getReward(hero, id, index);
	} 
}