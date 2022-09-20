package com.teamtop.util.db.orm;

import java.lang.reflect.Field;

/**
 * 包装了生成xml的field和索引
 * @author Administrator
 *
 */
public class FieldXml {
	private Field primaryField;
	private int priFieldIndex;
	private Field[] indexs;
	private FieldOrm[] fields;
	private String tbname;
	public Field getPrimaryField() {
		return primaryField;
	}
	public void setPrimaryField(Field primaryField) {
		this.primaryField = primaryField;
	}
	public int getPriFieldIndex() {
		return priFieldIndex;
	}
	public void setPriFieldIndex(int priFieldIndex) {
		this.priFieldIndex = priFieldIndex;
	}
	public Field[] getIndexs() {
		return indexs;
	}
	public void setIndexs(Field[] indexs) {
		this.indexs = indexs;
	}
	
	public FieldOrm[] getFields() {
		return fields;
	}
	public void setFields(FieldOrm[] fields) {
		this.fields = fields;
	}
	
	public String getTbname() {
		return tbname;
	}
	public void setTbname(String tbname) {
		this.tbname = tbname;
	}
	public FieldXml(Field primaryField, FieldOrm[] fields,String tbname) {
		super();
		this.primaryField = primaryField;
		this.fields = fields;
		this.tbname = tbname;
	}
}
