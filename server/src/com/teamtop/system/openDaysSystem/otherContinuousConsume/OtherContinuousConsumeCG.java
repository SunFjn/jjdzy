package com.teamtop.system.openDaysSystem.otherContinuousConsume;
import com.teamtop.system.hero.Hero;

/**
 * OtherContinuousConsumeCG.java
 * 连续消费（8~28）
 */
public class OtherContinuousConsumeCG{

	private static OtherContinuousConsumeCG ins = null;

	public static OtherContinuousConsumeCG getIns(){
		if(ins == null){
			ins = new OtherContinuousConsumeCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4831
	 * @param day| 天数| byte
	 */
	public void getAwards(Hero hero, Object[] datas){
		int day = (byte)datas[0];
		OtherContinuousConsumeManager.getIns().getAwards(hero, day);
	} 
	/**
	 * 领取最大奖励 4833
	 */
	public void getAwardsSevenDay(Hero hero, Object[] datas){
		OtherContinuousConsumeManager.getIns().getAwardsSevenDay(hero);
	} 
}