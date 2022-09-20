package com.teamtop.houtaiHttp.events.crossActivitySwitch;

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

public class CrossActivitySwitchHttpEvent extends AbsHouTaiHttpEvent {

	private static CrossActivitySwitchHttpEvent ins;

	private CrossActivitySwitchHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossActivitySwitchHttpEvent getIns() {
		if (ins == null) {
			ins = new CrossActivitySwitchHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			String actStr = paramMap.get("activityid");// 跨服活动id
			String typeStr = paramMap.get("type");// 开启类型,1开启,2关闭
			if (CommonUtil.isNull(pf) || CommonUtil.isNull(typeStr) || CommonUtil.isNull(zoneidStr)
					|| CommonUtil.isNull(actStr)) {
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
			int activityid = Integer.parseInt(actStr);
			int type = Integer.parseInt(typeStr);
			CrossActivitySwitchIO.getIns().setCrossActSwitch(zoneidList, activityid, type);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, CrossActivitySwitchHttpEvent.class, "");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
