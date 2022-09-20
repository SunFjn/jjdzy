package com.teamtop.system.houseShopTask;

import java.util.Map;

/**
 * 房屋商店目标任务类
 * @author Administrator
 *
 */
public class HouseShopTask {
	
	private long hid;
	
	/**
	 * 刷新到的物品信息
	 * <key:商品索引，value:商品格子>
	 */
	private Map<Integer, ShopInfo> goodsMap;
	/**
	 *  每日任务宝箱奖励
	 */
	private Map<Integer, Integer> dayReward;
	
	/**
	 * 每日任务完成情况
	 */
	private Map<Integer, Integer> dayTask;
	
	/**目标奖励状态0未领取 1可领取 2已领取 */
	private Map<Integer, Integer> goalTaskMap;
	
	/**目标类型 -进度*/
	private Map<Integer, Integer> goalPlan;
	
	/**
	 * 特殊目标任务 进度 例如举办普通/豪华  key 1 2 次数
	 **/
	private Map<Integer, Integer> speGoal;
	

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}


	public Map<Integer, ShopInfo> getGoodsMap() {
		return goodsMap;
	}

	public void setGoodsMap(Map<Integer, ShopInfo> goodsMap) {
		this.goodsMap = goodsMap;
	}

	public Map<Integer, Integer> getDayTask() {
		return dayTask;
	}

	public void setDayTask(Map<Integer, Integer> dayTask) {
		this.dayTask = dayTask;
	}

	public Map<Integer, Integer> getDayReward() {
		return dayReward;
	}

	public void setDayReward(Map<Integer, Integer> dayReward) {
		this.dayReward = dayReward;
	}

	public Map<Integer, Integer> getGoalTaskMap() {
		return goalTaskMap;
	}

	public void setGoalTaskMap(Map<Integer, Integer> goalTaskMap) {
		this.goalTaskMap = goalTaskMap;
	}

	public Map<Integer, Integer> getGoalPlan() {
		return goalPlan;
	}

	public void setGoalPlan(Map<Integer, Integer> goalPlan) {
		this.goalPlan = goalPlan;
	}

	public Map<Integer, Integer> getSpeGoal() {
		return speGoal;
	}

	public void setSpeGoal(Map<Integer, Integer> speGoal) {
		this.speGoal = speGoal;
	}
	
	



}
