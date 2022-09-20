package com.teamtop.houtaiHttp.events.notice;

import io.netty.channel.ChannelHandlerContext;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 单服公告
 * @author hepl
 *
 */
public class NoticeHttpEvent extends AbsHouTaiHttpEvent {
	private static NoticeHttpEvent ins = null;
	
	public static NoticeHttpEvent getIns(){
		if(ins == null){
			ins = new NoticeHttpEvent();
		}
		return ins;
	}
	
	private static Logger logger = LoggerFactory.getLogger(NoticeHttpEvent.class);

	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
			
			HttpUtil.responseSucc(ctx);
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "NoticeHttpEvent has error!"));
			HttpUtil.responseFail(ctx);
		}
	}

}
