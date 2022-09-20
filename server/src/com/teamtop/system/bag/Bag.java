package com.teamtop.system.bag;

import java.util.HashMap;
import java.util.Map;

/**
 * 背包
 * @author Administrator
 *
 */
public class Bag {
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 道具数据
	 */
	private Map<Integer, BagGrid> itemData;
	/**
	 * 已开启的格子数
	 */
	private int openGrid;
	/**
	 * 2级密码
	 */
	private String secondPsd;
	/**
	 * 是否创角
	 */
	private boolean isCreate;
	/**
	 * 每日道具
	 */
	private Map<Integer, Long> dailyItemNum = new HashMap<>();
	
	public Bag() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, BagGrid> getItemData() {
		return itemData;
	}
	public void setItemData(Map<Integer, BagGrid> itemData) {
		this.itemData = itemData;
	}
	public int getOpenGrid() {
		return openGrid;
	}
	public void setOpenGrid(int openGrid) {
		this.openGrid = openGrid;
	}
	public String getSecondPsd() {
		return secondPsd;
	}
	public void setSecondPsd(String secondPsd) {
		this.secondPsd = secondPsd;
	}
	public boolean isCreate() {
		return isCreate;
	}
	public void setCreate(boolean isCreate) {
		this.isCreate = isCreate;
	}
	public Map<Integer, Long> getDailyItemNum() {
		return dailyItemNum;
	}
	public void setDailyItemNum(Map<Integer, Long> dailyItemNum) {
		this.dailyItemNum = dailyItemNum;
	}
	
}
