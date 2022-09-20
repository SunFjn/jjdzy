package com.teamtop.system.activity.ativitys.warOrderAct;
import com.teamtop.system.hero.Hero;

/**
 * WarOrderActCG.java
 * 三国战令(活动)
 */
public class WarOrderActCG{

	private static WarOrderActCG ins = null;

	public static WarOrderActCG getIns(){
		if(ins == null){
			ins = new WarOrderActCG();
		}
		return ins;
	}

	/**
	 * 领取战令奖励 10401
	 * @param type| 战令类型 0普通 1进阶| int
	 * @param level| 战令等级| int
	 * @param getState| 领取方式 0普通领取 1一键领取| int
	 */
	public void getWarOrderReward(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int level = (int)datas[1];
		int getState = (int)datas[2];
		WarOrderActManager.getIns().getWarOrderReward(hero, type, level, getState);
	} 
	/**
	 * 打开任务UI 10403
	 */
	public void openTaskUI(Hero hero, Object[] datas){
		WarOrderActManager.getIns().openTaskUI(hero);
	} 
	/**
	 * 领取任务奖励 10405
	 * @param type| 任务类型| int
	 * @param taskId| 任务id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int taskId = (int)datas[1];
		WarOrderActManager.getIns().getReward(hero, type, taskId);
	} 
	/**
	 * 打开商店页面 10407
	 */
	public void openShopUI(Hero hero, Object[] datas){
		WarOrderActManager.getIns().openShopUI(hero);
	} 
	/**
	 * 购买商品 10409
	 * @param id| 配置表id| int
	 */
	public void buy(Hero hero, Object[] datas){
		int id = (int)datas[0];
		WarOrderActManager.getIns().buy(hero, id);
	} 
}