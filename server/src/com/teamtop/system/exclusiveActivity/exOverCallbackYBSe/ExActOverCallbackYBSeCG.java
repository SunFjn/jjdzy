package com.teamtop.system.exclusiveActivity.exOverCallbackYBSe;
import com.teamtop.system.hero.Hero;

/**
 * ExActOverCallbackYBSeCG.java
 * 专属活动-元宝返利
 */
public class ExActOverCallbackYBSeCG{

	private static ExActOverCallbackYBSeCG ins = null;

	public static ExActOverCallbackYBSeCG getIns(){
		if(ins == null){
			ins = new ExActOverCallbackYBSeCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 8331
	 * @param id| 活动唯一id| int
	 * @param index| 索引id| int
	 */
	public void getRward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int index = (int)datas[1];
		ExActOverCallbackYBSeManager.getIns().getRward(hero, id, index);
	} 
}