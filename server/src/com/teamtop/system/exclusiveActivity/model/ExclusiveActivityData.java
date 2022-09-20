package com.teamtop.system.exclusiveActivity.model;

import java.util.HashMap;
import java.util.Map;

public class ExclusiveActivityData {

	private long hid;

	/**
	 * 个人已开活动
	 */
	private Map<Integer, ExclusiveActivityModel> exActivityMap = new HashMap<>();

	private String exActivityStr;

	/**
	 * 活动开启检测记录（只检测一次）
	 */
	private Map<Integer, ExActStateInfo> exActOpenStateMap = new HashMap<>();

	private String exActOpenStateStr;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, ExclusiveActivityModel> getExActivityMap() {
		return exActivityMap;
	}

	public void setExActivityMap(Map<Integer, ExclusiveActivityModel> exActivityMap) {
		this.exActivityMap = exActivityMap;
	}

	public String getExActivityStr() {
		return exActivityStr;
	}

	public void setExActivityStr(String exActivityStr) {
		this.exActivityStr = exActivityStr;
	}

	public Map<Integer, ExActStateInfo> getExActOpenStateMap() {
		return exActOpenStateMap;
	}

	public void setExActOpenStateMap(Map<Integer, ExActStateInfo> exActOpenStateMap) {
		this.exActOpenStateMap = exActOpenStateMap;
	}

	public String getExActOpenStateStr() {
		return exActOpenStateStr;
	}

	public void setExActOpenStateStr(String exActOpenStateStr) {
		this.exActOpenStateStr = exActOpenStateStr;
	}

}
