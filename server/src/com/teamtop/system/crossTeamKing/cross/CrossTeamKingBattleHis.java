package com.teamtop.system.crossTeamKing.cross;

public class CrossTeamKingBattleHis {
	
	private long hid;
	/**
	 * 我的队员信息	L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字L玩家id
	 */
	private Object[] teamMyinfo;
	/**
	 * 对方队员信息 	L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字L玩家id
	 */
	private Object[] teamEnemyinfo;
	/**
	 * 战斗结果 0 没有结果 1A赢了 2A输了
	 * 
	 */
	private int battleRest;
	
	/**
	 * 获得积分
	 */
	private int jfNum;
	
	

	public CrossTeamKingBattleHis() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}
	public Object[] getTeamMyinfo() {
		return teamMyinfo;
	}

	public void setTeamMyinfo(Object[] teamMyinfo) {
		this.teamMyinfo = teamMyinfo;
	}

	public Object[] getTeamEnemyinfo() {
		return teamEnemyinfo;
	}

	public void setTeamEnemyinfo(Object[] teamEnemyinfo) {
		this.teamEnemyinfo = teamEnemyinfo;
	}

	public int getBattleRest() {
		return battleRest;
	}

	public void setBattleRest(int battleRest) {
		this.battleRest = battleRest;
	}

	public int getJfNum() {
		return jfNum;
	}

	public void setJfNum(int jfNum) {
		this.jfNum = jfNum;
	}
	
	

}
