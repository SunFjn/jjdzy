package com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct;
import com.teamtop.system.hero.Hero;

/**
 * GodOfWealthSendGiftActCG.java
 * 财神送礼(活动)
 */
public class GodOfWealthSendGiftActCG{

	private static GodOfWealthSendGiftActCG ins = null;

	public static GodOfWealthSendGiftActCG getIns(){
		if(ins == null){
			ins = new GodOfWealthSendGiftActCG();
		}
		return ins;
	}

	/**
	 * 抽奖 10771
	 */
	public void turn(Hero hero, Object[] datas){
		GodOfWealthSendGiftActManager.getIns().turn(hero);
	} 
}