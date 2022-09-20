package com.teamtop.houtaiHttp;

import java.util.Map;

import io.netty.channel.ChannelHandlerContext;

public abstract class AbsHouTaiHttpEvent {
	/**
	 * 接收http的get请求
	 * 请求地址例子：http://192.168.7.115:9802/?cmd=1&actid=123
	 * @param paramMap 参数列表
	 * @param ctx 上下文
	 */
	public abstract void handleGet(Map<String,String> paramMap,ChannelHandlerContext ctx);
	
	/**
	 * 接收http的post请求
	 * 请求地址例子：http://192.168.7.115:9802/?cmd=1&actid=123
	 * @param paramMap 参数列表
	 * @param ctx 上下文
	 */
	public void handlePost(byte[] data,Map<String, String> param,ChannelHandlerContext ctx){};
	
}
