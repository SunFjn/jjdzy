package com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts;
import com.teamtop.system.hero.Hero;

/**
 * OtherLoginLuxuryGiftsCG.java
 * 登录豪礼(8~28)
 */
public class OtherLoginLuxuryGiftsCG{

	private static OtherLoginLuxuryGiftsCG ins = null;

	public static OtherLoginLuxuryGiftsCG getIns(){
		if(ins == null){
			ins = new OtherLoginLuxuryGiftsCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4631
	 * @param type| 类型| byte
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		OtherLoginLuxuryGiftsManager.getIns().getReward(hero, type);
	} 
}