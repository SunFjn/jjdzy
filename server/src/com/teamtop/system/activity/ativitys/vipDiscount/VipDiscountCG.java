package com.teamtop.system.activity.ativitys.vipDiscount;
import com.teamtop.system.hero.Hero;

/**
 * VipDiscountCG.java
 * vip折扣
 */
public class VipDiscountCG{

	private static VipDiscountCG ins = null;

	public static VipDiscountCG getIns(){
		if(ins == null){
			ins = new VipDiscountCG();
		}
		return ins;
	}

	/**
	 * 打开vip折扣界面 8451
	 */
	public void openUI(Hero hero, Object[] datas){
		VipDiscountManager.getIns().openUI(hero);
	} 
	/**
	 * 抽取折扣 8453
	 * @param vipLevel| vip等级| byte
	 */
	public void extractDiscount(Hero hero, Object[] datas){
		int vipLevel = (byte)datas[0];
		VipDiscountManager.getIns().extractDiscount(hero, vipLevel);
	} 
	/**
	 * 购买 8455
	 * @param vipLevel| vip等级| byte
	 */
	public void buy(Hero hero, Object[] datas){
		int vipLevel = (byte)datas[0];
		VipDiscountManager.getIns().buy(hero, vipLevel);
	} 
}