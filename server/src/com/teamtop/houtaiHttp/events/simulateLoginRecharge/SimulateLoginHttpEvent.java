package com.teamtop.houtaiHttp.events.simulateLoginRecharge;

import java.security.MessageDigest;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.AnalyzeUtils;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainCache;
import com.teamtop.houtaiHttp.request.HttpGetOrPostHandle;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class SimulateLoginHttpEvent extends AbsHouTaiHttpEvent {

	private static SimulateLoginHttpEvent ins;

	private SimulateLoginHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SimulateLoginHttpEvent getIns() {
		if (ins == null) {
			ins = new SimulateLoginHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		int zoneid = -1;
		try {
			int startTime = TimeDateUtil.getCurrentTime();
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			if (CommonUtil.isNull(zoneidStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			zoneid = Integer.parseInt(zoneidStr);
			// 获取服务器列表是否正常
			// https://houtaijy3.sgzj.ptxlw.com:5001/?sign=188e1f907c61aa8da4b0f59017b0fb30&cmd=202&randnum=1542682236455&pf=jysgzj03&openid=11986929-apk&type=1
			// https://houtaijy3.sgzj.ptxlw.com:5001/?sign=64163d09fcaf9d02d5876ed1664fefb2&cmd=202&randnum=1542682236455&pf=jysgzj01&openid=11986929-apk&type=1
			StringBuilder codeStr = new StringBuilder();
			Map<String, Object> map = new TreeMap<>();
			String cmd = "202";
			map.put("cmd", cmd);
			String randnum = "1542682236455";
			map.put("randnum", randnum);
			String pfStr = GameProperties.platform;
			if(pfStr.indexOf("-apk") != -1) {
				pfStr = pfStr.substring(0, pfStr.indexOf("-apk"));
			}
			map.put("pf", pfStr);
			String openid = "11986929-apk";
			map.put("openid", openid);
			String type = "1";
			map.put("type", type);
			for (Map.Entry<String, Object> en : map.entrySet()) {
				if (en.getValue() != null && !"".equals(en.getValue())) {
					codeStr.append(en.getKey()).append("=").append(en.getValue());
				}
			}
			String sstr = codeStr + AnalyzeUtils.clientKey;
			MessageDigest md = MessageDigest.getInstance("md5");
			byte[] bytes = md.digest(sstr.getBytes("utf-8"));
			final char[] HEX_DIGITS = "0123456789ABCDEF".toCharArray();
			StringBuilder ret = new StringBuilder(bytes.length * 2);
			for (int i = 0; i < bytes.length; i++) {
				ret.append(HEX_DIGITS[(bytes[i] >> 4) & 0x0f]);
				ret.append(HEX_DIGITS[bytes[i] & 0x0f]);
			}
			String port = "5001";
			if("jysgzj05".equals(pfStr)){//微端5 5011
				port = "5011";
			}
			String sign = ret.toString().toLowerCase();
			StringBuffer url = new StringBuffer();
			StringBuffer paramStr = new StringBuffer();
			url.append("https://").append(GameProperties.cross_ip_1).append(":").append(port).append("/");
			paramStr.append("sign=").append(sign).append("&cmd=").append(cmd).append("&randnum=").append(randnum)
					.append("&pf=").append(pfStr).append("&openid=").append(openid).append("&type=").append(type);
			String result = HttpGetOrPostHandle.doGetInfo(url.toString(), paramStr.toString());
			int passTime = TimeDateUtil.getCurrentTime() - startTime;
			LogTool.info("SimulateLoginHttpEvent url="+url.toString()+"?"+paramStr.toString()+", passTime="+passTime, SimulateLoginHttpEvent.class);
			if (CrossZone.isCrossServer()) {
				return;
			}
			JSONObject data = new JSONObject();
			if (!GameProperties.zoneids.contains(zoneid)) {
				HoutaiResponseUtil.responseFail(false, -1, "请求区号不是对应的服务器区号", data, ctx);
				return;
			}
			if (result == null) {
				HoutaiResponseUtil.responseFail(false, 1, "获取服务器列表失败", data, ctx);
				return;
			} else if (result.indexOf("clientversion") == -1) {
				HoutaiResponseUtil.responseFail(false, 1, "获取服务器列表失败", data, ctx);
				return;
			}
			// 服务器状态
			if (ServerMaintainCache.MAINTAIN_STATE == ServerInfoConst.OPEN_MAITAIN) {
				HoutaiResponseUtil.responseFail(false, 2, "服务器维护中", data, ctx);
				return;
			}
			if (ServerMaintainCache.MAINTAIN_STATE == ServerInfoConst.OPEN_WHITELIST) {
				HoutaiResponseUtil.responseFail(false, 3, "服务器白名单才可进", data, ctx);
				return;
			}
			// 与跨服连接情况
			Channel channel = Client_1.getIns().getCrossChannel();
			if (channel == null || !channel.isActive()) {
				HoutaiResponseUtil.responseFail(false, 4, "后台中央服未链接", data, ctx);
			}
			Channel channel2 = Client_2.getIns().getCrossChannel();
			if (channel2 == null || !channel2.isActive()) {
				HoutaiResponseUtil.responseFail(false, 5, "玩法中央服未链接", data, ctx);
			}
			// 数据库访问情况
			try {
				long totalHeroNum = HeroDao.getIns().findHeroNumForSmiulate(zoneid);
			} catch (Exception e) {
				HoutaiResponseUtil.responseFail(false, 6, "访问数据库异常", data, ctx);
				return;
			}
			// StringBuffer hidStr = new StringBuffer();
			// hidStr.append("1");
			// int length = zoneidStr.length() + 1;
			// for (int i = length; i <= 4; i++) {
			// hidStr.append("0");
			// }
			// hidStr.append("00000000001");
			// long hid = Long.parseLong(hidStr.toString());
			ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(RankingConst.STRENGTH_RANKING);
			ConcurrentSkipListSet<BaseRankModel> set = new ConcurrentSkipListSet<>(treeSet);
			try {
				if (set.size() > 0) {
					BaseRankModel first = set.first();
					long hid = first.getHid();
					Hero hero = HeroDao.getIns().find(hid, null);
					if (hero == null) {
						HoutaiResponseUtil.responseFail(false, 6, "访问数据库异常", data, ctx);
					}
				}
			} catch (Exception e) {
				HoutaiResponseUtil.responseFail(false, 6, "访问数据库异常", data, ctx);
				return;
			}
			passTime = TimeDateUtil.getCurrentTime() - startTime;
			LogTool.info("SimulateLoginHttpEvent passTime=" + passTime, SimulateLoginHttpEvent.class);
			HoutaiResponseUtil.responseSucc(ctx, "流程正常", data);
		} catch (Exception e) {
			LogTool.error(e, SimulateLoginHttpEvent.class, "SimulateLoginHttpEvent zoneid=" + zoneid);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
