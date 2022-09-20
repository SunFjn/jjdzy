package com.teamtop.system.zhenYan;

import java.util.Map;

public class ZhenYan {
	/** 角色id */
	private long hid;
	/** 阵心等级 */
	private int zhenXinLevel;
	/** 阵眼等级 */
	private Map<Integer, Integer> zhenYanLevelMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long heroId) {
		this.hid = heroId;
	}

	public int getZhenXinLevel() {
		return zhenXinLevel;
	}

	public void setZhenXinLevel(int zhenXinLevel) {
		this.zhenXinLevel = zhenXinLevel;
	}

	public Map<Integer, Integer> getZhenYanLevelMap() {
		return zhenYanLevelMap;
	}

	public void setZhenYanLevelMap(Map<Integer, Integer> zhenYanLevelMap) {
		this.zhenYanLevelMap = zhenYanLevelMap;
	}
}
