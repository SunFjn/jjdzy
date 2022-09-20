package com.teamtop.system.materialFuben;

import java.util.Map;
import java.util.Set;

/**
 * 材料副本
 * @author Administrator
 *
 */
public class MaterialFuben {
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 材料副本当天挑战次数{副本ID：挑战次数（包含挑战和扫荡次数）}
	 */  
	private Map<Integer, MaterialFubenModel> materialFubenCount;
	/**
	 * 材料副本首次通关
	 */
	private Set<Integer> hasFuBenId;

	
	
	public Set<Integer> getHasFuBenId() {
		return hasFuBenId;
	}
	public void setHasFuBenId(Set<Integer> hasFuBenId) {
		this.hasFuBenId = hasFuBenId;
	}

	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public Map<Integer, MaterialFubenModel> getMaterialFubenCount() {
		return materialFubenCount;
	}
	public void setMaterialFubenCount(Map<Integer, MaterialFubenModel> materialFubenCount) {
		this.materialFubenCount = materialFubenCount;
	}

	
	
	
}
