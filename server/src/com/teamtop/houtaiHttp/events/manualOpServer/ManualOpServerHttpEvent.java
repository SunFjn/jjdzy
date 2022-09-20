package com.teamtop.houtaiHttp.events.manualOpServer;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class ManualOpServerHttpEvent extends AbsHouTaiHttpEvent {

	private static ManualOpServerHttpEvent ins;

	private ManualOpServerHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ManualOpServerHttpEvent getIns() {
		if (ins == null) {
			ins = new ManualOpServerHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			/*	pf	quick	渠道code	是
				zoneid	1	区服号	是
				cmd	14	接口序号	是
				randnum	1234567890	时间戳	是
			*/
			String pf = paramMap.get("pf");
			String zoneidStr = paramMap.get("zoneid");
			if (CommonUtil.isNull(pf) || CommonUtil.isNull(zoneidStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int zoneid = Integer.parseInt(zoneidStr);
			ManualOpServerIO.getIns().manualOpenServer(zoneid, pf);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, ManualOpServerHttpEvent.class, "ManualOpServerHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
