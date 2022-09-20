package com.teamtop.houtaiHttp.events.switchOnOff;

import java.util.Map;

import io.netty.channel.ChannelHandlerContext;

public interface SwitchOnOffInf {
	/**
	 * 业务处理
	 * 
	 * @param paramMap
	 * @param ctx
	 */
	public void transactionHandle(Map<String, String> paramMap, ChannelHandlerContext ctx);
}
