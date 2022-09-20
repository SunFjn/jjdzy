package com.teamtop.system.xuTianHunt.model;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

public class XuTianHuntModel {
	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * 狩猎次数
	 */
	private int huntNum;

	/**
	 * 狩猎次数计算
	 */
	private AtomicInteger huntNumAdd = new AtomicInteger();

	/**
	 * 今日已买次数
	 */
	private int buyNum;

	/**
	 * 添加次数时间点记录
	 */
	private Set<Integer> addSet = new HashSet<>();

	/**
	 * 狩猎临时数据
	 */
	private HuntTempData huntTempData;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getHuntNum() {
		huntNum = huntNumAdd.get();
		return huntNum;
	}

	public void setHuntNum(int huntNum) {
		this.huntNum = huntNum;
		this.huntNumAdd.set(huntNum);
	}

	public int addHuntNum(int addNum) {
		return this.huntNumAdd.addAndGet(addNum);
	}

	public AtomicInteger getHuntNumAdd() {
		return huntNumAdd;
	}

	public void setHuntNumAdd(AtomicInteger huntNumAdd) {
		this.huntNumAdd = huntNumAdd;
	}

	public int getBuyNum() {
		return buyNum;
	}

	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}

	public Set<Integer> getAddSet() {
		return addSet;
	}

	public void setAddSet(Set<Integer> addSet) {
		this.addSet = addSet;
	}

	public HuntTempData getHuntTempData() {
		return huntTempData;
	}

	public void setHuntTempData(HuntTempData huntTempData) {
		this.huntTempData = huntTempData;
	}

}
