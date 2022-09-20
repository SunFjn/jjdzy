package com.teamtop.houtaiHttp.events.bag.getbag;

import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class BagHttpEvent extends AbsHouTaiHttpEvent {
	private static BagHttpEvent ins = null;

	public static BagHttpEvent getIns() {
		if (ins == null) {
			ins = new BagHttpEvent();
		}
		return ins;
	}

//	private static final Logger logger = LoggerFactory.getLogger(BagHttpEvent.class);

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		// TODO Auto-generated method stub
		String zoneidStr = paramMap.get("zoneid");
		String playerStr = paramMap.get("player");
		String condStr = paramMap.get("cond");
		try {
			if (CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(playerStr) || CommonUtil.isNull(condStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int zoneid = Integer.parseInt(zoneidStr);
			Map<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			if (!zoneidToChannel.containsKey(zoneid)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int player = Integer.parseInt(playerStr);
			if (player != 1 && player != 2 && player != 3) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			String[] condArray = condStr.split(";");
			if (condArray.length != 1) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			BagCrossIO.getIns().getBag(zoneid, player, condArray, ctx);
		} catch (Exception e) {
			LogTool.error(e, BagHttpEvent.class, "BagHttpEvent handleGet fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

}
