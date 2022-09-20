package com.teamtop.system.crossKing;

/**
 * 最强王者常量类
 * @author lobbyer
 * @date 2016年8月29日
 */
public class CrossKingConst {
	/**
	 * 初始化段位（新秀一阶）
	 */
	public static final int INIT_TYPE = 1;
	/**
	 * 最强段位-乱世枭雄
	 */
	public static final int KING_ID = 13;
	/**乱世枭雄排行榜显示**/
	public static final int DW_RANK_SHOW=10;
	/**
	 * 王者类型 0人类
	 */
	public static final int KINGTYPE_HERO = 0;
	/**
	 * 王者类型 1NPC
	 */
	public static final int KINGTYPE_NPC = 1;
	/**
	 * 赛季状态：0未开启
	 */
	public static final int STATE_NOTOPEN = 0;
	/**
	 * 赛季状态：1开启
	 */
	public static final int STATE_START = 1;
	/**
	 * 赛季状态：2结束
	 */
	public static final int STATE_END = 2;
	
	/**
	 * 通知操作不通过
	 */
	public static final int NOTICE_CANNOT = 0;
	/**
	 * 通知开启赛季
	 */
	public static final int NOTICE_START = 1;
	/**
	 * 通知结束赛季
	 */
	public static final int NOTICE_END = 2;
	/**
	 * 晋级段位广播开始id
	 */
	public static final int BROAD_DWID = 5001;
	/**
	 * 排行榜开始段位钻石
	 */
	public static final int RANK_DWID = 6001;

	/**战斗结果0:失败**/
	public static final int BATTLE_REST_0=0;
	/**战斗结果1：成功**/
	public static final int BATTLE_REST_1=0;
	/**战斗结果2：以前端结果为准**/
	public static final int BATTLE_REST_2=2;
	/**战斗胜利奖励**/
	public static final int BATTLE_WIN_REWARD=2201;
	/**战斗失败奖励**/
	public static final int BATTLE_FAILED_REWARD=2202;
	/**每日最大购买次数**/
	public static final int BUYNUM_MAX=2203;
	/**购买次数花费**/
	public static final int BUYNUM_COST=2204;
	/**每日挑战次数**/
	public static final int DAYNUM_COST=2205;
	/**换一批消耗**/
	public static final int CHANGE_COST=2206;
	/**战斗胜利积分**/
	public static final int BATTLE_WIN_JIFEN=2207;
	/**战斗胜利积分**/
	public static final int BATTLE_FAILED_JIFEN=2208;
	/**是竞技赛**/
	public static final int ISJINGJI=1;
	/**战斗超时时间**/
	public static final int MAXBATTLETIM=30;
	/**乱世枭雄初始排名(初始化机器人数)**/
	public static final int BEGIN_NUM=2209;
	/**乱世枭雄系统**/
//	public static final int SYSID=3602;
	/** 乱世枭雄挑战令id **/
	public static final int PROP_ID = 416016;
	
}
