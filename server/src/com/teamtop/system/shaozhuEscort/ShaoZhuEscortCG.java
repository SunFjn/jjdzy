package com.teamtop.system.shaozhuEscort;
import com.teamtop.system.hero.Hero;

/**
 * ShaoZhuEscortCG.java
 * 少主护送
 */
public class ShaoZhuEscortCG{

	private static ShaoZhuEscortCG ins = null;

	public static ShaoZhuEscortCG getIns(){
		if(ins == null){
			ins = new ShaoZhuEscortCG();
		}
		return ins;
	}

	/**
	 * 打开界面 8001
	 */
	public void openUI(Hero hero, Object[] datas){
		ShaoZhuEscortManager.getIns().openUI(hero);
	} 
	/**
	 * 开始护送 8003
	 */
	public void escort(Hero hero, Object[] datas){
		ShaoZhuEscortManager.getIns().escort(hero);
	} 
	/**
	 * 刷新 8005
	 * @param type| 刷新类型：1：普通刷新，2：一键刷新| byte
	 */
	public void reflesh(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ShaoZhuEscortManager.getIns().reflesh(hero, type);
	} 
	/**
	 * 领取奖励 8009
	 */
	public void getAward(Hero hero, Object[] datas){
		ShaoZhuEscortManager.getIns().getAward(hero);
	} 
	/**
	 * 拦截 8011
	 * @param interceptedHid| 被拦截的玩家id| long
	 */
	public void intercept(Hero hero, Object[] datas){
		long interceptedHid = (long)datas[0];
		ShaoZhuEscortManager.getIns().intercept(hero, interceptedHid);
	} 
	/**
	 * 查看录像 8013
	 * @param index| 索引,从0开始| byte
	 */
	public void lookReport(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		ShaoZhuEscortManager.getIns().lookReport(hero, index);
	} 
	/**
	 * 打开战报界面 8015
	 */
	public void openBattleRecordUI(Hero hero, Object[] datas){
		ShaoZhuEscortManager.getIns().openBattleRecordUI(hero);
	} 
}