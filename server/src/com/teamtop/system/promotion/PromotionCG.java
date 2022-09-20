package com.teamtop.system.promotion;
import com.teamtop.system.hero.Hero;

/**
 * PromotionCG.java
 * 晋升
 */
public class PromotionCG{

	private static PromotionCG ins = null;

	public static PromotionCG getIns(){
		if(ins == null){
			ins = new PromotionCG();
		}
		return ins;
	}

	/**
	 * 打开晋升界面 2021
	 */
	public void openPromotion(Hero hero, Object[] datas){
		PromotionManager.getIns().openPromotion(hero);
	} 
	/**
	 * 领取晋升奖励 2023
	 * @param level| 等级| byte
	 */
	public void getLevelReward(Hero hero, Object[] datas){
		int level = (byte)datas[0];
		PromotionManager.getIns().getLevelReward(hero, level);
	} 
	/**
	 * 领取任务奖励 2025
	 * @param taskId| 任务id| int
	 */
	public void getTaskReward(Hero hero, Object[] datas){
		int taskId = (int)datas[0];
		PromotionManager.getIns().getTaskReward(hero, taskId);
	} 
	/**
	 * 激活晋升等级 2027
	 */
	public void activate(Hero hero, Object[] datas){
		PromotionManager.getIns().activate(hero);
	} 
}