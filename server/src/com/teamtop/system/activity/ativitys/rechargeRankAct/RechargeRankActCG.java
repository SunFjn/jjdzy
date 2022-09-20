package com.teamtop.system.activity.ativitys.rechargeRankAct;
import com.teamtop.system.hero.Hero;

/**
 * RechargeRankActCG.java
 * 充值排行(活动)
 */
public class RechargeRankActCG{

	private static RechargeRankActCG ins = null;

	public static RechargeRankActCG getIns(){
		if(ins == null){
			ins = new RechargeRankActCG();
		}
		return ins;
	}

}