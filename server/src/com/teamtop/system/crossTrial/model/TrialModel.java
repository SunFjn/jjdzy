package com.teamtop.system.crossTrial.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.upload.CrossHeroBaseModel;

public class TrialModel {

	/**
	 * 玩家iD
	 */
	private long hid;

	/**
	 * 当前层
	 */
	private int floor;

	/**
	 * 已通关层
	 */
	private int passFloor;

	/**
	 * 试炼点
	 */
	private int trailPoint;

	/**
	 * buff 临时属性
	 */
	private List<int[]> buffAttr = new ArrayList<>();
	
	/**
	 * 领取宝箱次数
	 * key:层数, value:领宝箱次数
	 */
	private Map<Integer, Integer> getChestMap = new HashMap<>();
	
	/**
	 * buff层刷新的buff
	 * key:类型,value:属性
	 */
	private Map<Integer, SelectBuff> buffMap = new HashMap<>();

	/**
	 * 类型对手数据
	 * key:类型,value:玩家id
	 */
	private Map<Integer, Long> enemyMap = new HashMap<>();

	/**
	 * 对手数据
	 * key:,value:
	 */
	private Map<Integer, CrossHeroBaseModel> enemyDetialMap = new HashMap<>();

	/**
	 * 在打类型
	 */
	private int fightType;

	/**
	 * 历史最高层
	 */
	private int historyFloor;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getFloor() {
		return floor;
	}

	public void setFloor(int floor) {
		this.floor = floor;
	}

	public int getPassFloor() {
		return passFloor;
	}

	public void setPassFloor(int passFloor) {
		this.passFloor = passFloor;
	}

	public int getTrailPoint() {
		return trailPoint;
	}

	public void setTrailPoint(int trailPoint) {
		this.trailPoint = trailPoint;
	}

	public List<int[]> getBuffAttr() {
		return buffAttr;
	}

	public void setBuffAttr(List<int[]> buffAttr) {
		this.buffAttr = buffAttr;
	}

	public Map<Integer, Integer> getGetChestMap() {
		return getChestMap;
	}

	public void setGetChestMap(Map<Integer, Integer> getChestMap) {
		this.getChestMap = getChestMap;
	}

	public Map<Integer, SelectBuff> getBuffMap() {
		return buffMap;
	}

	public void setBuffMap(Map<Integer, SelectBuff> buffMap) {
		this.buffMap = buffMap;
	}

	public Map<Integer, Long> getEnemyMap() {
		return enemyMap;
	}

	public void setEnemyMap(Map<Integer, Long> enemyMap) {
		this.enemyMap = enemyMap;
	}

	public Map<Integer, CrossHeroBaseModel> getEnemyDetialMap() {
		return enemyDetialMap;
	}

	public void setEnemyDetialMap(Map<Integer, CrossHeroBaseModel> enemyDetialMap) {
		this.enemyDetialMap = enemyDetialMap;
	}

	public int getFightType() {
		return fightType;
	}

	public void setFightType(int fightType) {
		this.fightType = fightType;
	}

	public int getHistoryFloor() {
		return historyFloor;
	}

	public void setHistoryFloor(int historyFloor) {
		this.historyFloor = historyFloor;
	}

}
