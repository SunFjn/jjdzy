package com.teamtop.system.activity.ativitys.vipDiscount.model;

public class Discount {
	/**
	 * 现价
	 */
	private int presentPrice;
	/**
	 * 购买次数
	 */
	private int num;
	
	public Discount(int presentPrice,int num) {
		this.presentPrice = presentPrice;
		this.num = num;
	}
	
	public int getPresentPrice() {
		return presentPrice;
	}
	public void setPresentPrice(int presentPrice) {
		this.presentPrice = presentPrice;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}
	
}
