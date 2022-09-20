package com.teamtop.houtaiHttp.events.loginNotice;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class LoginNoticeHttpEvent extends AbsHouTaiHttpEvent {

	private static LoginNoticeHttpEvent ins;

	private LoginNoticeHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LoginNoticeHttpEvent getIns() {
		if (ins == null) {
			ins = new LoginNoticeHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String content = paramMap.get("content");
			if (CommonUtil.isNull(content)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			LoginNoticeCache.NOTICE_CONTENT = content;
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, LoginNoticeHttpEvent.class, "LoginNoticeHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
