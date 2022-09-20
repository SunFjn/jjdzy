package com.teamtop.system.promotion.model;

import java.util.Map;
import java.util.Set;

public class PromotionModel {

	private long hid;

	/** 当前等级 */
	private int level;

	/** 积累经验 */
	private int exp;

	/** 已领取的晋级奖励 */
	private Set<Integer> levelReward;

	/** 
	 * 任务信息 
	 * key:任务id value:任务信息
	 **/
	private Map<Integer, TaskInfo> taskMap;
	
	/** 
	 * 分支任务
	 * key:teamId, value:taskId 
	 **/
	private Map<Integer, Integer> teamTask;
	
	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

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

	public Set<Integer> getLevelReward() {
		return levelReward;
	}

	public void setLevelReward(Set<Integer> levelReward) {
		this.levelReward = levelReward;
	}

	public Map<Integer, TaskInfo> getTaskMap() {
		return taskMap;
	}

	public void setTaskMap(Map<Integer, TaskInfo> taskMap) {
		this.taskMap = taskMap;
	}

	public Map<Integer, Integer> getTeamTask() {
		return teamTask;
	}

	public void setTeamTask(Map<Integer, Integer> teamTask) {
		this.teamTask = teamTask;
	}

}
