package com.teamtop.util.db.autoSql;

import java.lang.reflect.Field;

/**
 * 包装了生成xml的field和索引
 * @author Administrator
 *
 */
public class FieldXml {
	private Field[] primaryKeys;
	private Field[] indexs;
	private Field[] fields;
	public Field[] getPrimaryKeys() {
		return primaryKeys;
	}
	public void setPrimaryKeys(Field[] primaryKeys) {
		this.primaryKeys = primaryKeys;
	}
	public Field[] getIndexs() {
		return indexs;
	}
	public void setIndexs(Field[] indexs) {
		this.indexs = indexs;
	}
	public Field[] getFields() {
		return fields;
	}
	public void setFields(Field[] fields) {
		this.fields = fields;
	}
	public FieldXml(Field[] primaryKeys, Field[] indexs, Field[] fields) {
		super();
		this.primaryKeys = primaryKeys;
		this.indexs = indexs;
		this.fields = fields;
	}
	
	
}
