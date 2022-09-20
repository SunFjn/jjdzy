package com.teamtop.system.activity.ativitys.nianMonsterMakeSpring.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.concurrent.atomic.AtomicInteger;

import com.alibaba.fastjson.annotation.JSONField;
import com.teamtop.system.activity.model.ActivityData;

public class NianMonsterMakeSpringModel extends ActivityData {

	public NianMonsterMakeSpringModel() {
		// TODO Auto-generated constructor stub
	}

	public NianMonsterMakeSpringModel(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	/**
	 * 当前在打年兽id
	 */
	private int monsterId;

	/**
	 * 当前年兽剩余血量
	 */
	private int monsterHp;

	/**
	 * 积分
	 */
	private int score;

	@JSONField(serialize = false)
	private transient AtomicInteger booms = new AtomicInteger();

	/**
	 * 鞭炮数量
	 */
	private int boomNum;

	/**
	 * 奖池
	 * int[0] = 道具id
	 * int[1] = 开始时间
	 */
	private ArrayList<int[]> rewardPoolList = new ArrayList<>();

	private HashSet<Integer> goalRewardSet = new HashSet<>();

	/**
	 * 每日年兽王状态0：未召唤，1：召唤，2：已击退
	 */
	private int kingState;
	
	/**
	 * 未刷新到橙色次数（刷掉后重置）
	 */
	private int refreshTimes;

	/**
	 * 最后一次恢复鞭炮数量时间
	 */
	private int lastAddTime;

	/**
	 * 召唤兽王当天零点时间
	 */
	private int kingSummonTime;

	public int getMonsterId() {
		return monsterId;
	}

	public void setMonsterId(int monsterId) {
		this.monsterId = monsterId;
	}

	public int getMonsterHp() {
		return monsterHp;
	}

	public void setMonsterHp(int monsterHp) {
		this.monsterHp = monsterHp;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public AtomicInteger getBooms() {
		return booms;
	}

	public void setBooms(AtomicInteger booms) {
		this.booms = booms;
	}

	public int getBoomNum() {
		boomNum = booms.get();
		return boomNum;
	}

	public void setBoomNum(int boomNum) {
		this.boomNum = boomNum;
		booms.set(boomNum);
	}

	public ArrayList<int[]> getRewardPoolList() {
		return rewardPoolList;
	}

	public void setRewardPoolList(ArrayList<int[]> rewardPoolList) {
		this.rewardPoolList = rewardPoolList;
	}

	public HashSet<Integer> getGoalRewardSet() {
		return goalRewardSet;
	}

	public void setGoalRewardSet(HashSet<Integer> goalRewardSet) {
		this.goalRewardSet = goalRewardSet;
	}

	public int getKingState() {
		return kingState;
	}

	public void setKingState(int kingState) {
		this.kingState = kingState;
	}

	public int getRefreshTimes() {
		return refreshTimes;
	}

	public void setRefreshTimes(int refreshTimes) {
		this.refreshTimes = refreshTimes;
	}

	public int getLastAddTime() {
		return lastAddTime;
	}

	public void setLastAddTime(int lastAddTime) {
		this.lastAddTime = lastAddTime;
	}

	public int getKingSummonTime() {
		return kingSummonTime;
	}

	public void setKingSummonTime(int kingSummonTime) {
		this.kingSummonTime = kingSummonTime;
	}

	public int changeBoomNum(int addNum) {
		return this.booms.addAndGet(addNum);
	}

}
