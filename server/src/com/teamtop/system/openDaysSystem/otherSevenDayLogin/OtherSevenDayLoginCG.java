package com.teamtop.system.openDaysSystem.otherSevenDayLogin;
import com.teamtop.system.hero.Hero;

/**
 * OtherSevenDayLoginCG.java
 * 少主活动-登录红包(22~28)
 */
public class OtherSevenDayLoginCG{

	private static OtherSevenDayLoginCG ins = null;

	public static OtherSevenDayLoginCG getIns(){
		if(ins == null){
			ins = new OtherSevenDayLoginCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 5473
	 * @param day| 当前活动天数| byte
	 */
	public void getAwards(Hero hero, Object[] datas){
		int day = (byte)datas[0];
		OtherSevenDayLoginManager.getIns().getAwards(hero, day);
	} 
}