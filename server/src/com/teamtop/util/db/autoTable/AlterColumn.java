package com.teamtop.util.db.autoTable;

import com.teamtop.util.db.annotation.IndexEnum;

public class AlterColumn {

	private String tbname;
	private String field;
	private String type;
	private boolean isNull;
	private String defVal;
	private String comment;
	private IndexEnum key;
	private String keyName;
	
	public String getKeyName() {
		return keyName;
	}
	public IndexEnum getKey() {
		return key;
	}
	public String getTbname() {
		return tbname;
	}
	public void setTbname(String tbname) {
		this.tbname = tbname;
	}
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
	public String getIsNull() {
		return isNull==true?"NULL":"NOT NULL";
	}
	public String isNullCompare(){
		return isNull==true?"YES":"NO";
	}
	public void setNull(boolean isNull) {
		this.isNull = isNull;
	}
	public String getDefVal() {
		return defVal;
	}
	public void setDefVal(String defVal) {
		this.defVal = defVal;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public AlterColumn(String tbname, String field, String type, boolean isNull, String defVal, String comment,IndexEnum key,String keyName) {
		super();
		this.tbname = tbname;
		this.field = field;
		this.type = type;
		this.isNull = isNull;
		this.defVal = defVal;
		this.comment = comment;
		this.key = key;
		this.keyName = keyName;
	}
	public AlterColumn() {
		super();
	}
	
	
}
