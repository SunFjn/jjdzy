package com.teamtop.houtaiHttp.events.groovy;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.redeploy.RedeployEnum;
import com.teamtop.redeploy.cross.RedeployLocalToCross;
import com.teamtop.util.common.ZoneIDUtil;
import com.teamtop.util.groovy.InvokeGroovy;

import io.netty.channel.ChannelHandlerContext;

/**
 * groovy 脚本
 * http://127.0.0.1:8802/?sign=c122b8b3c37d09c09c95bb6411091b6c&cmd=1004&randnum=1
 */
public class GroovyHttpEvent extends AbsHouTaiHttpEvent {
	private static Logger logger = LoggerFactory.getLogger(GroovyHttpEvent.class);
	private static GroovyHttpEvent ins = null;

	public static GroovyHttpEvent getIns() {
		if (ins == null) {
			ins = new GroovyHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		String typeStr = paramMap.get("type");
		if(typeStr == null){
			HttpUtil.responseFail(ctx);
			return;
		}
		int type = Integer.parseInt(typeStr);
		if(type == 1){
			String runScript = InvokeGroovy.runScript(GroovyCache.DEBUG_FILE_NAME);
			HttpUtil.response(runScript, ctx);
		}else if(type == 2){
			String zonelistStr = paramMap.get(RedeployEnum.zonelist.name());
			List<Integer> zidList = ZoneIDUtil.getzidListByStr(zonelistStr);
			boolean success = RedeployLocalToCross.groovyByZIDListLC(zidList, GroovyCache.DEBUG_FILE_NAME, RedeployEnum.groovy.name());
			if(success){
				HttpUtil.response("Server9999：脚本子服指令发送成功", ctx);
				GroovyFunction.initZIDGroovyMsg();
			}else{
				HttpUtil.response("Server9999：脚本子服指令报错", ctx);
			}
		}else if(type == 3){
			String zidSuccessResult = GroovyFunction.getZIDSuccessResult();
			HttpUtil.response("Server9999： "+zidSuccessResult, ctx);
		}else if(type == 4){
			String zonelistStr = paramMap.get(RedeployEnum.zonelist.name());
			List<Integer> zidList = ZoneIDUtil.getzidListByStr(zonelistStr);
			boolean success = RedeployLocalToCross.groovyByZIDListLC(zidList, GroovyCache.DEBUG_CONVENIENT_FILE_NAME, RedeployEnum.GROOVY_CONVENIENT.name());
			if(success){
				HttpUtil.response("Server9999：脚本便捷式子服指令发送成功", ctx);
				GroovyFunction.initGroovyConvenientMap();
			}else{
				HttpUtil.response("Server9999：脚本便捷式子服指令报错", ctx);
			}
		}else if(type == 5){
			String zidSuccessResult = GroovyFunction.getGroovyConvenientResult();
			HttpUtil.response("Server9999："+zidSuccessResult, ctx);
		}else{
			HttpUtil.response("Server9999：没有类型"+type, ctx);
		}
	}



}
