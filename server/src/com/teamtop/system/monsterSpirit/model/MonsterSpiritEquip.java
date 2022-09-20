package com.teamtop.system.monsterSpirit.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class MonsterSpiritEquip {

	/**
	 * 装备id
	 */
	@FieldOrder(order = 1)
	private int equipId;

	/**
	 * key:印记位置, value:印记信息
	 */
	@FieldOrder(order = 2)
	private Map<Integer, StampData> stampMap = new HashMap<Integer, StampData>();

	/**
	 * 已洗练次数
	 */
	@FieldOrder(order = 3)
	private int washTimes;

	/**
	 * 待替换印记
	 */
	@FieldOrder(order = 4)
	private Map<Integer, StampData> tempStampMap = new HashMap<Integer, StampData>();

	/**
	 * 记录最高星级套装属性 1-10星
	 */
	@FieldOrder(order = 5)
	private int start;
	/**
	 * 记录同套装属性 4为该类型的套装属性永久激活
	 */
	@FieldOrder(order = 6)
	private int state;

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getEquipId() {
		return equipId;
	}

	public void setEquipId(int equipId) {
		this.equipId = equipId;
	}

	public Map<Integer, StampData> getStampMap() {
		return stampMap;
	}

	public void setStampMap(Map<Integer, StampData> stampMap) {
		this.stampMap = stampMap;
	}

	public int getWashTimes() {
		return washTimes;
	}

	public void setWashTimes(int washTimes) {
		this.washTimes = washTimes;
	}

	public Map<Integer, StampData> getTempStampMap() {
		return tempStampMap;
	}

	public void setTempStampMap(Map<Integer, StampData> tempStampMap) {
		this.tempStampMap = tempStampMap;
	}

}
