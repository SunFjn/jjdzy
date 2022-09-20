package com.teamtop.system.reincarnation;
import com.teamtop.system.hero.Hero;

/**
 * ReincarnationCG.java
 * 六道轮回
 */
public class ReincarnationCG{

	private static ReincarnationCG ins = null;

	public static ReincarnationCG getIns(){
		if(ins == null){
			ins = new ReincarnationCG();
		}
		return ins;
	}

	/**
	 * 进行轮回 7101
	 */
	public void reincarnation(Hero hero, Object[] datas){
		ReincarnationManager.getIns().reincarnation(hero);
	} 
}