package com.teamtop.houtaiHttp.events.gameSystem;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 活动玩法开关(功能玩法开关)
 * @author hzp
 *
 */
public class GameSystemHttpEvent extends AbsHouTaiHttpEvent {

	private static GameSystemHttpEvent ins;

	private GameSystemHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GameSystemHttpEvent getIns() {
		if (ins == null) {
			ins = new GameSystemHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			/*
			activityid	2	活动id	是
			type	1	开启类型,1开启,2关闭	是
			
			*/
			String sysIdStr = paramMap.get("activityid");
			String typeStr = paramMap.get("type");
			String pf = paramMap.get("pf");
			if (CommonUtil.isNull(sysIdStr) && CommonUtil.isNull(typeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int sysId = Integer.parseInt(sysIdStr);
			int type = Integer.parseInt(typeStr);
			GameSystemIO.getIns().systemSwitch(pf, type, sysId);
			LogTool.info("GameSystemHttpEvent typestr=" + typeStr + ", sysIdstr=" + sysIdStr + ", pf=" + pf,
					GameSystemHttpEvent.class);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, GameSystemHttpEvent.class, "GameSystemHttpEvent");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
