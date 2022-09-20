package com.teamtop.houtaiHttp.request;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.AnalyzeUtils;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.ServerInfoDao;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class YunweiClientVersionOpHttpEvent extends AbsHouTaiHttpEvent {

	private static YunweiClientVersionOpHttpEvent ins;

	private YunweiClientVersionOpHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized YunweiClientVersionOpHttpEvent getIns() {
		if (ins == null) {
			ins = new YunweiClientVersionOpHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String pf = paramMap.get("pf");
			// http://127.0.0.1:6012/?sign=e9048df90618272480e01f240024d8af&cmd=1003&randnum=1&type=1
			// http://127.0.0.1:6022/?sign=e9048df90618272480e01f240024d8af&cmd=1003&randnum=1&type=1
			// 区服号,格式 all或1;2-5;9 all表示所有区服，1;2-5;9表示1区，2到5区，9区
			// http://192.168.26.16:5001/?sign=d6da5e6b75b2666fa4ee2a806758d75e&cmd=1007&randnum=1463542867&pf=jysgzj01&clientVersion=v0&zoneid=all
			String zoneidStr = paramMap.get("zoneid");
			String clientVersion = paramMap.get("clientVersion");// 客户端版本号
			Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
			if (map == null) {
				HttpUtil.response(-2, ctx);
				return;
			}
			if (map.size() == 0) {
				HttpUtil.response(-3, ctx);
				return;
			}
			if (map != null) {
				if("all".equals(zoneidStr)) {
					Iterator<M_ServerInfo> iterator = map.values().iterator();
					for(;iterator.hasNext();) {
						M_ServerInfo info = iterator.next();
						info.setClientversion(clientVersion);
					}
					ServerInfoDao.getIns().updateClientVersionAll(clientVersion, pf);
					HttpUtil.responseSucc(ctx);
				} else {
					List<Integer> zoneidList = AnalyzeUtils.getZoneidList(zoneidStr);
					// StringBuilder zoneStr = new StringBuilder();
					// int size = zoneidList.size();
					// if(size==0) {
					// HttpUtil.response(-4, ctx);
					// return;
					// }
					// for(int i=0;i<size;i++) {
					// zoneStr.append(zoneidList.get(i)).append(",");
					// }
					// zoneStr.setLength(zoneStr.length() - 1);
					ServerInfoDao.getIns().updateClientVersion(clientVersion, pf, zoneidList);
					HttpUtil.responseSucc(ctx);
				}

			}
		} catch (Exception e) {
			LogTool.error(e, YunweiClientVersionOpHttpEvent.class, "YunweiClientVersionOpHttpEvent");
			HttpUtil.responseFail(ctx);
		}
	}

}
