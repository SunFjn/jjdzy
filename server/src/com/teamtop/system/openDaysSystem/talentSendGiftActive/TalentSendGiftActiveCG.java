package com.teamtop.system.openDaysSystem.talentSendGiftActive;
import com.teamtop.system.hero.Hero;

/**
 * TalentSendGiftActiveCG.java
 * 龙飞凤舞-天赋送礼
 */
public class TalentSendGiftActiveCG{

	private static TalentSendGiftActiveCG ins = null;

	public static TalentSendGiftActiveCG getIns(){
		if(ins == null){
			ins = new TalentSendGiftActiveCG();
		}
		return ins;
	}

	/**
	 * 领取奖励返回 9351
	 * @param taskId| 表的序号| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int taskId = (int)datas[0];
		TalentSendGiftActiveManager.getIns().getReward(hero, taskId);
	} 
}