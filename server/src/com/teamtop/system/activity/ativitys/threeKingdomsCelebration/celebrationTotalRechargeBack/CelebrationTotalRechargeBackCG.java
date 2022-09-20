package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationTotalRechargeBack;
import com.teamtop.system.hero.Hero;

/**
 * CelebrationTotalRechargeBackCG.java
 * 三国庆典-累充返利
 */
public class CelebrationTotalRechargeBackCG{

	private static CelebrationTotalRechargeBackCG ins = null;

	public static CelebrationTotalRechargeBackCG getIns(){
		if(ins == null){
			ins = new CelebrationTotalRechargeBackCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4931
	 * @param id| 奖励项id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		CelebrationTotalRechargeBackManager.getIns().getReward(hero, id);
	} 
}