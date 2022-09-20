package com.teamtop.system.forge.model;

import com.teamtop.util.db.trans.FieldOrder;

public class ForgeModel {
	/**
	 * 强化位置
	 */
	@FieldOrder(order=1)
	private int part;
	/**
	 * 强化等级
	 */
	@FieldOrder(order=2)
	private int strengthen;
	/**
	 * 宝石等级
	 */
	@FieldOrder(order=3)
	private int[]  gemLevel;
	/**
	 * 升星等级
	 */
	@FieldOrder(order=4)
	private int  starLevel;
	/**
	 * 铸魂等级
	 */
	@FieldOrder(order=5)
	private int  zhuHunLevel;
	/**
	 * 铸魂经验
	 */
	@FieldOrder(order=6)
	private int  zhuHunExp;
	/**
	 * 炼魂等级
	 */
	@FieldOrder(order=7)
	private int  lianHunLevel;
	/**
	 * 炼魂经验
	 */
	@FieldOrder(order=8)
	private int  lianHunExp;
	
	
	
	public int getPart() {
		return part;
	}
	public void setPart(int part) {
		this.part = part;
	}
	public int getStrengthen() {
		return strengthen;
	}
	public void setStrengthen(int strengthen) {
		this.strengthen = strengthen;
	}
	public int[] getGemLevel() {
		return gemLevel;
	}
	public void setGemLevel(int[] gemLevel) {
		this.gemLevel = gemLevel;
	}
	public int getStarLevel() {
		return starLevel;
	}
	public void setStarLevel(int starLevel) {
		this.starLevel = starLevel;
	}
	public int getZhuHunLevel() {
		return zhuHunLevel;
	}
	public void setZhuHunLevel(int zhuHunLevel) {
		this.zhuHunLevel = zhuHunLevel;
	}
	public int getZhuHunExp() {
		return zhuHunExp;
	}
	public void setZhuHunExp(int zhuHunExp) {
		this.zhuHunExp = zhuHunExp;
	}
	public int getLianHunLevel() {
		return lianHunLevel;
	}
	public void setLianHunLevel(int lianHunLevel) {
		this.lianHunLevel = lianHunLevel;
	}
	public int getLianHunExp() {
		return lianHunExp;
	}
	public void setLianHunExp(int lianHunExp) {
		this.lianHunExp = lianHunExp;
	}
	
	
	

	
}
