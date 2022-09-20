package com.teamtop.system.activity.ativitys.totalRebate.model;

public class RebateInfo {
	/**0.条件不符 1.可领 2.已领*/
	private int state;
	/**返利(%)*/
	private int rebate;
	/**基础返利：0.未激活，激活为100*/
	private int baseRebate;
	
	
	public void addRebate(int value) {
		rebate += value;
	}
	public int getBaseRebate() {
		return baseRebate;
	}
	public void setBaseRebate(int baseRebate) {
		this.baseRebate = baseRebate;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getRebate() {
		return rebate;
	}
	public void setRebate(int rebate) {
		this.rebate = rebate;
	}
}
