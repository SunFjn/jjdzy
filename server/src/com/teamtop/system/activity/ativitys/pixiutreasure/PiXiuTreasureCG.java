package com.teamtop.system.activity.ativitys.pixiutreasure;
import com.teamtop.system.hero.Hero;

/**
 * PiXiuTreasureCG.java
 * 新活动-貔貅散宝
 */
public class PiXiuTreasureCG{

	private static PiXiuTreasureCG ins = null;

	public static PiXiuTreasureCG getIns(){
		if(ins == null){
			ins = new PiXiuTreasureCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 12101
	 * @param isBigAward| 是否大奖，0不是，1是| byte
	 * @param id| 配置表id| int
	 */
	public void get(Hero hero, Object[] datas){
		int isBigAward = (byte)datas[0];
		int id = (int)datas[1];
		PiXiuTreasureManager.getIns().get(hero, isBigAward, id);
	} 
}