package com.teamtop.system.alarmSystem;

public enum AlarmType {

	/** 入库报警 */
	SAVE_DB(1),
	/** 元宝 */
	YB(2),
	/** 铜钱 */
	COIN(3),
	/** 启动失败 */
	STARTUP_FAIL(4),
	/** 后台同步 */
	HOUTAI_SYN(5),
	/** 充值发货失败 */
	RECHARGE_SEND(6),
	/** 充值白名单充值 */
	WHITE_RECHARGE(8),
	/** 服务器预警 */
	SERVER_WARN(9),
	/** 道具数量预警 */
	TOOL_WARN(10),
	/** 跨服活动异常预警 */
	CROSS_ACT_WARN(11),
	/** 自动开服检查人数失败*/
	SELF_MOTION_CHECK_NUM(12),
	/** 单次铜币 */
	ONCE_COIN(13),
	/** 单次元宝 */
	ONCE_YB(14)
	;

	private int type;

	private AlarmType(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

}
