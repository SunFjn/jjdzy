package com.teamtop.util.db.autoTable;
/**
 * 字段结构(适用mysql)
 */
public class FieldStru {

	private String Field;
	private String Type;
	private String Null;
	private String Key;
	private String Default;
	private String Extra;
	public String getField() {
		return Field;
	}
	public void setField(String field) {
		Field = field;
	}
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	public String getNull() {
		return Null;
	}
	public void setNull(String null1) {
		Null = null1;
	}
	public String getKey() {
		return Key;
	}
	public void setKey(String key) {
		Key = key;
	}
	public String getDefault() {
		return Default;
	}
	public void setDefault(String default1) {
		Default = default1;
	}
	public String getExtra() {
		return Extra;
	}
	public void setExtra(String extra) {
		Extra = extra;
	}
	@Override
	public String toString() {
		return "SqlStru [Field=" + Field + ", Type=" + Type + ", Null=" + Null + ", Key=" + Key + ", Default=" + Default + ", Extra=" + Extra + "]";
	}
}
