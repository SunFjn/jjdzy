package com.teamtop.system.openDaysSystem.runeAppraise;
import com.teamtop.system.hero.Hero;

/**
 * RuneAppraiseCG.java
 * 符文鉴定
 */
public class RuneAppraiseCG{

	private static RuneAppraiseCG ins = null;

	public static RuneAppraiseCG getIns(){
		if(ins == null){
			ins = new RuneAppraiseCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4611
	 * @param id| 奖励id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		RuneAppraiseManager.getIns().getReward(hero, id);
	} 
}