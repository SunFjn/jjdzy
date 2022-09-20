package com.teamtop.system.crossKing.model;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 最终段位奖励
 * @author lobbyer
 * @date 2016年8月23日
 */
public class CrossKingAward {
	/**
	 * 本赛季最大段位
	 */
	@FieldOrder(order = 1)
	private int maxduanwei;
	/**
	 * 等级段
	 */
	@FieldOrder(order = 2)
	private int lvType;
	/**
	 * 排行
	 */
	@FieldOrder(order = 3)
	private int rank;
	/**
	 * 角色id
	 */
	@FieldOrder(order = 4)
	private long rid;
	/**
	 * 角色名
	 */
	@FieldOrder(order = 5)
	private String name;
	
	
	public int getMaxduanwei() {
		return maxduanwei;
	}
	public void setMaxduanwei(int maxduanwei) {
		this.maxduanwei = maxduanwei;
	}
	
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public int getLvType() {
		return lvType;
	}
	public void setLvType(int lvType) {
		this.lvType = lvType;
	}
	public long getRid() {
		return rid;
	}
	public void setRid(long rid) {
		this.rid = rid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public CrossKingAward(){
		super();
	}
	public CrossKingAward(int maxduanwei,int lvType,int rank,long rid,String name) {
		super();
		this.maxduanwei = maxduanwei;
		this.lvType = lvType;
		this.rank = rank;
		this.rid = rid;
		this.name = name;
	}
	
}
