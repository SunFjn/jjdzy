package com.teamtop.system.activity.ativitys.consumeSmashEgg;
import com.teamtop.system.hero.Hero;

/**
 * ConsumeSmashEggCG.java
 * 消费砸蛋
 */
public class ConsumeSmashEggCG{

	private static ConsumeSmashEggCG ins = null;

	public static ConsumeSmashEggCG getIns(){
		if(ins == null){
			ins = new ConsumeSmashEggCG();
		}
		return ins;
	}

	/**
	 * 砸蛋 9503
	 * @param index| 砸蛋索引(0、1、2)| byte
	 */
	public void smashEgg(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		ConsumeSmashEggManager.getIns().smashEgg(hero, index);
	} 
}