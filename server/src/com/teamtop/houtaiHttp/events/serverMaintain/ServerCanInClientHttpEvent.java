package com.teamtop.houtaiHttp.events.serverMaintain;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.event.backstage.events.backstage.whiteList.M_WhiteList;
import com.teamtop.system.event.backstage.events.backstage.whiteList.WhiteListDao;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class ServerCanInClientHttpEvent extends AbsHouTaiHttpEvent {

	private static ServerCanInClientHttpEvent ins;

	private ServerCanInClientHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ServerCanInClientHttpEvent getIns() {
		if (ins == null) {
			ins = new ServerCanInClientHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String openid = paramMap.get("openid");
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			paramMap.get("ip");
			if (CommonUtil.isNull(openid) || CommonUtil.isNull(pf) || CommonUtil.isNull(zoneidStr)) {
				HttpUtil.response(0, ctx);
				return;
			}
			int zoneid = Integer.parseInt(zoneidStr);
			JSONObject data = new JSONObject();
			Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
			M_ServerInfo m_ServerInfo = map.get(zoneid);
			String content = m_ServerInfo.getContent();
			try {
				M_WhiteList whiteList = WhiteListDao.getIns().findByOpenid(openid);
				if (whiteList != null && whiteList.getState() == 1) {
					data.put("result", 0);
					data.put("content", content);
					HttpUtil.response(data.toJSONString(), ctx);
					return;
				}
			} catch (Exception e) {
				LogTool.error(e, ServerCanInClientHttpEvent.class, "ServerCanInClientHttpEvent checkWhiteList");
			}
			data.put("result", 1);
			data.put("content", content);
			HttpUtil.response(data.toJSONString(), ctx);
		} catch (Exception e) {
			HttpUtil.responseFail(ctx);
			LogTool.error(e, ServerCanInClientHttpEvent.class, "ServerCanInClientHttpEvent can in");
		}
	}

}
