package com.teamtop.system.openDaysSystem.wishingTree;
import com.teamtop.system.activity.ativitys.wishingTree.WishingTreeActManager;
import com.teamtop.system.hero.Hero;

/**
 * WishingTreeCG.java 许愿树
 */
public class WishingTreeCG {

	private static WishingTreeCG ins = null;

	public static WishingTreeCG getIns() {
		if(ins == null){
			ins = new WishingTreeCG();
		}
		return ins;
	}

	/**
	 * 许愿 10041
	 * @param type| 许愿类型 1为许愿1次 2为许愿10次| byte
	 * @param sysId| 系统id| int
	 */
	public void draw(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int sysId = (int)datas[1];
		WishingTreeActManager.getIns().draw(hero, type, sysId);
		WishingTreeManager.getIns().draw(hero, type, sysId);
	} 
	/**
	 * 领取奖励 10043
	 * @param id| 目标id| int
	 * @param sysId| 系统id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int sysId = (int)datas[1];
		WishingTreeActManager.getIns().getAward(hero, id, sysId);
		WishingTreeManager.getIns().getAward(hero, id, sysId);
	} 
	/**
	 * 打开排行榜 10045
	 */
	public void openRankUI(Hero hero, Object[] datas){
		WishingTreeActManager.getIns().openRankUI(hero);
	} 
	/**
	 * 打开目标页面 10047
	 * @param sysId| 系统id| int
	 */
	public void openTarget(Hero hero, Object[] datas){
		int sysId = (int)datas[0];
		WishingTreeActManager.getIns().openTarget(hero, sysId);
		WishingTreeManager.getIns().openTarget(hero, sysId);
	} 
	/**
	 * 领取页面目标奖励 10049
	 * @param id| 配置表id| int
	 * @param sysId| 系统id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int sysId = (int)datas[1];
		WishingTreeActManager.getIns().getTargetAward(hero, id, sysId);
		WishingTreeManager.getIns().getTargetAward(hero, id, sysId);
	} 
}