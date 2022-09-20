package com.teamtop.system.activity.ativitys.achievementTree;
import com.teamtop.system.hero.Hero;

/**
 * AchievementTreeCG.java
 * 新活动-成就树
 */
public class AchievementTreeCG{

	private static AchievementTreeCG ins = null;

	public static AchievementTreeCG getIns(){
		if(ins == null){
			ins = new AchievementTreeCG();
		}
		return ins;
	}

	/**
	 * 打开成就树楼层奖励 10571
	 */
	public void openFloorUI(Hero hero, Object[] datas){
		AchievementTreeManager.getIns().openFloorUI(hero);
	} 
	/**
	 * 领取奖励 10573
	 * @param index| 表的id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		AchievementTreeManager.getIns().getReward(hero, index);
	} 
}