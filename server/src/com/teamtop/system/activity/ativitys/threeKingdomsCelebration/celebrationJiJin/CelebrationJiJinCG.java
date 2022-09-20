package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationJiJin;
import com.teamtop.system.hero.Hero;

/**
 * CelebrationJiJinCG.java
 * 三国庆典-基金
 */
public class CelebrationJiJinCG{

	private static CelebrationJiJinCG ins = null;

	public static CelebrationJiJinCG getIns(){
		if(ins == null){
			ins = new CelebrationJiJinCG();
		}
		return ins;
	}

	/**
	 * 打开UI 4081
	 */
	public void openUI(Hero hero, Object[] datas){
		CelebrationJiJinManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 4083
	 * @param awardsID| 奖励ID| short
	 */
	public void getAwards(Hero hero, Object[] datas){
		int awardsID = (short)datas[0];
		CelebrationJiJinManager.getIns().getAwards(hero, awardsID);
	} 
}