package com.teamtop.system.openDaysSystem.otherSevenDayLogin;

import com.teamtop.util.db.trans.FieldOrder;

public class OtherSevenDayLoginModel {
	/** 玩家id */
	@FieldOrder(order = 1)
	private long id;
	/** 玩家姓名 */
	@FieldOrder(order = 2)
	private String name;
	/** 获得的奖品类型 */
	@FieldOrder(order = 3)
	private int award;
	/** 获得的奖品id */
	@FieldOrder(order = 4)
	private int awardId;
	/** 获得的奖品数量 */
	@FieldOrder(order = 5)
	private int awardNum;
	
	

	public int getAward() {
		return award;
	}

	public void setAward(int award) {
		this.award = award;
	}

	public int getAwardNum() {
		return awardNum;
	}

	public void setAwardNum(int awardNum) {
		this.awardNum = awardNum;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAwardId() {
		return awardId;
	}

	public void setAwardId(int awardId) {
		this.awardId = awardId;
	}
}
