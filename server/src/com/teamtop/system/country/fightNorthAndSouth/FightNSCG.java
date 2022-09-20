package com.teamtop.system.country.fightNorthAndSouth;
import com.teamtop.system.hero.Hero;

/**
 * FightNSCG.java
 * 南征北战
 */
public class FightNSCG{

	private static FightNSCG ins = null;

	public static FightNSCG getIns(){
		if(ins == null){
			ins = new FightNSCG();
		}
		return ins;
	}

	/**
	 * 打开南征北战界面 1571
	 */
	public void openFightNS(Hero hero, Object[] datas){
		FightNSManager.getIns().openFightNS(hero);
	} 
	/**
	 * 获取个人排行榜 1573
	 */
	public void getPersonalRankList(Hero hero, Object[] datas){
		FightNSManager.getIns().getPersonalRankList(hero);
	} 
	/**
	 * 获取国家排行 1575
	 */
	public void getCountryRank(Hero hero, Object[] datas){
		FightNSManager.getIns().getCountryRank(hero);
	} 
	/**
	 * 购买挑战次数 1577
	 * @param num| 购买次数| byte
	 */
	public void buyCha(Hero hero, Object[] datas){
		int num = (byte)datas[0];
		FightNSManager.getIns().buyCha(hero, num);
	} 
	/**
	 * 请求挑战 1579
	 * @param beChaId| 被挑战者id| long
	 */
	public void challenge(Hero hero, Object[] datas){
		long beChaId = (long)datas[0];
		FightNSManager.getIns().challenge(hero, beChaId);
	} 
	/**
	 * 战斗结果 1581
	 * @param result| 战斗结果，0：失败，1：胜利，2：退出| byte
	 */
	public void fightEnd(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		FightNSManager.getIns().fightEnd(hero, result);
	} 
	/**
	 * 领取积分奖励 1583
	 * @param score| 奖励项积分| int
	 */
	public void getScoreAward(Hero hero, Object[] datas){
		int score = (int)datas[0];
		FightNSManager.getIns().getScoreAward(hero, score);
	} 
	/**
	 * 刷新对手 1585
	 */
	public void refreshRival(Hero hero, Object[] datas){
		FightNSManager.getIns().refreshRival(hero);
	} 
	/**
	 * 扫荡 1587
	 * @param beChaId| 被扫荡玩家id| long
	 */
	public void mopUp(Hero hero, Object[] datas){
		long beChaId = (long)datas[0];
		FightNSManager.getIns().mopUp(hero, beChaId);
	} 
}