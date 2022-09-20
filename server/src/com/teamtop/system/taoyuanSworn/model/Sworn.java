package com.teamtop.system.taoyuanSworn.model;

import java.util.Map;
import java.util.Set;

/**
 * 个人桃园结义信息
 */
public class Sworn {
	/** 玩家id */
	private long hid;
	/**退出需置0  桃园结义id：0.未加入*/
	private long taoyuanSwornId;
	/**每天需重置： 已领取任务奖励 <任务id,<奖励序号1-3,1可领2已领>>*/
	private Map<Integer,Map<Integer,Integer>> taskAwardState;
	/**每天需重置：BOSS奖励领取状态: 0.条件不符 1.可领 2.已领*/
	private int bossAwardState;
	/**申请桃园结义<桃园结义id>，登录处理：加入/拒绝需删除*/
	private Set<Long> apply;
	
	public Set<Long> getApply() {
		return apply;
	}
	public void setApply(Set<Long> apply) {
		this.apply = apply;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getTaoyuanSwornId() {
		return taoyuanSwornId;
	}
	public void setTaoyuanSwornId(long taoyuanSwornId) {
		this.taoyuanSwornId = taoyuanSwornId;
	}
	
	public Map<Integer, Map<Integer, Integer>> getTaskAwardState() {
		return taskAwardState;
	}
	public void setTaskAwardState(Map<Integer, Map<Integer, Integer>> taskAwardState) {
		this.taskAwardState = taskAwardState;
	}
	public int getBossAwardState() {
		return bossAwardState;
	}
	public void setBossAwardState(int bossAwardState) {
		this.bossAwardState = bossAwardState;
	}
}
