package com.teamtop.system.activity.ativitys.consumeTurnTableAct;
import com.teamtop.system.hero.Hero;

/**
 * ConsumeTurnTableActCG.java
 * 消费转盘(活动)
 */
public class ConsumeTurnTableActCG{

	private static ConsumeTurnTableActCG ins = null;

	public static ConsumeTurnTableActCG getIns(){
		if(ins == null){
			ins = new ConsumeTurnTableActCG();
		}
		return ins;
	}

	/**
	 * 抽奖 8571
	 */
	public void turn(Hero hero, Object[] datas){
		ConsumeTurnTableActManager.getIns().turn(hero);
	} 
}