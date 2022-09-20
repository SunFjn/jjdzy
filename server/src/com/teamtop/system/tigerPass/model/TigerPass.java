package com.teamtop.system.tigerPass.model;

import java.util.HashMap;

/**
 * 虎牢关
 * @author jjjjyyy
 *
 */

public class TigerPass {
	
	private long hid;
	/**
	 * 恢复次数时间
	 */
	private int refreshTime;
	/**
	 * 剩余次数
	 */
	private int battleNum;
	/**
	 * 当前boss序号
	 */
	private int bossIndex;
	/**
	 * 当前气血
	 */
	private long curhp;
	/**
	 * hpmax
	 */
	private long hpmax;
	/**
	 * 0没有雇佣者 >1雇佣者id
	 */
	private long chooseHid;
	/**
	 * 首通奖励状态
	 */
	private HashMap<Integer, Integer> rewards;
	/**
	 * 是否加入雇佣兵 0没有 1已经加入雇佣兵
	 */
	private int joinEmploySate;
	/**
	 * 每天雇佣剩余次
	 */
	private int chooseNum;
	/**
	 * 雇佣者集合
	 */
	private  HashMap<Long, TigerPassEmployer>	tigerPassEmployers;
	/**
	 * 2019/10/23  因为第一次上线的时候没有充值时间  所以这个字段要参考国家boss周重置时间
	 */
	private int weekRestTime;
	
	

	public TigerPass() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}


	public int getBattleNum() {
		return battleNum;
	}

	public void setBattleNum(int battleNum) {
		this.battleNum = battleNum;
	}

	public int getRefreshTime() {
		return refreshTime;
	}

	public void setRefreshTime(int refreshTime) {
		this.refreshTime = refreshTime;
	}

	public int getBossIndex() {
		return bossIndex;
	}

	public void setBossIndex(int bossIndex) {
		this.bossIndex = bossIndex;
	}

	public long getCurhp() {
		return curhp;
	}

	public void setCurhp(long curhp) {
		this.curhp = curhp;
	}

	public long getHpmax() {
		return hpmax;
	}

	public void setHpmax(long hpmax) {
		this.hpmax = hpmax;
	}
	
	public long getChooseHid() {
		return chooseHid;
	}

	public void setChooseHid(long chooseHid) {
		this.chooseHid = chooseHid;
	}

	public HashMap<Long, TigerPassEmployer> getTigerPassEmployers() {
		return tigerPassEmployers;
	}

	public void setTigerPassEmployers(HashMap<Long, TigerPassEmployer> tigerPassEmployers) {
		this.tigerPassEmployers = tigerPassEmployers;
	}

	public HashMap<Integer, Integer> getRewards() {
		return rewards;
	}

	public void setRewards(HashMap<Integer, Integer> rewards) {
		this.rewards = rewards;
	}

	public int getJoinEmploySate() {
		return joinEmploySate;
	}

	public void setJoinEmploySate(int joinEmploySate) {
		this.joinEmploySate = joinEmploySate;
	}

	public int getChooseNum() {
		return chooseNum;
	}

	public void setChooseNum(int chooseNum) {
		this.chooseNum = chooseNum;
	}

	public int getWeekRestTime() {
		return weekRestTime;
	}

	public void setWeekRestTime(int weekRestTime) {
		this.weekRestTime = weekRestTime;
	}


}
