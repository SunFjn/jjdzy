package com.teamtop.system.house.maid.model;
/**
 * 侍女
 * @author 
 *
 */

import java.util.HashMap;

public class Maid {
	
	private long hid;
	/**
	 * 已激活侍女 key 侍女表的序号
	 */
	private HashMap<Integer, MaidModel> maidMap;
	/**
	 * 侍女系统总战力
	 */
	private long strength;
	/**
	 * 使用形象
	 */
	private int useMaid;

	public Maid() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public HashMap<Integer, MaidModel> getMaidMap() {
		return maidMap;
	}

	public void setMaidMap(HashMap<Integer, MaidModel> maidMap) {
		this.maidMap = maidMap;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public int getUseMaid() {
		return useMaid;
	}

	public void setUseMaid(int useMaid) {
		this.useMaid = useMaid;
	}



	
	
	
}
