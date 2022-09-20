package com.teamtop.houtaiHttp.events.loginNotice;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;

import io.netty.channel.ChannelHandlerContext;

public class LoginNoticeClientHttpEvent extends AbsHouTaiHttpEvent {

	private static LoginNoticeClientHttpEvent ins;

	private LoginNoticeClientHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LoginNoticeClientHttpEvent getIns() {
		if (ins == null) {
			ins = new LoginNoticeClientHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		HttpUtil.response(LoginNoticeCache.NOTICE_CONTENT, ctx);
	}

}
