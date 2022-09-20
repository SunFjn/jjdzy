package com.teamtop.system.countrySkill;

public class CountrySkillConst {

	/** 技能等级进行公告的所要达到的倍数 */
	public static final int NOTICE_LVBEI = 10;

	/** 未激活 */
	public static final int NOT_JIHUO = 0;
	/** 可激活 */
	public static final int CAN_JIHUO = 1;
	/** 不可升级 */
	public static final int NOT_LV = 2;
	/** 可升级 */
	public static final int CAN_LV = 3;

	/**
	 * 激活或升级状态返回
	 */
	public static final int FAILURE = 0; // 没有奖励
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_REACH = 2; // 不满足激活或升级条件
	public static final int FAILURE_NOT_COUNTRYPRE = 3; // 国家声望不足
	public static final int FAILURE_FULL_LV = 4; // 已满级

}
