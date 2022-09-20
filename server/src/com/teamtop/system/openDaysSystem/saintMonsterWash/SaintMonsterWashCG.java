package com.teamtop.system.openDaysSystem.saintMonsterWash;
import com.teamtop.system.hero.Hero;

/**
 * SaintMonsterWashCG.java
 * 圣兽降临-圣兽洗练
 */
public class SaintMonsterWashCG{

	private static SaintMonsterWashCG ins = null;

	public static SaintMonsterWashCG getIns(){
		if(ins == null){
			ins = new SaintMonsterWashCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4951
	 * @param id| 奖励id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		SaintMonsterWashManager.getIns().getReward(hero, id);
	} 
}