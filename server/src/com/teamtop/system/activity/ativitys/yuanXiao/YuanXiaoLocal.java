package com.teamtop.system.activity.ativitys.yuanXiao;

import java.util.HashMap;

import com.teamtop.system.activity.model.ActivityData;

public class YuanXiaoLocal extends ActivityData {
	/**
	 * 已经领取材料次数
	 */
	private int hasGetNum;
	/**
	 * 可以免费获取材料次数
	 */
	private int freeNum;
	/**
	 * 上次添加免费材料次数时间
	 */
	private int addNumTime;

	/**
	 * 抢夺次数
	 */
	private int battleNum;
	/**
	 * 材料次数
	 */
	private HashMap<Integer, Integer> cailiaoMap;
	/**
	 * 上次 免费刷新时间 
	 */
	private int freeReshTime;
	
	
	
	public YuanXiaoLocal() {
		super();
	}
	
	public int getHasGetNum() {
		return hasGetNum;
	}
	public void setHasGetNum(int hasGetNum) {
		this.hasGetNum = hasGetNum;
	}
	public int getFreeNum() {
		return freeNum;
	}
	public void setFreeNum(int freeNum) {
		this.freeNum = freeNum;
	}
	public int getAddNumTime() {
		return addNumTime;
	}
	public void setAddNumTime(int addNumTime) {
		this.addNumTime = addNumTime;
	}

	public int getBattleNum() {
		return battleNum;
	}

	public void setBattleNum(int battleNum) {
		this.battleNum = battleNum;
	}

	public HashMap<Integer, Integer> getCailiaoMap() {
		return cailiaoMap;
	}

	public void setCailiaoMap(HashMap<Integer, Integer> cailiaoMap) {
		this.cailiaoMap = cailiaoMap;
	}
	public int getFreeReshTime() {
		return freeReshTime;
	}
	public void setFreeReshTime(int freeReshTime) {
		this.freeReshTime = freeReshTime;
	}
	
	

}
