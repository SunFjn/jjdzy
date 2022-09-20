package com.teamtop.system.openDaysSystem.offlineNewDayRecharge;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
/** 暂时不用 */
public class OfflineNewDayRecharge extends AbsOpenDaysSystemModel {
	/**
	 * 每日充值数量
	 */
	private int todayRecharge;
	/** 是否已发送道具邮件 */
	private boolean sendDaoju;
	/** 是否已发送元宝邮件 */
	private boolean sendYB;
	
	public int getTodayRecharge() {
		return todayRecharge;
	}
	
	public void setTodayRecharge(int todayRecharge) {
		this.todayRecharge = todayRecharge;
	}
	
	public boolean getSendDaoju() {
		return sendDaoju;
	}
	
	public void setSendDaoju(boolean sendDaoju) {
		this.sendDaoju = sendDaoju;
	}
	
	public boolean getSendYB() {
		return sendYB;
	}
	
	public void setSendYB(boolean sendYB) {
		this.sendYB = sendYB;
	}
}
