package com.teamtop.houtaiHttp.events.welfareNotice;

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

public class WelfareHttpEvent extends AbsHouTaiHttpEvent {

	private static WelfareHttpEvent ins;

	private WelfareHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WelfareHttpEvent getIns() {
		if (ins == null) {
			ins = new WelfareHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			String content = paramMap.get("content");
			if (CommonUtil.isNull(pf) || CommonUtil.isNull(content)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			List<Integer> zoneidList = new ArrayList<>();
			if (!"all".equals(zoneidStr)) {
				zoneidList = AnalyzeUtils.getZoneidList(zoneidStr);
				if (zoneidList.size() == 0) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
			}
			WelfareNoticeIO.getIns().setWelfareNotice(pf, content, zoneidList);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, WelfareHttpEvent.class, "WelfareHttpEvent ");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
