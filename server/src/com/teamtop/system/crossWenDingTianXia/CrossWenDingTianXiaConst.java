package com.teamtop.system.crossWenDingTianXia;

public class CrossWenDingTianXiaConst {

	/**	 * 每N个区为一个房间	 */
	public static final int SERVER_NUM=4;
	/**	 * 活动时长  秒	 */
	public static final int TIME_GAME_PLAY= 20*60;
	/**	 * 退出副本冷却时间  秒 */
	public static final int TIME_LOGOUT=30;
	/**	 * 定时奖励定时时长  秒 */
	public static final int TIME_AWARDS=30;
	/**	 * 连续死亡N次可获得复仇之魂BUFF， 之后每死亡1次,buff等级+1 */
	public static final int NUM_DEATH=3;
	/**	 * 连续死亡N次可获得复仇之魂BUFF， 10次封顶 */
	public static final int NUM_DEATH_10=10;
	/**	 * npc的速度	 */
	public static final int NPC_DEFAULT_SPEED = 50;
	/**	 * 排行榜显示数量	 */
	public static final int NUM_RANK = 10;
	/**	 * 掉层总概率	 */
	public static final int PRO_UPPER_LAYER = 100000;
	/**	 * 红点位置	活动大厅 */
	public static final int INDEX_RED = 1;
	
	/**	 * 啥都不是ID */
	public static final int ID_XX=0;
	/**	 * 主宰配置表ID */
	public static final int ID_ZZ=1;
	/**	 * 超神配置表ID */
	public static final int ID_CS=2;
	/**	 * 杀10人以上的时候，每5个人广播一次 */
	public static final int KILL_10=10;
	
	/**	 * 活动进行到的阶段   0未开启 */
	public static final int STATE_0=0;
	/**	 * 活动进行到的阶段   1开启 */
	public static final int STATE_1=1;
	/**	 * 活动进行到的阶段   2结束 */
	public static final int STATE_2=2;
	
	/**	 * 奖励领取姿态  0未领取 */
	public static final int STATE_AWARDS_0=0;
	/**	 * 奖励领取姿态  1可领取 */
	public static final int STATE_AWARDS_1=1;
	/**	 * 奖励领取姿态  2已领取 */
	public static final int STATE_AWARDS_2=2;
	
	/**	 * 奖励类型   0排行奖励 */
	public static final int TYPE_AWARDS_0=0;
	/**	 * 奖励类型   1斩杀奖励 */
	public static final int TYPE_AWARDS_1=1;
	/**	 * 奖励类型   2楼层奖励 */
	public static final int TYPE_AWARDS_2=2;
	/**	 * 奖励类型   3问鼎天下-玉玺豪礼奖励,真龙天子奖励 */
	public static final int TYPE_AWARDS_3=3;
	/**	 * 奖励类型   4积分奖励 */
	public static final int TYPE_AWARDS_4=4;
	
	/**	 * 数据类型   积分 */
	public static final String TYPE_JF="jf";
	/**	 * 数据类型   连杀数 */
	public static final String TYPE_NUM="num";
	/**	 * 数据类型   玉玺 */
	public static final String TYPE_YX="yx";
	/**	 * 数据类型  玩家状态0默认1死亡2战斗中 */
	public static final String TYPE_WJZT="wjzt";
	/**	 * 数据类型  玩家气血百分比,100以内的整数 */
	public static final String TYPE_WJQX="wjqx";
	
}
