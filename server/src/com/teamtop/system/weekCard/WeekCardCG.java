package com.teamtop.system.weekCard;
import com.teamtop.system.hero.Hero;

/**
 * WeekCardCG.java
 * 尊享周卡
 */
public class WeekCardCG{

	private static WeekCardCG ins = null;

	public static WeekCardCG getIns(){
		if(ins == null){
			ins = new WeekCardCG();
		}
		return ins;
	}

	/**
	 * 打开周卡界面 4551
	 */
	public void openUI(Hero hero, Object[] datas){
		WeekCardManager.getIns().openUI(hero);
	} 
	/**
	 * 领取每日奖励 4553
	 */
	public void getAward(Hero hero, Object[] datas){
		WeekCardManager.getIns().getAward(hero);
	} 
}