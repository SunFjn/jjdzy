package com.teamtop.system.openDaysSystem.warOrderActive;
import com.teamtop.system.hero.Hero;

/**
 * WarOrderActiveCG.java
 * 三国战令
 */
public class WarOrderActiveCG{

	private static WarOrderActiveCG ins = null;

	public static WarOrderActiveCG getIns(){
		if(ins == null){
			ins = new WarOrderActiveCG();
		}
		return ins;
	}

	/**
	 * 领取战令奖励 8851
	 * @param type| 战令类型 0普通 1进阶| int
	 * @param level| 战令等级| int
	 * @param getState| 领取方式 0普通领取 1一键领取| int
	 */
	public void getWarOrderReward(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int level = (int)datas[1];
		int getState = (int)datas[2];
		WarOrderActiveManager.getIns().getWarOrderReward(hero, type, level, getState);
	} 
	/**
	 * 打开任务UI 8853
	 */
	public void openTaskUI(Hero hero, Object[] datas){
		WarOrderActiveManager.getIns().openTaskUI(hero);
	} 
	/**
	 * 领取任务奖励 8855
	 * @param type| 任务类型| int
	 * @param taskId| 任务id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int taskId = (int)datas[1];
		WarOrderActiveManager.getIns().getReward(hero, type, taskId);
	} 
	/**
	 * 打开商店页面 8857
	 */
	public void openShopUI(Hero hero, Object[] datas){
		WarOrderActiveManager.getIns().openShopUI(hero);
	} 
	/**
	 * 购买商品 8859
	 * @param id| 配置表id| int
	 */
	public void buy(Hero hero, Object[] datas){
		int id = (int)datas[0];
		WarOrderActiveManager.getIns().buy(hero, id);
	} 
}