package com.teamtop.system.wanyuanhongbao;

public class WanyuanHongbaoConst {
	public static final int WANYUANHONGBAO = 8201;
	
	/** 等级红包 */
	public static final int TYPE_LEVEL = 1; 
	/** 累计充值红包 */
	public static final int TYPE_RECHARGE_TOTAL = 2;

	/**
	 * 领取奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 奖励不存在
	public static final int SUCCESS = 1;
	public static final int FAILURE_NOT_REACH = 2; // 未达到条件
	public static final int FAILURE_NOT_REP = 3; // 不能重复领取

	/**
	 * 奖励状态
	 */
	public static final int NOT_REACH = 0; // 未达到
	public static final int CAN_GET = 1; // 可领取
	public static final int GETTED = 2; // 已领取
	
}
