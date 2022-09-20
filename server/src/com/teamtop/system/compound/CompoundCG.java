package com.teamtop.system.compound;
import com.teamtop.system.hero.Hero;

/**
 * CompoundCG.java
 * 合成系统
 */
public class CompoundCG{

	private static CompoundCG ins = null;

	public static CompoundCG getIns(){
		if(ins == null){
			ins = new CompoundCG();
		}
		return ins;
	}

	/**
	 * CG 合成道具  2651
	 * @param goal| 目标id| int
	 * @param num| 合成数量| int
	 */
	public void heceng(Hero hero, Object[] datas){
		int goal = (int)datas[0];
		int num = (int)datas[1];
		CompoundManager.getIns().heceng(hero, goal, num);
	} 
}