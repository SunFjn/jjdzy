package com.teamtop.system.openDaysSystem.otherNewOneRecharge;
import com.teamtop.system.hero.Hero;

/**
 * OtherNewOneRechargeCG.java
 * 新单笔充值（8~28）
 */
public class OtherNewOneRechargeCG{

	private static OtherNewOneRechargeCG ins = null;

	public static OtherNewOneRechargeCG getIns(){
		if(ins == null){
			ins = new OtherNewOneRechargeCG();
		}
		return ins;
	}

	/**
	 * 获取奖励 4651
	 * @param index| 奖励编号| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		OtherNewOneRechargeManager.getIns().getReward(hero, index);
	} 
}