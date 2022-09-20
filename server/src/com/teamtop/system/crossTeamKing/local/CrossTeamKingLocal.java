package com.teamtop.system.crossTeamKing.local;

import java.util.HashSet;
import java.util.concurrent.atomic.AtomicInteger;

import com.teamtop.util.log.LogTool;

public class CrossTeamKingLocal {
	
	private long hid;
	/**
	 * 当前赛季转生区间
	 */
	private int reborenType;
	/**
	 * 当前段位
	 */
	private int duanwei;
	/**
	 * 当前积分
	 */
	private int jf;
	/**
	 * 当前排名
	 */
	private int rank;
	/**
	 * 今日剩余参与数量
	 */
	private int leftNum;
	/**
	 * 今日购买次数
	 */
	private int buyNum;
	/**
	 * 今日战胜次数
	 */
	private int battleWinNum;
	/**
	 * 上次重置时间
	 */
	private int weekResetTime;
	/**
	 * 宝箱奖励已经领取
	 */
	private HashSet<Integer> rewards;
	/**
	 * 当前连胜数
	 */
	private int winAwayNum;
	/**
	 * 今日剩余参与数量 次数修改器
	 */
	private AtomicInteger leftNumHandler = new AtomicInteger();
	
	
	
	
	public CrossTeamKingLocal() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getReborenType() {
		return reborenType;
	}
	public void setReborenType(int reborenType) {
		this.reborenType = reborenType;
	}
	public int getDuanwei() {
		return duanwei;
	}
	public void setDuanwei(int duanwei) {
		this.duanwei = duanwei;
	}
	public int getJf() {
		return jf;
	}
	public void setJf(int jf) {
		this.jf = jf;
		LogTool.info("CrossTeamKing jf hid "+hid+ jf, this);
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	
	public int getLeftNum() {
		this.leftNum = leftNumHandler.get();
		return leftNum;
	}

	public void setLeftNum(int leftNum) {
		this.leftNum = leftNum;
		leftNumHandler.set(leftNum);
		LogTool.info("CrossTeamKing leftNum hid "+hid+ leftNum, this);
	}

	public int addLeftNum(int add) {
		return this.leftNumHandler.addAndGet(add);
	}
	
	
	public int getBattleWinNum() {
		return battleWinNum;
	}
	public void setBattleWinNum(int battleWinNum) {
		this.battleWinNum = battleWinNum;
	}
	public HashSet<Integer> getRewards() {
		return rewards;
	}
	public void setRewards(HashSet<Integer> rewards) {
		this.rewards = rewards;
	}
	public int getWeekResetTime() {
		return weekResetTime;
	}
	public void setWeekResetTime(int weekResetTime) {
		this.weekResetTime = weekResetTime;
	}
	public int getBuyNum() {
		return buyNum;
	}
	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}
	public int getWinAwayNum() {
		return winAwayNum;
	}
	public void setWinAwayNum(int winAwayNum) {
		this.winAwayNum = winAwayNum;
	}
	
	

}
