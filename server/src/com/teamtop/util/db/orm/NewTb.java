package com.teamtop.util.db.orm;

import java.lang.reflect.Method;

public class NewTb {
	/**
	 * class名字，完整路径</br>
	 * 如：com.game.system.CommonTableUtil.test.Pojo1
	 */
	private String className;
	/**
	 * 表名，如：pojo1
	 */
	private String tbName;
	/**
	 * 在role或roleActivity的字段名，如：pojo1
	 */
	private String fieldName;
	/**
	 * setter
	 */
	private Method setMethod;
	/**
	 * getter
	 */
	private Method getMethod;
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getTbName() {
		return tbName;
	}
	public void setTbName(String tbName) {
		this.tbName = tbName;
	}
	public String getFieldName() {
		return fieldName;
	}
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	public Method getSetMethod() {
		return setMethod;
	}
	public void setSetMethod(Method setMethod) {
		this.setMethod = setMethod;
	}
	public Method getGetMethod() {
		return getMethod;
	}
	public void setGetMethod(Method getMethod) {
		this.getMethod = getMethod;
	}
}
