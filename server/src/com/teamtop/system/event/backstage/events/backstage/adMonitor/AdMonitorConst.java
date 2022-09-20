package com.teamtop.system.event.backstage.events.backstage.adMonitor;

import com.teamtop.util.time.TimeDateUtil;

/**
 * 广告监控常量类
 * @author hepl
 *
 */
public class AdMonitorConst {
	/**
	 * 广告号状态，0，不是广告号
	 */
	public static final int STATE_0 = 0;
	/**
	 * 广告号状态，1，广告关键字可疑人
	 */
	public static final int STATE_1 = 1;
	/**
	 * 广告号状态，2，私聊多可疑人
	 */
	public static final int STATE_2 = 2;
	/**
	 * 广告号状态，3，连续相似发言
	 */
	public static final int STATE_3 = 3;
	/**
	 * 广告号状态，4，是广告号
	 */
	public static final int STATE_4 = 4;
	/**
	 * 单次聊天内容敏感字评分
	 */
	public static final int SCORE_CHECK = 100;
	/**
	 * 私聊频率时间，3分钟
	 */
	public static final int SECRET_TALK_TIME_3 = TimeDateUtil.ONE_MINUTE * 3;
	/**
	 * 私聊频率时间，5分钟
	 */
	public static final int SECRET_TALK_TIME_5 = TimeDateUtil.ONE_MINUTE * 5;
	/**
	 * 私聊频率时间，10分钟
	 */
	public static final int SECRET_TALK_TIME_10 = TimeDateUtil.ONE_MINUTE * 10;
	/**
	 * 私聊频率时间，30分钟
	 */
	public static final int SECRET_TALK_TIME_30 = TimeDateUtil.ONE_MINUTE * 30;
	/**
	 * 私聊频率人数，5人
	 */
	public static final int SECRET_TALK_NUM_5 = 5;
	/**
	 * 私聊频率人数，10人
	 */
	public static final int SECRET_TALK_NUM_10 = 10;
	/**
	 * 私聊频率人数，15人
	 */
	public static final int SECRET_TALK_NUM_15 = 15;
	/**
	 * 私聊频率人数，20人
	 */
	public static final int SECRET_TALK_NUM_20 = 20;
}
