package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank;
import com.teamtop.system.hero.Hero;

/**
 * ConsumeRankCG.java
 * 三国庆典-消费排行
 */
public class ConsumeRankCG{

	private static ConsumeRankCG ins = null;

	public static ConsumeRankCG getIns(){
		if(ins == null){
			ins = new ConsumeRankCG();
		}
		return ins;
	}

}