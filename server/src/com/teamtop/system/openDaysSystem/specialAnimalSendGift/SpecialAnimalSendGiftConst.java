package com.teamtop.system.openDaysSystem.specialAnimalSendGift;

import com.teamtop.system.openDaysSystem.specialAnimalSendGift.model.SpecialAnimalSendGiftModel;

public class SpecialAnimalSendGiftConst {

	public static final SpecialAnimalSendGiftModel DEFAULT_MODEL = new SpecialAnimalSendGiftModel();

	public static final byte NO_ACTIVE = 0; // 未激活
	public static final byte ACTIVE = 1; // 激活

	/**
	 * 奖励状态
	 */
	public static final byte NOT_REACH = 0; // 不可领取
	public static final byte CAN_GET = 1; // 可领取
	public static final byte GETTED = 2; // 已领取

	/**
	 * 奖励状态返回
	 */
	public static final byte FAILURE_NOT_AWARD = 0; // 没有奖励
	public static final byte SUCCESS = 1; // 成功
	public static final byte FAILURE_NOT_REACH = 2; // 未达到条件
	public static final byte FAILURE_NOT_REP = 3; // 已领取

}
