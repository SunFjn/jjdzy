package com.teamtop.hefu;
/**
 * 删除玩家关联数据
 * @author Administrator
 *
 */
public class HefuDel {
	/**
	 * 表名
	 */
	private String tbname;
	/**
	 * del类型：删除的key 
	 * resetByUpdate类型：set后的重置字段
	 */
	private String key;
	public String getTbname() {
		return tbname;
	}
	public void setTbname(String tbname) {
		this.tbname = tbname;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public HefuDel(String tbname, String key) {
		super();
		this.tbname = tbname;
		this.key = key;
	}
	
}
