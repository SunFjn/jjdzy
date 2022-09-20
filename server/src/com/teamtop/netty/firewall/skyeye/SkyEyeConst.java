package com.teamtop.netty.firewall.skyeye;

public class SkyEyeConst {
	/**
	 * 原因：cgcmd
	 */
	public static final int REASON_BADCMD = 1;
	/**
	 * 原因：没有同步心跳包
	 */
	public static final int REASON_HEARTBEAT = 2;
	/**
	 * 原因：channel连接没有进入场景
	 */
	public static final int REASON_CHANNEL = 3;
	/**
	 * 原因：刷包
	 */
	public static final int REASON_PACKET = 4;
	/**
	 * 在线玩家超时没有申请心跳包
	 */
	public static final int HEART_BEAT_TIMEOUT = 60;
	/**
	 * channel连接上后没有进入场景的超时时间
	 */
	public static final int CHANNEL_CONNECT_TIMEOUT = 60*5;
	public static final String BADCGCMD = "badcgcmd";
	public static final String FIREWALL = "firewall";
	/**
	 * 加速限制超时时间
	 */
	public static final int BAD_SPEED_TIMEOUT = 300;
	/**
	 * 违法ip限制超时时间
	 */
	public static final int BAD_IP_TIMEOUT = 300;
	/**
	 * 相同ip角色数上限
	 */
	public static final int SAME_IP_MAX_ROLE = 20;
	
}
