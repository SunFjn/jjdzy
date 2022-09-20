package com.teamtop.system.activity.ativitys.arenaFight.model;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.upload.CrossHeroBaseModel;

public class ArenaFightMasterInfo {

	/**
	 * 擂台id
	 */
	private int id;

	/**
	 * 擂主id
	 */
	private long masterId;

	/**
	 * npc
	 */
	private int npcId;

	/**
	 * 擂主
	 */
	private CrossHeroBaseModel master;

	/**
	 * 位置协助者
	 */
	private ConcurrentHashMap<Integer, CrossHeroBaseModel> helperMap = new ConcurrentHashMap<>();

	/**
	 * 协助者id集合
	 */
	private Set<Long> helperSet = new HashSet<>();

	/**
	 * 擂主更新时间
	 */
	private int updateTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public long getMasterId() {
		return masterId;
	}

	public void setMasterId(long masterId) {
		this.masterId = masterId;
	}

	public int getNpcId() {
		return npcId;
	}

	public void setNpcId(int npcId) {
		this.npcId = npcId;
	}

	public CrossHeroBaseModel getMaster() {
		return master;
	}

	public void setMaster(CrossHeroBaseModel master) {
		this.master = master;
	}

	public ConcurrentHashMap<Integer, CrossHeroBaseModel> getHelperMap() {
		return helperMap;
	}

	public void setHelperMap(ConcurrentHashMap<Integer, CrossHeroBaseModel> helperMap) {
		this.helperMap = helperMap;
	}

	public Set<Long> getHelperSet() {
		return helperSet;
	}

	public void setHelperSet(Set<Long> helperSet) {
		this.helperSet = helperSet;
	}

	public int getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(int updateTime) {
		this.updateTime = updateTime;
	}

}
