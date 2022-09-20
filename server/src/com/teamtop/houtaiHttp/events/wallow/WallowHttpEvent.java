package com.teamtop.houtaiHttp.events.wallow;

import io.netty.channel.ChannelHandlerContext;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.log.LogTool;
/**
 * 防沉迷后台http事件
 * @author lobbyer
 * @date 2017年5月24日
 */
public class WallowHttpEvent extends AbsHouTaiHttpEvent {
	
	private static WallowHttpEvent ins = null;
	
	public static WallowHttpEvent getIns(){
		if(ins == null){
			ins = new WallowHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		String typeStr = paramMap.get("type");
		int type = Integer.parseInt(typeStr);
		long value = 0;
		int state = 1;
		try {
			HttpUtil.response(state, ctx);
			if(type != 5)
				LogTool.info("WallowHttpEvent type:"+type+" value:"+value,this);
		} catch (Exception e) {
			LogTool.error(e, this ,"WallowHttpEvent type:"+type+" value:"+value);
			HttpUtil.responseFail(ctx);
		}
	}

}
