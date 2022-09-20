package com.teamtop.system.crossTrial.cross;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.util.cache.union.UC;

public class CrossTrialSaveCache {

	/**
	 * key:区号，value:第几名的战力
	 */
	private Map<Integer, Long> standardMap = UC.reg("crossTrialStandardMap", new HashMap<>());

	/**
	 * 平均战力
	 */
	public long averageStrength = 100000000;

	/**
	 * 第一次数据同步处理
	 */
	public int first = 0;

	/**
	 * key:层数，value:对应层可随机的玩家
	 */
	private Map<Integer, Map<Integer, List<Long>>> floorMatchMap = UC.reg("crossTrialStandardMap", new HashMap<>());

	/**
	 * 战斗对象集合
	 */
	private Map<Long, CrossHeroBaseModel> fightMap = UC.reg("crossTrialFightMap", new HashMap<>());

	public Map<Integer, Long> getStandardMap() {
		return standardMap;
	}

	public void setStandardMap(Map<Integer, Long> standardMap) {
		this.standardMap = standardMap;
	}

	public long getAverageStrength() {
		return averageStrength;
	}

	public void setAverageStrength(long averageStrength) {
		this.averageStrength = averageStrength;
	}

	public Map<Integer, Map<Integer, List<Long>>> getFloorMatchMap() {
		return floorMatchMap;
	}

	public void setFloorMatchMap(Map<Integer, Map<Integer, List<Long>>> floorMatchMap) {
		this.floorMatchMap = floorMatchMap;
	}

	public Map<Long, CrossHeroBaseModel> getFightMap() {
		return fightMap;
	}

	public void setFightMap(Map<Long, CrossHeroBaseModel> fightMap) {
		this.fightMap = fightMap;
	}

	public int getFirst() {
		return first;
	}

	public void setFirst(int first) {
		this.first = first;
	}

}
