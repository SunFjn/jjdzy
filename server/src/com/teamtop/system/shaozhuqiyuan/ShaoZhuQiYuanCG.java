package com.teamtop.system.shaozhuqiyuan;
import com.teamtop.system.hero.Hero;

/**
 * ShaoZhuQiYuanCG.java
 * 少主-祈愿
 */
public class ShaoZhuQiYuanCG{

	private static ShaoZhuQiYuanCG ins = null;

	public static ShaoZhuQiYuanCG getIns(){
		if(ins == null){
			ins = new ShaoZhuQiYuanCG();
		}
		return ins;
	}

	/**
	 * 打开界面 5391
	 */
	public void openUI(Hero hero, Object[] datas){
		ShaoZhuQiYuanManager.getIns().openUI(hero);
	} 
	/**
	 * 祈祷 5393
	 * @param prayTimes| 祈祷次数,1次或10次| byte
	 */
	public void pray(Hero hero, Object[] datas){
		int prayTimes = (byte)datas[0];
		ShaoZhuQiYuanManager.getIns().pray(hero, prayTimes);
	} 
	/**
	 * 领取积分宝箱 5395
	 * @param awardId| 少主祈愿积分表id| int
	 */
	public void getScoreBXAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		ShaoZhuQiYuanManager.getIns().getScoreBXAward(hero, awardId);
	} 
}