package com.teamtop.houtaiHttp.events.serverEvent.setServerWarn;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 设置服务器预警数
 * 
 * @author jjjjyyy
 *
 */
public class SetServerWarnHttpEvent extends AbsHouTaiHttpEvent {

	private static SetServerWarnHttpEvent ins = null;

	public static SetServerWarnHttpEvent getIns() {
		if (ins == null) {
			ins = new SetServerWarnHttpEvent();
		}
		return ins;
	}

	private SetServerWarnHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		// TODO Auto-generated method stub
		String typeStr = paramMap.get("type");
		String numStr = paramMap.get("num");
		try {
			if (CommonUtil.isNull(typeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int type = Integer.parseInt(typeStr);
			if (type == 1 && CommonUtil.isNull(numStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			if (type == 1) {// 设置服务器预警数
				int num = Integer.parseInt(numStr);
				SetServerWarnCache.setServerWarnNum(num);
				SetServerWarnCache.setSendMailTime(0);
				HoutaiResponseUtil.responseSucc(ctx);
			} else if (type == 2) {// 查看服务器预警数
				int serverWarnNum = SetServerWarnCache.getServerWarnNum();
				JSONObject data = new JSONObject();
				data.put("warnnum", serverWarnNum);
				HoutaiResponseUtil.responseSucc(ctx, "", data);
			}
		} catch (Exception e) {
			LogTool.error(e, SetServerWarnHttpEvent.class, "SetServerWarnHttpEvent handleGet fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
