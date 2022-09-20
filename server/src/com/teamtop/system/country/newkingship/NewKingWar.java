package com.teamtop.system.country.newkingship;

/**
 * 新王位之争（个人）
 * @author jjjjyyy
 *
 */
public class NewKingWar {
	
	private long hid;
	/**
	 * 是否已领取俸禄
	 */
	private int isHasReward;
	/**
	 * 剩余挑战次数
	 */
	private int battleNum;
	/**
	 * 挑战结束剩余时间
	 */
	private int nextBattleTime;
	/**
	 * 已购买挑战次数
	 */
	private int buyChaTimes;
	/**
	 * 膜拜  
	 */
	private int mobai;
	/**
	 * 挑战次数  最后一次刷新时间
	 */
	private int refreshTime;
	
	

	public NewKingWar() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getIsHasReward() {
		return isHasReward;
	}

	public void setIsHasReward(int isHasReward) {
		this.isHasReward = isHasReward;
	}

	public int getBattleNum() {
		return battleNum;
	}

	public void setBattleNum(int battleNum) {
		this.battleNum = battleNum;
	}

	public int getNextBattleTime() {
		return nextBattleTime;
	}

	public void setNextBattleTime(int nextBattleTime) {
		this.nextBattleTime = nextBattleTime;
	}

	public int getBuyChaTimes() {
		return buyChaTimes;
	}

	public void setBuyChaTimes(int buyChaTimes) {
		this.buyChaTimes = buyChaTimes;
	}

	public int getMobai() {
		return mobai;
	}

	public void setMobai(int mobai) {
		this.mobai = mobai;
	}

	public int getRefreshTime() {
		return refreshTime;
	}

	public void setRefreshTime(int refreshTime) {
		this.refreshTime = refreshTime;
	}

	
	

}
