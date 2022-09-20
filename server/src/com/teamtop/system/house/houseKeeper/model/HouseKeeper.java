package com.teamtop.system.house.houseKeeper.model;

/**
 * 家丁
 * 
 * @author
 *
 */

public class HouseKeeper {
	
	private long hid;
	/**
	 * 家丁id
	 */
	private int id;
	/**
	 * 家丁级数
	 */
	private int level;
	/**
	 * 当前经验
	 */
	private int curExp;
	/**
	 * 家丁系统总战力
	 */
	private long strength;


	public HouseKeeper() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getCurExp() {
		return curExp;
	}

	public void setCurExp(int curExp) {
		this.curExp = curExp;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}




	
	
	
}
