package com.teamtop.system.activity.ativitys.goldenMouse;
import com.teamtop.system.hero.Hero;

/**
 * GoldenMouseCG.java
 * 金鼠送财
 */
public class GoldenMouseCG{

	private static GoldenMouseCG ins = null;

	public static GoldenMouseCG getIns(){
		if(ins == null){
			ins = new GoldenMouseCG();
		}
		return ins;
	}

	/**
	 * CG购买投资 11581
	 */
	public void buy(Hero hero, Object[] datas){
		GoldenMouseManager.getIns().buy(hero);
	} 
}