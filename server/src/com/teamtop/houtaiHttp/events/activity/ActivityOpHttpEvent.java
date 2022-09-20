package com.teamtop.houtaiHttp.events.activity;

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

public class ActivityOpHttpEvent extends AbsHouTaiHttpEvent {
	
	private static ActivityOpHttpEvent ins;
	
	private ActivityOpHttpEvent() {
		// TODO Auto-generated constructor stub
	}
	
	public static synchronized ActivityOpHttpEvent getIns() {
		if(ins==null) {
			ins = new ActivityOpHttpEvent();
		}
		return ins;
	}
	
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*pf	quick	渠道code	是
		zoneid	1	区服号,格式 all或1;2-5;9 all表示所有区服，1;2-5;9表示1区，2到5区，9区	是
		cmd	33	接口序号	是
		randnum	1234567890	时间戳	是
		activityid	2	活动id	是
		type	1	开启类型,1开启,2关闭*/
		try {
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			String activityidStr = paramMap.get("activityid");
			String typeStr = paramMap.get("type");
			if (CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(activityidStr) || CommonUtil.isNull(typeStr)) {
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
			int activityId = Integer.parseInt(activityidStr);
			int type = Integer.parseInt(typeStr);
			ActivityIO.getIns().actSwitch(zoneidList, activityId, type);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, ActivityOpHttpEvent.class, "ActivityOpHttpEvent");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}
	

}
