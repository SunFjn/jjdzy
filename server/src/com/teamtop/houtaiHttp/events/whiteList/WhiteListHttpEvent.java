package com.teamtop.houtaiHttp.events.whiteList;

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

public class WhiteListHttpEvent extends AbsHouTaiHttpEvent {

	private static WhiteListHttpEvent whiteListHttpEvent;

	private WhiteListHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WhiteListHttpEvent getIns() {
		if (whiteListHttpEvent == null) {
			whiteListHttpEvent = new WhiteListHttpEvent();
		}
		return whiteListHttpEvent;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*  pf	quick	渠道code	是
			cmd	7	接口序号	是
			randnum	1234567890	时间戳	是
			type	1	1.添加白名单 2.删除白名单	是
			player	1	1.账号，2.IP	是
			cond	11111111;22222222	白名单账号或ip，多个参数用;分隔	是
		 */
		try {
			String typeStr = paramMap.get("type");
			String pf = paramMap.get("pf");
			String player = paramMap.get("player");
			String cond = paramMap.get("cond");
			if (CommonUtil.isNull(typeStr) || CommonUtil.isNull(pf) || CommonUtil.isNull(player)
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
			WhiteListIO.getIns().setWhiteList(targetList, type, playerType);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, WhiteListHttpEvent.class, "WhiteListHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
