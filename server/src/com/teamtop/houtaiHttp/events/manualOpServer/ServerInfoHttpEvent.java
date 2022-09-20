package com.teamtop.houtaiHttp.events.manualOpServer;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class ServerInfoHttpEvent extends AbsHouTaiHttpEvent {
	//http://127.0.0.1:9812/?sign=5bb141190437018a78e1ff14d9b38fc9&cmd=1002&randnum=1540716800&type=1
	private static ServerInfoHttpEvent ins;

	public ServerInfoHttpEvent() {
	}

	public static synchronized ServerInfoHttpEvent getIns() {
		if (ins == null) {
			ins = new ServerInfoHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String typeStr = paramMap.get("type");
			int type = Integer.parseInt(typeStr);
			if ( type == 1) {
				ServerInfoCache.initAndReflashServer( true);
				HttpUtil.responseSucc(ctx);
			}else{
				HttpUtil.response( -1, ctx);
			}
		} catch (Exception e) {
			LogTool.error(e, ServerInfoHttpEvent.class, "YunweiHoutaiHttpEvent");
			HttpUtil.responseFail(ctx);
		}
	}

}
