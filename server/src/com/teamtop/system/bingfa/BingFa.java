package com.teamtop.system.bingfa;
/**
 * 兵法
 * @author 
 *
 */

import java.util.HashMap;

public class BingFa {
	
	private long hid;
	/**
	 * 已激活兵法
	 */
	private HashMap<Integer, BingFaModel> bingfas;
	/**
	 * 兵法套装
	 */
	private HashMap<Integer, Integer> taozhuanbfs;
	/**
	 * 战力
	 */
	private int strength;
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

	public BingFa() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public HashMap<Integer, BingFaModel> getBingfas() {
		return bingfas;
	}

	public void setBingfas(HashMap<Integer, BingFaModel> bingfas) {
		this.bingfas = bingfas;
	}

	public HashMap<Integer, Integer> getTaozhuanbfs() {
		return taozhuanbfs;
	}

	public void setTaozhuanbfs(HashMap<Integer, Integer> taozhuanbfs) {
		this.taozhuanbfs = taozhuanbfs;
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
	
	
	
}
