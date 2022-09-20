package com.teamtop.system.openDaysSystem.saintMonsterGoal;
import com.teamtop.system.hero.Hero;

/**
 * SaintMonsterGoalCG.java
 * 圣兽降临-圣兽目标
 */
public class SaintMonsterGoalCG{

	private static SaintMonsterGoalCG ins = null;

	public static SaintMonsterGoalCG getIns(){
		if(ins == null){
			ins = new SaintMonsterGoalCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4971
	 * @param type| 任务类型| byte
	 * @param taskId| 任务id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int taskId = (int)datas[1];
		SaintMonsterGoalManager.getIns().getReward(hero, type, taskId);
	} 
}