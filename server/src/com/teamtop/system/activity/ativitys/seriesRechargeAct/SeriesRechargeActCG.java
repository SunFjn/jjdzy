package com.teamtop.system.activity.ativitys.seriesRechargeAct;
import com.teamtop.system.hero.Hero;

/**
 * SeriesRechargeActCG.java
 * 新活动-连续充值
 */
public class SeriesRechargeActCG{

	private static SeriesRechargeActCG ins = null;

	public static SeriesRechargeActCG getIns(){
		if(ins == null){
			ins = new SeriesRechargeActCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 10201
	 * @param id| 配置表id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		SeriesRechargeActManager.getIns().getAward(hero, id);
	} 
}