package com.teamtop.system.friends.model;

import com.teamtop.util.db.trans.FieldOrder;
/**
 * 好友个体
 * @author Administrator
 *
 */
public class FriendModel {
	/**
	 * 好友id
	 */
	@FieldOrder(order=1)
	private long hid;
	/**
	 * 名字
	 */
	private String name;
	/**
	 * 级别
	 */
	private int level;
	/**
	 * 0 不在线， 1 在线
	 */
	private int onlineState;
	/**
	 * 邀请者id
	 */
	private long inviteHid;
	/**
	 * 职业
	 */
	private int job;
	/**
	 * 性别
	 */
	private int sex;

	
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
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getOnlineState() {
		return onlineState;
	}
	public void setOnlineState(int onlineState) {
		this.onlineState = onlineState;
	}
	public long getInviteHid() {
		return inviteHid;
	}
	public void setInviteHid(long inviteHid) {
		this.inviteHid = inviteHid;
	}
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	@Override
	public boolean equals(Object obj) {
		if(obj == null) return false;
		if(!(obj instanceof FriendModel)) return false;
		FriendModel otherModel = (FriendModel)obj;
		return otherModel.getHid() == this.hid;
	}
	@Override
	public String toString() {
		return "[hid=" + hid + ", name=" + name + ", onlineState=" + onlineState + "]";
	}

}
