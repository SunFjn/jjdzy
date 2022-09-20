package com.teamtop.system.threeHeroFightLvBu.model;

import java.util.concurrent.atomic.AtomicInteger;

public class ThreeHeroFightLvBu {
	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * 挑战次数
	 */
	private int chaNum;

	/**
	 * 次数修改器
	 */
	private AtomicInteger chaNumHandler = new AtomicInteger();

	/**
	 * 已购买次数
	 */
	private int buyNum;

	/**
	 * 开启的挑战难度（1普通,2困难,3地狱,4噩梦）
	 */
	private int hardType;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getChaNum() {
		this.chaNum = chaNumHandler.get();
		return chaNum;
	}

	public void setChaNum(int chaNum) {
		this.chaNum = chaNum;
		chaNumHandler.set(chaNum);
	}

	public int addChaNum(int add) {
		return this.chaNumHandler.addAndGet(add);
	}

	public int getBuyNum() {
		return buyNum;
	}

	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}

	public int getHardType() {
		return hardType;
	}

	public void setHardType(int hardType) {
		this.hardType = hardType;
	}

}
