package com.teamtop.system.bag;

import com.teamtop.util.db.trans.FieldOrder;
/**
 * 
 * 类名称：背包格子实体类
 *
 */
public class BagGrid {
	/**
	 * 物品系统ID
	 */
	@FieldOrder(order = 1)
	private int sysId;
	/**
	 * 物品唯一ID
	 */
	@FieldOrder(order = 2)
	private long unitId;
	/**
	 * 物品数量
	 */
	@FieldOrder(order = 3)
	private int num;
	/**
	 * 过期时间
	 */
	@FieldOrder(order = 4)
	private int expirationTime;
	/**
	 * 物品类型(不入库，只在背包满发邮件时用)
	 */
	private int type;
	
	public int getSysId() {
		return sysId;
	}
	public void setSysId(int sysId) {
		this.sysId = sysId;
	}
	public long getUnitId() {
		return unitId;
	}
	public void setUnitId(long unitId) {
		this.unitId = unitId;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getExpirationTime() {
		return expirationTime;
	}
	public void setExpirationTime(int expirationTime) {
		this.expirationTime = expirationTime;
	}
	/**不入库，只在背包满发邮件时用*/
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public BagGrid(){
		super();
	}
	public BagGrid(int sysId,long unitId,int num,int expirationTime){
		this.sysId = sysId;
		this.unitId = unitId;
		this.num = num;
		this.expirationTime = expirationTime;
	}
}
