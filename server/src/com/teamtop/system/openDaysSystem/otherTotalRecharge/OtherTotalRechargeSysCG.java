package com.teamtop.system.openDaysSystem.otherTotalRecharge;
import com.teamtop.system.hero.Hero;

/**
 * OtherTotalRechargeSysCG.java
 * 累计充值（8~28）
 */
public class OtherTotalRechargeSysCG{

	private static OtherTotalRechargeSysCG ins = null;

	public static OtherTotalRechargeSysCG getIns(){
		if(ins == null){
			ins = new OtherTotalRechargeSysCG();
		}
		return ins;
	}

	/**
	 * 获取奖励 4671
	 * @param index| 奖励序号| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		OtherTotalRechargeSysManager.getIns().getReward(hero, index);
	} 
}