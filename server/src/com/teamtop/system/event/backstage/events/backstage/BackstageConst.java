package com.teamtop.system.event.backstage.events.backstage;

/**
 * 后台相关常量
 * @author hepl
 *
 */
public class BackstageConst {
	/**
	 * 玩家登出,操作类型:刷新
	 */
	public static final int M_LOGINOUT_OPER_REFRESH = 1;
	/**
	 * 玩家登出,操作类型:正常退出
	 */
	public static final int M_LOGINOUT_OPER_NORMAL = 2;
	/**
	 * 玩家登出,操作类型:被迫下线
	 */
	public static final int M_LOGINOUT_OPER_FORCE_OFFLINE = 3;
	/**
	 * 玩家登出,操作类型:封号下线
	 */
	public static final int M_LOGINOUT_OPER_FORBIN = 4;
}
