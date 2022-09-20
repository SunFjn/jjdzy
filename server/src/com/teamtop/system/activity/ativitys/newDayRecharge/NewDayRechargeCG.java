package com.teamtop.system.activity.ativitys.newDayRecharge;
import com.teamtop.system.hero.Hero;

/**
 * NewDayRechargeCG.java
 * 新单日累充活动
 */
public class NewDayRechargeCG{

	private static NewDayRechargeCG ins = null;

	public static NewDayRechargeCG getIns(){
		if(ins == null){
			ins = new NewDayRechargeCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2931
	 */
	public void openUI(Hero hero, Object[] datas){
		NewDayRechargeManager.getIns().openUI(hero);
	} 
	/**
	 * CG 获取奖励 2933
	 * @param index| 奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		NewDayRechargeManager.getIns().getreward(hero, index);
	} 
}