package com.teamtop.system.treasure.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TreasureData {

	private long hid;

	/**
	 * 位置装备的宝物
	 */
	private List<Integer> wearTreasureList;
	/**
	 * 宝物套装(羁绊)
	 */
	private HashMap<Integer, Integer> taozhuangs;

	/**
	 * 升级经验
	 */
	private int exp;

	/**
	 * 等级（统一等级）
	 */
	private int level;

	/**
	 * 当前拥有宝物
	 */
	private Map<Integer, TreasureModel> treasureMap;
	
	
	/**
	 * 技能
	 */
	private HashMap<Integer, Integer> skills;

	/**
	 * 战力
	 */
	private int strength;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public List<Integer> getWearTreasureList() {
		return wearTreasureList;
	}

	public void setWearTreasureList(List<Integer> wearTreasureList) {
		this.wearTreasureList = wearTreasureList;
	}

	public int getExp() {
		return exp;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public Map<Integer, TreasureModel> getTreasureMap() {
		return treasureMap;
	}

	public void setTreasureMap(Map<Integer, TreasureModel> treasureMap) {
		this.treasureMap = treasureMap;
	}

	public int getStrength() {
		return strength;
	}

	public void setStrength(int strength) {
		this.strength = strength;
	}


	public HashMap<Integer, Integer> getSkills() {
		return skills;
	}

	public void setSkills(HashMap<Integer, Integer> skills) {
		this.skills = skills;
	}

	public HashMap<Integer, Integer> getTaozhuangs() {
		return taozhuangs;
	}

	public void setTaozhuangs(HashMap<Integer, Integer> taozhuangs) {
		this.taozhuangs = taozhuangs;
	}
	
	
	

}
