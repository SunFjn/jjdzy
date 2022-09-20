package com.teamtop.houtaiHttp.events.adMonitor;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 广告监控（关闭入口）
 * @author hepl
 *
 */
public class AdMonitorHttpEvent extends AbsHouTaiHttpEvent {
	
	private static AdMonitorHttpEvent ins = null;
	
	public static AdMonitorHttpEvent getIns(){
		if(ins == null){
			ins = new AdMonitorHttpEvent();
		}
		return ins;
	}
	
	private static Logger logger = LoggerFactory.getLogger(AdMonitorHttpEvent.class);

	@Override
	public void handleGet(Map<String, String> paramMap,	ChannelHandlerContext ctx) {
		try {
			
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "AdMonitorHttpEvent error!"));
			HttpUtil.responseFail(ctx);
		}
	}

}
