package com.teamtop.system.friends.model;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 好友申请
 * @author Administrator
 *
 */
public class FriendApply {
	@FieldOrder(order=1)
	private long hid;
	private String name;
	
	public FriendApply() {
	}
	public FriendApply(long hid, String name) {
		this.hid = hid;
		this.name = name;
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
	@Override
	public boolean equals(Object obj) {
		if(obj == null) {
			return false;
		}
		if(!(obj instanceof FriendApply)) return false;
		FriendApply apply = (FriendApply) obj;
		return apply.getHid() == this.getHid();
	}

}
