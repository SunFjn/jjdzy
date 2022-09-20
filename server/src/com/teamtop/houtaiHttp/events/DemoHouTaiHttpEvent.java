package com.teamtop.houtaiHttp.events;

import io.netty.channel.ChannelHandlerContext;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;

public class DemoHouTaiHttpEvent extends AbsHouTaiHttpEvent{
	private static DemoHouTaiHttpEvent ins = null;
	public static DemoHouTaiHttpEvent getIns(){
		if(ins ==null) ins = new DemoHouTaiHttpEvent();
		return ins;
	}
	@Override
	public void handleGet(Map<String, String> paramMap,ChannelHandlerContext ctx) {
		HttpUtil.response(1, ctx);
	}

}
