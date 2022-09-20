package com.teamtop.system.forge.model;

import java.util.Map;

public class Forge {
	
	private long hid;
	/**
	 * 部位锻造
	 */
	private Map<Integer, ForgeModel> forgeModelMap;
	/**
	 * 噬魂
	 */
	private Map<Integer, Integer> hunLevels;
	/**
	 * 神装套装等级
	 */
	private int shenLv;
	/**
	 * 锻造大师：强化大师0 宝石大师1 升星大师2 转生装备炼魂大师3
	 */
	private Map<Integer, Integer> dashi;
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public Map<Integer, ForgeModel> getForgeModelMap() {
		return forgeModelMap;
	}
	public void setForgeModelMap(Map<Integer, ForgeModel> forgeModelMap) {
		this.forgeModelMap = forgeModelMap;
	}
	public Map<Integer, Integer> getHunLevels() {
		return hunLevels;
	}
	public void setHunLevels(Map<Integer, Integer> hunLevels) {
		this.hunLevels = hunLevels;
	}
	public int getShenLv() {
		return shenLv;
	}
	public void setShenLv(int shenLv) {
		this.shenLv = shenLv;
	}
	public Map<Integer, Integer> getDashi() {
		return dashi;
	}
	public void setDashi(Map<Integer, Integer> dashi) {
		this.dashi = dashi;
	}
	
	


}
