package com.teamtop.system.activity.ativitys.kingSecretCrystal.model;

public class KingRewardInfo {

	/**
	 * 数量
	 */
	private int num;

	/**
	 * 位置
	 */
	private int index;

	/**
	 * 奖励id
	 */
	private int id;

	/**
	 * 是否广播
	 */
	private int board;

	/**
	 * 奖励
	 */
	private int[][] reward;

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getBoard() {
		return board;
	}

	public void setBoard(int board) {
		this.board = board;
	}

	public int[][] getReward() {
		return reward;
	}

	public void setReward(int[][] reward) {
		this.reward = reward;
	}

}
