package com.teamtop.system.activity.ativitys.arenaFight.model;

import java.util.concurrent.ConcurrentHashMap;

public class PartArenaFightMaster {

	private ConcurrentHashMap<Integer, ArenaFightMasterInfo> arenaMap = new ConcurrentHashMap<>();

//	private int startTime;
//
//	private int endTime;
//
//	private int opState;

	public ConcurrentHashMap<Integer, ArenaFightMasterInfo> getArenaMap() {
		return arenaMap;
	}

	public void setArenaMap(ConcurrentHashMap<Integer, ArenaFightMasterInfo> arenaMap) {
		this.arenaMap = arenaMap;
	}

//	public int getStartTime() {
//		return startTime;
//	}
//
//	public void setStartTime(int startTime) {
//		this.startTime = startTime;
//	}
//
//	public int getEndTime() {
//		return endTime;
//	}
//
//	public void setEndTime(int endTime) {
//		this.endTime = endTime;
//	}
//
//	public int getOpState() {
//		return opState;
//	}
//
//	public void setOpState(int opState) {
//		this.opState = opState;
//	}

}
