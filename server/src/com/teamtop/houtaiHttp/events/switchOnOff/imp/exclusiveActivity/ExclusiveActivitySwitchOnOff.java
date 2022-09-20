package com.teamtop.houtaiHttp.events.switchOnOff.imp.exclusiveActivity;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.switchOnOff.SwitchOnOffInf;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySysCache;
import com.teamtop.util.common.CommonUtil;

import io.netty.channel.ChannelHandlerContext;

public class ExclusiveActivitySwitchOnOff implements SwitchOnOffInf {

	@Override
	public void transactionHandle(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/**
		 * 1开启 2关闭
		 */
		String typeStr = paramMap.get("type");
		if (CommonUtil.isNull(typeStr)) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			return;
		}
		int type = Integer.parseInt(typeStr);
		if (type == 3) {
			JSONObject data = new JSONObject();
			data.put("state", ExclusiveActivitySysCache.EXCLUSIVE_STATE);
			HoutaiResponseUtil.responseSucc(ctx, "查询成功", data);
			return;
		}
		ExclusiveActivityIO.getIns().setExclusiveActivityState(type, ctx);
	}

}
