package com.teamtop.system.crossBoss;
/**
 * 跨服boss
 * @author Administrator
 *
 */
public class CrossBossConst {
	public static final int SYSID=1804;
	
	/**
	 * 一个房间 能装多少个区
	 */
	public static final int ZONEIDSIZE=20;
	/**
	 * boss规定时间内击杀增加血量最高次数
	 */
	public static final int ADDFLOORSIZE=9;
	/**
	 * boss被击杀时间范围
	 */
	public static final int ADDFLOORTIME=1081;
	/**
	 * 今天最多可以购买次数
	 */
	public static final int BUYMAX=1083;
	/**
	 * 购买次数花费
	 */
	public static final int BUYCOST=1082;
	/**
	 * 死亡复活需要元宝
	 */
	public static int FUHUO_YB = 1013;
	/**
	 * 死亡复活冷却时间
	 */
	public static int CD_FUHUO_HORE = 1012;
	/**
	 * 增加攻击次数
	 */
	public static int ADD_ATT_MAX = 10;
	/**
	 * 七擒孟获增加伤害值
	 */
	public static int BUY_ATT_ADDNUM=1086;
	
	/**
	 * 七擒孟获增加伤害的消耗
	 */
	public static int BUY_ATT_COST=1087;
	/**
	 * boss结束
	 */
	public static final int STATE_END = 0;
	/**
	 * boss准备
	 */
	public static final int STATE_READY = 1;
	/**
	 * boss开始
	 */
	public static final int STATE_START = 2;

	/**
	 * 每天进入次数
	 */
	public static int CROSS_IN_NUM = 5;
	

	/**
	 * boss 进入CD
	 */
	public static int IN_BOSS_CD = 30;
	
	/**广播的玩家数量*/
	public static int BROADCAST_COUNT = 10;
	
	/**
	 * 跨服boss id
	 */
	public static final int BOSS_ID = 15000;
	
	/**排行榜长度*/
	public static final int RANK_MAX_NUM = 20;
	/**
	 * 没有在跨服boss
	 */
	public static final int INBOSS_STATE0=0;
	/**
	 * 在跨服boss
	 */
	public static final int INBOSS_STATE1=1;
	/**
	 * 七擒孟获血量提升倍数上限
	 */
	public static final int ADD_MAX=1084;
	/**
	 * 七擒孟获血量降低下限
	 */
	public static final int MUINE_MAX=1085;
	
}
