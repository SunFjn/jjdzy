package com.teamtop.system.battleGoods.model;

public class BattleGoodsNpc {

	private long unitid;
	
	private int state;
	
	private int pox;
	
	private int poy;
	
	private int sysId;
	
	private long enemyHid;
	
	private int isBoss;
	

	public BattleGoodsNpc() {
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

	public int getIsBoss() {
		return isBoss;
	}

	public void setIsBoss(int isBoss) {
		this.isBoss = isBoss;
	}
	
	

}
