package com.teamtop.system.activity.ativitys.continuousConsume;
import com.teamtop.system.hero.Hero;

/**
 * ContinuousConsumeCG.java
 * 连续消费
 */
public class ContinuousConsumeCG{

	private static ContinuousConsumeCG ins = null;

	public static ContinuousConsumeCG getIns(){
		if(ins == null){
			ins = new ContinuousConsumeCG();
		}
		return ins;
	}

	/**
	 * 打开界面 3071
	 */
	public void openUI(Hero hero, Object[] datas){
		ContinuousConsumeManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 3073
	 * @param id| 配置表ID| short
	 */
	public void getAwards(Hero hero, Object[] datas){
		int id = (short)datas[0];
		ContinuousConsumeManager.getIns().getAwards(hero, id);
	} 
	/**
	 * 领取最大奖励  3075
	 */
	public void getAwardsSevenDay(Hero hero, Object[] datas){
		ContinuousConsumeManager.getIns().getAwardsSevenDay(hero);
	} 
}