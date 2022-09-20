package com.teamtop.system.title;

public enum TitleActivateType {
//0等级，1战斗力，2通关，3消费元宝，4击杀BOSS，5登录天数，6VIP等级，7活动，8排行榜,9.道具激活
	LEVEL_ACT(0, "等级"),
	STRENGTH_ACT(1, "战力"),
	PASS_GUANQIA_ACT(2, "通关"),
	CONSUME_ACT(3, "消费元宝"),
	KILL_BOSS_ACT(4, "击杀BOSS"),
	LOGIN_DAYS_ACT(5, "登录天数"),
	VIP_LEVEL_ACT(6, "VIP等级"),
	ACTIVITY_ACT(7, "活动"),
	RANKING_ACT(8, "排行榜"),
	TOOL_ACT(9, "道具"),
	KING_SITE_ACT(10, "王位之争"),
	APPOINT_ACT(11, "任命"),
	;

	/**
	 * 激活类型
	 */
	private int activateType;

	private String tyepName;

	public int getActivateType() {
		return activateType;
	}

	public String getTyepName() {
		return tyepName;
	}

	private TitleActivateType(int activateType, String tyepName) {
		this.activateType = activateType;
		this.tyepName = tyepName;
	}

	public static TitleActivateType getTitleActivateType(int type) {
		TitleActivateType[] types = values();
		for (TitleActivateType at : types) {
			if (at.getActivateType() == type) {
				return at;
			}
		}
		return null;
	}

}
