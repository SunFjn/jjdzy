package com.teamtop.system.exclusiveActivity;

import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;

public abstract class AbsExclusiveActivityManager {

	/** 活动开始 公共部分 */
	public abstract void handleOpenPub();

	/** 活动开始（个人） */
	public abstract void heroActOpen(Hero hero, int id);

	/** 活动结束 公共部分 */
	public abstract void handleEndPub();

	/** 活动结束（个人） */
	public abstract void heroActEnd(Hero hero, int id);

	/** 检测活动是否开启 */
	public boolean checkActOpen(Hero hero) {
		return true;
	}

	/** 创建活动数据对象(初始化对象) 
	 * */
	public abstract ExclusiveActivityModel createExclusiveActivityModel(Hero hero, int id);

	/** 获取活动数据CLASS */
	public abstract Class<?> getExclusiveActivityModel();

	/** 充值处理 */
	public abstract void rechargeHandle(Hero hero, int money, int product_id, int id);

	/**
	 * 消费事件处理
	 * 
	 * @param hero
	 * @param consumeNum
	 * @param reason
	 */
	public abstract void consumeHandle(Hero hero, int consumeNum, int reason, int id);

	/**
	 * 获取系统事件
	 * 活动类型（login,loginReset,heroZero,zeroPub,levelUp,passGuanqia,logout 通过这里调用，不走配置）
	 */
	public abstract AbsExActSystemEvent getSystemEvent();

	/** 打开活动 */
	public abstract void openUI(Hero hero, int id);

	/** 更新活动配置表数据*/
	public abstract void updateTable(Hero hero);

	/** initExcel活动配置表数据*/
	public abstract void houtaiInitExcel();

	/** 检测配置表是否有数据*/
	public abstract boolean checkExcel();

}
