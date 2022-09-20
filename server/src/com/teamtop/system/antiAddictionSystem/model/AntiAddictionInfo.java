package com.teamtop.system.antiAddictionSystem.model;

import java.util.HashSet;
import java.util.Set;

import com.teamtop.util.db.trans.FieldOrder;

public class AntiAddictionInfo {

	/**
	 * 唯一id
	 */
	@FieldOrder(order = 1)
	private long id;

	/**
	 * 玩家账号
	 */
	@FieldOrder(order = 2)
	private String openid;

	/**
	 * 累计离线时长
	 */
	@FieldOrder(order = 3)
	private int leftTime;

	/**
	 * 开始在线时间
	 */
	@FieldOrder(order = 4)
	private int startOnlineTime;

	/**
	 * 累计在线时间
	 */
	@FieldOrder(order = 5)
	private int onlineTime;

	/**
	 * 最后一次离线时间
	 */
	@FieldOrder(order = 6)
	private int lastLogoutTime;

	/**
	 * 当前登录的区
	 */
	private Set<Integer> zoneidSet = new HashSet<>();

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public int getLeftTime() {
		return leftTime;
	}

	public void setLeftTime(int leftTime) {
		this.leftTime = leftTime;
	}

	public int getStartOnlineTime() {
		return startOnlineTime;
	}

	public void setStartOnlineTime(int startOnlineTime) {
		this.startOnlineTime = startOnlineTime;
	}

	public int getOnlineTime() {
		return onlineTime;
	}

	public void setOnlineTime(int onlineTime) {
		this.onlineTime = onlineTime;
	}

	public int getLastLogoutTime() {
		return lastLogoutTime;
	}

	public void setLastLogoutTime(int lastLogoutTime) {
		this.lastLogoutTime = lastLogoutTime;
	}

	public Set<Integer> getZoneidSet() {
		return zoneidSet;
	}

	public void setZoneidSet(Set<Integer> zoneidSet) {
		this.zoneidSet = zoneidSet;
	}
	
}
