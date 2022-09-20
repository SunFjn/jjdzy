package com.teamtop.system.house.yanhui.model;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 
 * 宴会副本数据
 * 
 */
public class YanhuiBoss {
	/**
	 * 当前bossID 唯一id
	 */
	@FieldOrder(order = 1)
	private long unitBossId;
	/**
	 * boss 系统id
	 */
	@FieldOrder(order = 2)
	private int sysBossId;
	/**
	 * boss 状态：1.boss 已挑战
	 */
	@FieldOrder(order = 3)
	private int state;
	 
	public YanhuiBoss() {
		super();
	}




	public YanhuiBoss(long unitBossId, int sysBossId) {
		this.unitBossId = unitBossId;
		this.sysBossId=sysBossId;
	}




	public int getState() {
		return state;
	}




	public void setState(int state) {
		this.state = state;
	}




	public long getUnitBossId() {
		return unitBossId;
	}




	public void setUnitBossId(long unitBossId) {
		this.unitBossId = unitBossId;
	}




	public int getSysBossId() {
		return sysBossId;
	}




	public void setSysBossId(int sysBossId) {
		this.sysBossId = sysBossId;
	}
 
}
