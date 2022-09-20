package com.teamtop.system.activity.ativitys.actSevenFightToLast;
import com.teamtop.system.hero.Hero;

/**
 * ActSevenFightToLastCG.java
 * 活动血战到底
 */
public class ActSevenFightToLastCG{

	private static ActSevenFightToLastCG ins = null;

	public static ActSevenFightToLastCG getIns(){
		if(ins == null){
			ins = new ActSevenFightToLastCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2831
	 */
	public void openUI(Hero hero, Object[] datas){
		ActSevenFightToLastManager.getIns().openUI(hero);
	} 
	/**
	 * CG 发出挑战 2833
	 */
	public void battle(Hero hero, Object[] datas){
		ActSevenFightToLastManager.getIns().battle(hero);
	} 
	/**
	 * CG 获取打赢奖励 2835
	 */
	public void getWinReward(Hero hero, Object[] datas){
		ActSevenFightToLastManager.getIns().getWinReward(hero);
	} 
}