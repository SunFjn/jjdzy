package com.teamtop.util.asyncHttp.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.system.hero.Hero;
import com.teamtop.util.asyncHttp.AbsAsyncHttpCallback;
import com.teamtop.util.log.LogTool;
/**
 * 任务集市上报异步请求
 * @author Administrator
 *
 */
public class ZoneMarketReportAsyncHttpCallback extends AbsAsyncHttpCallback{
	private static Logger logger = LoggerFactory.getLogger(ZoneMarketReportAsyncHttpCallback.class);
	@Override
	public void handleData(Hero hero, String data,Object ext) {

		logger.info(LogTool.getmsg(hero.getId(), hero.getNameZoneid(), "uploadMarketCallback,result:"+data));
	
	}

	@Override
	public void timeout(Hero hero,Object ext) {
		
	}

}
