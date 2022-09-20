package com.teamtop.system.antiAddictionSystem;
import com.teamtop.system.hero.Hero;

/**
 * AntiAddictionSystemCG.java
 * 防沉迷系统
 */
public class AntiAddictionSystemCG{

	private static AntiAddictionSystemCG ins = null;

	public static AntiAddictionSystemCG getIns(){
		if(ins == null){
			ins = new AntiAddictionSystemCG();
		}
		return ins;
	}

}