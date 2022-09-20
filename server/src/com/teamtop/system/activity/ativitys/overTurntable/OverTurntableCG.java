package com.teamtop.system.activity.ativitys.overTurntable;
import com.teamtop.system.hero.Hero;

/**
 * OverTurntableCG.java
 * 超值转盘
 */
public class OverTurntableCG{

	private static OverTurntableCG ins = null;

	public static OverTurntableCG getIns(){
		if(ins == null){
			ins = new OverTurntableCG();
		}
		return ins;
	}

	/**
	 * 抽奖 2501
	 * @param type| 抽奖类型，1:1次，2:10次| byte
	 */
	public void randAward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		OverTurntableManager.getIns().randAward(hero, type);
	} 
	/**
	 * 领取宝箱奖励 2503
	 * @param bxAwardId| 宝箱id，从1开始| int
	 */
	public void getBXAward(Hero hero, Object[] datas){
		int bxAwardId = (int)datas[0];
		OverTurntableManager.getIns().getBXAward(hero, bxAwardId);
	} 
}