package com.teamtop.system.activity;

import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public abstract class AbstractActivityManager {

	/** 活动开始 公共部分 */
	public abstract void actOpen();

	/** 活动开始（个人） */
	public abstract void heroActOpen(Hero hero);

	/** 活动结束 公共部分 */
	public abstract void actEnd();

	/** 活动结束（个人） */
	public abstract void heroActEnd(Hero hero);

	/** 检测活动是否开启 */
	public boolean checkActOpen(Hero hero) {
		return true;
	}

	/** 获取活动数据对象(初始化对象) 
	 *  必须实现构造方法 ActivityData(long hid, int indexId, int actId, int periods)
	 * */
	public abstract ActivityData getActivityData(Hero hero, ActivityInfo activityInfo);

	/** 获取活动数据CLASS */
	public abstract Class<?> getActivityData();

	/** 充值处理 */
	public abstract void rechargeHandle(Hero hero, int money, int product_id);

	/**
	 * 获取系统事件
	 * 活动类型（login,loginReset,heroZero,zeroPub,levelUp,passGuanqia,logout 通过这里调用，不走配置）
	 */
	public abstract AbsSystemEvent getSystemEvent();

	/** 打开活动 */
	public abstract void openUI(Hero hero);

}
