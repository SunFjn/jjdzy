package com.teamtop.houtaiHttp.events.excel.model;

/**
 * 后台配置表装备表数据实体
 * @author hepl
 *
 */
public class ExcelEquip {
	/**
	 * 装备id
	 */
	private int id;
	/**
	 * 装备名称
	 */
	private String name;
	/**
	 * 颜色
	 */
	private int quality;
	
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
	public int getQuality() {
		return quality;
	}
	public void setQuality(int quality) {
		this.quality = quality;
	}
}
