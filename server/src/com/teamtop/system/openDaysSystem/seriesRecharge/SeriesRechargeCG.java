package com.teamtop.system.openDaysSystem.seriesRecharge;
import com.teamtop.system.hero.Hero;

/**
 * SeriesRechargeCG.java
 * 万兽之王-连充豪礼
 */
public class SeriesRechargeCG{

	private static SeriesRechargeCG ins = null;

	public static SeriesRechargeCG getIns(){
		if(ins == null){
			ins = new SeriesRechargeCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 8801
	 * @param id| 配置表id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		SeriesRechargeManager.getIns().getAward(hero, id);
	} 
}