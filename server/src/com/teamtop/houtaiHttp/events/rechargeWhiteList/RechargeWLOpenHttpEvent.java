package com.teamtop.houtaiHttp.events.rechargeWhiteList;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 充值白名单开关
 * 
 * @author hzp
 *
 */
public class RechargeWLOpenHttpEvent extends AbsHouTaiHttpEvent {

	private static RechargeWLOpenHttpEvent ins;

	private RechargeWLOpenHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RechargeWLOpenHttpEvent getIns() {
		if (ins == null) {
			ins = new RechargeWLOpenHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		int type = -1;
		try {
			// type 1 0.获取白名单状态1.开启全部白名单 2.关闭全部白名单
			String pf = paramMap.get("pf");
			String typeStr = paramMap.get("type");
			if (CommonUtil.isNull(pf) || CommonUtil.isNull(typeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			type = Integer.parseInt(typeStr);
			if (type == 3) {
				JSONObject data = new JSONObject();
				data.put("status", RechargeWhiteListCache.RECHARGE_WL_SWICH);
				HoutaiResponseUtil.responseSucc(ctx, "获取成功", data);
			} else {
				if (type == 1) {
					RechargeWhiteListCache.RECHARGE_WL_SWICH = 1;
				} else if (type == 2) {
					RechargeWhiteListCache.RECHARGE_WL_SWICH = 2;
				}
				RechargeWhiteListIO.getIns().setSwitch(pf, type);
				HoutaiResponseUtil.responseSucc(ctx);
			}
		} catch (Exception e) {
			LogTool.error(e, RechargeWLOpenHttpEvent.class, "RechargeWLOpenHttpEvent type=" + type);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
