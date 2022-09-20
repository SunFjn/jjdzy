package com.teamtop.util.db.autoTable;
/**
 * 表自增长
 * @author Administrator
 *
 */
public class TableIncrement {
	private String tbname;
	private long increment;
	public String getTbname() {
		return tbname;
	}
	public void setTbname(String tbname) {
		this.tbname = tbname;
	}
	public long getIncrement() {
		return increment;
	}
	public void setIncrement(long increment) {
		this.increment = increment;
	}
	
}
