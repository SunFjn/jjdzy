package com.teamtop.system.openDaysSystem.monsterKingLoginGift;
import com.teamtop.system.hero.Hero;

/**
 * MonsterKingLoginGiftCG.java
 * 万兽之王-登录有奖
 */
public class MonsterKingLoginGiftCG{

	private static MonsterKingLoginGiftCG ins = null;

	public static MonsterKingLoginGiftCG getIns(){
		if(ins == null){
			ins = new MonsterKingLoginGiftCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 9161
	 * @param id| 奖励项id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		MonsterKingLoginGiftManager.getIns().getReward(hero, id);
	} 
}