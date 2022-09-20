package com.teamtop.system.activity.ativitys.baoZangPinTu;
import com.teamtop.system.hero.Hero;

/**
 * BaoZangPinTuCG.java
 * 宝藏拼图
 */
public class BaoZangPinTuCG{

	private static BaoZangPinTuCG ins = null;

	public static BaoZangPinTuCG getIns(){
		if(ins == null){
			ins = new BaoZangPinTuCG();
		}
		return ins;
	}

	/**
	 * 激活拼图 10651
	 * @param cfgId| 任务配置id| int
	 */
	public void activate(Hero hero, Object[] datas){
		int cfgId = (int)datas[0];
		BaoZangPinTuManager.getIns().activate(hero, cfgId);
	} 
	/**
	 * 领取宝箱奖励 10653
	 * @param cfgId| 宝箱配置id| int
	 */
	public void gotAward(Hero hero, Object[] datas){
		int cfgId = (int)datas[0];
		BaoZangPinTuManager.getIns().gotAward(hero, cfgId);
	} 
}