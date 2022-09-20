package com.teamtop.util.db.autoTable;
/**
 * 索引结构(适用mysql)
 * @author kyle
 *
 */
public class KeyStru {

	private int Non_unique;
	private String Key_name;
	private String Column_name;
	public int getNon_unique() {
		return Non_unique;
	}
	public void setNon_unique(int non_unique) {
		Non_unique = non_unique;
	}
	public String getKey_name() {
		return Key_name;
	}
	public void setKey_name(String key_name) {
		Key_name = key_name;
	}
	public String getColumn_name() {
		return Column_name;
	}
	public void setColumn_name(String column_name) {
		Column_name = column_name;
	}
	
	
}
