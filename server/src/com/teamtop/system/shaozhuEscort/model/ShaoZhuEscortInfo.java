package com.teamtop.system.shaozhuEscort.model;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.shaozhuEscort.ShaoZhuEscortConst;

public class ShaoZhuEscortInfo implements Comparable<ShaoZhuEscortInfo> {
	private long hid;
	private String name;

	/** 雇佣的武将id **/
	private int wujiangId;

	/** 雇佣的武将品质 **/
	private int pz;

	/**
	 * 被拦截次数
	 */
	private int interceptedTimes;

	/**
	 * 到达时间
	 */
	private int reachTime;

	/** 头像 */
	private int icon;

	/** 头像框 */
	private int frame;

	/** 国家 */
	private int countryType;

	/*** 战力 */
	private long strength;
	/*** 战斗记录信息 hid */
	private List<Long> battleRecordHidList = new ArrayList<>();

	public long getHid() {
		return hid;
	}

	public String getName() {
		return name;
	}

	public int getInterceptedTimes() {
		return interceptedTimes;
	}

	public long getStrength() {
		return strength;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setInterceptedTimes(int interceptedTimes) {
		this.interceptedTimes = interceptedTimes;
	}

	public int getReachTime() {
		return reachTime;
	}

	public void setReachTime(int reachTime) {
		this.reachTime = reachTime;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public int getWujiangId() {
		return wujiangId;
	}

	public void setWujiangId(int wujiangId) {
		this.wujiangId = wujiangId;
	}

	public int getPz() {
		return pz;
	}

	public void setPz(int pz) {
		this.pz = pz;
	}

	public int getIcon() {
		return icon;
	}

	public int getFrame() {
		return frame;
	}

	public int getCountryType() {
		return countryType;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public void setFrame(int frame) {
		this.frame = frame;
	}

	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}

	public List<Long> getBattleRecordHidList() {
		return battleRecordHidList;
	}

	public void setBattleRecordHidList(List<Long> battleRecordHidList) {
		this.battleRecordHidList = battleRecordHidList;
	}

	@Override
	public int compareTo(ShaoZhuEscortInfo arg1) {
		// TODO Auto-generated method stub
		if (hid == arg1.getHid()) {
			return 0;
		}
		if (interceptedTimes >= ShaoZhuEscortConst.MAX_INTERCEPTED_TIMES) {
			return 1;
		}
		if (arg1.getInterceptedTimes() >= ShaoZhuEscortConst.MAX_INTERCEPTED_TIMES) {
			return -1;
		}
		// 比较品质
		if (pz != arg1.getPz()) {
			return pz < arg1.getPz() ? 1 : -1;
		}
		// 比较被拦截次数
		if (interceptedTimes != arg1.getInterceptedTimes()) {
			return interceptedTimes > arg1.getInterceptedTimes() ? 1 : -1;
		}
		return 1;
	}

}
