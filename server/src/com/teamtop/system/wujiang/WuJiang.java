package com.teamtop.system.wujiang;

import java.util.HashMap;

public class WuJiang {
	
	private long hid;
	/**
	 * 拥有武将
	 */
	private HashMap<Integer, WuJiangModel> wujiangs;
	/**
	 * 武将套装(羁绊)
	 */
	private HashMap<Integer, Integer> taozhuangs;
	/**
	 * 武将阶级
	 */
	private int jieLv;
	/**
	 * 武将升阶经验
	 */
	private int exp;
	/**
	 * 武将技能
	 */
	private HashMap<Integer, Integer> wujiangSkill;
	/**
	 * 战力
	 */
	private int strength;
	/**
	 * 重置所有武将羁绊  0没有重置过 1重置1次
	 */
	private int restTaoZhuang;
	
	public WuJiang() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public HashMap<Integer, WuJiangModel> getWujiangs() {
		return wujiangs;
	}

	public void setWujiangs(HashMap<Integer, WuJiangModel> wujiangs) {
		this.wujiangs = wujiangs;
	}

	public int getJieLv() {
		return jieLv;
	}

	public void setJieLv(int jieLv) {
		this.jieLv = jieLv;
	}

	public int getExp() {
		return exp;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

	public HashMap<Integer, Integer> getWujiangSkill() {
		return wujiangSkill;
	}

	public void setWujiangSkill(HashMap<Integer, Integer> wujiangSkill) {
		this.wujiangSkill = wujiangSkill;
	}

	public int getStrength() {
		return strength;
	}

	public void setStrength(int strength) {
		this.strength = strength;
	}

	public HashMap<Integer, Integer> getTaozhuangs() {
		return taozhuangs;
	}

	public void setTaozhuangs(HashMap<Integer, Integer> taozhuangs) {
		this.taozhuangs = taozhuangs;
	}

	public int getRestTaoZhuang() {
		return restTaoZhuang;
	}

	public void setRestTaoZhuang(int restTaoZhuang) {
		this.restTaoZhuang = restTaoZhuang;
	}
	
}
