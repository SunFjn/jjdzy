package com.teamtop.system.activity.ativitys.wuJiangGoal;
import com.teamtop.system.hero.Hero;

/**
 * WuJiangGoalCG.java
 * 限定武将(活动)
 */
public class WuJiangGoalCG{

	private static WuJiangGoalCG ins = null;

	public static WuJiangGoalCG getIns(){
		if(ins == null){
			ins = new WuJiangGoalCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 8721
	 * @param type| 任务类型| byte
	 * @param taskId| 任务id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int taskId = (int)datas[1];
		WuJiangGoalManager.getIns().getReward(hero, type, taskId);
	} 
	/**
	 * 领取活跃宝箱奖励 8723
	 * @param boxid| 对应期数的宝箱id(区分期数)| byte
	 */
	public void getActReward(Hero hero, Object[] datas){
		int boxid = (byte)datas[0];
		WuJiangGoalManager.getIns().getActReward(hero, boxid);
	} 
}