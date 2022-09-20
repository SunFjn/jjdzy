package com.teamtop.houtaiHttp.events.serverSelfMotion;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;
/**
 * 自动开服_状态设置
 * @author jjjjyyy
 *
 */
public class ServerSelfSetStateHttpEvent extends AbsHouTaiHttpEvent{

	private static ServerSelfSetStateHttpEvent ins;

	private ServerSelfSetStateHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ServerSelfSetStateHttpEvent getIns() {
		if (ins == null) {
			ins = new ServerSelfSetStateHttpEvent();
		}
		return ins;
	}
	
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*	
		type	1:查询获取 自动开服_状态   2:修改设置 状态 开启 3修改设置 状态 关闭
		*/
	try {		
		String typeStr = paramMap.get("type");
		if (CommonUtil.isNull(typeStr)) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			return;
		}
		int type = Integer.parseInt(typeStr);
		if (type == 2) {// 设置自动开服_状态 开启
			ServerSelfMotionCache.AUTO_OPEN_STATE = 1;
			HoutaiResponseUtil.responseSucc(ctx);
			ServerSelfMotionCache.updateAuto_Update();
		} else if (type == 1) {
			//查询获取 自动开服_状态
			JSONObject data = new JSONObject();
			data.put("state", ServerSelfMotionCache.AUTO_OPEN_STATE);
			HoutaiResponseUtil.responseSucc(ctx, "", data);
		}else if(type==3) {
			//修改设置 自动开服_状态 3关闭
			ServerSelfMotionCache.AUTO_OPEN_STATE =0;
			HoutaiResponseUtil.responseSucc(ctx);
			ServerSelfMotionCache.updateAuto_Update();
		}
	} catch (Exception e) {
		LogTool.error(e, ServerSelfMotionHttpEvent.class, "ServerSelfSetStateHttpEvent fail");
		HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
	}
		
	}
}
