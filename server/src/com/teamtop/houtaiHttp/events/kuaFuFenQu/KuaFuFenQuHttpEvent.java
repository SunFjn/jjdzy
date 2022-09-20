package com.teamtop.houtaiHttp.events.kuaFuFenQu;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.system.event.backstage.events.backstage.kuaFuFenQu.KuaFuFenQuInfo;

import io.netty.channel.ChannelHandlerContext;

public class KuaFuFenQuHttpEvent extends AbsHouTaiHttpEvent {

	private static KuaFuFenQuHttpEvent ins;

	private KuaFuFenQuHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized KuaFuFenQuHttpEvent getIns() {
		if (ins == null) {
			ins = new KuaFuFenQuHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		String pf = paramMap.get("pf");
		String zonidStr = paramMap.get("zonid");
		int zoneid = Integer.parseInt(zonidStr);
		KuaFuFenQuInfo kuaFuFenQuInfo = KuaFuFenQuCache.getKuaFuFenQuInfo(pf, zoneid);
		if (kuaFuFenQuInfo == null) {
			kuaFuFenQuInfo = new KuaFuFenQuInfo();
			kuaFuFenQuInfo.setCentralIndex(-1);
		}
		KuaFuFenQuIO.getIns().updateKuaFuFenQuInfo(kuaFuFenQuInfo, zoneid);
	}

}
