package com.teamtop.system.activity.ativitys.newOneRecharge;
import com.teamtop.system.hero.Hero;

/**
 * NewOneReChargeCG.java
 * 活动单笔累充
 */
public class NewOneReChargeCG{

	private static NewOneReChargeCG ins = null;

	public static NewOneReChargeCG getIns(){
		if(ins == null){
			ins = new NewOneReChargeCG();
		}
		return ins;
	}

	/**
	 * GC 打开ui信息 3001
	 */
	public void openUI(Hero hero, Object[] datas){
		NewOneReChargeManager.getIns().openUI(hero);
	} 
	/**
	 * CG 获取奖励 3003
	 * @param index| 奖励编号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		NewOneReChargeManager.getIns().getreward(hero, index);
	} 
}