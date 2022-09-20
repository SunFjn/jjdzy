package com.teamtop.system.crossTrial;
import com.teamtop.system.hero.Hero;

/**
 * CrossTrialCG.java
 * 跨服试炼
 */
public class CrossTrialCG{

	private static CrossTrialCG ins = null;

	public static CrossTrialCG getIns(){
		if(ins == null){
			ins = new CrossTrialCG();
		}
		return ins;
	}

	/**
	 * 打开界面 10471
	 */
	public void openUI(Hero hero, Object[] datas){
		CrossTrialManager.getIns().openUI(hero);
	} 
	/**
	 * 挑战 10473
	 * @param type| 挑战类型（1：普通，2：困难，3：噩梦）| byte
	 */
	public void challenge(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		CrossTrialManager.getIns().challenge(hero, type);
	} 
	/**
	 * 战斗结束 10475
	 * @param result| 战斗结果(0：失败，1：胜利)| byte
	 */
	public void fightEnd(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		CrossTrialManager.getIns().fightEnd(hero, result);
	} 
	/**
	 * buff层选择加成buff 10477
	 * @param buffTypes| 选择的buff| Object[]
	 */
	public void selectBuff(Hero hero, Object[] datas){
		Object[] buffTypes = (Object[])datas[0];
		CrossTrialManager.getIns().selectBuff(hero, buffTypes);
	} 
	/**
	 * 领取宝箱奖励 10479
	 */
	public void getChest(Hero hero, Object[] datas){
		CrossTrialManager.getIns().getChest(hero);
	} 
	/**
	 * 下一关 10481
	 */
	public void nextFloor(Hero hero, Object[] datas){
		CrossTrialManager.getIns().nextFloor(hero);
	} 
	/**
	 * 扫荡 10483
	 * @param type| 扫荡类型（1：普通，2：困难，3：噩梦）| byte
	 */
	public void mopUp(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		CrossTrialManager.getIns().mopUp(hero, type);
	} 
}