package com.teamtop.system.activity.ativitys.goldenMouse;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 金鼠送财
 * @author Administrator
 *
 */
public class GoldenMouse extends ActivityData{
	/**
	 * 活动期间总充值
	 */
	private int rechargeNum;
	/**
	 * 已经购买送财返利次数
	 */
	private int hasBuyNum;
	/**
	 * 已经获取的元宝数
	 */
	private int hasGetNum;
	
	public GoldenMouse() {
		super();
	}
	public int getRechargeNum() {
		return rechargeNum;
	}
	public void setRechargeNum(int rechargeNum) {
		this.rechargeNum = rechargeNum;
	}
	public int getHasBuyNum() {
		return hasBuyNum;
	}
	public void setHasBuyNum(int hasBuyNum) {
		this.hasBuyNum = hasBuyNum;
	}
	public int getHasGetNum() {
		return hasGetNum;
	}
	public void setHasGetNum(int hasGetNum) {
		this.hasGetNum = hasGetNum;
	}
	
	
	
	
	

}
