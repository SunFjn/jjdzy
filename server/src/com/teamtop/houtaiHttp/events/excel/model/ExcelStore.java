package com.teamtop.houtaiHttp.events.excel.model;

/**
 * 后台配置表兑换商店表实体类
 * @author hepl
 *
 */
public class ExcelStore {
	/**
	 * 商店类型
	 */
	private int id;
	/**
	 * 商店名称
	 */
	private String name;
	/**
	 * 商品
	 */
	private String good;
	/**
	 * 货币类型
	 */
	private int moneytype;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGood() {
		return good;
	}
	public void setGood(String good) {
		this.good = good;
	}
	public int getMoneytype() {
		return moneytype;
	}
	public void setMoneytype(int moneytype) {
		this.moneytype = moneytype;
	}
}
