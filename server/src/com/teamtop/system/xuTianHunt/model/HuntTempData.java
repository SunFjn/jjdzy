package com.teamtop.system.xuTianHunt.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HuntTempData {

	/**
	 * 狩猎仓库数据
	 */
	private List<int[][]> rewardList = new ArrayList<>();

	/**
	 * 开始狩猎的时间
	 */
	private int startTime;

	/**
	 * 箭矢数量
	 */
	private int arrowNum;

	/**
	 * 狩猎结束时间
	 */
	private int endTime;

	/**
	 * buff猎物
	 */
	private Map<Integer, Integer> buffMap = new HashMap<>();

	/**
	 * 奖励猎物
	 */
	private Map<Integer, Integer> preyMap = new HashMap<>();

	/**
	 * 增加的概率
	 */
	private Map<Integer, int[]> buffEffect = new HashMap<>();

	public List<int[][]> getRewardList() {
		return rewardList;
	}

	public void setRewardList(List<int[][]> rewardList) {
		this.rewardList = rewardList;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public int getArrowNum() {
		return arrowNum;
	}

	public void setArrowNum(int arrowNum) {
		this.arrowNum = arrowNum;
	}

	public int getEndTime() {
		return endTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

	public Map<Integer, Integer> getBuffMap() {
		return buffMap;
	}

	public void setBuffMap(Map<Integer, Integer> buffMap) {
		this.buffMap = buffMap;
	}

	public Map<Integer, Integer> getPreyMap() {
		return preyMap;
	}

	public void setPreyMap(Map<Integer, Integer> preyMap) {
		this.preyMap = preyMap;
	}

	public Map<Integer, int[]> getBuffEffect() {
		return buffEffect;
	}

	public void setBuffEffect(Map<Integer, int[]> buffEffect) {
		this.buffEffect = buffEffect;
	}

}
