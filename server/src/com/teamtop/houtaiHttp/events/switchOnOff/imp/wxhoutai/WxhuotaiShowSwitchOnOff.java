package com.teamtop.houtaiHttp.events.switchOnOff.imp.wxhoutai;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AnalyzeUtils;
import com.teamtop.houtaiHttp.HouTaiHttpCache;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.switchOnOff.OnOffTypeEnum;
import com.teamtop.houtaiHttp.events.switchOnOff.SwitchOnOffInf;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class WxhuotaiShowSwitchOnOff implements SwitchOnOffInf {
	
	@Override
	public void transactionHandle(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		// TODO Auto-generated method stub
		/**
		 * 1开启 2关闭
		 */
		String typeStr = paramMap.get("type");
		String zoneidStr = paramMap.get("server_id");
		try {
			if (CommonUtil.isNull(typeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			
			// 开关类型 1开启 2关闭,3查询
			int type = Integer.parseInt(typeStr);
			//区号
			List<Integer> zoneidList = new ArrayList<>();
			boolean isAll=true;
			if (!"all".equals(zoneidStr)) {
				zoneidList = AnalyzeUtils.getZoneidList(zoneidStr);
				if (zoneidList.size() == 0) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
				isAll=false;
			} else {
				//all 所有服
				isAll=true;
			}
			LogTool.info("WxhuotaiShowHttpEvent state :" + type, this);
			/*if (type == 3) {
				JSONObject data = new JSONObject();
				Integer state = HouTaiHttpCache.getOnOffCache().get(OnOffTypeEnum.WEIXIN_SHARE_ONOFF.getCountryType());
				if (state == null) {
					state = 2;
				}
				data.put("state", state);
				HoutaiResponseUtil.responseSucc(ctx, "查询成功", data);
				return;
			}*/
			WxhuotaiShowIO.getIns().setShowOnOff(zoneidList, type, ctx, isAll);
		} catch (Exception e) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			LogTool.error(e, this, "WxhuotaiShowHttpEvent has wrong");
		}
	}


}
