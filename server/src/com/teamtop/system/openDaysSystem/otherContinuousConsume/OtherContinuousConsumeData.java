package com.teamtop.system.openDaysSystem.otherContinuousConsume;

import com.teamtop.util.db.trans.FieldOrder;

public class OtherContinuousConsumeData {

	@FieldOrder(order = 1)
	private int moneySpend;//已消耗元宝数
	@FieldOrder(order = 2)
	private int awardsGet;//1已领取
	
	public int getMoneySpend() {
		return moneySpend;
	}
	public void setMoneySpend(int moneySpend) {
		this.moneySpend = moneySpend;
	}
	public int getAwardsGet() {
		return awardsGet;
	}
	public void setAwardsGet(int awardsGet) {
		this.awardsGet = awardsGet;
	}
	
	
}
