package com.teamtop.system.openDaysSystem.saintMonsterDailyActive;
import com.teamtop.system.hero.Hero;

/**
 * SaintMonsterDailyActiveCG.java
 * 圣兽降临-每日活跃
 */
public class SaintMonsterDailyActiveCG{

	private static SaintMonsterDailyActiveCG ins = null;

	public static SaintMonsterDailyActiveCG getIns(){
		if(ins == null){
			ins = new SaintMonsterDailyActiveCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4991
	 * @param type| 任务类型| byte
	 * @param taskId| 任务id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int taskId = (int)datas[1];
		SaintMonsterDailyActiveManager.getIns().getReward(hero, type, taskId);
	} 
}