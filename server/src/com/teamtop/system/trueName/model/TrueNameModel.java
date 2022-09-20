package com.teamtop.system.trueName.model;

import com.teamtop.util.db.trans.FieldOrder;

public class TrueNameModel {

	/**
	 * 玩家id
	 */
	@FieldOrder(order = 1)
	private long hid;

	/**
	 * 真实姓名
	 */
	@FieldOrder(order = 2)
	private String name;

	/**
	 * 身份证号码
	 */
	@FieldOrder(order = 3)
	private String idCardNum;
	
	/**
	 * 是否已成年
	 * 0:未成年, 1:已成年
	 */
	@FieldOrder(order = 4)
	private int adult;
	
	/**
	 * 实名验证状态
	 * 0:未验证, 1:已验证
	 */
	@FieldOrder(order = 5)
	private int checkState;
	
	/**
	 * 实名验证奖励领取状态
	 * 0:未领取, 1:已领取
	 */
	@FieldOrder(order = 6)
	private int reward;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdCardNum() {
		return idCardNum;
	}

	public void setIdCardNum(String idCardNum) {
		this.idCardNum = idCardNum;
	}

	public int getAdult() {
		return adult;
	}

	public void setAdult(int adult) {
		this.adult = adult;
	}

	public int getCheckState() {
		return checkState;
	}

	public void setCheckState(int checkState) {
		this.checkState = checkState;
	}

	public int getReward() {
		return reward;
	}

	public void setReward(int reward) {
		this.reward = reward;
	}

}
