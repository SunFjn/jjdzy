package com.teamtop.system.godGenSendGift;
import com.teamtop.system.hero.Hero;

/**
 * GodGenSendGiftCG.java
 * 神将送礼(系统)
 */
public class GodGenSendGiftCG{

	private static GodGenSendGiftCG ins = null;

	public static GodGenSendGiftCG getIns(){
		if(ins == null){
			ins = new GodGenSendGiftCG();
		}
		return ins;
	}

	/**
	 * 打开排名奖励界面 4851
	 */
	public void openRankUI(Hero hero, Object[] datas){
		GodGenSendGiftManager.getIns().openRankUI(hero);
	} 
	/**
	 * 打开目标奖励界面 4853
	 */
	public void openTargetUI(Hero hero, Object[] datas){
		GodGenSendGiftManager.getIns().openTargetUI(hero);
	} 
	/**
	 * 领取奖励 4855
	 * @param awardId| 要领取的配置表奖励id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		GodGenSendGiftManager.getIns().getAward(hero, awardId);
	} 
	/**
	 * 打开上期排名界面 4857
	 */
	public void openLastRankUI(Hero hero, Object[] datas){
		GodGenSendGiftManager.getIns().openLastRankUI(hero);
	} 
}