package com.teamtop.system.openDaysSystem.shaozhugoldpig;
import com.teamtop.system.hero.Hero;

/**
 * ShaoZhuGoldPigCG.java
 * 少主活动-金猪送财
 */
public class ShaoZhuGoldPigCG{

	private static ShaoZhuGoldPigCG ins = null;

	public static ShaoZhuGoldPigCG getIns(){
		if(ins == null){
			ins = new ShaoZhuGoldPigCG();
		}
		return ins;
	}

	/**
	 * 领取头像奖励 5493
	 */
	public void getHeadAward(Hero hero, Object[] datas){
		ShaoZhuGoldPigManager.getIns().getHeadAward(hero);
	} 
	/**
	 * 领取元宝增幅 5495
	 * @param taskId| 金猪送财任务配置id| int
	 * @param pigType| 金猪送财类型-1金猪,2银猪| byte
	 */
	public void getYuanBaoAdd(Hero hero, Object[] datas){
		int taskId = (int)datas[0];
		int pigType = (byte)datas[1];
		ShaoZhuGoldPigManager.getIns().getYuanBaoAdd(hero, taskId, pigType);
	} 
}