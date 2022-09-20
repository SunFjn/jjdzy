package com.teamtop.hefu;
/**
 * 需要移动的表model
 * @author Administrator
 *
 */
public class MoveTb {
	private String field;//字段名
	private String type;//类型
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public MoveTb(String field, String type) {
		super();
		this.field = field;
		this.type = type;
	}
	
	
}
