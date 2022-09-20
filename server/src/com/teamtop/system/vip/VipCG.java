package com.teamtop.system.vip;
import com.teamtop.system.hero.Hero;

/**
 * VipCG.java
 * VIP
 */
public class VipCG{

	private static VipCG ins = null;

	public static VipCG getIns(){
		if(ins == null){
			ins = new VipCG();
		}
		return ins;
	}

	/**
	 * 打开Vip界面 2061
	 */
	public void openVip(Hero hero, Object[] datas){
		VipManager.getIns().openVip(hero);
	} 
	/**
	 * 领取vip奖励 2063
	 * @param vipLevel| vip等级| byte
	 */
	public void getVipAward(Hero hero, Object[] datas){
		int vipLevel = (byte)datas[0];
		VipManager.getIns().getVipAward(hero, vipLevel);
	} 
	/**
	 * 购买vip礼包 2065
	 * @param index| 购买id| int
	 */
	public void buyVipGift(Hero hero, Object[] datas){
		int index = (int)datas[0];
		VipManager.getIns().buyVipGift(hero, index);
	} 
}