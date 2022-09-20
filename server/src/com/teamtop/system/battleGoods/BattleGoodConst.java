package com.teamtop.system.battleGoods;

public class BattleGoodConst {
	/**
	 * 关闭
	 */
	public static final int ACT_STATE_0=0;
	/**
	 * 准备状态
	 */
	public static final int ACT_STATE_1=1;
	/**
	 * 开启状态
	 */
	public static final int ACT_STATE_2=2;
	/**
	 * 对战方数量 
	 * */
	public static final int FIGHT_SIDES = 3;
	/**
	 * 加入cd
	 */
	public static final int JOIN_CD=20;
	
	/**
	 *  玩家/npc/宝箱状态: 无
	 */
	public static final int JOINER_STATE_0= 0;
	/**
	 *  玩家状态：1采集中
	 */
	public static final int JOINER_STATE_1= 1;
	/**
	 * 玩家状态：2pvp中  
	 */
	public static final int JOINER_STATE_2=2;
	/**
	 * 玩家/npc状态：3pve中
	 */
	public static final int JOINER_STATE_3=3;
	/**
	 * 玩家/npc状态：4为了宝箱pvp中
	 */
	//public static final int JOINER_STATE_4=4;
	/**
	 * 玩家状态：5复活cd中
	 */
	public static final int JOINER_STATE_5=5;
	
	/**
	 * 箱子状态：1正在被1人拾取中
	 */
	public static final int BOX_STATE_1=1;
	
	/**
	 * 0参与者 1宝箱 2怪物
	 */
	public static final int Type_0=0;
	/**
	 * 0参与者 1宝箱 2怪物
	 */
	public static final int Type_1=1;
	/**
	 * 0参与者 1宝箱 2怪物
	 */
	public static final int Type_2=2;
	/**
	 * 参与者复活cd
	 */
	public static final int FUHUO_CD=7602;
	/**
	 * 出生个点id
	 */
	public static final int BORN=7604;
	/**
	 * 采集宝箱时间
	 */
	public static final int BOX_GETTIME=10;
	/**
	 * npc刷新时间
	 */
	public static final int FRESH_CD=7605;
	/**
	 * 复活元宝
	 */
	public static final int FUHUO_COST=7603;
	/**
	 * mvp奖励
	 */
	public static final int MVP_REWARD=7601;
	/**
	 * 粮草争夺-战斗胜利积分
	 */
	public static final int PVP_WINSOURCE=7608;
	
	/**
	 * 粮草争夺-战斗失败积分
	 */
	public static final int PVP_LOSESOURCE=7609;


}
