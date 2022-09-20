package com.teamtop.util.db.orm;

import java.lang.reflect.Field;

public class FieldOrm {
	private Field field;
	private boolean isnull;//是否为空 true为空
	private int type;//数据类型
	public Field getField() {
		return field;
	}
	public void setField(Field field) {
		this.field = field;
	}
	public boolean isIsnull() {
		return isnull;
	}
	public void setIsnull(boolean isnull) {
		this.isnull = isnull;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public FieldOrm(Field field, boolean isnull, int type) {
		super();
		this.field = field;
		this.isnull = isnull;
		this.type = type;
	}
	
}
