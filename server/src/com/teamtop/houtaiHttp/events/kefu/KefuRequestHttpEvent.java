package com.teamtop.houtaiHttp.events.kefu;

import io.netty.channel.ChannelHandlerContext;

import java.net.URLDecoder;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.events.goodsApply.GoodsApplyHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 客服反馈http事件类
 * @author hepl
 *
 */
public class KefuRequestHttpEvent extends AbsHouTaiHttpEvent {
	
	private static KefuRequestHttpEvent ins = null;
	
	public static KefuRequestHttpEvent getIns(){
		if(ins == null){
			ins = new KefuRequestHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
		} catch (Exception e) {
			HttpUtil.responseFail(ctx);
			LogTool.error(e, KefuRequestHttpEvent.class, "KefuRequestHttpEvent error!");
		}
	}

}
