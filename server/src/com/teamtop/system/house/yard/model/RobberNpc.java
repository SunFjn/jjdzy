package com.teamtop.system.house.yard.model;

import com.teamtop.util.db.trans.FieldOrder;

public class RobberNpc {

	@FieldOrder(order = 1)
	private long unitid;
	@FieldOrder(order = 2)
	private int state;
	@FieldOrder(order = 3)
	private int pox;
	@FieldOrder(order = 4)
	private int poy;
	@FieldOrder(order = 5)
	private int sysId;
	@FieldOrder(order = 6)
	private long enemyHid;
	@FieldOrder(order = 7)
	private int atkTime;

	public RobberNpc() {
		super();
	}

	public long getUnitid() {
		return unitid;
	}

	public void setUnitid(long unitid) {
		this.unitid = unitid;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getPox() {
		return pox;
	}

	public void setPox(int pox) {
		this.pox = pox;
	}

	public int getPoy() {
		return poy;
	}

	public void setPoy(int poy) {
		this.poy = poy;
	}

	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	public long getEnemyHid() {
		return enemyHid;
	}

	public void setEnemyHid(long enemyHid) {
		this.enemyHid = enemyHid;
	}

	public int getAtkTime() {
		return atkTime;
	}

	public void setAtkTime(int atkTime) {
		this.atkTime = atkTime;
	}

}
