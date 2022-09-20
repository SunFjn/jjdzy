package com.teamtop.util.db.orm;
/**
 * 索引配置
 * @author Administrator
 *
 */
public class IndexProperty {
	private String[] field;
	private String type;
	public String[] getField() {
		return field;
	}
	public void setField(String[] field) {
		this.field = field;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public IndexProperty(String[] field, String type) {
		super();
		this.field = field;
		this.type = type;
	}
}
