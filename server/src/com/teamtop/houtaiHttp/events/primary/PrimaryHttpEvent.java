package com.teamtop.houtaiHttp.events.primary;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;
/**
 * 问鼎天下后台处理事件
 * @author lobbyer
 * @date 2017年8月20日
 */
public class PrimaryHttpEvent extends AbsHouTaiHttpEvent {
	private static PrimaryHttpEvent ins;
	public static PrimaryHttpEvent getIns() {
		if(ins == null) {
			ins = new PrimaryHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
		} catch (Exception e) {
			LogTool.error(e, this, "PrimaryHttpEvent has error!");
			HttpUtil.responseFail(ctx);
		}
	}

}
