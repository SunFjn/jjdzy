package com.teamtop.houtaiHttp.events.buyNumZoine;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.houtaiHttp.events.rechargeWhiteList.RechargeWLOpenHttpEvent;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;
/**
 * 设置修改 到量服
 * @author jjjjyyy
 *
 */
//http://127.0.0.1:8802/?sign=4a4874037fdbcfb78c9a341487ed299c&cmd=25&randnum=1542682236455&pf=ncsgzj01&maxzoneid=0
public class SetBuyNumZoneidHttpEvent extends AbsHouTaiHttpEvent{

	private static SetBuyNumZoneidHttpEvent ins;

	private SetBuyNumZoneidHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SetBuyNumZoneidHttpEvent getIns() {
		if (ins == null) {
			ins = new SetBuyNumZoneidHttpEvent();
		}
		return ins;
	}
	
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*sign	…	验签	是
		pf	quick	渠道code	是
		cmd	25	接口序号	是
		randnum	1234567890	时间戳	是
		maxzoneid	1	0:自动指向最新的区服，大于0的数字：指定区服	是*/
		try {
			String pf = paramMap.get("pf");
			String maxzone = paramMap.get("maxzoneid");
			int maxzoneid=Integer.parseInt(maxzone);
			BuyNumZoneidSys buyNumZoneidSys = ServerInfoCache.getBuyNumZoneidSys();
			if (buyNumZoneidSys==null) {
				buyNumZoneidSys=new BuyNumZoneidSys();
				ServerInfoCache.setBuyNumZoneidSys(buyNumZoneidSys);
				buyNumZoneidSys.setPfBuyNumZoneidMap( new HashMap<>());
			}
			Map<String, BuyNumZoneid> pfBuyNumZoneidMap = buyNumZoneidSys.getPfBuyNumZoneidMap();
			if (!pfBuyNumZoneidMap.containsKey(pf)) {
				BuyNumZoneid buyNumZoneid=new BuyNumZoneid(pf, maxzoneid);
				pfBuyNumZoneidMap.put(pf, buyNumZoneid);
			}
			BuyNumZoneid buyNumZoneid = pfBuyNumZoneidMap.get(pf);
			buyNumZoneid.setZoneid(maxzoneid);
			JSONObject data = new JSONObject();
			int numZoneid = maxzoneid;
			if(maxzoneid==-1) {
				//返回最新导量服
				numZoneid = getNewBuyNumZoneid(pf, ctx);
			}
			data.put("zoneid", numZoneid);
			HoutaiResponseUtil.responseSucc(ctx, "设置导量服成功：", data);
			LogTool.info("SetBuyNum success pf :"+pf+"maxzoneid:"+maxzoneid, RechargeWLOpenHttpEvent.class);
		} catch (Exception e) {
			LogTool.error(e, SetBuyNumZoneidHttpEvent.class, "GetBuyNumZoineHttpEvent has wrong");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}
	
	public static int getNewBuyNumZoneid(String pf, ChannelHandlerContext ctx) {
		Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
		if (map == null) {
			return -1;
		}
		Set<Integer> zoneidSet = new HashSet<>(map.keySet());
		Iterator<Integer> iterator = zoneidSet.iterator();
		int zoneid = 0;
		int newZoneid = -1;
		List<Integer> zoneidList = new ArrayList<>();
		for (; iterator.hasNext();) {
			zoneid = iterator.next();
			M_ServerInfo m_ServerInfo = map.get(zoneid);
			int state = m_ServerInfo.getState();
			if (state == ServerInfoConst.OPEN_WHITELIST || state == ServerInfoConst.NOT_OPEN) {
				continue;
			}
			zoneidList.add(zoneid);
		}
		Collections.sort(zoneidList);
		int allSize = zoneidList.size();
		if (allSize > 0) {
			newZoneid = zoneidList.get(allSize - 1);
		}
		LogTool.info("SetBuyNumZoneidHttpEvent newZoneid = " + newZoneid, SetBuyNumZoneidHttpEvent.class);
		return newZoneid;
	}

}