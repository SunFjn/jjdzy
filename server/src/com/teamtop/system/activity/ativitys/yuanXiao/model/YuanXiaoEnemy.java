package com.teamtop.system.activity.ativitys.yuanXiao.model;

import com.teamtop.util.db.trans.FieldOrder;

public class YuanXiaoEnemy {
	/**
	 * 
	 */
	@FieldOrder(order = 1)
	private long hid;
	/**
	 * 是否被抢过
	 */
	@FieldOrder(order = 2)
	private int isRob;
	
	public YuanXiaoEnemy() {
		super();
	}
	
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getIsRob() {
		return isRob;
	}
	public void setIsRob(int isRob) {
		this.isRob = isRob;
	}
	
	
	

}
