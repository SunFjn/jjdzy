package com.teamtop.system.crossWenDingTianXia.model;

public class CrossWenDingTianXia {

	private long hid;
	private int timeLogout;//上次登出副本的时间
	private long hp;//中央服用，气血
	private long huDun;//中央服用，护盾
	private int numKillContinue;//中央服用，连斩数
	private int numKillThisLayer;//中央服用，本层累积杀人总数，挑层清空
	private int layer;//中央服用，玩家当前层数
	private int timeDeath;//中央服用，玩家死亡时间
	private long npcID;//中央服用，正在战斗中的NPCID
	private int changeXY;//中央服用，0随机坐标   1固定坐标
	private int timeBattleBegin;//中央服用，开始进入战斗的时间，超过这个时间就强制拉入战斗
	private int resultBattle;//中央服用，战斗结果
	private Object[] resultData;//中央服用，战斗结算数据

	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getTimeLogout() {
		return timeLogout;
	}
	public void setTimeLogout(int timeLogout) {
		this.timeLogout = timeLogout;
	}
	public long getHp() {
		return hp;
	}
	public void setHp(long hp) {
		this.hp = hp;
	}
	public int getNumKillContinue() {
		return numKillContinue;
	}
	public void setNumKillContinue(int numKillContinue) {
		this.numKillContinue = numKillContinue;
	}
	public int getLayer() {
		return layer;
	}
	public void setLayer(int layer) {
		this.layer = layer;
	}
	public int getTimeDeath() {
		return timeDeath;
	}
	public void setTimeDeath(int timeDeath) {
		this.timeDeath = timeDeath;
	}
	public long getNpcID() {
		return npcID;
	}
	public void setNpcID(long npcID) {
		this.npcID = npcID;
	}
	public long getHuDun() {
		return huDun;
	}
	public void setHuDun(long huDun) {
		this.huDun = huDun;
	}
	public int getChangeXY() {
		return changeXY;
	}
	public void setChangeXY(int changeXY) {
		this.changeXY = changeXY;
	}
	public int getTimeBattleBegin() {
		return timeBattleBegin;
	}
	public void setTimeBattleBegin(int timeBattleBegin) {
		this.timeBattleBegin = timeBattleBegin;
	}
	public int getResultBattle() {
		return resultBattle;
	}
	public void setResultBattle(int resultBattle) {
		this.resultBattle = resultBattle;
	}
	public Object[] getResultData() {
		return resultData;
	}
	public void setResultData(Object[] resultData) {
		this.resultData = resultData;
	}
	public int getNumKillThisLayer() {
		return numKillThisLayer;
	}
	public void setNumKillThisLayer(int numKillThisLayer) {
		this.numKillThisLayer = numKillThisLayer;
	}
}
