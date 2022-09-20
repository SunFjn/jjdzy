package com.teamtop.system.openDaysSystem.otherOverCallbackYBSe;
import com.teamtop.system.hero.Hero;

/**
 * OtherOverCallbackYBSeCG.java
 * 超值元宝返利
 */
public class OtherOverCallbackYBSeCG{

	private static OtherOverCallbackYBSeCG ins = null;

	public static OtherOverCallbackYBSeCG getIns(){
		if(ins == null){
			ins = new OtherOverCallbackYBSeCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4791
	 * @param index| 索引id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		OtherOverCallbackYBSeManager.getIns().getAward(hero, index);
	} 
}