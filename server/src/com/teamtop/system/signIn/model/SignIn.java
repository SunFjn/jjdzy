package com.teamtop.system.signIn.model;

import java.util.List;

public class SignIn {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 签到状态列表 0：未达到，1：可签到，2：已签到，3：可补签
	 */
	private List<Integer> signStateList;
	/**
	 * 累签宝箱状态列表 0：未达到，1：可领取，2：已领取
	 */
	private List<Integer> accSignBXStateList;
	/**
	 * 下次签到重置时间
	 */
	private int resetTime;
	/**
	 * 签到开启时间(用于签到重置)
	 */
	private int startTime;

	/**
	 * 签到期数
	 */
	private int qs;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public List<Integer> getSignStateList() {
		return signStateList;
	}

	public void setSignStateList(List<Integer> signStateList) {
		this.signStateList = signStateList;
	}

	public List<Integer> getAccSignBXStateList() {
		return accSignBXStateList;
	}

	public void setAccSignBXStateList(List<Integer> accSignBXStateList) {
		this.accSignBXStateList = accSignBXStateList;
	}

	public int getResetTime() {
		return resetTime;
	}

	public void setResetTime(int resetTime) {
		this.resetTime = resetTime;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public int getQs() {
		return qs;
	}

	public void setQs(int qs) {
		this.qs = qs;
	}

}
