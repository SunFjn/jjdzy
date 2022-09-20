package com.teamtop.system.sevenHappy;
import com.teamtop.system.hero.Hero;

/**
 * SevenHappyCG.java
 * 开服狂欢
 */
public class SevenHappyCG{

	private static SevenHappyCG ins = null;

	public static SevenHappyCG getIns(){
		if(ins == null){
			ins = new SevenHappyCG();
		}
		return ins;
	}

	/**
	 * CG 打开xx狂欢 2331
	 * @param type| 开服狂欢类型1-10| byte
	 */
	public void openUi(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		SevenHappyManager.getIns().openUi(hero, type);
	} 
	/**
	 * CG 领取奖励 2333
	 * @param index| 奖励编号| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		SevenHappyManager.getIns().getReward(hero, index);
	} 
	/**
	 * 打开界面 2335
	 * @param type| 开服狂欢类型，例如神将狂欢15| byte
	 */
	public void newOpenUI(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		SevenHappyManager.getIns().newOpenUI(hero, type);
	} 
	/**
	 * 领取奖励 2337
	 * @param awardId| 要领取的奖励id| int
	 * @param awardType| 奖励类型，0:普通奖励，1:限量奖励(特殊奖励)| byte
	 */
	public void newGetAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		int awardType = (byte)datas[1];
		SevenHappyManager.getIns().newGetAward(hero, awardId, awardType);
	} 
}