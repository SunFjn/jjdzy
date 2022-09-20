package com.teamtop.system.activity.ativitys.dailyDirectBuy;
import com.teamtop.system.hero.Hero;

/**
 * DailyDirectBuyActCG.java
 * 每日直购(活动)
 */
public class DailyDirectBuyActCG{

	private static DailyDirectBuyActCG ins = null;

	public static DailyDirectBuyActCG getIns(){
		if(ins == null){
			ins = new DailyDirectBuyActCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 3721
	 * @param id| 领取的天数id，第一天就为1| byte
	 * @param level| 领取的档次，为每日直购表id| byte
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		int level = (byte)datas[1];
		DailyDirectBuyActManager.getIns().getAward(hero, id, level);
	} 
	/**
	 * 领取目标奖励 3725
	 * @param targetId| 目标表id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int targetId = (int)datas[0];
		DailyDirectBuyActManager.getIns().getTargetAward(hero, targetId);
	} 
}