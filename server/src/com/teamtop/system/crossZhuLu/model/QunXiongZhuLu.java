package com.teamtop.system.crossZhuLu.model;

import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class QunXiongZhuLu {
	/** 角色id */
	@FieldOrder(order = 1)
	private long hid;
	/** 已购买宝库物品信息key:商品id,value:已购数量 */
	@FieldOrder(order = 2)
	private Map<Integer, Integer> baoKuMap;
	/** 任务信息key:任务id,value:任务信息 */
	@FieldOrder(order = 3)
	private Map<Integer, TaskInfo> taskInfoMap;
	/** 刷新周的时间 */
	@FieldOrder(order = 4)
	private int weekZeroTime;
	/** 购买体力次数 */
	@FieldOrder(order = 5)
	private int buyTiLiTimes;
	/** 正在攻击的城池 */
	private int attackCity;
	/** 正在攻击的城池位置 */
	private int attackIndex;
	/** 当前积分 */
	private long score;
	/** 单枪匹马buff时间 */
	private int buffTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getBaoKuMap() {
		return baoKuMap;
	}

	public void setBaoKuMap(Map<Integer, Integer> baoKuMap) {
		this.baoKuMap = baoKuMap;
	}

	public Map<Integer, TaskInfo> getTaskInfoMap() {
		return taskInfoMap;
	}

	public void setTaskInfoMap(Map<Integer, TaskInfo> taskInfoMap) {
		this.taskInfoMap = taskInfoMap;
	}

	public int getWeekZeroTime() {
		return weekZeroTime;
	}

	public void setWeekZeroTime(int weekZeroTime) {
		this.weekZeroTime = weekZeroTime;
	}

	public int getBuyTiLiTimes() {
		return buyTiLiTimes;
	}

	public void setBuyTiLiTimes(int buyTiLiTimes) {
		this.buyTiLiTimes = buyTiLiTimes;
	}

	public int getAttackCity() {
		return attackCity;
	}

	public void setAttackCity(int attackCity) {
		this.attackCity = attackCity;
	}

	public int getAttackIndex() {
		return attackIndex;
	}

	public void setAttackIndex(int attackIndex) {
		this.attackIndex = attackIndex;
	}

	public long getScore() {
		return score;
	}

	public void setScore(long score) {
		this.score = score;
	}

	public int getBuffTime() {
		return buffTime;
	}

	public void setBuffTime(int buffTime) {
		this.buffTime = buffTime;
	}
}
