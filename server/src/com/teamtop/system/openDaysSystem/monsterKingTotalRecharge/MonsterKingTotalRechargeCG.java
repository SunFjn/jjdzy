package com.teamtop.system.openDaysSystem.monsterKingTotalRecharge;
import com.teamtop.system.hero.Hero;

/**
 * MonsterKingTotalRechargeCG.java
 * 万兽之王-累计充值
 */
public class MonsterKingTotalRechargeCG{

	private static MonsterKingTotalRechargeCG ins = null;

	public static MonsterKingTotalRechargeCG getIns(){
		if(ins == null){
			ins = new MonsterKingTotalRechargeCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 9101
	 * @param rewardId| 要领取的奖励id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int rewardId = (int)datas[0];
		MonsterKingTotalRechargeManager.getIns().getReward(hero, rewardId);
	} 
}