package com.teamtop.system.sevenFightToLast;
import com.teamtop.system.hero.Hero;

/**
 * SevenFightToLastCG.java
 * 开服7日血战到底
 */
public class SevenFightToLastCG{

	private static SevenFightToLastCG ins = null;

	public static SevenFightToLastCG getIns(){
		if(ins == null){
			ins = new SevenFightToLastCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2801
	 */
	public void openUi(Hero hero, Object[] datas){
		SevenFightToLastManager.getIns().openUi(hero);
	} 
	/**
	 * CG 挑战 2803
	 */
	public void battle(Hero hero, Object[] datas){
		SevenFightToLastManager.getIns().battle(hero);
	} 
	/**
	 * CG 获取本关卡奖励 2805
	 */
	public void getreward(Hero hero, Object[] datas){
		SevenFightToLastManager.getIns().getreward(hero);
	} 
}