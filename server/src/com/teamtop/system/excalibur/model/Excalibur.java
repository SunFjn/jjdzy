package com.teamtop.system.excalibur.model;

import java.util.HashMap;
import java.util.Map;

public class Excalibur {

	private long hid;

	/**
	 * 装备着的神剑Id
	 */
	private int wearExcaliburId;

	/**
	 * 神剑信息
	 */
	private Map<Integer, ExcaliburModel> excaliburMap;
	/**
	 * 阶数
	 */
	private int jieLv;
	/**
	 * 升阶经验
	 */
	private int jieexp;
	/**
	 * 技能
	 */
	private HashMap<Integer, Integer> skills;
	/**
	 * 战力
	 */
	private int strength;
	/**
	 * 套装(羁绊)
	 */
	private HashMap<Integer, Integer> taozhuangs;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getWearExcaliburId() {
		return wearExcaliburId;
	}

	public void setWearExcaliburId(int wearExcaliburId) {
		this.wearExcaliburId = wearExcaliburId;
	}

	public Map<Integer, ExcaliburModel> getExcaliburMap() {
		return excaliburMap;
	}

	public void setExcaliburMap(Map<Integer, ExcaliburModel> excaliburMap) {
		this.excaliburMap = excaliburMap;
	}

	public int getStrength() {
		return strength;
	}

	public void setStrength(int strength) {
		this.strength = strength;
	}

	public int getJieLv() {
		return jieLv;
	}

	public void setJieLv(int jieLv) {
		this.jieLv = jieLv;
	}


	public int getJieexp() {
		return jieexp;
	}

	public void setJieexp(int jieexp) {
		this.jieexp = jieexp;
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
