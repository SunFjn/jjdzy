package com.teamtop.system.zcBoss;

public class ZcBossConst {	
    //怪物类型定义
	public static final byte BOSS_TYPE=1;
	public static final byte ELITE_TYPE=2;
    public static final byte BIG_BOSS=3;
	
	//副本状态定义
	/**副本初始状态，被击杀后进入倒计时*/
	public static final byte STATUS_INIT=0;
	/**准备状态,可以进入副本*/
	public static final byte STATUS_PRE=1;
	
	/**玩家pk状态,不可以进入副本*/
	public static final byte STATUS_PLAYER_PK=2;
	
	/**玩家开始抢夺boss，击杀boss，不可以进入副本*/
	public static final byte STATUS_KILL_BOSS=3;
	
	/**击杀boss状态（规定时间未击杀完成boss），可以进入副本*/
	public static final byte STATUS_KILL_BOSS_NOT_FINISH=4;
	
	//进入副本返回提示常量定义
	public static final byte ENTER_CAN=1;
	
	public static final byte OPEN_LEVEL_NOT_ENOUGH=2;
	
	public static final byte LIMIT_LEVEL_NOT_ENOUGH=3;
	
	public static final byte ENTER_TEAM_NOT=4;
	
	public static final byte STATUS_NOT_ALLOW=5;
	
	public static final byte STATUS_MAX=6;
	
	public static final byte PK_CAN=1;
	
	public static final byte PK_BATTLE=2;
	
	public static final byte PK_NOT_STATUS=3;
	
	public static final byte NOT_SAME_BOSS=4;
	public static final byte NOT_TEAM=5;
    public static final byte KILL_BOSS_NOT=2;
    public static final byte KILL_BOSS_CAN=1;
    public static final byte KILL_BOSS_LOCK=3;//其它玩家在攻击中
	
	
	//其它常量定义
	
	public static final int TIME_TEN=(10*60)*1000;
	public static final int TIME_FIVE=(5*60)*1000;
	
	public static final int POS_X=889;
	public static final int POS_Y=687;
	
//	/**3小时30分钟的毫秒表示*/
//	public static final int TIME_PRE=(3*3600+30*60)*1000;
//	
//	/**3小时40分钟的毫秒表示*/
//	public static final int TIME_PK=(3*3600+40*60)*1000;
//	
//	/**3小时50分钟的毫秒表示*/
//	public static final int TIME_KILL_BOSS=(3*3600+50*60)*1000;
//	
//	/**4小时毫秒表示*/
//	public static final int TIME_KILL_BOSS_NOT_FINISH=4*3600*1000;
//	
//	/**0小时30分钟的毫秒表示*/
//	public static final int TIME_PRE_ZERO=(0*3600+30*60)*1000;
//	
//	/**0小时40分钟的毫秒表示*/
//	public static final int TIME_PK_ZERO=(0*3600+40*60)*1000;
//	
//	/**0小时50分钟的毫秒表示*/
//	public static final int TIME_KILL_BOSS_ZERO=(0*3600+50*60)*1000;
//	
//	/**1小时毫秒表示*/
//	public static final int TIME_KILL_BOSS_NOT_FINISH_ZERO=1*3600*1000;
	/**
	 * boss死亡->开入口时间
	 */
	//public static final int TIME_READY_GAP = 40;
	/**
	 * 开入口时间->pk间隔时间 等待pk
	 */
	public static final int TIME_PK_GAP =60*1;
	/**
	 * pk->Boss刷新
	 */
	public static final int TIME_FRESH_GAP=60*2;
	/**
	 * boss刷新结束后 40s没被打死 ->任意玩家都可以进入
	 */
	public static final int TIME_OVER_GAP=60*5;
	/**
	 * boss副本最大人数
	 */
	public static final int MAX_ROLES=20;
	/**
	 * BOSS战场战斗胜利积分
	 */
	public static final int ZCBOSS_WIN=4801;
	/**
	 * BOSS战场战斗失败积分
	 */
	public static final int ZCBOSS_FAILE=4802;
	

	
	public static final byte GOLD_NPC=1;
	public static final byte SILVER_NPC=2;
	public static final byte COPPE_NPC=3;
	

	
	
	public static final int SENTSCORENUM=9516;
	
	public static final int BUYSHENGBING=9518;
	
	public static final int SENTSCOREEFFECT=9520;
}
