package com.teamtop.system.lvBuRising;
import com.teamtop.system.hero.Hero;

/**
 * LvBuRisingCG.java
 * 吕布降临
 */
public class LvBuRisingCG{

	private static LvBuRisingCG ins = null;

	public static LvBuRisingCG getIns(){
		if(ins == null){
			ins = new LvBuRisingCG();
		}
		return ins;
	}

	/**
	 * 打开吕布降临界面 2711
	 */
	public void openUI(Hero hero, Object[] datas){
		LvBuRisingManager.getIns().openUI(hero);
	} 
	/**
	 * 获取排行数据 2713
	 */
	public void getRankingList(Hero hero, Object[] datas){
		LvBuRisingManager.getIns().getRankingList(hero);
	} 
	/**
	 * 领取目标奖励 2715
	 * @param index| 奖励索引id| byte
	 */
	public void getTargetReward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		LvBuRisingManager.getIns().getTargetReward(hero, index);
	} 
}