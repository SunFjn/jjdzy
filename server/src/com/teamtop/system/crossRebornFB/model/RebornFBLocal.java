package com.teamtop.system.crossRebornFB.model;

import java.util.Map;

public class RebornFBLocal {
	private long hid;
	private int helpNum;
	private Map<Integer,BatterInfo> batterInfoMap;
	private int teamID;//不入库，聊天频道进入中央服用的队伍ID
	private int timeBuilTeam;//不入库，创建队伍冷却时间
	
	public RebornFBLocal() {
		
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getHelpNum() {
		return helpNum;
	}

	public void setHelpNum(int helpNum) {
		this.helpNum = helpNum;
	}

	public Map<Integer, BatterInfo> getBatterInfoMap() {
		return batterInfoMap;
	}

	public void setBatterInfoMap(Map<Integer, BatterInfo> batterInfoMap) {
		this.batterInfoMap = batterInfoMap;
	}

	public int getTeamID() {
		return teamID;
	}

	public void setTeamID(int teamID) {
		this.teamID = teamID;
	}

	public int getTimeBuilTeam() {
		return timeBuilTeam;
	}

	public void setTimeBuilTeam(int timeBuilTeam) {
		this.timeBuilTeam = timeBuilTeam;
	}
}
