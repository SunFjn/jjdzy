package com.teamtop.system.reincarnationGodfate.model;

import java.util.Map;

public class ReincarnationGodFate {
	private long hid;

	/** 天命map key:天命id */
	private Map<Integer, ReincarnationGodFateInfo> infoMap;

	public long getHid() {
		return hid;
	}

	public Map<Integer, ReincarnationGodFateInfo> getInfoMap() {
		return infoMap;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public void setInfoMap(Map<Integer, ReincarnationGodFateInfo> infoMap) {
		this.infoMap = infoMap;
	}

}
