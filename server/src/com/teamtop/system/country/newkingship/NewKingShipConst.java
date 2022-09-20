package com.teamtop.system.country.newkingship;

public class NewKingShipConst {
	
	/**
	 * 王位之争开启星期配置(七天后)(顺序配)
	 */
	public static final int[] START_WEEK_ARRAY = { 1, 4 };
	
	public static final String OPEN_TIME = "00:05"; // 结束UI
	public static final String END_TIME = "22:00"; // 结束UI
	/**
	 * 是npc
	 */
	public static final int TYPE_0=0;
	/**
	 * 是玩家
	 */
	public static final int TYPE_1=1;
	
	public static final int COUNTRY_KINGSHIP = 1504;
	/**
	 * 王位之争挑战次数
	 */
	public static final int BATTLENUM=10;
	/**
	 * 战斗时间间隔
	 */
	public static final int BATTLE_CD=60;
	/**
	 * 胜利奖励
	 */
	public static final int KINGSHIP_SUCCESS_AWARD = 1061;
	/**
	 * 失败奖励
	 */
	public static final int KINGSHIP_FAILUER_AWARD = 1062;
	/**
	 * 膜拜奖励
	 */
	public static final int MOBAI=1065;
	/**
	 * 被膜拜奖励
	 */
	public static final int BEIMOBAI=1066;
	/**
	 * 官职品名-
	 */
	public static final int PINGMING=5;
	
	public static final int KINGSHIP_CANBUGTIMES = 1063;
	public static final int KINGSHIP_BUGTIMES_CONSUME = 1064;
	public static final int KINGSHIP_MOBAI_AWARD = 1065;
}
