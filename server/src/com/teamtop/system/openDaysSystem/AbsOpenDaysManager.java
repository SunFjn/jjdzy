package com.teamtop.system.openDaysSystem;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public abstract class AbsOpenDaysManager {

	public abstract void openUI(Hero hero);

	/** 系统活动开启 */
	public abstract void handleOpenPub();

	/** 系统活动开启 */
	public abstract void handleOpen(Hero hero, int uid);
	
	/** 系统关闭 */
	public abstract void handleEndPub();

	/** 系统活动关闭 */
	public abstract void handleEnd(Hero hero, int uid);

	public abstract AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid);

	/** 获取系统数据CLASS */
	public abstract Class<?> getSystemModel();

	/**
	 * 获取系统事件 活动类型（login,loginReset,heroZero,zeroPub,levelUp,passGuanqia,logout
	 * 通过这里调用，不走配置）
	 */
	public abstract AbsSystemEvent getSystemEvent();

	/**
	 * 充值处理
	 * @param hero
	 * @param money
	 * @param product_id
	 */
	public abstract void rechargeHandle(Hero hero, int money, int product_id);

	/**
	 * 消费事件处理
	 * 
	 * @param hero
	 * @param consumeNum
	 * @param reason
	 */
	public abstract void consumeHandle(Hero hero, int consumeNum, int reason);

	/** 个别活动可能用到*/
	public boolean checkisOpen() {
		return true;
	}
	
	/** 特殊处理开始状态*/
	public void sendOpneState(Hero hero) {
		
	}

}
