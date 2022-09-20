package com.teamtop.system.openDaysSystem.saintMonsterWashRank;

/**
 * SaintMonsterWashRankCG.java
 * 圣兽降临-兽魂洗练
 */
public class SaintMonsterWashRankCG{

	private static SaintMonsterWashRankCG ins = null;

	public static SaintMonsterWashRankCG getIns(){
		if(ins == null){
			ins = new SaintMonsterWashRankCG();
		}
		return ins;
	}

}