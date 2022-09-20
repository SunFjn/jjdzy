package com.teamtop.system.linglongge;
import com.teamtop.system.hero.Hero;

/**
 * LingLongGeCG.java
 * 玲珑阁linglongge
 */
public class LingLongGeCG{

	private static LingLongGeCG ins = null;

	public static LingLongGeCG getIns(){
		if(ins == null){
			ins = new LingLongGeCG();
		}
		return ins;
	}

	/**
	 * 打开界面 2221
	 */
	public void openUI(Hero hero, Object[] datas){
		LingLongGeManager.getIns().openUI(hero);
	} 
	/**
	 * 购买 2223
	 * @param buyTimes| 购买次数，1次或10次| byte
	 * @param buyType| 购买类型，0：玲珑币购买，1：元宝购买| byte
	 */
	public void buy(Hero hero, Object[] datas){
		int buyTimes = (byte)datas[0];
		int buyType = (byte)datas[1];
		LingLongGeManager.getIns().buy(hero, buyTimes, buyType);
	} 
	/**
	 * 排行榜界面 2225
	 * @param type| 0人物积分界面 1区服积分排行| byte
	 */
	public void rankUI(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		LingLongGeManager.getIns().rankUI(hero, type);
	} 
	/**
	 * 领取每日积分宝箱奖励 2227
	 * @param awardId| 玲珑阁积分表id| int
	 */
	public void getScoreBXAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		LingLongGeManager.getIns().getScoreBXAward(hero, awardId);
	} 
	/**
	 * 打开上期排名界面 2233
	 */
	public void openLastRankUI(Hero hero, Object[] datas){
		LingLongGeManager.getIns().openLastRankUI(hero);
	} 
	/**
	 * 打开上期区服积分排名界面 2235
	 */
	public void openLastZoneidRankUI(Hero hero, Object[] datas){
		LingLongGeManager.getIns().openLastZoneidRankUI(hero);
	} 
}