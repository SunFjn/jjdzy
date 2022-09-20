package com.teamtop.system.specialTreasure;
/**
 * 异宝
 * @author 
 *
 */

import java.util.HashMap;

public class SpecialTreasure {
	
	private long hid;
	/**
	 * 激活异宝-对应星级
	 */
	private HashMap<Integer,Integer> treasureStar;
	
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
	 * 套装(羁绊)
	 */
	private HashMap<Integer, Integer> taozhuangs;
	/**
	 * 异宝id-》觉醒技能/觉醒之力 技能（1-3）4觉醒之力——》对应等级
	 */
	private HashMap<Integer,HashMap<Integer, Integer>> jueXingSkills;

	
	public SpecialTreasure() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public HashMap<Integer, Integer> getTreasureStar() {
		return treasureStar;
	}
	public void setTreasureStar(HashMap<Integer, Integer> treasureStar) {
		this.treasureStar = treasureStar;
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
	public HashMap<Integer, HashMap<Integer, Integer>> getJueXingSkills() {
		return jueXingSkills;
	}
	public void setJueXingSkills(HashMap<Integer, HashMap<Integer, Integer>> jueXingSkills) {
		this.jueXingSkills = jueXingSkills;
	}

	

}
