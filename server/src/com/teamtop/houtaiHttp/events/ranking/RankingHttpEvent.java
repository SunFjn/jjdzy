package com.teamtop.houtaiHttp.events.ranking;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 后台 获取排行榜信息
 * 
 * @author hzp
 *
 */
public class RankingHttpEvent extends AbsHouTaiHttpEvent {

	private static RankingHttpEvent ins;

	private RankingHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RankingHttpEvent getIns() {
		if (ins == null) {
			ins = new RankingHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			String typeStr = paramMap.get("type");
			if (CommonUtil.isNull(pf) || CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(typeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int zoneid = Integer.parseInt(zoneidStr);
			int type = Integer.parseInt(typeStr);
			RankingCrossIO.getIns().getRankingInfo(pf, zoneid, type, ctx);
		} catch (Exception e) {
			LogTool.error(e, RankingHttpEvent.class, "RankingHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
