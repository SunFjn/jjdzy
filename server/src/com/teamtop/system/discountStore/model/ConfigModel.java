package com.teamtop.system.discountStore.model;

public class ConfigModel {
	/** id */
	private int id;
	/** 商品 */
	private int[][] item;
	/** 折扣后价格 */
	private int[][] money;
	/** 可购买次数 */
	private int time;
	/** vip条件 */
	private int vip;
	

	public ConfigModel(int id, int[][] item, int[][] money, int time, int vip) {
		this.id = id;
		this.item = item;
		this.money = money;
		this.time = time;
		this.vip = vip;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int[][] getItem() {
		return item;
	}

	public void setItem(int[][] item) {
		this.item = item;
	}

	public int[][] getMoney() {
		return money;
	}

	public void setMoney(int[][] money) {
		this.money = money;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getVip() {
		return vip;
	}

	public void setVip(int vip) {
		this.vip = vip;
	}

}
