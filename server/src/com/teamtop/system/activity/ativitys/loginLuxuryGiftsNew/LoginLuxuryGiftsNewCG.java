package com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew;
import com.teamtop.system.hero.Hero;

/**
 * LoginLuxuryGiftsNewCG.java
 * 新登录豪礼活动
 */
public class LoginLuxuryGiftsNewCG{

	private static LoginLuxuryGiftsNewCG ins = null;

	public static LoginLuxuryGiftsNewCG getIns(){
		if(ins == null){
			ins = new LoginLuxuryGiftsNewCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 2871
	 * @param type| 类型| byte
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		LoginLuxuryGiftsNewManager.getIns().getReward(hero, type);
	} 
}