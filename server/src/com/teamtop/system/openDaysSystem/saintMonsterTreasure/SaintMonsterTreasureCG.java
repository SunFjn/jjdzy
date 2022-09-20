package com.teamtop.system.openDaysSystem.saintMonsterTreasure;
import com.teamtop.system.hero.Hero;

/**
 * SaintMonsterTreasureCG.java
 * 圣兽降临-圣兽寻宝
 */
public class SaintMonsterTreasureCG{

	private static SaintMonsterTreasureCG ins = null;

	public static SaintMonsterTreasureCG getIns(){
		if(ins == null){
			ins = new SaintMonsterTreasureCG();
		}
		return ins;
	}

	/**
	 * 掷骰子 5011
	 */
	public void rolling(Hero hero, Object[] datas){
		SaintMonsterTreasureManager.getIns().rolling(hero);
	} 
	/**
	 * 获取排行榜数据 5013
	 */
	public void getRankList(Hero hero, Object[] datas){
		SaintMonsterTreasureManager.getIns().getRankList(hero);
	} 
	/**
	 * 领取目标奖励 5015
	 * @param id| 奖励id| int
	 */
	public void getGoalReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		SaintMonsterTreasureManager.getIns().getGoalReward(hero, id);
	} 
}