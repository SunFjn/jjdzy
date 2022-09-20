package com.teamtop.system.activity.ativitys.arenaFight.cross;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.system.activity.ativitys.arenaFight.model.ArenaFightModel;
import com.teamtop.system.activity.ativitys.arenaFight.model.PartArenaFightMaster;

public class CrossAreanSave {

	/**
	 * 分组擂台数据
	 */
	private ConcurrentHashMap<Integer, PartArenaFightMaster> partArenaMap = new ConcurrentHashMap<>();

	/**
	 * 玩家活动数据
	 */
	private ConcurrentHashMap<Long, ArenaFightModel> heroArenaMap = new ConcurrentHashMap<>();

	/**
	 * 玩家镜像数据
	 */
	private ConcurrentHashMap<Long, CrossHeroBaseModel> heroFightMap = new ConcurrentHashMap<>();

	/**
	 * 活动开始时间
	 */
	public int startTime;

	/**
	 * 活动结束时间
	 */
	public int endTime;

	/**
	 * 小阶段开启状态
	 */
	public int opState;

	/**
	 * 期数
	 */
	public int qs;

	public ConcurrentHashMap<Integer, PartArenaFightMaster> getPartArenaMap() {
		return partArenaMap;
	}

	public void setPartArenaMap(ConcurrentHashMap<Integer, PartArenaFightMaster> partArenaMap) {
		this.partArenaMap = partArenaMap;
	}

	public ConcurrentHashMap<Long, ArenaFightModel> getHeroArenaMap() {
		return heroArenaMap;
	}

	public void setHeroArenaMap(ConcurrentHashMap<Long, ArenaFightModel> heroArenaMap) {
		this.heroArenaMap = heroArenaMap;
	}

	public ConcurrentHashMap<Long, CrossHeroBaseModel> getHeroFightMap() {
		return heroFightMap;
	}

	public void setHeroFightMap(ConcurrentHashMap<Long, CrossHeroBaseModel> heroFightMap) {
		this.heroFightMap = heroFightMap;
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

	public int getOpState() {
		return opState;
	}

	public void setOpState(int opState) {
		this.opState = opState;
	}

	public int getQs() {
		return qs;
	}

	public void setQs(int qs) {
		this.qs = qs;
	}

}
