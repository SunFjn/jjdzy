package com.teamtop.system.activity.ativitys.hefuFristRecharge;
import com.teamtop.system.hero.Hero;

/**
 * HeFuFristRechargeCG.java
 * 合服首冲
 */
public class HeFuFristRechargeCG{

	private static HeFuFristRechargeCG ins = null;

	public static HeFuFristRechargeCG getIns(){
		if(ins == null){
			ins = new HeFuFristRechargeCG();
		}
		return ins;
	}

	/**
	 * CG 获取奖励 9631
	 * @param index| 奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		HeFuFristRechargeManager.getIns().getreward(hero, index);
	} 
}