package com.teamtop.system.activity.ativitys.achievementTree;

public enum AchievementTreeEnum {
	/**
	 * 需玩家挑战材料副本达到xx次
	 */
	TASK_1(1),
	/**
	 * 需玩家挑战南征北战xx次
	 */
	TASK_2(2),
	/**
	 * 需玩家挑战三国战神xx次
	 */
	TASK_3(3),
	/**
	 * 需玩家挑战一骑当千xx次
	 */
	TASK_4(4),
	/**
	 * 需玩家挑战全民boss达到xx次
	 */
	TASK_5(5),
	/**
	 * 需玩家挑战国家boss达到xx次
	 */
	TASK_6(6),
	/**
	 * 需玩家挑战乱世枭雄xx次
	 */
	TASK_7(7),
	/**
	 * 需玩家组队副本挑战xx次（注意，获得奖励才算）
	 */
	TASK_8(8),
	/**
	 * 需玩家用指定品质武将护送少主xx次
	 */
	TASK_9(9),
	/**
	 * 需玩家采矿达到xx次（要自己开矿才算）
	 */
	TASK_10(10),
	/**
	 * 需玩家挑战六出祁山xx次
	 */
	TASK_11(11),
	/**
	 * 需玩家在神将阁抽奖xx次
	 */
	TASK_12(12),
	/**
	 * 需玩家在鉴定符文中完美鉴定xx次
	 */
	TASK_13(13),
	/**
	 * 需玩家祈愿抽奖xx次
	 */
	TASK_14(14),
	/**
	 * 需玩家打造神兵xx次（用神匠锤打造的次数也要算）
	 */
	TASK_15(15),
	/**
	 * 需玩家仙山寻兽次数达到xx次
	 */
	TASK_16(16),
	/**
	 * 需玩家在豪礼转盘中抽奖xx次
	 */
	TASK_17(17),
	/**
	 * 需玩家在神将现世中抽奖xx次
	 */
	TASK_18(18),
	/**
	 * 需玩家在寻宝中抽奖xx次
	 */
	TASK_19(19),
	/**
	 * 需玩家使用xx个指定道具
	 */
	TASK_20(20),
	/**
	 * 需玩家的少主技能洗练xx次
	 */
	TASK_21(21),
	/**
	 * 需玩家铜雀台达到xx层
	 */
	TASK_22(22),
	/**
	 * 需玩家达到xx关
	 */
	TASK_23(23),
	/**
	 * 需玩家通关火烧赤壁xx层
	 */
	TASK_24(24),
	/**
	 * 需玩家六出祁山通关xx关
	 */
	TASK_25(25),
	/**
	 * 需玩家累计充值满xx人民币
	 */
	TASK_26(26),
	/**
	 * 需玩家累计消费满xx元宝
	 */
	TASK_27(27),
	/**
	 * 需玩家获得xx个指定品质符文
	 */
	TASK_28(28),
	/**
	 * 需玩家获得xx点符文经验
	 */
	TASK_29(29),
	/**
	 * 需玩家获得xx个指定品质武将
	 */
	TASK_30(30),
	/**
	 * 需玩家获得xx个少主
	 */
	TASK_31(31),
	/**
	 * 需玩家获得xx个指定品质的神兵
	 */
	TASK_32(32),
	/**
	 * 需玩家符文总战力达到指定值
	 */
	TASK_33(33),
	/**
	 * 需玩家异兽总阶数达到xx阶
	 */
	TASK_34(34),
	/**
	 * 需玩家神将修炼达到xx重
	 */
	TASK_35(35),
	/**
	 * 需玩家激活x个兽魂y星套装
	 */
	TASK_36(36),
	/**
	 * 需玩家激活x个红品质的符文
	 */
	TASK_37(37),
	/**
	 * 需玩家红色品质武将总星级达到xx星
	 */
	TASK_38(38),
	;
	
	private int type;

	AchievementTreeEnum(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
