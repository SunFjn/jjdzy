package com.teamtop.system.activity.ativitys.overCallbackYB;
import com.teamtop.system.hero.Hero;

/**
 * OverCallbackYBCG.java
 * 超值元宝返利
 */
public class OverCallbackYBCG{

	private static OverCallbackYBCG ins = null;

	public static OverCallbackYBCG getIns(){
		if(ins == null){
			ins = new OverCallbackYBCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 2451
	 * @param index| 索引id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		OverCallbackYBManager.getIns().getAward(hero, index);
	} 
}