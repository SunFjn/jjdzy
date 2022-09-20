package com.teamtop.system.crossKing.cross;

import com.teamtop.system.crossKing.model.CrossKingRank;

public class CrossKingBattle {
	
	private long attid;
	/**战斗类型1普通 2晋级**/
	private int battleType;
	/*** 攻击方 */
	private CrossKingRank attRank;
	/*** 敌方*/
	private CrossKingRank enemyRank;
	/**服务端战斗结果0:失败，1：成功,2：以前端结果为准**/ 
	private int serverRest;
	/**战斗时间**/
	private int battleTime;
	
	public CrossKingBattle() {
		super();
	}

	public CrossKingBattle(long attid, int battleType, CrossKingRank attRank, CrossKingRank enemyRank, int serverRest,int battleTime) {
		super();
		this.attid = attid;
		this.battleType = battleType;
		this.attRank = attRank;
		this.enemyRank = enemyRank;
		this.serverRest = serverRest;
		this.battleTime=battleTime;
	}

	public long getAttid() {
		return attid;
	}
	public void setAttid(long attid) {
		this.attid = attid;
	}
	public CrossKingRank getAttRank() {
		return attRank;
	}
	public void setAttRank(CrossKingRank attRank) {
		this.attRank = attRank;
	}
	public CrossKingRank getEnemyRank() {
		return enemyRank;
	}
	public void setEnemyRank(CrossKingRank enemyRank) {
		this.enemyRank = enemyRank;
	}
	public int getServerRest() {
		return serverRest;
	}
	public void setServerRest(int serverRest) {
		this.serverRest = serverRest;
	}

	public int getBattleType() {
		return battleType;
	}

	public void setBattleType(int battleType) {
		this.battleType = battleType;
	}
	public int getBattleTime() {
		return battleTime;
	}
	public void setBattleTime(int battleTime) {
		this.battleTime = battleTime;
	}
	
	

}
