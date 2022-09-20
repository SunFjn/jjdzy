package com.teamtop.houtaiHttp.events.excel.model;

/**
 * 后台配置表商城表实体类
 * @author hepl
 *
 */
public class ExcelMall {
	/**
	 * 商城类型
	 */
	private int id;
	/**
	 * 商店名称
	 */
	private String name;
	/**
	 * 物品名称
	 */
	private String goodname;
	/**
	 * 出售物品id
	 */
	private String good;
	/**
	 * 货币价格
	 */
	private String moneytype;
	
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
	public String getGoodname() {
		return goodname;
	}
	public void setGoodname(String goodname) {
		this.goodname = goodname;
	}
	public String getGood() {
		return good;
	}
	public void setGood(String good) {
		this.good = good;
	}
	public String getMoneytype() {
		return moneytype;
	}
	public void setMoneytype(String moneytype) {
		this.moneytype = moneytype;
	}
}
