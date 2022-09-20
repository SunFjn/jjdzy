package com.teamtop.system.crossSoloRun;
import com.teamtop.system.hero.Hero;

/**
 * SoloRunCG.java
 * 单刀赴会
 */
public class SoloRunCG{

	private static SoloRunCG ins = null;

	public static SoloRunCG getIns(){
		if(ins == null){
			ins = new SoloRunCG();
		}
		return ins;
	}

	/**
	 * 打开单刀赴会界面 1611
	 */
	public void openSoloRun(Hero hero, Object[] datas){
		SoloRunManager.getIns().openSoloRun(hero);
	} 
	/**
	 * 领取每日奖励 1613
	 * @param winAwardId| 胜利场次奖励项| byte
	 */
	public void getDailyAward(Hero hero, Object[] datas){
		int winAwardId = (byte)datas[0];
		SoloRunManager.getIns().getDailyAward(hero, winAwardId);
	} 
	/**
	 * 获取排行榜 1617
	 * @param type| 排行榜类型：1：本服，2：跨服| byte
	 */
	public void getRankList(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		SoloRunManager.getIns().getRankList(hero, type);
	} 
	/**
	 * 购买挑战次数 1619
	 * @param num| 购买次数| byte
	 */
	public void buyCha(Hero hero, Object[] datas){
		int num = (byte)datas[0];
		SoloRunManager.getIns().buyCha(hero, num);
	} 
	/**
	 * 请求匹配 1621
	 */
	public void askMatch(Hero hero, Object[] datas){
		SoloRunManager.getIns().askMatch(hero);
	} 
	/**
	 * 战斗结果，请求结算 1625
	 * @param result| 0：失败，1：胜利| byte
	 */
	public void fightEnd(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		SoloRunManager.getIns().fightEnd(hero, result);
	} 
	/**
	 * 获取战报 1627
	 */
	public void getReport(Hero hero, Object[] datas){
		SoloRunManager.getIns().getReport(hero);
	} 
}