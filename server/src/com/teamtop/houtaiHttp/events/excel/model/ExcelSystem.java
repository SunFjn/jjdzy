package com.teamtop.houtaiHttp.events.excel.model;

/**
 * 后台配置表系统开启表实体类
 * @author hepl
 *
 */
public class ExcelSystem {
	/**
	 * 系统id
	 */
	private int id;
	/**
	 * 系统名称
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
