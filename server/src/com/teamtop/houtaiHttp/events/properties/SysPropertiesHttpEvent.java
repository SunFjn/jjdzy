package com.teamtop.houtaiHttp.events.properties;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;

import io.netty.channel.ChannelHandlerContext;

/**
 * 更新系统配置文件game.properties的配置
 * @author hepl
 *
 */
public class SysPropertiesHttpEvent extends AbsHouTaiHttpEvent{
	private static SysPropertiesHttpEvent ins = null;
	
	public static SysPropertiesHttpEvent getIns(){
		if(ins == null){
			ins = new SysPropertiesHttpEvent();
		}
		return ins;
	}
	
	private static final Logger logger = LoggerFactory.getLogger(SysPropertiesHttpEvent.class);
	
	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		
	/*	int type = Integer.parseInt(paramMap.get("type"));
		if(type == 1){
			//查询
			SafeProperties properties = PropertiesTools.getProperties();
			String str = JsonUtils.toStr(properties.entrySet());
			HttpUtil.response(str, ctx);
		}else if(type == 2){
			//修改
			String pkey = paramMap.get("pkey");
			String pvalue = paramMap.get("pvalue");
			if(StringUtils.isBlank(pkey)){
				HttpUtil.responseFail(ctx);
				return;
			}
			try {
				//设置的值为null则需要返回当前的值
				if(StringUtils.isBlank(pvalue)){
					String properties = PropertiesTools.getProperties(pkey);
					if(!StringUtils.isBlank(properties)){
						HttpUtil.response(properties, ctx);
					}
					return;
				}
				HttpUtil.responseSucc(ctx);
				//解码
				pvalue = URLDecoder.decode(pvalue, "utf-8");
				//修改缓存中的值
				if("serverOpenTime".equalsIgnoreCase(pkey)){
					int time = TimeDateUtil.getTimeIntByStr(pvalue);
					if(GameProperties.serverOpenTime != time){
						GameProperties.serverOpenTime=time;
						//开服7天内才处理
						int now = TimeDateUtil.getCurrentTime();
						if(now >= GameProperties.serverOpenTime && now < GameProperties.serverOpenTime+TimeDateUtil.ONE_DAY_INT*7){
							//修改开服时间时，清除所有活动信息
							ActivityCache.getOnProcessInfoMap().clear();
							//重置开服比拼活动
							KaiFuBiPinCache.getIns().startServer();
//							KaifuActivityFunction.getIns().resetKaifuTime();//开服活动
						}
					}
				}
				//保存值
				PropertiesTools.setPropreties(pkey, pvalue);
				//重新保存配置文件
				PropertiesTools.saveProperties(null);
				logger.info("success update system properties pkey="+pkey+",pvalue="+pvalue);
			} catch (Exception e) {
				logger.error("key="+pkey+" value="+pvalue+" UpdateSysPropertiesHttpHandler exception:",e);
			}
		}*/
	}

}
