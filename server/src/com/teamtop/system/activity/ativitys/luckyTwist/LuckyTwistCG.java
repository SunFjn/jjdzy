package com.teamtop.system.activity.ativitys.luckyTwist;
import com.teamtop.system.hero.Hero;

/**
 * LuckyTwistCG.java
 * 新活动-幸运扭蛋
 */
public class LuckyTwistCG{

	private static LuckyTwistCG ins = null;

	public static LuckyTwistCG getIns(){
		if(ins == null){
			ins = new LuckyTwistCG();
		}
		return ins;
	}

	/**
	 * 抽奖 11001
	 */
	public void draw(Hero hero, Object[] datas){
		LuckyTwistManager.getIns().draw(hero);
	} 
	/**
	 * 奖池注入道具 11003
	 */
	public void chooseItem(Hero hero, Object[] datas){
		LuckyTwistManager.getIns().chooseItem(hero);
	} 
}