package com.teamtop.system.openDaysSystem.runeCellect;
import com.teamtop.system.hero.Hero;

/**
 * RuneCellectCG.java
 * 符文收集
 */
public class RuneCellectCG{

	private static RuneCellectCG ins = null;

	public static RuneCellectCG getIns(){
		if(ins == null){
			ins = new RuneCellectCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4591
	 * @param id| 奖励id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		RuneCellectManager.getIns().getReward(hero, id);
	} 
}