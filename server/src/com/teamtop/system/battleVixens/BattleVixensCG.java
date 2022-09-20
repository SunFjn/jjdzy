package com.teamtop.system.battleVixens;
import com.teamtop.system.hero.Hero;

/**
 * BattleVixensCG.java
 * 一骑当千
 */
public class BattleVixensCG{

	private static BattleVixensCG ins = null;

	public static BattleVixensCG getIns(){
		if(ins == null){
			ins = new BattleVixensCG();
		}
		return ins;
	}

	/**
	 * 打开一骑当千界面 1281
	 */
	public void openBattleVixens(Hero hero, Object[] datas){
		BattleVixensManager.getIns().openBattleVixens(hero);
	} 
	/**
	 * 请求挑战 1283
	 * @param hardType| 难度| byte
	 */
	public void challenge(Hero hero, Object[] datas){
		int hardType = (byte)datas[0];
		BattleVixensManager.getIns().challenge(hero, hardType);
	} 
	/**
	 * 战斗结果 1285
	 * @param result| 胜利，打完当前一波怪，2：退出| byte
	 */
	public void oneFightEnd(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		BattleVixensManager.getIns().oneFightEnd(hero, result);
	} 
	/**
	 * 购买挑战次数 1287
	 * @param num| 购买次数| byte
	 */
	public void buyCha(Hero hero, Object[] datas){
		int num = (byte)datas[0];
		BattleVixensManager.getIns().buyCha(hero, num);
	} 
	/**
	 * 领取首通奖励 1289
	 * @param hardType| 难度| byte
	 */
	public void getAward(Hero hero, Object[] datas){
		int hardType = (byte)datas[0];
		BattleVixensManager.getIns().getAward(hero, hardType);
	} 
	/**
	 * 打开排行榜 1291
	 */
	public void openRanking(Hero hero, Object[] datas){
		BattleVixensManager.getIns().openRanking(hero);
	} 
}