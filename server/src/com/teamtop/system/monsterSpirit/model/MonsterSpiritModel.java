package com.teamtop.system.monsterSpirit.model;

import java.util.Map;

public class MonsterSpiritModel {

	private long hid;

	/**
	 * 兽灵数据
	 */
	private Map<Integer, MonsterSpiritInfo> monsterSpiritMap;

	/** 出战兽灵(1青龙2白虎3朱雀4玄武) */
	private int fightMonsterSpiri;
	/**
	 *  洗练总次数
	 */
	private int washNum;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, MonsterSpiritInfo> getMonsterSpiritMap() {
		return monsterSpiritMap;
	}

	public void setMonsterSpiritMap(Map<Integer, MonsterSpiritInfo> monsterSpiritMap) {
		this.monsterSpiritMap = monsterSpiritMap;
	}

	public int getFightMonsterSpiri() {
		return fightMonsterSpiri;
	}

	public void setFightMonsterSpiri(int fightMonsterSpiri) {
		this.fightMonsterSpiri = fightMonsterSpiri;
	}

	public int getWashNum() {
		return washNum;
	}

	public void setWashNum(int washNum) {
		this.washNum = washNum;
	}
	
	

}
