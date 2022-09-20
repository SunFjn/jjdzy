package com.teamtop.system.godbook;
/**
 * 天书
 * @author jjjjyyy
 *
 */
import java.util.HashMap;


public class GodBook {
	
	private long hid;
	/**
	 * 携带的天书id
	 */
	private int wearid;
	/**
	 * 天书经验
	 */
	private int exp;
	/**
	 * 天书等级
	 */
	private int level;
	/**
	 * 已经激活的天书
	 */
	private HashMap<Integer, GodBookModel> hasBooks;
	/**
	 * 战力
	 */
	private int strength;
	/**
	 * 技能
	 */
	private HashMap<Integer, Integer> skills;
	/**
	 * 套装(羁绊)
	 */
	private HashMap<Integer, Integer> taozhuangs;
	
	public GodBook() {
		super();
	}
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getWearid() {
		return wearid;
	}
	public void setWearid(int wearid) {
		this.wearid = wearid;
	}
	public HashMap<Integer, GodBookModel> getHasBooks() {
		return hasBooks;
	}
	public void setHasBooks(HashMap<Integer, GodBookModel> hasBooks) {
		this.hasBooks = hasBooks;
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
