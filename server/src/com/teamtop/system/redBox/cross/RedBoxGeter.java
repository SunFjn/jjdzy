package com.teamtop.system.redBox.cross;

import com.teamtop.util.db.trans.FieldOrder;
/**
 * 红包领取者
 * @author zhangsubo
 *
 */
public class RedBoxGeter {
	
	/** id*/
	@FieldOrder(order = 1)
	private long hid;
	/**名字*/
	@FieldOrder(order = 2)
	private String name;
	/**获取红包数量*/
	@FieldOrder(order = 3)	
	private int getnum;
	
	public RedBoxGeter() {
		super();
	}
	public RedBoxGeter(long hid, String name, int getnum) {
		super();
		this.hid = hid;
		this.name = name;
		this.getnum = getnum;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getGetnum() {
		return getnum;
	}
	public void setGetnum(int getnum) {
		this.getnum = getnum;
	}
	
	

}
