package com.teamtop.houtaiHttp.events.excel.model;

/**
 * 后台配置表道具表数据实体
 * @author hepl
 *
 */
public class ExcelTool {
	/**
	 * 道具id
	 */
	private int id;
	/**
	 * 道具名称
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
