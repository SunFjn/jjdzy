package com.teamtop.system.openDaysSystem.goodPolicyHasGift;

import com.teamtop.system.openDaysSystem.goodPolicyHasGift.model.GoodPolicyHasGiftModel;

public class GoodPolicyHasGiftConst {

	public static final GoodPolicyHasGiftModel DEFAULT_MODEL = new GoodPolicyHasGiftModel();

	public static final Byte NO_ACTIVE = 0; // 未激活
	public static final Byte ACTIVE = 1; // 激活

	/**
	 * 奖励状态
	 */
	public static final Byte NOT_REACH = 0; // 不可领取
	public static final Byte CAN_GET = 1; // 可领取
	public static final Byte GETTED = 2; // 已领取

	/**
	 * 奖励状态返回
	 */
	public static final Byte FAILURE_NOT_AWARD = 0; // 没有奖励
	public static final Byte SUCCESS = 1; // 成功
	public static final Byte FAILURE_NOT_REACH = 2; // 未达到条件
	public static final Byte FAILURE_NOT_REP = 3; // 已领取

}
