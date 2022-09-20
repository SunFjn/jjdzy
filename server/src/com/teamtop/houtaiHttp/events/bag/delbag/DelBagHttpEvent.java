package com.teamtop.houtaiHttp.events.bag.delbag;

import java.util.ArrayList;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class DelBagHttpEvent extends AbsHouTaiHttpEvent {
	private static DelBagHttpEvent ins = null;

	public static DelBagHttpEvent getIns() {
		if (ins == null) {
			ins = new DelBagHttpEvent();
		}
		return ins;
	}

//	private static final Logger logger = LoggerFactory.getLogger(DelBagHttpEvent.class);

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		// TODO Auto-generated method stub
		String zoneidStr = paramMap.get("zoneid");
		String playerStr = paramMap.get("player");
		String condStr = paramMap.get("cond");
		String goodsStr = paramMap.get("goods");
		try {
			if (CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(playerStr) || CommonUtil.isNull(condStr)
					|| CommonUtil.isNull(goodsStr)) {
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
			String[] goodsSplit = goodsStr.split(";");
			ArrayList<String[]> goodsList = new ArrayList<>();
			for (String str : goodsSplit) {
				String[] split = str.split(",");
				goodsList.add(split);
			}
			DelBagCrossIO.getIns().delBag(zoneid, player, condArray, goodsList, ctx);
		} catch (Exception e) {
			LogTool.error(e, DelBagHttpEvent.class, "DelBagHttpEvent handleGet fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

}
