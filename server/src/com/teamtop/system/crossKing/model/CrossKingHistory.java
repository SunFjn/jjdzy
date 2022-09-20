package com.teamtop.system.crossKing.model;


public class CrossKingHistory {
	/**
	 * 结果0成功1失败
	 */
	private int win;
	/**
	 * 对手名字
	 */
	private String name;
	/**
	 * 排名情况  0不变1升2降
	 */
	private int isUp;
	/**
	 * 是否晋级 1晋级2掉级
	 */
	private int isJingJi;
	
	public CrossKingHistory(int win, String name, int isUp, int isJingJi) {
		super();
		this.win = win;
		this.name = name;
		this.isUp = isUp;
		this.isJingJi = isJingJi;
	}



	public CrossKingHistory() {
		super();
	}
	
	
	
	public int getWin() {
		return win;
	}
	public void setWin(int win) {
		this.win = win;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getIsUp() {
		return isUp;
	}
	public void setIsUp(int isUp) {
		this.isUp = isUp;
	}
	public int getIsJingJi() {
		return isJingJi;
	}
	public void setIsJingJi(int isJingJi) {
		this.isJingJi = isJingJi;
	}
	
	
	
}
