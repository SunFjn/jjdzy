package com.teamtop.system.specialAnimalDir.model;

import java.util.Map;

public class SpecialAnimalDir {
	private long hid;

	/** 异兽录map key:异兽id */
	private Map<Integer, SpecialAnimalDirInfo> infoMap;

	public long getHid() {
		return hid;
	}

	public Map<Integer, SpecialAnimalDirInfo> getInfoMap() {
		return infoMap;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public void setInfoMap(Map<Integer, SpecialAnimalDirInfo> infoMap) {
		this.infoMap = infoMap;
	}

}
