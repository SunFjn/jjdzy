package com.teamtop.system.crossTeamFuBen.model;

public class CrossTeamFuBen {

	private long hid;
	private int timesBattled;//当天已经战斗的次数
	private int addTimes;// 添加的次数
	private int timeAddMember;//不入库，上次拉机器人的时间
	private int fristId;//不入库，首次进入中央服用的副本ID
	private int teamID;//不入库，聊天频道进入中央服用的队伍ID
	private int awardsState;//不入库，是否使用奖励状态   0勾选 其他:不勾选
	private int timeBuilTeam;//不入库，创建队伍冷却时间
	private boolean isDouble;//不入库，是否双倍奖励
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getTimesBattled() {
		return timesBattled;
	}
	public void setTimesBattled(int timesBattled) {
		this.timesBattled = timesBattled;
	}
	public int getAddTimes() {
		return addTimes;
	}
	public void setAddTimes(int addTimes) {
		this.addTimes = addTimes;
	}
	public int getTimeAddMember() {
		return timeAddMember;
	}
	public void setTimeAddMember(int timeAddMember) {
		this.timeAddMember = timeAddMember;
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
	public int getAwardsState() {
		return awardsState;
	}
	public void setAwardsState(int awardsState) {
		this.awardsState = awardsState;
	}
	public int getTimeBuilTeam() {
		return timeBuilTeam;
	}
	public void setTimeBuilTeam(int timeBuilTeam) {
		this.timeBuilTeam = timeBuilTeam;
	}
	public boolean isDouble() {
		return isDouble;
	}
	public void setDouble(boolean isDouble) {
		this.isDouble = isDouble;
	}
}
