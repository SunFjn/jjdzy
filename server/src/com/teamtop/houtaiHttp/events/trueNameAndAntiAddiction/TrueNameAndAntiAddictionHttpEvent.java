package com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class TrueNameAndAntiAddictionHttpEvent extends AbsHouTaiHttpEvent {

	private static TrueNameAndAntiAddictionHttpEvent ins;

	private TrueNameAndAntiAddictionHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TrueNameAndAntiAddictionHttpEvent getIns() {
		if (ins == null) {
			ins = new TrueNameAndAntiAddictionHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String pf = paramMap.get("pf");
			// String zoneidStr = paramMap.get("zoneid");
			String typeStr = paramMap.get("type");
			if (CommonUtil.isNull(typeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			/*	
		 	0：查询当前状态
			状态1：实名认证状态，玩家进行了认证即可以获得奖励。不认证没有任何损失
			状态2：防沉迷状态，参考已有的防沉迷系统，0-3小时没损失，3-5小时收益减半，5小时后收益为0
			状态3：关闭（默认是关闭）
			*/
			int type = Integer.parseInt(typeStr);
			if (type == -1) {
				JSONObject data = new JSONObject();
				if (TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH == 1) {
					data.put("status", 2);
				} else if (TrueNameAndAntiAddictionCache.TRUENAME_SWITCH == 1) {
					data.put("status", 1);
				} else {
					data.put("status", 3);
				}
				HoutaiResponseUtil.responseSucc(ctx, "查询成功", data);
				return;
			}
			if (type == 1) {
				TrueNameAndAntiAddictionCache.TRUENAME_SWITCH = 1;
			}
			if (type == 2) {
				TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH = 1;
			}
			if (type == 3) {
				TrueNameAndAntiAddictionCache.TRUENAME_SWITCH = 0;
				TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH = 0;
			}
			TrueNameAndAntiAddictionIO.getIns().updateSwitch(type, ctx);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, TrueNameAndAntiAddictionHttpEvent.class, "TrueNameAndAntiAddictionHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
