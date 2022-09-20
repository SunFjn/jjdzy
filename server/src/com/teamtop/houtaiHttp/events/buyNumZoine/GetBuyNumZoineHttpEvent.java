package com.teamtop.houtaiHttp.events.buyNumZoine;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.houtaiHttp.events.rechargeWhiteList.RechargeWLOpenHttpEvent;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;
/**
 * 获取导量服
 * @author jjjjyyy
 *
 */
//http://127.0.0.1:8802/?sign=b57ac034db16b7f0775d97b4a1eb542e&cmd=26&randnum=1542682236455&pf=ncsgzj01
public class GetBuyNumZoineHttpEvent  extends AbsHouTaiHttpEvent{

	private static GetBuyNumZoineHttpEvent ins;

	private GetBuyNumZoineHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GetBuyNumZoineHttpEvent getIns() {
		if (ins == null) {
			ins = new GetBuyNumZoineHttpEvent();
		}
		return ins;
	}
	
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*参数名	参数值	参数说明	必填
		sign	…	验签	是
		pf	quick	渠道code	是
		cmd	26	接口序号	是
		randnum	1234567890	时间戳	是*/
		try {
			String pf = paramMap.get("pf");
			BuyNumZoneidSys buyNumZoneidSys = ServerInfoCache.getBuyNumZoneidSys();
			JSONObject rest = new JSONObject();
			int zoneid = -1;
			int isAuto = 1;
			if(buyNumZoneidSys!=null) {
				Map<String, BuyNumZoneid> pfBuyNumZoneidMap = buyNumZoneidSys.getPfBuyNumZoneidMap();
				if (pfBuyNumZoneidMap.containsKey(pf)) {
					BuyNumZoneid buyNumZoneid = pfBuyNumZoneidMap.get(pf);
					zoneid = buyNumZoneid.getZoneid();
					if (zoneid>0) {
						isAuto=0;
					}
				}
			}
			if(zoneid==-1) {				
				zoneid = SetBuyNumZoneidHttpEvent.getNewBuyNumZoneid(pf, ctx);
			}
			rest.put("isAuto", isAuto);// 导量服是否是自动指向最新服，1是，0否
			rest.put("zoneid", zoneid);// 当前导量服
			String message = "获取成功";
			HoutaiResponseUtil.responseSucc(ctx, message, rest);
			LogTool.info("当前导量服 zoneid="+zoneid, GetBuyNumZoineHttpEvent.class);
		} catch (Exception e) {
			LogTool.error(e, RechargeWLOpenHttpEvent.class, "GetBuyNumZoineHttpEvent has wrong") ;
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}
	
}
