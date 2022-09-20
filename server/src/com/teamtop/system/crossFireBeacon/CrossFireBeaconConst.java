package com.teamtop.system.crossFireBeacon;

public class CrossFireBeaconConst {

	/** 系统id */
//	public static final int SysId = 3703;

	public static final int redPoint = 1;

	/** 活动开启 */
	public static final byte FB_OPEN = 1;

	/** 活动关闭 */
	public static final byte FB_CLOSE = 0;

	/** 对战方数量 */
	public static final int FIGHT_SIDES = 3;

	/** 蓝方 */
	public static final byte BlueType = 1;

	/** 红方 */
	public static final byte RedType = 2;

	/** 绿方 */
	public static final byte GreenType = 3;

	/** 展示玩家数量 */
	public static final int SHOW_NUM = 10;

	/** 随机分组数量 */
	public static final int PART_NUM = 20;

	/** 单服参赛人数限制 */
	public static final int JOIN_LIMIT = 200;

	/** 参与冷却时间 */
	public static final int JOIN_CD = 30;

	/* 移动类型 */
	/** 普通移动 */
	public static final byte NOMAL_MOVE = 1;

	/** 闪现移动*/
	public static final byte FLASH_MOVE = 2;

	/** 战斗时长限制 */
	public static final int Battle_Time_Limit = 1 * 60 + 10;

	/** 个人排名数量 */
	public static final int PERSONAL_RANK_NUM = 10;
	/** 区排名数量 */
	public static final int ZONE_RANK_NUM = 2;

	/** 区排行奖励发放积分现在 */
	public static final int AWARD_SCORE_LIMIT = 1;

	/** 烽火狼烟区服排名奖励 */
	public static final int ZONE_RANK_MAIL = 56;
	/** 烽火狼烟个人排名奖励 */
	public static final int PERSONAL_RANK_MAIL = 57;
	/** 烽火狼烟MVP奖励 */
	public static final int MVP_MAIL = 58;
	/** 烽火狼烟积分奖励补发 */
	public static final int SCORE_AWARD_MAIL = 59;

	/** 战斗胜利积分 常数id */
	public static final int WIN_SCORE = 3901;
	/** 战斗失败积分 常数id */
	public static final int LOSE_SCORE = 3902;
	/** MVP奖励 常数id */
	public static final int MVP_AWARD = 3903;
	/** 烽火狼烟出身点坐标 常数id */
	public static final int POS = 3904;
	/** 烽火狼烟复活消耗元宝 常数id */
	public static final int REBORN_COST = 3905;
	/** 烽火狼烟复活时间 常数id */
	public static final int REBORN = 3906;

	/** 战斗状态 */
	public static final int NOMAL_STATE = 0;
	public static final int BATTLE_STATE = 1;

	/* 都城类型 */
	/** 皇城 */
	public static final int KING_CITY = 1;

	/** 大都城 */
	public static final int BIG_CITY = 2;

	/** 卫城 */
	public static final int GUARDIAN_CITY = 3;

	/* 活动时间 */
	public static final int STARTTIME_HOUR = 20;
	public static final int STARTTIME_MUNIT = 0;
	public static final int ENDTIME_HOUR = 20;
	public static final int ENDTIME_MUNIT = 20;

}
