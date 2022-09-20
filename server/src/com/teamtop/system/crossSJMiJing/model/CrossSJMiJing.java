package com.teamtop.system.crossSJMiJing.model;

import java.util.Map;

public class CrossSJMiJing {

	private long hid;
	private Map<Integer,Integer> miJingIDMap;//秘境已通关id，每种秘境只保存一个ID  key：id  value：无
	private Map<Integer,Integer> boxMap;//盒子购买状态,购买才加到map中  key：秘境ID  value:0默认  1已购买
	private Map<Integer,Integer> saoDangMap;//扫荡次数  key：秘境类型  value:已扫荡次数
	private int numHelpAwards;//已协助奖励次数
	private int timeBuilTeam;//不入库，分钟操作过于频繁
	private int fristId;//不入库，首次进入中央服用的副本ID
	private int teamID;//不入库，聊天频道进入中央服用的队伍ID
	private boolean isDouble;//不入库，是否双倍奖励
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public Map<Integer, Integer> getMiJingIDMap() {
		return miJingIDMap;
	}
	public void setMiJingIDMap(Map<Integer, Integer> miJingIDMap) {
		this.miJingIDMap = miJingIDMap;
	}
	public int getTimeBuilTeam() {
		return timeBuilTeam;
	}
	public void setTimeBuilTeam(int timeBuilTeam) {
		this.timeBuilTeam = timeBuilTeam;
	}
	public int getFristId() {
		return fristId;
	}
	public void setFristId(int fristId) {
		this.fristId = fristId;
	}
	public int getTeamID() {
		return teamID;
	}
	public void setTeamID(int teamID) {
		this.teamID = teamID;
	}
	public Map<Integer, Integer> getBoxMap() {
		return boxMap;
	}
	public void setBoxMap(Map<Integer, Integer> boxMap) {
		this.boxMap = boxMap;
	}
	public int getNumHelpAwards() {
		return numHelpAwards;
	}
	public void setNumHelpAwards(int numHelpAwards) {
		this.numHelpAwards = numHelpAwards;
	}
	public Map<Integer, Integer> getSaoDangMap() {
		return saoDangMap;
	}
	public void setSaoDangMap(Map<Integer, Integer> saoDangMap) {
		this.saoDangMap = saoDangMap;
	}
	public boolean isDouble() {
		return isDouble;
	}
	public void setDouble(boolean isDouble) {
		this.isDouble = isDouble;
	}
}
