package com.teamtop.system.activity.ativitys.luckTurnCardAct;
import com.teamtop.system.hero.Hero;

/**
 * LuckTurnCardActCG.java
 * 新活动-幸运翻牌
 */
public class LuckTurnCardActCG{

	private static LuckTurnCardActCG ins = null;

	public static LuckTurnCardActCG getIns(){
		if(ins == null){
			ins = new LuckTurnCardActCG();
		}
		return ins;
	}

	/**
	 * 翻牌 10341
	 * @param type| 10:随机翻牌(位置10，11，12)，20:必胜翻牌，30:十连胜| byte
	 */
	public void turn(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		LuckTurnCardActManager.getIns().turn(hero, type);
	} 
	/**
	 * 打开目标奖励界面 10343
	 */
	public void openTargetAwardUI(Hero hero, Object[] datas){
		LuckTurnCardActManager.getIns().openTargetAwardUI(hero);
	} 
	/**
	 * 领取目标奖励 10345
	 * @param awardId| 要领取的奖励id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		LuckTurnCardActManager.getIns().getTargetAward(hero, awardId);
	} 
}