package com.teamtop.system.LoginLuxuryGifts;
import com.teamtop.system.hero.Hero;

/**
 * LoginLuxuryGiftsCG.java
 * 新登录豪礼系统
 */
public class LoginLuxuryGiftsCG{

	private static LoginLuxuryGiftsCG ins = null;

	public static LoginLuxuryGiftsCG getIns(){
		if(ins == null){
			ins = new LoginLuxuryGiftsCG();
		}
		return ins;
	}

	/**
	 * 打开界面 2891
	 */
	public void openUI(Hero hero, Object[] datas){
		LoginLuxuryGiftsManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 2893
	 * @param type| 类型| byte
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		LoginLuxuryGiftsManager.getIns().getReward(hero, type);
	} 
}