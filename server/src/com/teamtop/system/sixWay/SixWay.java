package com.teamtop.system.sixWay;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;


public class SixWay {
	
	private long hid;
	/**
	 * 总战力
	 */
	private int str;
	/**
	 * 激活的组合数
	 */
	private HashMap<Integer, Integer> zuhenum=new HashMap<>();
	/**
	 * 背包
	 */
	private ConcurrentHashMap<Integer, SixWayEquip> bagData = new ConcurrentHashMap<Integer, SixWayEquip>();

	/**
	 * 装备栏的位置索引 	value:装备印记
	 */
	private ConcurrentHashMap<Integer,SixWayEquip> bodyData = new ConcurrentHashMap<Integer,SixWayEquip>();
	
	

	public SixWay() {
		super();
	}

	
	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}


	public ConcurrentHashMap<Integer, SixWayEquip> getBagData() {
		return bagData;
	}

	public void setBagData(ConcurrentHashMap<Integer, SixWayEquip> bagData) {
		this.bagData = bagData;
	}

	public ConcurrentHashMap<Integer, SixWayEquip> getBodyData() {
		return bodyData;
	}

	public void setBodyData(ConcurrentHashMap<Integer, SixWayEquip> bodyData) {
		this.bodyData = bodyData;
	}

	public int getStr() {
		return str;
	}

	public void setStr(int str) {
		this.str = str;
	}

	public HashMap<Integer, Integer> getZuhenum() {
		return zuhenum;
	}

	public void setZuhenum(HashMap<Integer, Integer> zuhenum) {
		this.zuhenum = zuhenum;
	}

	
	

}
