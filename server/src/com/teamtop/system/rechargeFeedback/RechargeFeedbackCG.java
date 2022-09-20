package com.teamtop.system.rechargeFeedback;
import com.teamtop.system.hero.Hero;

/**
 * RechargeFeedbackCG.java
 * 累冲回馈
 */
public class RechargeFeedbackCG{

	private static RechargeFeedbackCG ins = null;

	public static RechargeFeedbackCG getIns(){
		if(ins == null){
			ins = new RechargeFeedbackCG();
		}
		return ins;
	}

	/**
	 * 打开界面 4391
	 */
	public void openUI(Hero hero, Object[] datas){
		RechargeFeedbackManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 4393
	 * @param awardId| 要领取的奖励id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		RechargeFeedbackManager.getIns().getAward(hero, awardId);
	} 
}