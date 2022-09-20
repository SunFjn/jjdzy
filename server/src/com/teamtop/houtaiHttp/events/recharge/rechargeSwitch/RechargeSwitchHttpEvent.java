package com.teamtop.houtaiHttp.events.recharge.rechargeSwitch;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class RechargeSwitchHttpEvent extends AbsHouTaiHttpEvent {
	private static RechargeSwitchHttpEvent ins = null;

	public static RechargeSwitchHttpEvent getIns() {
		if (ins == null) {
			ins = new RechargeSwitchHttpEvent();
		}
		return ins;
	}

//	private static final Logger logger = LoggerFactory.getLogger(BagHttpEvent.class);

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		// TODO Auto-generated method stub
		String typeStr = paramMap.get("type");
		try {
			if (CommonUtil.isNull(typeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			// 状态 1.开启 2.关闭
			int type = Integer.parseInt(typeStr);
			if (type != 1 && type != 2) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			RechargeSwitchCrossIO.getIns().rechargeSwitch(type, ctx);
		} catch (Exception e) {
			LogTool.error(e, RechargeSwitchHttpEvent.class, "RechargeSwitchHttpEvent handleGet fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

}
