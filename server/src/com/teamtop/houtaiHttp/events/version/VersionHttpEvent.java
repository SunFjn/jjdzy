package com.teamtop.houtaiHttp.events.version;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.redeploy.cross.RedeployLocalToCross;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * http://127.0.0.1:8802/?sign=6fabd4af3541d8cf5f9dcc31bc1d8ac6&cmd=1005&randnum=1&type=1
 * 版本号相关
 * type  1开始收集版本号  2查看收集结果
 */
public class VersionHttpEvent extends AbsHouTaiHttpEvent {
	private static VersionHttpEvent ins = null;
	public static VersionHttpEvent getIns() {
		if (ins == null) {
			ins = new VersionHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String typeStr = paramMap.get("type");
			if(typeStr == null){
				HttpUtil.responseFail(ctx);
				return;
			}
			int type = Integer.parseInt(typeStr);
			if(type == 1){
				VersionCache.setTimeBegin(System.currentTimeMillis());
				VersionCache.setTimeEnd(0);
				RedeployLocalToCross.getAllVersionLC();
				RedeployLocalToCross.getAllCrossVersionLC();
				HttpUtil.response("Server9999：Start collecting version.", ctx);
			}else if(type == 2){
				String versionZidStr = VersionFunction.getVersionZidStr();
				HttpUtil.response("Server9999："+versionZidStr, ctx);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "");
			HttpUtil.response("Server9999：VersionHttpEvent报错", ctx);
		}
	}

}
