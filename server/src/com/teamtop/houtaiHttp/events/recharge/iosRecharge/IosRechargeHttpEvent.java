package com.teamtop.houtaiHttp.events.recharge.iosRecharge;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.AnalyzeUtils;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;
/**
 * ios充值关卡设置
 * @author jjjjyyy
 *
 */
public class IosRechargeHttpEvent extends AbsHouTaiHttpEvent {

	private static IosRechargeHttpEvent ins = null;

	public static IosRechargeHttpEvent getIns() {
		if (ins == null) {
			ins = new IosRechargeHttpEvent();
		}
		return ins;
	}
	
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		String typeStr = paramMap.get("cond");
		String zoneidStr = paramMap.get("zoneid");
		try {
			if (CommonUtil.isNull(typeStr)||CommonUtil.isNull(zoneidStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			
			//关卡数
			int guankaNum = Integer.parseInt(typeStr);
			//区号
			List<Integer> zoneidList = new ArrayList<>();
			boolean isAll=false;
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
			LogTool.info("IosRechargeHttpEvent cond :"+guankaNum+" zoneid:"+zoneidStr, IosRechargeHttpEvent.class);
			IosRechargeCrossIO.getIns().setIosRecharge(zoneidList,guankaNum, ctx,isAll);
		} catch (Exception e) {
			LogTool.error(e, IosRechargeHttpEvent.class, "IosRechargeHttpEvent has wrong");
		}
		
	}

}
