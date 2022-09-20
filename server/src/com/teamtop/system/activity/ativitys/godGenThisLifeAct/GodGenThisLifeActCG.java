package com.teamtop.system.activity.ativitys.godGenThisLifeAct;
import com.teamtop.system.hero.Hero;

/**
 * GodGenThisLifeCG.java
 * 神将现世(活动)
 */
public class GodGenThisLifeActCG{

	private static GodGenThisLifeActCG ins = null;

	public static GodGenThisLifeActCG getIns(){
		if(ins == null){
			ins = new GodGenThisLifeActCG();
		}
		return ins;
	}

	/**
	 * 抽奖 9551
	 * @param type| 次数1：1次，2：10次| byte
	 */
	public void turn(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		GodGenThisLifeActManager.getIns().turn(hero, type);
	} 
	/**
	 * 打开排行榜 9553
	 */
	public void openRankUI(Hero hero, Object[] datas){
		GodGenThisLifeActManager.getIns().openRankUI(hero);
	} 
	/**
	 * 打开目标奖励界面 9555
	 */
	public void openTargetAwardUI(Hero hero, Object[] datas){
		GodGenThisLifeActManager.getIns().openTargetAwardUI(hero);
	} 
	/**
	 * 领取目标奖励 9557
	 * @param awardId| 要领取的奖励id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		GodGenThisLifeActManager.getIns().getTargetAward(hero, awardId);
	} 
}