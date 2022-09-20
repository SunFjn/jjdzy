package com.teamtop.system.activity.ativitys.consumeTurnCardAct;
import com.teamtop.system.hero.Hero;

/**
 * ConsumeTurnCardActCG.java
 * 消费翻牌(活动)
 */
public class ConsumeTurnCardActCG{

	private static ConsumeTurnCardActCG ins = null;

	public static ConsumeTurnCardActCG getIns(){
		if(ins == null){
			ins = new ConsumeTurnCardActCG();
		}
		return ins;
	}

	/**
	 * 翻牌 8601
	 * @param index| 位置，从0开始| int
	 */
	public void turn(Hero hero, Object[] datas){
		int index = (int)datas[0];
		ConsumeTurnCardActManager.getIns().turn(hero, index);
	} 
}