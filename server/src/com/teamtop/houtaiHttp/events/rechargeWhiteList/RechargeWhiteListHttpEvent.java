package com.teamtop.houtaiHttp.events.rechargeWhiteList;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 添加删除充值白名单
 * @author jjjjyyy
 *
 */
public class RechargeWhiteListHttpEvent extends AbsHouTaiHttpEvent {

	private static RechargeWhiteListHttpEvent ins;

	private RechargeWhiteListHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RechargeWhiteListHttpEvent getIns() {
		if (ins == null) {
			ins = new RechargeWhiteListHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*
		type	1	1.添加充值白名单 2.删除白名单	是
		player	1	1.账号，2.IP	是
		cond	11111111;22222222	充值白名单账号或ip，多个参数用;分隔	是
		*/
		try {
			String pf = paramMap.get("pf");
			String typeStr = paramMap.get("type");
			String player = paramMap.get("player");
			String cond = paramMap.get("cond");
			if (CommonUtil.isNull(pf) || CommonUtil.isNull(typeStr) || CommonUtil.isNull(player)
					|| CommonUtil.isNull(cond)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int type = Integer.parseInt(typeStr);
			int playerType = Integer.parseInt(player);
			String[] openidArr = cond.split(";");
			List<String> targetList = Arrays.asList(openidArr);
			JSONObject data = new JSONObject();
			data.put("type", type);
			data.put("player", player);
			RechargeWhiteListIO.getIns().setWhiteList(targetList, type, playerType);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, RechargeWhiteListHttpEvent.class, "RechargeWhiteListHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
