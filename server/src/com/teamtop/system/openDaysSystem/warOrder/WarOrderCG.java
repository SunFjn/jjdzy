package com.teamtop.system.openDaysSystem.warOrder;
import com.teamtop.system.hero.Hero;

/**
 * WarOrderCG.java
 * 犒劳三国
 */
public class WarOrderCG{

	private static WarOrderCG ins = null;

	public static WarOrderCG getIns(){
		if(ins == null){
			ins = new WarOrderCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 12251
	 * @param type| 战令类型 0普通 1进阶| int
	 * @param level| 战令等级| int
	 * @param getState| 领取方式 0普通领取 1一键领取| int
	 * @param sid| 活动id| int
	 */
	public void getWarOrderReward(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int level = (int)datas[1];
		int getState = (int)datas[2];
		int sid = (int)datas[3];
		WarOrderManager.getIns().getWarOrderReward(hero, type, level, getState, sid);
		com.teamtop.system.openDaysSystem.warOrder.WarOrderManager.getIns().getWarOrderReward(hero, type, level,
				getState, sid);
	} 
	/**
	 * 打开周任务UI 12253
	 * @param sid| 活动id| int
	 */
	public void openTaskUI(Hero hero, Object[] datas){
		int sid = (int)datas[0];
		WarOrderManager.getIns().openTaskUI(hero, sid);
		com.teamtop.system.openDaysSystem.warOrder.WarOrderManager.getIns().openTaskUI(hero, sid);
	} 
	/**
	 * 领取周任务奖励 12255
	 * @param type| 任务类型| int
	 * @param taskId| 任务id| int
	 * @param getState| 领取类型 1一键领取 0单独领取| int
	 * @param sid| 活动id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int taskId = (int)datas[1];
		int getState = (int)datas[2];
		int sid = (int)datas[3];
		WarOrderManager.getIns().getReward(hero, type, taskId, getState, sid);
		com.teamtop.system.openDaysSystem.warOrder.WarOrderManager.getIns().getReward(hero, type, taskId, getState,
				sid);
	} 
	/**
	 * 打开每日任务UI 12257
	 * @param sid| 活动id| int
	 */
	public void openDayTaskUI(Hero hero, Object[] datas){
		int sid = (int)datas[0];
		WarOrderManager.getIns().openDayTaskUI(hero, sid);
		com.teamtop.system.openDaysSystem.warOrder.WarOrderManager.getIns().openDayTaskUI(hero, sid);
	} 
	/**
	 * 领取每日任务奖励 12259
	 * @param type| 任务类型| int
	 * @param taskId| 任务id| int
	 * @param getState| 领取方式 1一键领取 0单独领取| int
	 * @param sid| 活动id| int
	 */
	public void getDayReward(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int taskId = (int)datas[1];
		int getState = (int)datas[2];
		int sid = (int)datas[3];
		WarOrderManager.getIns().getDayReward(hero, type, taskId, getState, sid);
		com.teamtop.system.openDaysSystem.warOrder.WarOrderManager.getIns().getDayReward(hero, type, taskId, getState,
				sid);
	} 
	/**
	 * 购买等级 12261
	 * @param sid| 活动id| int
	 */
	public void buyLevel(Hero hero, Object[] datas){
		int sid = (int)datas[0];
		WarOrderManager.getIns().buyLevel(hero, sid);
		com.teamtop.system.openDaysSystem.warOrder.WarOrderManager.getIns().buyLevel(hero, sid);
	} 
}