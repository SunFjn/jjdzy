package com.teamtop.system.activity.ativitys.godGenSendGiftAct;
import com.teamtop.system.hero.Hero;

/**
 * GodGenSendGiftActCG.java
 * 神将送礼(活动)
 */
public class GodGenSendGiftActCG{

	private static GodGenSendGiftActCG ins = null;

	public static GodGenSendGiftActCG getIns(){
		if(ins == null){
			ins = new GodGenSendGiftActCG();
		}
		return ins;
	}

	/**
	 * 打开排名奖励界面 4871
	 */
	public void openRankUI(Hero hero, Object[] datas){
		GodGenSendGiftActManager.getIns().openRankUI(hero);
	} 
	/**
	 * 打开目标奖励界面 4873
	 */
	public void openTargetUI(Hero hero, Object[] datas){
		GodGenSendGiftActManager.getIns().openTargetUI(hero);
	} 
	/**
	 * 领取奖励 4875
	 * @param awardId| 要领取的配置表奖励id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		GodGenSendGiftActManager.getIns().getAward(hero, awardId);
	} 
	/**
	 * 打开上期排名界面 4877
	 */
	public void openLastRankUI(Hero hero, Object[] datas){
		GodGenSendGiftActManager.getIns().openLastRankUI(hero);
	} 
}