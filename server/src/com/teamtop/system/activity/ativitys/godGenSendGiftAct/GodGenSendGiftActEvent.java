package com.teamtop.system.activity.ativitys.godGenSendGiftAct;

import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftAct;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_huodong_009;

public class GodGenSendGiftActEvent extends AbsSystemEvent {

	private static GodGenSendGiftActEvent ins;

	private GodGenSendGiftActEvent() {
		// TODO Auto-generated constructor stub
	}

	public static GodGenSendGiftActEvent getIns() {
		if (ins == null) {
			ins = new GodGenSendGiftActEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		sendLastActInfo(hero);
		if (!GodGenSendGiftActFunction.getIns().checkOpen(hero)) {
			return;
		}
		GodGenSendGiftAct godGenSendGiftAct = (GodGenSendGiftAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_GODGENSENDGIFT);
		GodGenSendGiftActFunction.getIns().updateTargetAwardStateMap(hero, godGenSendGiftAct, 0);
		Map<Integer, Integer> awardStateMap = godGenSendGiftAct.getAwardStateMap();
		for (Integer state : awardStateMap.values()) {
			if (state == GodGenSendGiftActConst.CAN_GET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_GODGENSENDGIFT, 1,
						RedPointConst.HAS_RED);
				return;
			}
		}
	}

	/**
	 * 发送最后一期活动结束时间给前端，方便前端对活动结束后只显示一天图标的判断
	 */
	public void sendLastActInfo(Hero hero) {
		int lastEndTime = 0;
		try {
			if (!GodGenSendGiftActFunction.getIns().checkOpen(hero)) {
				lastEndTime = GodGenSendGiftActCache.getLastEndTime();
				if (lastEndTime != 0) {
					int startTime = 0;
					int tempLastEndTime = 0;
					Map<Integer, List<Struct_huodong_009>> actIdMap = ActivitySysCache.getActIdMap();
					List<Struct_huodong_009> list = actIdMap.get(ActivitySysId.ACT_GODGENSENDGIFT);
					int size = list.size();
					for (int i = 0; i < size; i++) {
						Struct_huodong_009 struct_huodong_009 = list.get(i);
						String hend = struct_huodong_009.getHend();
						int endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
						if (endTime > tempLastEndTime) {
							tempLastEndTime = endTime;
							String hstart = struct_huodong_009.getHstart();
							startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
						}
					}
					LogTool.info("ActivitySender.sendCmd_2256 " + startTime, this);
					ActivitySender.sendCmd_2256(hero.getId(), 5601, 0, ActivitySysId.ACT_GODGENSENDGIFT, 0, startTime,
							lastEndTime, 1);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "sendLastActInfo lastEndTime:" + lastEndTime);
		}

	}

}
