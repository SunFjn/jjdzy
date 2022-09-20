package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationOneRechargeBack;
import com.teamtop.system.hero.Hero;

/**
 * CelebrationOneRechargeBackCG.java
 * 三国庆典-单笔返利
 */
public class CelebrationOneRechargeBackCG{

	private static CelebrationOneRechargeBackCG ins = null;

	public static CelebrationOneRechargeBackCG getIns(){
		if(ins == null){
			ins = new CelebrationOneRechargeBackCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4911
	 * @param id| 奖励项id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		CelebrationOneRechargeBackManager.getIns().getReward(hero, id);
	} 
}