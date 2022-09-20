package com.teamtop.houtaiHttp.events.adMark;

import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class adMarkHttpEvent extends AbsHouTaiHttpEvent {
	private static adMarkHttpEvent ins = null;

	public static adMarkHttpEvent getIns() {
		if (ins == null) {
			ins = new adMarkHttpEvent();
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
		String typeStr = paramMap.get("type");
		try {
			if (CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(playerStr) || CommonUtil.isNull(condStr)
					|| CommonUtil.isNull(typeStr)) {
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
//			if (condArray.length != 1) {
//				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
//				return;
//			}
			// 1.标记为广告号 2.取消为广告号 3.标记广告号嫌疑人 4.取消为广告号嫌疑人
			int type = Integer.parseInt(typeStr);
			if (type != 1 && type != 2 && type != 3 && type != 4) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			adMarkCrossIO.getIns().adMark(zoneid, player, condArray, type, ctx);
		} catch (Exception e) {
			LogTool.error(e, adMarkHttpEvent.class, "adMarkHttpEvent handleGet fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

}
