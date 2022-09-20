package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget;
import com.teamtop.system.hero.Hero;

/**
 * ShaoZhuSevenDayTargetCG.java
 * 少主活动-七日目标
 */
public class ShaoZhuSevenDayTargetCG{

	private static ShaoZhuSevenDayTargetCG ins = null;

	public static ShaoZhuSevenDayTargetCG getIns(){
		if(ins == null){
			ins = new ShaoZhuSevenDayTargetCG();
		}
		return ins;
	}

	/**
	 * 打开界面 5411
	 * @param type| 任务类型，1:少主星级，2:亲密度，3:技能洗练，4:技能星级，5:少主战力| int
	 */
	public void openUI(Hero hero, Object[] datas){
		int type = (int)datas[0];
		ShaoZhuSevenDayTargetManager.getIns().openUI(hero, type);
	} 
	/**
	 * 领取奖励 5413
	 * @param awardId| 要领取的奖励id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		ShaoZhuSevenDayTargetManager.getIns().getAward(hero, awardId);
	} 
}