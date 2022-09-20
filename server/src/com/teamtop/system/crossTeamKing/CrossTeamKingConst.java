package com.teamtop.system.crossTeamKing;

public class CrossTeamKingConst {
	
	/**	 * 每天可以挑战次数	 */
	public static final int BATTLE_NUM=7920;
	
	/**	 * 1开始时间  2结束时间 每天11:00-12:00、22:00-23:00开启*/
	public static final int[][] TIME= new int[][]{{11,12},{22,23}};
	/**
	 * 
	 */
	public static final int TIME_ID=7924;
	
	/**
	 * 队伍状态0 空闲
	 */
	public static final int TEAM_STATE_0=0;
	/**
	 * 准备
	 */
	public static final int TEAM_STATE_1=1;
	/**
	 * 战斗中
	 */
	public static final int TEAM_STATE_2=2;
	/**
	 * 匹配cd
	 */
	public static final int MARRYBATTLE_CD=7921;
	/**
	 * 
	 */
	public static final int RANK_MAX=10;
	/**
	 * 跨服王者机器人属性百分比 
	 */
	public static final int ROBOT_NUM=7922;
	/**
	 * 跨服王者购买消耗
	 */
	public static final int BUY_COST=7923;
	
}
