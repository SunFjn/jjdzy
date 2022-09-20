package com.teamtop.system.crossFireBeacon.model;

public class BattleInfo {

	private long battleId;

	private long chaHid;

	private long chaLeftHp;// 开始是的血量

	private long chaLeftHudun;// 开始的护盾

	private long guardian;

	private long gLeftHp;// 开始是的血量

	private long gLeftHudun;// 开始的护盾

	private long winner;

	private long winnerHp;

	private int time;

	public long getBattleId() {
		return battleId;
	}

	public void setBattleId(long battleId) {
		this.battleId = battleId;
	}

	public long getChaHid() {
		return chaHid;
	}

	public void setChaHid(long chaHid) {
		this.chaHid = chaHid;
	}

	public long getGuardian() {
		return guardian;
	}

	public void setGuardian(long guardian) {
		this.guardian = guardian;
	}

	public long getWinner() {
		return winner;
	}

	public void setWinner(long winner) {
		this.winner = winner;
	}

	public long getWinnerHp() {
		return winnerHp;
	}

	public void setWinnerHp(long winnerHp) {
		this.winnerHp = winnerHp;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public long getChaLeftHp() {
		return chaLeftHp;
	}

	public void setChaLeftHp(long chaLeftHp) {
		this.chaLeftHp = chaLeftHp;
	}

	public long getChaLeftHudun() {
		return chaLeftHudun;
	}

	public void setChaLeftHudun(long chaLeftHudun) {
		this.chaLeftHudun = chaLeftHudun;
	}

	public long getgLeftHp() {
		return gLeftHp;
	}

	public void setgLeftHp(long gLeftHp) {
		this.gLeftHp = gLeftHp;
	}

	public long getgLeftHudun() {
		return gLeftHudun;
	}

	public void setgLeftHudun(long gLeftHudun) {
		this.gLeftHudun = gLeftHudun;
	}

}
