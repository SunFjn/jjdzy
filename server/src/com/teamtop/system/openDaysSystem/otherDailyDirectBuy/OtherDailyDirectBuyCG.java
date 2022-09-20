package com.teamtop.system.openDaysSystem.otherDailyDirectBuy;
import com.teamtop.system.hero.Hero;

/**
 * OtherDailyDirectBuyCG.java
 * 每日直购（8-28天）
 */
public class OtherDailyDirectBuyCG{

	private static OtherDailyDirectBuyCG ins = null;

	public static OtherDailyDirectBuyCG getIns(){
		if(ins == null){
			ins = new OtherDailyDirectBuyCG();
		}
		return ins;
	}

	/**
	 * CG领取奖励 7001
	 * @param id| 每日直购表id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		OtherDailyDirectBuyManager.getIns().getAward(hero, id);
	} 
	/**
	 * 领取目标奖励 7005
	 * @param targetId| 目标表id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int targetId = (int)datas[0];
		OtherDailyDirectBuyManager.getIns().getTargetAward(hero, targetId);
	} 
}