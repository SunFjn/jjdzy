package com.teamtop.system.title;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.util.db.trans.FieldOrder;

public class TitleModel {
	@FieldOrder(order = 1)
	private long hid;
	@FieldOrder(order = 2)
	private int wearTitleId;
	@FieldOrder(order = 3)
	private Map<Integer, TitleInfo> hasMap = new HashMap<Integer, TitleInfo>();
	/**
	 * 永久类已获得称号、包括邮件获得的（避免重复发放，针对战力）
	 */
	@FieldOrder(order = 4)
	private Set<Integer> titleSet = new HashSet<>();
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getWearTitleId() {
		return wearTitleId;
	}
	public void setWearTitleId(int wearTitleId) {
		this.wearTitleId = wearTitleId;
	}
	public Map<Integer, TitleInfo> getHasMap() {
		return hasMap;
	}
	public void setHasMap(Map<Integer, TitleInfo> hasMap) {
		this.hasMap = hasMap;
	}

	public Set<Integer> getTitleSet() {
		return titleSet;
	}

	public void setTitleSet(Set<Integer> titleSet) {
		this.titleSet = titleSet;
	}
}
