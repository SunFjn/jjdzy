package com.teamtop.houtaiHttp.events.sysLoopNotice;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class SysLoopNoticeHttpEvent extends AbsHouTaiHttpEvent {
	private static SysLoopNoticeHttpEvent ins = null;

	public static SysLoopNoticeHttpEvent getIns() {
		if (ins == null) {
			ins = new SysLoopNoticeHttpEvent();
		}
		return ins;
	}

//	private static final Logger logger = LoggerFactory.getLogger(BagHttpEvent.class);

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		// TODO Auto-generated method stub
		String zoneidStr = paramMap.get("zoneid");
		String typeStr = paramMap.get("type");
		String id = paramMap.get("id");
		if (CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(typeStr) || CommonUtil.isNull(id)) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			return;
		}
		try {
			int type = Integer.parseInt(typeStr);
			if (type != 1 && type != 2) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			if (type == 1) {
				String beginTimeStr = paramMap.get("begintime");
				String endTimeStr = paramMap.get("endtime");
				String spaceTimeStr = paramMap.get("spacetime");
				String content = paramMap.get("content");
				String levelRangeStr = paramMap.get("levelrange");
				String moneyRangeStr = paramMap.get("moneyrange");
				if (CommonUtil.isNull(beginTimeStr) || CommonUtil.isNull(endTimeStr) || CommonUtil.isNull(spaceTimeStr)
						|| CommonUtil.isNull(content) || CommonUtil.isNull(levelRangeStr)
						|| CommonUtil.isNull(moneyRangeStr)) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
				if (!SysLoopNoticeFunction.getIns().checkZoneId(zoneidStr)) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
				int beginTime = Integer.parseInt(beginTimeStr);
				int endTime = Integer.parseInt(endTimeStr);
				int spaceTime = Integer.parseInt(spaceTimeStr);
				if (!SysLoopNoticeFunction.getIns().checkTime(beginTime, endTime, spaceTime)) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
				String[] levelRangeSplit = levelRangeStr.split("_");
				String[] moneyRangeSplit = levelRangeStr.split("_");
				if (!SysLoopNoticeFunction.getIns().checkLevelOrMoneyRange(levelRangeSplit, moneyRangeSplit)) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
				SysLoopNoticeCrossIO.getIns().sysLoopNotice(SysLoopNoticeFunction.getIns().getZoneIdList(zoneidStr),
						type, id, beginTime, endTime, spaceTime, content, levelRangeSplit, moneyRangeSplit, ctx);
			} else {
				SysLoopNoticeCrossIO.getIns().sysLoopNotice(SysLoopNoticeFunction.getIns().getZoneIdList(zoneidStr),
						type, id, 0, 0, 0, "", new String[0], new String[0], ctx);
			}
		} catch (Exception e) {
			LogTool.error(e, SysLoopNoticeHttpEvent.class, "SysLoopNoticeHttpEvent handleGet fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

}
