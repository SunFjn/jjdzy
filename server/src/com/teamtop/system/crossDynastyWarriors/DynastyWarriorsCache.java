package com.teamtop.system.crossDynastyWarriors;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.system.crossDynastyWarriors.model.PondData;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.FieldOrder;
import com.teamtop.util.time.TimeDateUtil;

public class DynastyWarriorsCache {

	/**
	 * 活动阶段 (1:16强, 2:8强, 3:4强, 4:半决赛, 5:决赛)
	 */
	@FieldOrder(order = 1)
	private int actRound = 0;

	/** 状态时间 */
	@FieldOrder(order = 2)
	private int stateTime = 0;

	/**
	 * 活动状态（1：准备，2：战斗）
	 */
	@FieldOrder(order = 3)
	private int actState = 0;

	/**
	 * 已发下注奖励的轮
	 */
	@FieldOrder(order = 4)
	private int awardRound = 0;

	/**
	 * 比赛流程数据 key:阶段（1:16强, 2:8强, 3:4强, 4:半决赛, 5:决赛, 6:冠军）, value:分组
	 */
	@FieldOrder(order = 5)
	private Map<Integer, List<List<Long>>> matchMap = UC.reg("dynastyWarriorsMatchMap",
			new HashMap<Integer, List<List<Long>>>());

	/**
	 * 比赛录像数据 key:阶段（1:16强, 2:8强, 3:4强, 4:半决赛, 5:决赛, 6:冠军）, value:分组
	 */
	@FieldOrder(order = 6)
	private Map<Integer, Map<Integer, List<CrossHeroBaseModel>>> matchVideoMap = UC.reg("dynastyWarriorsMatchVideoMap",
			new HashMap<Integer, Map<Integer, List<CrossHeroBaseModel>>>());

	/***
	 * 下注集合 key:阶段（轮数），value:<key:, value:>
	 */
	@FieldOrder(order = 7)
	private Map<Integer, Map<Long, Set<Long>>> betMap = UC.reg("dynastyWarriorsBetMap",
			new HashMap<Integer, Map<Long, Set<Long>>>());

	/** 每轮战斗胜利者集合 */
	@FieldOrder(order = 8)
	private Map<Integer, List<Long>> roundWinnerMap = UC.reg("dynastyWarriorsRoundWinnerMap",
			new HashMap<Integer, List<Long>>());

	/** 淘汰列表 */
	@FieldOrder(order = 9)
	private Map<Integer, List<Long>> eliminateMap = UC.reg("dynastyWarriorsEliminateMap",
			new HashMap<Integer, List<Long>>());

	/**
	 * 参赛者数据 key:玩家id, value:玩家数据
	 */
	@FieldOrder(order = 10)
	private Map<Long, CrossHeroBaseModel> fighterMap = UC.reg("dynastyWarriorsFighterMap",
			new HashMap<Long, CrossHeroBaseModel>());

	/** 奖池缓存 */
	@FieldOrder(order = 11)
	private Map<Integer, PondData> pondMap = UC.reg("dynastyWarriorsPondMap", new HashMap<Integer, PondData>());

	@FieldOrder(order = 12)
	private Set<Integer> synSet = new HashSet<>();

	@FieldOrder(order = 13)
	private int partId;

	public int getActRound() {
		return actRound;
	}

	public void setActRound(int actRound) {
		this.actRound = actRound;
	}

	public int getStateTime() {
		return stateTime;
	}

	public void setStateTime(int stateTime) {
		stateTime = TimeDateUtil.getSecondZero(stateTime);
		this.stateTime = stateTime;
	}

	public int getActState() {
		return actState;
	}

	public void setActState(int actState) {
		this.actState = actState;
	}

	public int getAwardRound() {
		return awardRound;
	}

	public void setAwardRound(int awardRound) {
		this.awardRound = awardRound;
	}

	public Map<Integer, List<List<Long>>> getMatchMap() {
		return matchMap;
	}

	public void setMatchMap(Map<Integer, List<List<Long>>> matchMap) {
		this.matchMap.putAll(matchMap);
	}

	public Map<Integer, Map<Integer, List<CrossHeroBaseModel>>> getMatchVideoMap() {
		return matchVideoMap;
	}

	public void setMatchVideoMap(Map<Integer, Map<Integer, List<CrossHeroBaseModel>>> matchVideoMap) {
		this.matchVideoMap.putAll(matchVideoMap);
	}

	public Map<Integer, Map<Long, Set<Long>>> getBetMap() {
		return betMap;
	}

	public void setBetMap(Map<Integer, Map<Long, Set<Long>>> betMap) {
		this.betMap.putAll(betMap);
	}

	public Map<Integer, List<Long>> getRoundWinnerMap() {
		return roundWinnerMap;
	}

	public void setRoundWinnerMap(Map<Integer, List<Long>> roundWinnerMap) {
		this.roundWinnerMap.putAll(roundWinnerMap);
	}

	public Map<Integer, List<Long>> getEliminateMap() {
		return eliminateMap;
	}

	public void setEliminateMap(Map<Integer, List<Long>> eliminateMap) {
		this.eliminateMap.putAll(eliminateMap);
	}

	public Map<Long, CrossHeroBaseModel> getFighterMap() {
		return fighterMap;
	}

	public void setFighterMap(Map<Long, CrossHeroBaseModel> fighterMap) {
		this.fighterMap.putAll(fighterMap);
	}

	public Map<Integer, PondData> getPondMap() {
		return pondMap;
	}

	public void setPondMap(Map<Integer, PondData> pondMap) {
		this.pondMap.putAll(pondMap);
	}

	public Set<Integer> getSynSet() {
		return synSet;
	}

	public void setSynSet(Set<Integer> synSet) {
		this.synSet = synSet;
	}

	public int getPartId() {
		return partId;
	}

	public void setPartId(int partId) {
		this.partId = partId;
	}

}
