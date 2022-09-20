package com.teamtop.system.boss.specialAnimalBoss;
import com.teamtop.system.hero.Hero;

/**
 * SpecialAnimalBossCG.java
 * 异兽BOSS
 */
public class SpecialAnimalBossCG{

	private static SpecialAnimalBossCG ins = null;

	public static SpecialAnimalBossCG getIns(){
		if(ins == null){
			ins = new SpecialAnimalBossCG();
		}
		return ins;
	}

	/**
	 * 返回界面信息 9431
	 */
	public void openUI(Hero hero, Object[] datas){
		SpecialAnimalBossManager.getIns().openUI(hero);
	} 
	/**
	 * 挑战异兽Boss 9433
	 */
	public void challengeBoss(Hero hero, Object[] datas){
		SpecialAnimalBossManager.getIns().challengeBoss(hero);
	} 
	/**
	 * 发送战斗结果请求结算 9435
	 * @param result| 0:失败，1:成功| byte
	 */
	public void fightEnd(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		SpecialAnimalBossManager.getIns().fightEnd(hero, result);
	} 
	/**
	 * 复活 9437
	 */
	public void relive(Hero hero, Object[] datas){
		SpecialAnimalBossManager.getIns().relive(hero);
	} 
	/**
	 * 领取奖励 9439
	 */
	public void getReward(Hero hero, Object[] datas){
		SpecialAnimalBossManager.getIns().getReward(hero);
	} 
	/**
	 * 打开排行 9441
	 */
	public void openRank(Hero hero, Object[] datas){
		SpecialAnimalBossManager.getIns().openRank(hero);
	} 
	/**
	 * 购买挑战次数 9445
	 * @param num| 购买次数| int
	 */
	public void buyChaNum(Hero hero, Object[] datas){
		int num = (int)datas[0];
		SpecialAnimalBossManager.getIns().buyChaNum(hero, num);
	} 
}