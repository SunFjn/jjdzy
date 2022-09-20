package com.teamtop.system.sevenDayLogin;
import com.teamtop.system.hero.Hero;

/**
 * SevenDayLoginCG.java
 * 七日登录
 */
public class SevenDayLoginCG{

	private static SevenDayLoginCG ins = null;

	public static SevenDayLoginCG getIns(){
		if(ins == null){
			ins = new SevenDayLoginCG();
		}
		return ins;
	}

	/**
	 * 打开界面 1901
	 */
	public void openUI(Hero hero, Object[] datas){
		SevenDayLoginManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 1903
	 * @param getDay| 领取天数| byte
	 */
	public void getAwards(Hero hero, Object[] datas){
		int getDay = (byte)datas[0];
		SevenDayLoginManager.getIns().getAwards(hero, getDay);
	} 
}