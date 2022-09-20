package com.teamtop.system.activity.ativitys.baoZangPinTu;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class BaoZangPinTu extends ActivityData {
	/** 任务信息 */
	private Map<Integer, TaskInfo> taskInfoMap;
	/** 宝箱信息 */
	private Map<Integer, Integer> boxInfoMap;

	public Map<Integer, TaskInfo> getTaskInfoMap() {
		return taskInfoMap;
	}

	public void setTaskInfoMap(Map<Integer, TaskInfo> taskInfoMap) {
		this.taskInfoMap = taskInfoMap;
	}

	public Map<Integer, Integer> getBoxInfoMap() {
		return boxInfoMap;
	}

	public void setBoxInfoMap(Map<Integer, Integer> boxInfoMap) {
		this.boxInfoMap = boxInfoMap;
	}
}
