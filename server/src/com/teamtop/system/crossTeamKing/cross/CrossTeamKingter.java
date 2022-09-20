package com.teamtop.system.crossTeamKing.cross;

import java.util.ArrayList;

/**
 * 参与队伍
 * @author jjjjyyy
 *
 */
public class CrossTeamKingter {
	/**
	 * 队id
	 */
	private int teamid;
	
	/**
	 * 转生段位房间
	 */
	private int rebornType; 
	/**
	 * partid
	 */
	private int  partid;
	
	/**
	 * 队长id
	 */
	private long captainhid;
	/**
	 * 队伍人员id
	 */
	private ArrayList<Long> teamerHids;
	/**
	 * 0组队状态 1匹配中 2战斗中;
	 */
	private int state;
	/**
	 * 开始匹配时间
	 */
	private int marryBattleTime;
	/**
	 * 对战队伍id -1机器人 >0
	 */
	private int battleteamId;
	/**
	 * 开始战斗时间
	 */
	private int battleTime;
	
	
	
	
	
	public CrossTeamKingter() {
		super();
	}
	
	
	public long getCaptainhid() {
		return captainhid;
	}
	public void setCaptainhid(long captainhid) {
		this.captainhid = captainhid;
	}
	public int getRebornType() {
		return rebornType;
	}
	public void setRebornType(int rebornType) {
		this.rebornType = rebornType;
	}
	public ArrayList<Long> getTeamerHids() {
		return teamerHids;
	}

	public void setTeamerHids(ArrayList<Long> teamerHids) {
		this.teamerHids = teamerHids;
	}


	public int getTeamid() {
		return teamid;
	}
	public void setTeamid(int teamid) {
		this.teamid = teamid;
	}

	public int getPartid() {
		return partid;
	}

	public void setPartid(int partid) {
		this.partid = partid;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getMarryBattleTime() {
		return marryBattleTime;
	}

	public void setMarryBattleTime(int marryBattleTime) {
		this.marryBattleTime = marryBattleTime;
	}

	public int getBattleTime() {
		return battleTime;
	}

	public void setBattleTime(int battleTime) {
		this.battleTime = battleTime;
	}

	public int getBattleteamId() {
		return battleteamId;
	}

	public void setBattleteamId(int battleteamId) {
		this.battleteamId = battleteamId;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + teamid;
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CrossTeamKingter other = (CrossTeamKingter) obj;
		if (teamid != other.teamid)
			return false;
		return true;
	}
	
	
	

}
