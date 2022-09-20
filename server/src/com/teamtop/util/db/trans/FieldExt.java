package com.teamtop.util.db.trans;

import java.lang.reflect.Field;
/**
 * 配合ObjStrTransUtil使用，用于包装field和其顺序
 * @author kyle
 *
 */
public class FieldExt {
	private Field field;
	private int order;
	public Field getField() {
		return field;
	}
	public void setField(Field field) {
		this.field = field;
	}
	public int getOrder() {
		return order;
	}
	public void setOrder(int order) {
		this.order = order;
	}
	public FieldExt(Field field, int order) {
		this.field = field;
		this.order = order;
	}
	@Override
	public String toString() {
		return "FieldExt [field=" + field + ", order=" + order + "]";
	}
	
}
