package com.teamtop.system.country.kingship;

import com.teamtop.util.time.TimeDateUtil;

public class KingShipConst {
	public static final int COUNTRY_KINGSHIP = 1504;

	/** 挑战次数红点、膜拜次数红点、侍卫未安排满红点、 */
	public static final int REDPOINT = 1;

	/**
	 * 膜拜
	 */
	public static final int KINGSHIP_JUNZHUMOBAI = 0;
	public static final int KINGSHIP_CHENGXIANGBAI = 1;
	public static final int KINGSHIP_DAJIANGJUNMOBAI = 2;

	public static final int KINGSHIP_SUCCESS = 1;

	/**
	 * 王位之争挑战UI
	 */
	public static final int OPEN_UI = 1; // 开始UI
	public static final int END_UI = 2; // 结束UI
	public static final String OPEN_TIME = "10:00"; // 结束UI
	public static final String END_TIME = "22:00"; // 结束UI

	public static final int NOT_MOBAI = 0; // 没膜拜
	public static final int MOBAI = 1; // 已膜拜
	/**
	 * 任命皇城侍卫
	 */
	public static final int KINGSHIP_FAILURE = 0;
	public static final int KINGSHIP_NOT_REP = 2; // 重复任命侍卫
	public static final int KINGSHIP_OVER_NUM = 3; // 任命成员过量

	/**
	 * 本国挑战
	 */
	public static final int KINGSHIP_NOT_CHALLENGE = 2; // 没有挑战次数
	public static final int KINGSHIP_NOT_OPPONENT = 3; // 匹配到机器人

	/**
	 * 胜场范围
	 */
	public static final int WIN_SCORE = 3;

	/**
	 * 购买挑战次数
	 */
	public static final int KINGSHIP_NOTENOUGH_YUANBAO = 2; // 没有足够的元宝

	public static final int RECOVER_CHATIMES = 1;
	/**
	 * 王位之争拥有的挑战次数
	 */
	public static final int KINGSHIP_CHATIMES = 10;

	/**
	 * 王位之争轮换周期
	 */
	public static final int KINGSHIP_ROUND = 3;

	/**
	 * 王位之争开启星期配置(七天后)(顺序配)
	 */
	public static final int[] START_WEEK_ARRAY = { 1, 4 };

	/**
	 * 挂机经验
	 */
	public static final int KINGSHIP_GUAJIEXP = 10;

	/**
	 * 君主每轮最多的任命数
	 */
	public static final int KINGSHIP_MAX_ASSIGNNUM = 4;

	/**
	 * 战斗时间间隔
	 */
	public static final int FIGHT_TIME = 5 * TimeDateUtil.ONE_MINUTE;

	/**
	 * 系统常数表id
	 */
	public static final int KINGSHIP_SUCCESS_AWARD = 1061;
	public static final int KINGSHIP_FAILUER_AWARD = 1062;
	public static final int KINGSHIP_CANBUGTIMES = 1063;
	public static final int KINGSHIP_BUGTIMES_CONSUME = 1064;
	public static final int KINGSHIP_MOBAI_AWARD = 1065;

	/**
	 * 称号表id
	 */
	/** 君主、丞相、大将军称号id */
	public static final int TITLE_WEIKING = 34;
	/** 皇城侍卫称号id */
	public static final int KINGSHIP_TITLE = 43;

	/** NPC表id */
	public static final int NPC_WEI = 225004;

	/** 未达到 */
	public static final int NOT_REACH = 0;
	/** 可领取 */
	public static final int CAN_GET = 1;
	/** 已领取 */
	public static final int GETTED = 2;

	/** 奖励不存在 */
	public static final int FAILURE_NOT_AWARD = 0;
	/** 成功 */
	public static final int SUCCESS = 1;
	/** 未达到条件 */
	public static final int FAILURE_NOT_REACH = 2;
	/** 不能重复领取 */
	public static final int FAILURE_NOT_REP_GET = 3;

}
