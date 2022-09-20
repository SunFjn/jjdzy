package com.teamtop.system.openDaysSystem.otherFightToLast;
import com.teamtop.system.hero.Hero;

/**
 * OtherFightToLastCG.java
 * 血战到底（8~28）
 */
public class OtherFightToLastCG{

	private static OtherFightToLastCG ins = null;

	public static OtherFightToLastCG getIns(){
		if(ins == null){
			ins = new OtherFightToLastCG();
		}
		return ins;
	}

	/**
	 * 挑战 4751
	 */
	public void battle(Hero hero, Object[] datas){
		OtherFightToLastManager.getIns().battle(hero);
	} 
	/**
	 * 获取本关卡奖励 4753
	 */
	public void getReward(Hero hero, Object[] datas){
		OtherFightToLastManager.getIns().getReward(hero);
	} 
}