package com.teamtop.system.sevenDayRecharge;
import com.teamtop.system.hero.Hero;

/**
 * SevenDayRechargeCG.java
 * 新7日单日累充
 */
public class SevenDayRechargeCG{

	private static SevenDayRechargeCG ins = null;

	public static SevenDayRechargeCG getIns(){
		if(ins == null){
			ins = new SevenDayRechargeCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2911
	 */
	public void openUi(Hero hero, Object[] datas){
		SevenDayRechargeManager.getIns().openUi(hero);
	} 
	/**
	 * CG 获取奖励 2913
	 * @param index| 奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		SevenDayRechargeManager.getIns().getreward(hero, index);
	} 
}