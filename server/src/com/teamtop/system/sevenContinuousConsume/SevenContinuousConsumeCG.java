package com.teamtop.system.sevenContinuousConsume;
import com.teamtop.system.hero.Hero;

/**
 * SevenContinuousConsumeCG.java
 * 连续消费（7天）
 */
public class SevenContinuousConsumeCG{

	private static SevenContinuousConsumeCG ins = null;

	public static SevenContinuousConsumeCG getIns(){
		if(ins == null){
			ins = new SevenContinuousConsumeCG();
		}
		return ins;
	}

	/**
	 * 打开界面 3051
	 */
	public void openUI(Hero hero, Object[] datas){
		SevenContinuousConsumeManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 3053
	 * @param day| 天数| byte
	 */
	public void getAwards(Hero hero, Object[] datas){
		int day = (byte)datas[0];
		SevenContinuousConsumeManager.getIns().getAwards(hero, day);
	} 
	/**
	 * 领取最大奖励 3055
	 */
	public void getAwardsSevenDay(Hero hero, Object[] datas){
		SevenContinuousConsumeManager.getIns().getAwardsSevenDay(hero);
	} 
}