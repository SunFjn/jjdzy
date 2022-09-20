package com.teamtop.system.longZhongDui;

public class LongZhongDuiConst {
	public static final int ZHUCHENG = 1401;
	public static final int HUODONG = 3701;
	public static final int LONGZHONGDUI = 3702;

	/** 红点 */
	public static final int REDPOINT = 1;

	public static final int OPEN_NOW = 2;

	public static final int LONGZHONGDUI_AWARD = 2301; // 隆中对答对奖励（隆中宝玉）

	public static final int TOPIC_NUM = 20; // 题目数量
	public static final int FirstTOPIC_DOWNTIME = 4; // 第一道题倒计时时间
	public static final int EVERYTOPIC_TIME = 15; // 每道题作答时间
	public static final int EVERYTOPIC_DISTANCE = 5; // 每题之间间隔
	public static final String OPEN_TIME = "12:00"; // 活动开始时间
	public static final String END_TIME = "22:00"; // 活动结束时间
	public static final String SCHEDULE_ID = "longzhongduiEndHandle"; // 隆中对结束处理调度器id
	public static final int END_DELAY_TIME = 0; // 距离活动结束的时间

	public static final int SCORE_BASE = 1; // 积分基数

	public static final int RANK_NUM = 10; // 排行榜排名个数
	/**
	 * 打开答题界面状态返回
	 */
	public static final int NOT_START = 0; // 活动未开始
	public static final int START_ANSWER = 1; // 开始答题
	public static final int ANSWERING = 2; // 答题中
	public static final int ANSWER_TIMEOUT = 3; // 答题超时
	public static final int END_ANSWER = 4; // 活动结束
	public static final int CAN_ANSWER = 5; // 可答题
	public static final int TODAY_ANSWERED = 6; // 已答完题

}
