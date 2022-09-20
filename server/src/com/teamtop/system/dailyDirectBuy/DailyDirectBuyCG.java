package com.teamtop.system.dailyDirectBuy;
import com.teamtop.system.hero.Hero;

/**
 * DailyDirectBuyCG.java
 * 每日直购(系统)
 */
public class DailyDirectBuyCG{

	private static DailyDirectBuyCG ins = null;

	public static DailyDirectBuyCG getIns(){
		if(ins == null){
			ins = new DailyDirectBuyCG();
		}
		return ins;
	}

	/**
	 * 打开界面 3701
	 */
	public void openUI(Hero hero, Object[] datas){
		DailyDirectBuyManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 3703
	 * @param id| 领取的天数id，第一天就为1| byte
	 * @param level| 领取的档次，为每日直购表id| byte
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		int level = (byte)datas[1];
		DailyDirectBuyManager.getIns().getAward(hero, id, level);
	} 
	/**
	 * 领取目标奖励 3707
	 * @param targetId| 目标表id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int targetId = (int)datas[0];
		DailyDirectBuyManager.getIns().getTargetAward(hero, targetId);
	} 
}