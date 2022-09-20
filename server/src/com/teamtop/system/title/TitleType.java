package com.teamtop.system.title;

public enum TitleType {

	Forever(0, "永久");

	// 0等级，1战斗力，2通关，3消费元宝，4击杀BOSS，5登录天数，6VIP等级，7活动，8排行榜

	private int type;

	private String typeName;

	private TitleType(int type, String typeName) {
		this.type = type;
	}

	public int getType() {
		return this.type;
	}

	public String getTypeName() {
		return this.typeName;
	}

}
