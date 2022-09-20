package com.teamtop.houtaiHttp.events.serverEvent.viewServer;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.houtaiHttp.events.serverEvent.setServerWarn.SetServerWarnCache;
import com.teamtop.houtaiHttp.events.serverEvent.setServerWarn.SetServerWarnFuntion;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class ViewServerHttpEvent extends AbsHouTaiHttpEvent {
	private static ViewServerHttpEvent ins = null;

	public static ViewServerHttpEvent getIns() {
		if (ins == null) {
			ins = new ViewServerHttpEvent();
		}
		return ins;
	}

	private ViewServerHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		// TODO Auto-generated method stub
		try {
			int serverWarnNum = SetServerWarnCache.getServerWarnNum();
			List<M_ServerInfo> backserver = SetServerWarnFuntion.getIns().getServerNumByType(ServerInfoConst.NOT_OPEN);
			// 已开服正常服
			List<M_ServerInfo> openserver = SetServerWarnFuntion.getIns()
					.getServerNumByType(ServerInfoConst.OPEN_NOMAL);
			// 已开服火爆
			List<M_ServerInfo> openserverHot = SetServerWarnFuntion.getIns()
					.getServerNumByType(ServerInfoConst.OPEN_HOT);
			JSONObject data = new JSONObject();
			data.put("openserver", openserver.size() + openserverHot.size());
			data.put("backserver", backserver.size());
			data.put("warnnum", serverWarnNum);
			HoutaiResponseUtil.responseSucc(ctx, "", data);
		} catch (Exception e) {
			LogTool.error(e, ViewServerHttpEvent.class, "ViewServerHttpEvent handleGet fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
