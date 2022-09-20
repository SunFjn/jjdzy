package com.teamtop.houtaiHttp.events.excel.model;

/**
 * 后台配置表流水操作原因表
 * @author hepl
 *
 */
public class ExcelEconomy {
	/**
	 * 流水原因id
	 */
	private int id;
	/**
	 * 流水原因描述
	 */
	private String desc;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
}
