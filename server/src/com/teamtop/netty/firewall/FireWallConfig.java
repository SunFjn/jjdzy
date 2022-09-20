package com.teamtop.netty.firewall;


/**
 * 防火墙配置信息
 * 
 * @author pvsp
 * 
 */
public class FireWallConfig {

	/**
	 * 每秒允许发包数量
	 */
	public static final int MAX_SECOND_PACKAGES = 30;

	/**
	 * 每分钟允许发包数量
	 */
	public static final int MAX_MINUTE_PACKAGES = MAX_SECOND_PACKAGES * 60;

	/**
	 * 每秒允许发包大小
	 */
	public static final int MAX_SECOND_BYTES = 500;

	/**
	 * 每分允许发包数量
	 */
	public static final int MAX_MINUTE_BYTES = MAX_SECOND_BYTES * 60;

}