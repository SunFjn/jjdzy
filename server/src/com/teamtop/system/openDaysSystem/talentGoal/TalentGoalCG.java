package com.teamtop.system.openDaysSystem.talentGoal;
import com.teamtop.system.hero.Hero;

/**
 * TalentGoalCG.java
 * 龙飞凤舞-天赋目标
 */
public class TalentGoalCG{

	private static TalentGoalCG ins = null;

	public static TalentGoalCG getIns(){
		if(ins == null){
			ins = new TalentGoalCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 9401
	 * @param type| 任务类型| byte
	 * @param taskId| 任务id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int taskId = (int)datas[1];
		TalentGoalManager.getIns().getReward(hero, type, taskId);
	} 
}