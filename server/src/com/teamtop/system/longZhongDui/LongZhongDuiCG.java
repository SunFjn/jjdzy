package com.teamtop.system.longZhongDui;
import com.teamtop.system.hero.Hero;

/**
 * LongZhongDuiCG.java
 * 隆中对
 */
public class LongZhongDuiCG{

	private static LongZhongDuiCG ins = null;

	public static LongZhongDuiCG getIns(){
		if(ins == null){
			ins = new LongZhongDuiCG();
		}
		return ins;
	}

	/**
	 * 打开答题界面 1981
	 */
	public void openAnswerUI(Hero hero, Object[] datas){
		LongZhongDuiManager.getIns().openAnswerUI(hero);
	} 
	/**
	 * 答题 1983
	 * @param answerId| 答案id，0：答题超时| byte
	 */
	public void putAnswer(Hero hero, Object[] datas){
		int answerId = (byte)datas[0];
		LongZhongDuiManager.getIns().putAnswer(hero, answerId);
	} 
	/**
	 * 答题排行 1985
	 */
	public void answerRank(Hero hero, Object[] datas){
		LongZhongDuiManager.getIns().answerRank(hero);
	} 
	/**
	 * 开始答题 1987
	 */
	public void startAnswer(Hero hero, Object[] datas){
		LongZhongDuiManager.getIns().startAnswer(hero);
	} 
}