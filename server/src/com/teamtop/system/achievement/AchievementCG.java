package com.teamtop.system.achievement;
import com.teamtop.system.hero.Hero;

/**
 * AchievementCG.java
 * 成就
 */
public class AchievementCG{

	private static AchievementCG ins = null;

	public static AchievementCG getIns(){
		if(ins == null){
			ins = new AchievementCG();
		}
		return ins;
	}

	/**
	 * 打开界面 10321
	 */
	public void openUI(Hero hero, Object[] datas){
		AchievementManager.getIns().openUI(hero);
	} 
	/**
	 * 领取成就任务奖励 10323
	 * @param type| 任务类型| byte
	 * @param taskId| 任务id| int
	 * @param getType| 领取方式 0领取单个 1一键领取| byte
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int taskId = (int)datas[1];
		int getType = (byte)datas[2];
		AchievementManager.getIns().getReward(hero, type, taskId, getType);
	} 
	/**
	 * 打开成就奖励 10325
	 */
	public void openGoalUI(Hero hero, Object[] datas){
		AchievementManager.getIns().openGoalUI(hero);
	} 
	/**
	 * 领取成就奖励 10327
	 * @param index| 成就奖励表的序号index| int
	 */
	public void getGoalReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		AchievementManager.getIns().getGoalReward(hero, index);
	} 
	/**
	 * 成就大师升阶 10329
	 */
	public void upAchievement(Hero hero, Object[] datas){
		AchievementManager.getIns().upAchievement(hero);
	} 
}