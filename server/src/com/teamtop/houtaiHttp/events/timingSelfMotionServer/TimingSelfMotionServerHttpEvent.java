package com.teamtop.houtaiHttp.events.timingSelfMotionServer;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class TimingSelfMotionServerHttpEvent extends AbsHouTaiHttpEvent {

	private static TimingSelfMotionServerHttpEvent ins;

	private TimingSelfMotionServerHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TimingSelfMotionServerHttpEvent getIns() {
		if (ins == null) {
			ins = new TimingSelfMotionServerHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			/**pf	quick	渠道code	是
				type	1	是否自动开服 1是 2否	是
				cmd	44	接口序号	是
				opentime	12:00	自动开服时间	是
			 */
			String typeStr = paramMap.get("type");
			String pf = paramMap.get("pf");
			String opentimeStr = paramMap.get("opentime");
			if (CommonUtil.isNull(typeStr) || CommonUtil.isNull(pf) || CommonUtil.isNull(opentimeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int type = Integer.parseInt(typeStr);
			Map<String, TimingInfo> pfTimingMap = TimingSelfMotionServerCache.getPfTimingMap();
			TimingInfo timingInfo = pfTimingMap.get(pf);
			if (timingInfo == null) {
				timingInfo = new TimingInfo();
				timingInfo.setPf(pf);
				pfTimingMap.put(pf, timingInfo);
			}
			String[] arr = opentimeStr.split(":");
			timingInfo.setTimingHour(Integer.parseInt(arr[0]));
			timingInfo.setTimingMunite(Integer.parseInt(arr[1]));
			if (type == 1) {
				timingInfo.setState(1);
			} else if (type == 2) {
				timingInfo.setState(0);
			}
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, TimingSelfMotionServerHttpEvent.class, "TimingSelfMotionServerHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
