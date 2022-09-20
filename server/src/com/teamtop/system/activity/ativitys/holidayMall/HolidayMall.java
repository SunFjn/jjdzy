package com.teamtop.system.activity.ativitys.holidayMall;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class HolidayMall extends ActivityData {

	/** 商品信息 <index,购买次数> */
	private Map<Integer, Integer> itemInfoMap;

	/** 折扣表id */
	private int cutDown;

	/** 累加概率,达到阈值后重置 */
	private int gl;

	/** 剩余刷新次数(免费次数不算) */
	private int refreshTimes;

	/** 免费刷新次数 */
	private int times;

	/** 累计刷新次数(对应的元宝消费) */
	private int countTimes;

	public int getCountTimes() {
		return countTimes;
	}

	public void setCountTimes(int countTimes) {
		this.countTimes = countTimes;
	}

	public int getCutDown() {
		return cutDown;
	}

	public void setCutDown(int cutDown) {
		this.cutDown = cutDown;
	}

	public Map<Integer, Integer> getItemInfoMap() {
		return itemInfoMap;
	}

	public void setItemInfoMap(Map<Integer, Integer> itemInfoMap) {
		this.itemInfoMap = itemInfoMap;
	}

	public int getGl() {
		return gl;
	}

	public void setGl(int gl) {
		this.gl = gl;
	}

	public int getRefreshTimes() {
		return refreshTimes;
	}

	public void setRefreshTimes(int refreshTimes) {
		this.refreshTimes = refreshTimes;
	}

	public int getTimes() {
		return times;
	}

	public void setTimes(int times) {
		this.times = times;
	}

}
