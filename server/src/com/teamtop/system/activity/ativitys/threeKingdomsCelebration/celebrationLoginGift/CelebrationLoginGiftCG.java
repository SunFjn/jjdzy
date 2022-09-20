package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift;
import com.teamtop.system.hero.Hero;

/**
 * CelebrationLoginGiftCG.java
 * 三国庆典-登录有奖
 */
public class CelebrationLoginGiftCG{

	private static CelebrationLoginGiftCG ins = null;

	public static CelebrationLoginGiftCG getIns(){
		if(ins == null){
			ins = new CelebrationLoginGiftCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4891
	 * @param id| 奖励项id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		CelebrationLoginGiftManager.getIns().getReward(hero, id);
	} 
}