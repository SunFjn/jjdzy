package com.teamtop.system.crossTeamKing.cross;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * 战报
 * @author Administrator
 *
 */
public class CrossTeamKingterBattleInfo {
	/**
	 * 转生段位房间
	 */
	private int rebornType; 
	/**
	 * partAid
	 */
	private int  partAid;
	/**
	 * partBid
	 */
	private int  partBid;
	/**
	 * 队伍Aid
	 */
	private int teamAId;
	/**
	 * 队伍Bid
	 */
	private int teamBId;
	/**
	 * 队伍A
	 */
	private List<Long> teamKingBattlersA=new ArrayList<Long>();
	/**
	 * 队伍B
	 */
	private List<Long> teamKingBattlersB=new ArrayList<Long>();
	/**
	 * 双方对象 当前战斗对象 
	 */
	private int[] battleIndex=new int[2];

	/**
	 * 我的队员信息	L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字L玩家id
	 */
	private Object[] teamAinfo;
	/**
	 * 对方队员信息 	L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字L玩家id
	 */
	private Object[] teamBinfo;
	/**
	 * 战斗结果 0 没有结果 1A赢了 2A输了
	 * 
	 */
	private int battleRest;
	/**
	 * 队伍A 总积分
	 */
	private int teamjfA;
	/**
	 * 队伍B 总积分
	 */
	private int teamjfB;
	/**
	 * 队伍A击杀人数
	 */
	private int teamAKillNum;
	/**
	 * 队伍B击杀人数
	 */
	private int teamBKillNum;
	/**
	 * 可以观战人数
	 */
	private Set<Long> synHidSet;
	/**
	 * 战斗唯一id
	 */
	private long battleUid;
	
	public CrossTeamKingterBattleInfo() {
		super();
	}
	

	public int getRebornType() {
		return rebornType;
	}
	public void setRebornType(int rebornType) {
		this.rebornType = rebornType;
	}
	
	public int getPartAid() {
		return partAid;
	}


	public void setPartAid(int partAid) {
		this.partAid = partAid;
	}


	public int getPartBid() {
		return partBid;
	}


	public void setPartBid(int partBid) {
		this.partBid = partBid;
	}


	public int getTeamAId() {
		return teamAId;
	}

	public void setTeamAId(int teamAId) {
		this.teamAId = teamAId;
	}

	public int getTeamBId() {
		return teamBId;
	}

	public void setTeamBId(int teamBId) {
		this.teamBId = teamBId;
	}

	public List<Long> getTeamKingBattlersA() {
		return teamKingBattlersA;
	}

	public void setTeamKingBattlersA(List<Long> teamKingBattlersA) {
		this.teamKingBattlersA = teamKingBattlersA;
	}

	public List<Long> getTeamKingBattlersB() {
		return teamKingBattlersB;
	}

	public void setTeamKingBattlersB(List<Long> teamKingBattlersB) {
		this.teamKingBattlersB = teamKingBattlersB;
	}

	public Object[] getTeamAinfo() {
		return teamAinfo;
	}

	public void setTeamAinfo(Object[] teamAinfo) {
		this.teamAinfo = teamAinfo;
	}

	public Object[] getTeamBinfo() {
		return teamBinfo;
	}

	public void setTeamBinfo(Object[] teamBinfo) {
		this.teamBinfo = teamBinfo;
	}

	public int getBattleRest() {
		return battleRest;
	}
	public void setBattleRest(int battleRest) {
		this.battleRest = battleRest;
	}

	public int[] getBattleIndex() {
		return battleIndex;
	}

	public void setBattleIndex(int[] battleIndex) {
		this.battleIndex = battleIndex;
	}


	public int getTeamjfA() {
		return teamjfA;
	}


	public void setTeamjfA(int teamjfA) {
		this.teamjfA = teamjfA;
	}


	public int getTeamjfB() {
		return teamjfB;
	}


	public void setTeamjfB(int teamjfB) {
		this.teamjfB = teamjfB;
	}


	public int getTeamAKillNum() {
		return teamAKillNum;
	}


	public void setTeamAKillNum(int teamAKillNum) {
		this.teamAKillNum = teamAKillNum;
	}


	public int getTeamBKillNum() {
		return teamBKillNum;
	}


	public void setTeamBKillNum(int teamBKillNum) {
		this.teamBKillNum = teamBKillNum;
	}


	public Set<Long> getSynHidSet() {
		return synHidSet;
	}


	public void setSynHidSet(Set<Long> synHidSet) {
		this.synHidSet = synHidSet;
	}


	public long getBattleUid() {
		return battleUid;
	}


	public void setBattleUid(long battleUid) {
		this.battleUid = battleUid;
	}
	
	


}
