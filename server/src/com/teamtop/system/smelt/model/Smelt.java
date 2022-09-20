package com.teamtop.system.smelt.model;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 装备熔炼
 * @author lobbyer
 * @date 2017年3月31日
 */
public class Smelt {
	/**
	 * 阶数
	 */
	@FieldOrder(order = 1)
	private int level;
	/**
	 * 当前经验
	 */
	@FieldOrder(order = 2)
	private int exp;
	/**
	 * 总战力
	 */
	@FieldOrder(order = 3)
	private long totalStrength;
	/**
	 * 今日获取总经验值
	 */
	@FieldOrder(order = 4)
	private int todayMaxExp;
	
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getExp() {
		return exp;
	}
	public void setExp(int exp) {
		this.exp = exp;
	}
	public long getTotalStrength() {
		return totalStrength;
	}
	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}
	public Smelt(){
		super();
	}
	public Smelt(int level){
		super();
		this.level = level;
	}
	public int getTodayMaxExp() {
		return todayMaxExp;
	}
	public void setTodayMaxExp(int todayMaxExp) {
		this.todayMaxExp = todayMaxExp;
	}
	
	
}
