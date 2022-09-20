package com.teamtop.system.guanqia;

import java.util.HashSet;
import java.util.Set;

/**
 * 关卡
 */
public class Guanqia {
	private long hid;
	/**
	 * 关数
	 */
	private int curGuanqia;
	/**
	 * 小怪第几波
	 */
	private int curMonster;
	/**
	 * 小怪同步时间
	 */
	private long syncTime;
	/**
	 * 当天击杀小怪数量
	 */
	private int killMonsterCount;
	/**
	 * 已领取斩杀奖励编号
	 */
	private int killAwardIndex;
	/**
	 * 今日已扫荡次数
	 */
	private int todayMopUp;
	/**
	 * 第一次打到本人最高层的时间
	 */
	private int timeTopGuanQia;
	
	/**
	 * 当前大关卡id
	 */
	private int bigGuanqia;

	/**
	 * 已领取大关卡通关奖励
	 */
	private Set<Integer> bigRewardSet = new HashSet<>();
	/**
	 * 当前关卡出现金甲兵概率 
	 */
	private int jingJiaPro;
	/**
	 * x关卡是否出现金甲兵 0无 1有 [x关,金甲兵是否出现 0无 1有]
	 */
	private int[] jingJiaSateByGuan;
	/**
	 * 连续没有出现金甲兵关数
	 */
	private int noJingJia;
	

	public long getSyncTime() {
		return syncTime;
	}
	public int getTimeTopGuanQia() {
		return timeTopGuanQia;
	}
	public void setTimeTopGuanQia(int timeTopGuanQia) {
		this.timeTopGuanQia = timeTopGuanQia;
	}
	public void setSyncTime(long syncTime) {
		this.syncTime = syncTime;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getCurGuanqia() {
		return curGuanqia;
	}
	public void setCurGuanqia(int curGuanqia) {
		this.curGuanqia = curGuanqia;
	}
	public int getCurMonster() {
		return curMonster;
	}
	public void setCurMonster(int curMonster) {
		this.curMonster = curMonster;
	}

	public int getKillMonsterCount() {
		return killMonsterCount;
	}

	public void setKillMonsterCount(int killMonsterCount) {
		this.killMonsterCount = killMonsterCount;
	}

	public int getKillAwardIndex() {
		return killAwardIndex;
	}

	public void setKillAwardIndex(int killAwardIndex) {
		this.killAwardIndex = killAwardIndex;
	}

	public int getTodayMopUp() {
		return todayMopUp;
	}

	public void setTodayMopUp(int todayMopUp) {
		this.todayMopUp = todayMopUp;
	}

	public int getBigGuanqia() {
		return bigGuanqia;
	}

	public void setBigGuanqia(int bigGuanqia) {
		this.bigGuanqia = bigGuanqia;
	}

	public Set<Integer> getBigRewardSet() {
		return bigRewardSet;
	}

	public void setBigRewardSet(Set<Integer> bigRewardSet) {
		this.bigRewardSet = bigRewardSet;
	}
	public int getJingJiaPro() {
		return jingJiaPro;
	}
	public void setJingJiaPro(int jingJiaPro) {
		this.jingJiaPro = jingJiaPro;
	}
	public int[] getJingJiaSateByGuan() {
		return jingJiaSateByGuan;
	}
	public void setJingJiaSateByGuan(int[] jingJiaSateByGuan) {
		this.jingJiaSateByGuan = jingJiaSateByGuan;
	}
	public int getNoJingJia() {
		return noJingJia;
	}
	public void setNoJingJia(int noJingJia) {
		this.noJingJia = noJingJia;
	}

	

}
