package com.teamtop.system.destiny.model;

import java.util.concurrent.ConcurrentHashMap;



/**
 * 玩家心法天命总类
 * @author subo
 *
 */
public class PersonalDestiny {
	
	private long hid;
	/**
	 * 每日免费元宝次数
	 */
	private int feelNum;
	/**
	 * 每日铜钱抽取
	 */
	private int coinNum;
	/***
	 * 元宝抽取次数
	 */
	private int yuanbaoNum;
	/**
	 * 幸运值
	 */
	private int luckNum;
	/**
	 * 背包天命数据  key:背包位置索引  value:背包类天命
	 */
	
	private ConcurrentHashMap<Integer, DestinyBagData> bagData = new ConcurrentHashMap<Integer, DestinyBagData>();
	
	/**
	 * 装备天命数据  key1:装备的将领ID,角色为0；key2:装备栏的位置索引 	value:装备天命类
	 */

	private ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,DestinyBagData>> bodyData = new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,DestinyBagData>>();
	
	/**
	 * 符文大师id,为0表示未激活
	 */
	private	int destinyMasterId=0;
	/**
	 * 神符兑换
	 */
	private ConcurrentHashMap<Integer, Integer> godFuChange=new ConcurrentHashMap<>();
	
	public PersonalDestiny() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getFeelNum() {
		return feelNum;
	}

	public void setFeelNum(int feelNum) {
		this.feelNum = feelNum;
	}

	public int getCoinNum() {
		return coinNum;
	}

	public void setCoinNum(int coinNum) {
		this.coinNum = coinNum;
	}

	public int getYuanbaoNum() {
		return yuanbaoNum;
	}

	public void setYuanbaoNum(int yuanbaoNum) {
		this.yuanbaoNum = yuanbaoNum;
	}

	public ConcurrentHashMap<Integer, DestinyBagData> getBagData() {
		return bagData;
	}

	public void setBagData(ConcurrentHashMap<Integer, DestinyBagData> bagData) {
		this.bagData = bagData;
	}

	public ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, DestinyBagData>> getBodyData() {
		return bodyData;
	}

	public void setBodyData(ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, DestinyBagData>> bodyData) {
		this.bodyData = bodyData;
	}
	public int getLuckNum() {
		return luckNum;
	}
	public void setLuckNum(int luckNum) {
		this.luckNum = luckNum;
	}

	public int getDestinyMasterId() {
		return destinyMasterId;
	}

	public void setDestinyMasterId(int destinyMasterId) {
		this.destinyMasterId = destinyMasterId;
	}

	public ConcurrentHashMap<Integer, Integer> getGodFuChange() {
		return godFuChange;
	}

	public void setGodFuChange(ConcurrentHashMap<Integer, Integer> godFuChange) {
		this.godFuChange = godFuChange;
	}
	
	

}
