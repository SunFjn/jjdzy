package com.teamtop.system.crossHeroesList;
import com.teamtop.system.hero.Hero;

/**
 * HeroesListCG.java
 * 群英榜
 */
public class HeroesListCG{

	private static HeroesListCG ins = null;

	public static HeroesListCG getIns(){
		if(ins == null){
			ins = new HeroesListCG();
		}
		return ins;
	}

	/**
	 * 打开群英榜 2191
	 */
	public void openHeroesList(Hero hero, Object[] datas){
		HeroesListManager.getIns().openHeroesList(hero);
	} 
	/**
	 * 领取积分奖励 2193
	 * @param rewardId| 奖励项id| int
	 */
	public void getScoreReward(Hero hero, Object[] datas){
		int rewardId = (int)datas[0];
		HeroesListManager.getIns().getScoreReward(hero, rewardId);
	} 
	/**
	 * 刷新排名 2195
	 */
	public void refreshRankList(Hero hero, Object[] datas){
		HeroesListManager.getIns().refreshRankList(hero);
	} 
	/**
	 * 打开上期排名界面 2197
	 */
	public void openLastRankUI(Hero hero, Object[] datas){
		HeroesListManager.getIns().openLastRankUI(hero);
	} 
}