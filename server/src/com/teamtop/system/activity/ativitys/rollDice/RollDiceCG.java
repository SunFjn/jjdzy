package com.teamtop.system.activity.ativitys.rollDice;
import com.teamtop.system.hero.Hero;

/**
 * RollDiceCG.java
 * 消费摇骰
 */
public class RollDiceCG{

	private static RollDiceCG ins = null;

	public static RollDiceCG getIns(){
		if(ins == null){
			ins = new RollDiceCG();
		}
		return ins;
	}

	/**
	 * 摇骰 10021
	 */
	public void rolldice(Hero hero, Object[] datas){
		RollDiceManager.getIns().rolldice(hero);
	} 
}