package com.teamtop.system.activity.ativitys.kingSecretCrystal;
import com.teamtop.system.hero.Hero;

/**
 * KingSecretCrystalCG.java
 * 至尊秘宝
 */
public class KingSecretCrystalCG{

	private static KingSecretCrystalCG ins = null;

	public static KingSecretCrystalCG getIns(){
		if(ins == null){
			ins = new KingSecretCrystalCG();
		}
		return ins;
	}

	/**
	 * 开启秘宝 11701
	 */
	public void draw(Hero hero, Object[] datas){
		KingSecretCrystalManager.getIns().draw(hero);
	} 
	/**
	 * 重置秘宝 11703
	 */
	public void resetReward(Hero hero, Object[] datas){
		KingSecretCrystalManager.getIns().resetReward(hero);
	} 
}