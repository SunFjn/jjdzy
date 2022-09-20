package com.teamtop.system.queue;

import java.io.Serializable;

/**
 * 游戏非瞬时事务
 */
public class Queue  implements Serializable {

	private static final long serialVersionUID = 5976543902911444760L;

	/**
	 * 事务id
	 */
	private long id;

	/**
	 * 事务类型
	 */
	private int type;

	/**
	 * 开始时间
	 */
	private Long startTime;
	

	/**
	 * 结束时间
	 */
	private Long endTime;

	/**
	 * <li>事务所带参数,根据事务类型有不同的含义
	 * <li>多个参数以|区分
	 */
	private String params;


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public int getType() {
		return type;
	}


	public void setType(int type) {
		this.type = type;
	}


	public Long getEndTime() {
		return endTime;
	}


	public void setEndTime(Long endTime) {
		this.endTime = endTime;
	}


	public Long getStartTime() {
		return startTime;
	}


	public void setStartTime(Long startTime) {
		this.startTime = startTime;
	}


	public String getParams() {
		return params;
	}


	public void setParams(String params) {
		this.params = params;
	}
}
