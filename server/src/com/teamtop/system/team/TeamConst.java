package com.teamtop.system.team;
/**
 * 队伍常量
 * @author Administrator
 *
 */
public class TeamConst {

	/**	 * 队员类型：队长	 */
	public static final int TYPE_LEADER = 1;
	/**	 * 队员类型：队员	 */
	public static final int TYPE_MEMBER = 2;
	
	/**	 * 队伍列表显示最大数	 */
	public static final int TEAM_SHOW_MAX=3;
	/**	 * 队伍队员最大数量	 */
	public static final int TEAM_MEMBER_MAX=3;

	/**	 * 队伍状态  1进行中	 */
	public static final int TEAM_STATE_NO_JONE=1;
	/**	 * 队伍状态  2可加入	 */
	public static final int TEAM_STATE_CAN_JONE=2;
	
	/**	 * 角色状态  1没队伍	 */
	public static final int HERO_NO_TEAM=1;
	/**	 * 角色状态  2有队伍	 */
	public static final int HERO_HAD_TEAM=2;
	/**	 * 角色状态  3异常，有队伍，但队伍数据不存在	 */
	public static final int HERO_HAD_TEAM_EXCEPTION=3;
	/**	 * 角色状态  4不是同类型队伍	 */
	public static final int HERO_HAD_TEAM_OTHER_TYPE=4;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 队伍类型：场景队伍
	 */
	public static final int TYPE_TEAM_SCENE = 1;
	/**
	 * 队伍类型：组队大厅全部
	 */
	public static final int TYPE_TEAM_DATING_ALL = 100;
	/**
	 * 队伍类型：组队大厅通天峰
	 */
	public static final int TYPE_TEAM_DATING_1 = 2;
	/**
	 * 队伍类型：组队大厅万安寺
	 */
	public static final int TYPE_TEAM_DATING_2 = 3;
	/**
	 * 队伍类型：地狱摩天崖
	 */
	public static final int TYPE_TEAM_DATING_8 = 8;
	/**
	 * 队伍类型：恶魔摩天崖
	 */
	public static final int TYPE_TEAM_DATING_9 = 9;
	/**
	 * 队伍类型：幽冥摩天崖
	 */
	public static final int TYPE_TEAM_DATING_11 = 11;
	/**
	 * 队伍类型：组队大厅侠客岛
	 */
	public static final int TYPE_TEAM_DATING_10 = 10;
	/**
	 * 队伍类型：跨服竞技3v3
	 */
	public static final int TYPE_TEAM_CTB = 14;
	/**
	 * 队伍类型：跨服进阶副本
	 */
	public static final int TYPE_TEAM_JINJIE = 15;
	/**
	 * 队员状态：在线跟随
	 */
	public static final int STATE_FOLLOW = 1;
	/**
	 * 队员状态：暂离
	 */
	public static final int STATE_LEAVE_FOR_AWHILE = 2;
	/**
	 * 队员状态：离线
	 */
	public static final int STATE_OFFLINE = 0;
	/**
	 * 组队出阵的奖励是熊猫
	 */
	public static final int DEPLOY_PANDA = 2;
	/**
	 * 广发队伍状态：切换队长
	 */
	public static final int STATE_BOARD_CHANGE = 1;
	/**
	 * 广发队伍状态：其他
	 */
	public static final int STATE_BOARD_OTHER = 2;
	/**
	 * 广发队伍状态：退队
	 */
	public static final int STATE_BOARD_QUIT = 3;
}
