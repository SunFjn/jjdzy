package com.teamtop.system.hiddentreasure.model;

public class HiddenTreasureModel {

	private long hid;

	/**
	 * 幸运值
	 */
	private int lucky;

	/**
	 * 已使用的免费次数
	 */
	private int useTime;

	/**
	 * 是否已首次10抽（1是，0否）
	 */
	private int first;

	/**
	 * 当前期数
	 */
	private int qs;

	/**
	 * 是否整个系统第一次抽取
	 */
	private int singleFirst;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getLucky() {
		return lucky;
	}

	public void setLucky(int lucky) {
		this.lucky = lucky;
	}

	public int getUseTime() {
		return useTime;
	}

	public void setUseTime(int useTime) {
		this.useTime = useTime;
	}

	public int getFirst() {
		return first;
	}

	public void setFirst(int first) {
		this.first = first;
	}

	public int getQs() {
		return qs;
	}

	public void setQs(int qs) {
		this.qs = qs;
	}

	public int getSingleFirst() {
		return singleFirst;
	}

	public void setSingleFirst(int singleFirst) {
		this.singleFirst = singleFirst;
	}

}
