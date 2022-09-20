package com.teamtop.houtaiHttp.request;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class YunweiHoutaiHttpEvent extends AbsHouTaiHttpEvent {
	// http://127.0.0.1:7002/?sign=036626c84f75e9a29b21b6adad4c56b2&cmd=1001&randnum=1540716800&pf=jysgzj01&zoneid=1
	private static YunweiHoutaiHttpEvent ins;

	public YunweiHoutaiHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized YunweiHoutaiHttpEvent getIns() {
		if (ins == null) {
			ins = new YunweiHoutaiHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			int zoneid = Integer.parseInt(zoneidStr);
			Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
			if (map == null) {
				HttpUtil.response(-2, ctx);
				return;
			}
			if (map.size() == 0) {
				HttpUtil.response(-3, ctx);
				return;
			}
			if (map != null && zoneid > -1) {
				M_ServerInfo serverInfo = map.get(zoneid);
				if (serverInfo == null) {
					HttpUtil.response(-4, ctx);
					return;
				}
				// 同步服务信息到后台
				// if (serverInfo.getState() != ServerInfoConst.NOT_OPEN) {
					SynOpenServerInfo.synServerInfo(serverInfo);
					HttpUtil.responseSucc(ctx);
					return;
				// }
			}
		} catch (Exception e) {
			LogTool.error(e, YunweiHoutaiHttpEvent.class, "YunweiHoutaiHttpEvent");
			HttpUtil.responseFail(ctx);
		}
	}

}
