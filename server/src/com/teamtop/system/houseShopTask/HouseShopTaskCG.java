package com.teamtop.system.houseShopTask;
import com.teamtop.system.hero.Hero;

/**
 * HouseShopTaskCG.java
 * 府邸商店任务
 */
public class HouseShopTaskCG{

	private static HouseShopTaskCG ins = null;

	public static HouseShopTaskCG getIns(){
		if(ins == null){
			ins = new HouseShopTaskCG();
		}
		return ins;
	}

	/**
	 * CG打开商店ui 11401
	 */
	public void openShopUi(Hero hero, Object[] datas){
		HouseShopTaskManager.getIns().openShopUi(hero);
	} 
	/**
	 * CG 重置商店商品 11403
	 */
	public void restShopId(Hero hero, Object[] datas){
		HouseShopTaskManager.getIns().restShopId(hero);
	} 
	/**
	 * CG购买商店商品 11405
	 * @param index| 商品序号（0-5）| byte
	 */
	public void buyIndex(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		HouseShopTaskManager.getIns().buyIndex(hero, index);
	} 
	/**
	 * CG打开府邸日常任务界面 11407
	 */
	public void opendaytask(Hero hero, Object[] datas){
		HouseShopTaskManager.getIns().opendaytask(hero);
	} 
	/**
	 * CG 获取任务奖励 11409
	 * @param index| 任务索引| int
	 */
	public void getTaskReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		HouseShopTaskManager.getIns().getTaskReward(hero, index);
	} 
	/**
	 * CG获取宝箱奖励 11411
	 * @param index| 宝箱索引| int
	 */
	public void getBoxReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		HouseShopTaskManager.getIns().getBoxReward(hero, index);
	} 
	/**
	 * CG 打开府邸目标 11413
	 */
	public void openGoal(Hero hero, Object[] datas){
		HouseShopTaskManager.getIns().openGoal(hero);
	} 
	/**
	 * CG获取目标奖励 11415
	 * @param goalindex| 目标序号| int
	 */
	public void getGoalReward(Hero hero, Object[] datas){
		int goalindex = (int)datas[0];
		HouseShopTaskManager.getIns().getGoalReward(hero, goalindex);
	} 
}