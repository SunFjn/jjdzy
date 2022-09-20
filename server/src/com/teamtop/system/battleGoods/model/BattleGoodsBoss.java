package com.teamtop.system.battleGoods.model;

public class BattleGoodsBoss {
	
	private int sysId;
	/**
	 * 当前状态0或者 1死亡
	 */
	private int state;
	/**
	 * 死亡时间+复活cd=》下次复活时间
	 */
	private int dieTime;

	public BattleGoodsBoss() {
		super();
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}


	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	public int getDieTime() {
		return dieTime;
	}

	public void setDieTime(int dieTime) {
		this.dieTime = dieTime;
	}


	

}
