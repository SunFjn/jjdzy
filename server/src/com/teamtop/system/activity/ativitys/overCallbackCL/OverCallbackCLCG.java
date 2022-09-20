package com.teamtop.system.activity.ativitys.overCallbackCL;
import com.teamtop.system.hero.Hero;

/**
 * OverCallbackCLCG.java
 * 超值材料返利
 */
public class OverCallbackCLCG{

	private static OverCallbackCLCG ins = null;

	public static OverCallbackCLCG getIns(){
		if(ins == null){
			ins = new OverCallbackCLCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 2431
	 * @param index| 索引id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		OverCallbackCLManager.getIns().getAward(hero, index);
	} 
}