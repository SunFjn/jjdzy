package com.teamtop.system.cdkey.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class CDkey {
	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * 玩家已领取激活码记录Map key为类型，value为已领取该类型的激活码的次数
	 */
	private Map<Integer, Integer> gainCDkeyRecordMap;
	/**
	 * 通用码使用记录
	 */
	private Map<Integer, Set<String>> commCDkeyMap = new HashMap<>();

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getGainCDkeyRecordMap() {
		return gainCDkeyRecordMap;
	}

	public void setGainCDkeyRecordMap(Map<Integer, Integer> gainCDkeyRecordMap) {
		this.gainCDkeyRecordMap = gainCDkeyRecordMap;
	}

	public Map<Integer, Set<String>> getCommCDkeyMap() {
		return commCDkeyMap;
	}

	public void setCommCDkeyMap(Map<Integer, Set<String>> commCDkeyMap) {
		this.commCDkeyMap = commCDkeyMap;
	}

}
