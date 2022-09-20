package com.teamtop.system.chuangGuanYouLi.model;

import java.util.Map;

/**
 * 闯关有礼
 */
public class ChuangGuanYouLi {
	private long hid;
	private int targetID;//玩家当前目标ID
	private int targetState;//目标奖励领取状态
	private Map<Integer,Integer> taskMap;//任务数据  key：任务表ID  value：任务状态  
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getTargetID() {
		return targetID;
	}
	public void setTargetID(int targetID) {
		this.targetID = targetID;
	}
	public int getTargetState() {
		return targetState;
	}
	public void setTargetState(int targetState) {
		this.targetState = targetState;
	}
	public Map<Integer, Integer> getTaskMap() {
		return taskMap;
	}
	public void setTaskMap(Map<Integer, Integer> taskMap) {
		this.taskMap = taskMap;
	}
}