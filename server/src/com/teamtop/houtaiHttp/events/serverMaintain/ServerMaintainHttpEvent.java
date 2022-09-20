package com.teamtop.houtaiHttp.events.serverMaintain;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.AnalyzeUtils;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class ServerMaintainHttpEvent extends AbsHouTaiHttpEvent {

	private static ServerMaintainHttpEvent ins;

	private ServerMaintainHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ServerMaintainHttpEvent getIns() {
		if (ins == null) {
			ins = new ServerMaintainHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			String typeStr = paramMap.get("type");
			String content = paramMap.get("content");
			if (CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(typeStr) || CommonUtil.isNull(content)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int type = Integer.parseInt(typeStr);
			List<Integer> zoneidList = new ArrayList<>();
			if (!"all".equals(zoneidStr)) {
				zoneidList = AnalyzeUtils.getZoneidList(zoneidStr);
				if (zoneidList.size() == 0) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
			}
			ServerMaintainIO.getIns().setServerMaintain(pf, zoneidList, type, content);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, ServerMaintainHttpEvent.class, "ServerMaintainHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
