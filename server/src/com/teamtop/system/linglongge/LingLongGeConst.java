package com.teamtop.system.linglongge;

public class LingLongGeConst {
	public static final int LINGLONGGE = 4801;// 玲珑阁系统开启表id
	public static final int LINGLONGGE_FIXAWARD = 2601; // 玲珑阁固定奖励
	public static final int YUANBAO_ONECONSUME = 2602; // 玲珑阁1次消耗元宝
	public static final int YUANBAO_TENCONSUME = 2603; // 玲珑阁10次消耗元宝
	public static final int SCORENEED = 2604; // 玲珑阁特殊奖励积分要求（七天前）
	public static final int SCORENEED1 = 2605; // 玲珑阁特殊奖励积分要求（七天后）
	public static final int SCORENEED2 = 2606; // 跨服玲珑阁区服领奖条件
	public static final int LINGLONGBI_ID = 410023; // 玲珑币Id

	public static final int[][] LINGLONGBI_ONECONSUME = new int[][] { new int[] { 1, LINGLONGBI_ID, 1 } }; // 玲珑币一次消耗
	public static final int BUYONE_GAINSCORE = 10; // 每购买1次可获得10积分
	public static final int HIGHAWARD_NEEDNUM = 10; // 必得高级奖励需要次数
	public static final int WEEK = 7; // 周
	public static final int AWARD_NOTICE_NUM = 5; // 奖励公告数目
	public static final int RANK_NUM = 10; // 排行榜条目

	public static final String CHENGHAO_RANGE = "46-52"; // 称号

	public static final int AWARD_NOTICE = 1; // 公告

	public static final int GENAWARD_GAILVEVENT_KEY = 0; // 普通奖励概率事件key
	public static final int HIGHAWARD_GAILVEVENT_KEY = 1; // 高级奖励概率事件key
	
	public static final int RESET_TIMES = 3804; // 玲珑阁大奖重置次数
	public static final int TOTAL_PRO = 100000; // 抽奖总概率

	public static final int REDPOINT_BXAWARD = 1; // 宝箱奖励红点
	public static final int REDPOINT_COIN = 2; // 玲珑币红点
	/**
	 * 每日积分宝箱个数-初始化不可令
	 */
	public static final int NOT_REACH = 0; // 未达到
	public static final int ALL_GET=-1;
	public static final int GETTED = 2; // 已领取
	/**
	 * 领取每日积分宝箱奖励状态返回
	 */
	public static final int FAILURE_NOT_AWARD = 0; // 奖励不存在
	public static final int FAILURE_NOT_REACH = 2; // 未达到条件
	public static final int FAILURE_NOT_REP_GET = 3; // 不能重复领取

	/**
	 * 购买类型
	 */
	public static final int LINGLONGBI_BUY = 0; // 玲珑币购买
	public static final int YUANBAO_BUY = 1; // 元宝购买

	/**
	 * 购买状态返回
	 */
	public static final int SUCCESS = 1; // 成功
	public static final int NOT_LINGLONGBI = 2; // 玲珑币不足
	public static final int NOT_YUANBAO = 3; // 元宝不足
	/**
	 * 7天前积分一轮
	 */
	public static final int SCUREMAX_SEVEN=2607;
	/**
	 * 7天后一轮积分
	 */
	public static final int SCUREMAX_NUM=2608;

}
