package com.teamtop.system.daytask;
import com.teamtop.system.hero.Hero;

/**
 * DayTaskCG.java
 * 每日任务
 */
public class DayTaskCG{

	private static DayTaskCG ins = null;

	public static DayTaskCG getIns(){
		if(ins == null){
			ins = new DayTaskCG();
		}
		return ins;
	}

	/**
	 * CG 打开每日任务ui 1051
	 */
	public void getDatTaskUI(Hero hero, Object[] datas){
		DayTaskManager.getIns().getDatTaskUI(hero);
	} 
	/**
	 * CG 获取每日任务奖励 1053
	 * @param taskid| 任务id| int
	 */
	public void getTaskReward(Hero hero, Object[] datas){
		int taskid = (int)datas[0];
		DayTaskManager.getIns().getTaskReward(hero, taskid);
	} 
	/**
	 * CG 领取活跃宝箱奖励 1055
	 * @param boxid| 宝箱id| byte
	 */
	public void getActReward(Hero hero, Object[] datas){
		int boxid = (byte)datas[0];
		DayTaskManager.getIns().getActReward(hero, boxid);
	} 
}