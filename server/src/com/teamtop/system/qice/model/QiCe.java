package com.teamtop.system.qice.model;
/**
 * 奇策
 * @author 
 *
 */

import java.util.HashMap;

public class QiCe {
	
	private long hid;
	/**
	 * 已激活奇策 key 奇策表的序号
	 */
	private HashMap<Integer, QiCeModel> qiCeMap;
	/**
	 * 奇策套装(套装等级)
	 */
	private int taozhuangLv;
	/**
	 * 奇策系统总战力
	 */
	private long strength;

	public QiCe() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public HashMap<Integer, QiCeModel> getQiCeMap() {
		return qiCeMap;
	}

	public void setQiCeMap(HashMap<Integer, QiCeModel> qiCeMap) {
		this.qiCeMap = qiCeMap;
	}

	public int getTaozhuangLv() {
		return taozhuangLv;
	}

	public void setTaozhuangLv(int taozhuangLv) {
		this.taozhuangLv = taozhuangLv;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}




	
	
	
}
