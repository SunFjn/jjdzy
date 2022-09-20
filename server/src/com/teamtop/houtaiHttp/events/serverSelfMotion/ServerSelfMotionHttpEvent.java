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
 * 自动开服
 * 
 * @author jjjjyyy
 *
 */
public class ServerSelfMotionHttpEvent extends AbsHouTaiHttpEvent{

	private static ServerSelfMotionHttpEvent ins;

	private ServerSelfMotionHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ServerSelfMotionHttpEvent getIns() {
		if (ins == null) {
			ins = new ServerSelfMotionHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*	sign	...	验签	是
			pf	quick	渠道code	是
			cmd	13	接口序号	是
			randnum	1234567890	时间戳	是
			type	1	1.设置自动开服 2.查看自动开服人数	是
			maxnum	2000	自动开服人数	设置自动开服必填*/
		try {
			String typeStr = paramMap.get("type");
			if (CommonUtil.isNull(typeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int type = Integer.parseInt(typeStr);
			if (type == 1) {// 设置自动开服
				String maxnumStr = paramMap.get("maxnum");
				if (CommonUtil.isNull(maxnumStr)) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
				int maxNum = Integer.parseInt(maxnumStr);
				ServerSelfMotionCache.AUTO_OPEN_NUM = maxNum;
				HoutaiResponseUtil.responseSucc(ctx);
			} else if (type == 2) {
				JSONObject data = new JSONObject();
				data.put("maxnum", ServerSelfMotionCache.AUTO_OPEN_NUM);
				HoutaiResponseUtil.responseSucc(ctx, "", data);
			}
		} catch (Exception e) {
			LogTool.error(e, ServerSelfMotionHttpEvent.class, "ServerSelfMotionHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
