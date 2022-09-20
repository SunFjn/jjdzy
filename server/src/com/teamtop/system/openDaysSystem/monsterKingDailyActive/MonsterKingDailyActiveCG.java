package com.teamtop.system.openDaysSystem.monsterKingDailyActive;
import com.teamtop.system.hero.Hero;

/**
 * MonsterKingDailyActiveCG.java
 * 万兽之王-每日活跃
 */
public class MonsterKingDailyActiveCG{

	private static MonsterKingDailyActiveCG ins = null;

	public static MonsterKingDailyActiveCG getIns(){
		if(ins == null){
			ins = new MonsterKingDailyActiveCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 9131
	 * @param type| 任务类型| byte
	 * @param taskId| 任务id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int taskId = (int)datas[1];
		MonsterKingDailyActiveManager.getIns().getReward(hero, type, taskId);
	} 
}