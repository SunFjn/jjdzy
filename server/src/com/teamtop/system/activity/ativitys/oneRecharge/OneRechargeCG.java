package com.teamtop.system.activity.ativitys.oneRecharge;
import com.teamtop.system.hero.Hero;

/**
 * OneRechargeCG.java
 * 单笔充值
 */
public class OneRechargeCG{

	private static OneRechargeCG ins = null;

	public static OneRechargeCG getIns(){
		if(ins == null){
			ins = new OneRechargeCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 2361
	 * @param awardId| 奖励id| byte
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (byte)datas[0];
		//OneRechargeManager.getIns().getAward(hero, awardId);
	} 
}