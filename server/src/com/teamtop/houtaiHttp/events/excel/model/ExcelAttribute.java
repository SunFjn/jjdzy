package com.teamtop.houtaiHttp.events.excel.model;

/**
 * 后台配置表角色属性表实体类
 * @author hepl
 *
 */
public class ExcelAttribute {
	/**
	 * 属性id
	 */
	private int id;
	/**
	 * 属性名称
	 */
	private String desc;
	/**
	 * 属性类型
	 */
	private int type;
	
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
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
}
