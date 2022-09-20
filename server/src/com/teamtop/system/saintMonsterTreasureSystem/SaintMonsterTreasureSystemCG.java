package com.teamtop.system.saintMonsterTreasureSystem;
import com.teamtop.system.hero.Hero;

/**
 * SaintMonsterTreasureSystemCG.java
 * 圣兽寻宝
 */
public class SaintMonsterTreasureSystemCG{

	private static SaintMonsterTreasureSystemCG ins = null;

	public static SaintMonsterTreasureSystemCG getIns(){
		if(ins == null){
			ins = new SaintMonsterTreasureSystemCG();
		}
		return ins;
	}

	/**
	 * 打开界面 5331
	 */
	public void openUI(Hero hero, Object[] datas){
		SaintMonsterTreasureSystemManager.getIns().openUI(hero);
	} 
	/**
	 * 掷骰子 5333
	 */
	public void rolling(Hero hero, Object[] datas){
		SaintMonsterTreasureSystemManager.getIns().rolling(hero);
	} 
	/**
	 * 获取排行榜数据 5335
	 * @param type| 类型：1：本期排行，2：上期排行| byte
	 */
	public void getRankList(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		SaintMonsterTreasureSystemManager.getIns().getRankList(hero, type);
	} 
	/**
	 * 领取目标奖励 5337
	 * @param id| 奖励id| int
	 */
	public void getGoalReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		SaintMonsterTreasureSystemManager.getIns().getGoalReward(hero, id);
	} 
}