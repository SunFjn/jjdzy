package com.teamtop.system.crossKing.model;

import com.teamtop.util.db.trans.FieldOrder;

public class CrossKingInfo {
	@FieldOrder(order = 1)
	private int id;
	/**
	 * 赛季号
	 */
	@FieldOrder(order = 2)
	private int term;
	/**
	 * 活动状态（0初赛关闭1初赛开启）
	 *
	 */
	@FieldOrder(order = 3)
	private int state;
	/**
	 * 开启时间
	 */
	@FieldOrder(order = 4)
	private int startTime;
	/**
	 * 结束时间
	 */
	@FieldOrder(order = 5)
	private int endTime;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTerm() {
		return term;
	}
	public void setTerm(int term) {
		this.term = term;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getStartTime() {
		return startTime;
	}
	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}
	public int getEndTime() {
		return endTime;
	}
	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}
	public CrossKingInfo(){
		super();
	}
	public CrossKingInfo(int term) {
		super();
		this.term = term;
	}

}
