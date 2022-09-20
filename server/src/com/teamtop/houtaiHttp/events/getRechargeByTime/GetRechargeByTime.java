package com.teamtop.houtaiHttp.events.getRechargeByTime;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.qqGift.QqGiftHttpFunction;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
/**
 * 7002
 * http://127.0.0.1:9812/?sign=e9048df90618272480e01f240024d8af&cmd=1008&randnum=1&pfcode=wxsgzj01-0&payTime1=1569859200&payTime2=1572537599
 * 9812
 * 根据pfcode payTime时间 获取全平台的充值
 * @author jjjjyyy
 *
 */
public class GetRechargeByTime extends AbsHouTaiHttpEvent {

	private static int sum = 0;
	private static int size = 0;
	private static GetRechargeByTime ins = null;

	public static GetRechargeByTime getIns() {
		if (ins == null) {
			ins = new GetRechargeByTime();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		String pfcode = paramMap.get("pfcode");
		String payTime1str=paramMap.get("payTime1");
		String payTime2str=paramMap.get("payTime2");
		
		int payTime1= Integer.parseInt(payTime1str);
		int payTime2= Integer.parseInt(payTime2str);
		
		List<M_ServerInfo> serverNumByType = QqGiftHttpFunction.getIns().getServerList();
		sum = 0;
		for (int i = 0; i < serverNumByType.size(); i++) {
			M_ServerInfo m_ServerInfo=serverNumByType.get(i);
			int zoneid = m_ServerInfo.getZoneid();
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			// 通知子服
			size++;
			Channel channel = zoneidToChannel.get(zoneid);
			if (channel != null) {
				CrossData crossData = new CrossData();
				crossData.putObject(GetRechargeEnum.pfcode.name(), pfcode);
				crossData.putObject(GetRechargeEnum.payTime1.name(),payTime1);
				crossData.putObject(GetRechargeEnum.payTime2.name(),payTime2);
				NettyWrite.writeXData(channel, CrossConst.GET_RECHARGENUM, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						int num = crossData.getObject(GetRechargeEnum.num, Integer.class);
						LogTool.info("zoneid: "+zoneid+" pfcode: "+pfcode+" Get one zoneid num:"+num, GetRechargeByTime.class);
						sum=num+sum;
						LogTool.info(" pfcode: "+pfcode+" Get now sum:"+sum, GetRechargeByTime.class);
						if (size==serverNumByType.size()) {
							LogTool.info("pfcode: "+pfcode+"Get all zoneid allsum:"+sum, GetRechargeByTime.class);
							HttpUtil.response(sum, ctx);
						}
					}
				});
			}
		
		}
	
	}
}
