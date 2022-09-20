package com.teamtop.system.guardArea.model;

import java.util.Map;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

public class GuardArea extends CacheModel {
	/*** 玩家id */
	@FieldOrder(order = 1)
	private long hid;
	/*** 城池信息 */
	@FieldOrder(order = 2)
	private Map<Integer, CityInfo> cityInfoMap;
	/*** 掠夺信息 */
	@FieldOrder(order = 3)
	private Map<Integer, Long> plunderMap;
	/** 所属区号 */
	@FieldOrder(order = 4)
	private int belongZoneid;

	public GuardArea() {
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, CityInfo> getCityInfoMap() {
		return cityInfoMap;
	}

	public void setCityInfoMap(Map<Integer, CityInfo> cityInfoMap) {
		this.cityInfoMap = cityInfoMap;
	}

	public Map<Integer, Long> getPlunderMap() {
		return plunderMap;
	}

	public void setPlunderMap(Map<Integer, Long> plunderMap) {
		this.plunderMap = plunderMap;
	}

	public int getBelongZoneid() {
		return belongZoneid;
	}

	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}

}
