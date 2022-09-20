package com.teamtop.system.liuChuQiShan.model;

import java.util.Set;
import java.util.TreeSet;

public class LiuChuQiShan {

	private long hid;
	/**
	 * 当前关卡id(未通关，此id之前的关卡则为通关)
	 */
	private int gqId;
	/**
	 * 每日可扫荡次数
	 */
	private int saoDangNum;
	/**
	 * 每日可求助次数
	 */
	private int needHelpNum;
	/**
	 * 每日可协助次数
	 */
	private int numHelpAwards;
	/**
	 * 当天首通关卡 隔日0点清空 用于限制当天扫荡
	 */
	private Set<Integer> passSet = new TreeSet<>();

	public Set<Integer> getPassSet() {
		return passSet;
	}

	public void setPassSet(Set<Integer> passSet) {
		this.passSet = passSet;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getGqId() {
		return gqId;
	}

	public void setGqId(int gqId) {
		this.gqId = gqId;
	}
	public int getSaoDangNum() {
		return saoDangNum;
	}

	public void setSaoDangNum(int saoDangNum) {
		this.saoDangNum = saoDangNum;
	}

	public int getNeedHelpNum() {
		return needHelpNum;
	}

	public void setNeedHelpNum(int needHelpNum) {
		this.needHelpNum = needHelpNum;
	}

	public int getNumHelpAwards() {
		return numHelpAwards;
	}
	public void setNumHelpAwards(int numHelpAwards) {
		this.numHelpAwards = numHelpAwards;
	}

}
