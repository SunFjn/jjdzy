package com.teamtop.system.openDaysSystem.otherDailyDirectBuy;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActConst;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class OtherDailyDirectBuyEvent extends AbsSystemEvent {
	private static OtherDailyDirectBuyEvent ins;

	public static OtherDailyDirectBuyEvent getIns() {
		if (ins == null) {
			ins = new OtherDailyDirectBuyEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAILYBUY)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAILYBUY);
		OtherDailyDirectBuy dailyDirectBuy = (OtherDailyDirectBuy) OtherDailyDirectBuyManager.getIns()
				.getSystemModel(hero, uid);
		Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
		if (targetAwardMap == null) {
			dailyDirectBuy.setTargetAwardMap(new HashMap<>());
		}
		Map<Integer, Integer> awardMap = dailyDirectBuy.getAwardMap();
		boolean isread = false;
		for (int value : awardMap.values()) {
			if (value == DailyDirectBuyActConst.BUY_NOTGET) {
				isread = true;
			}
		}
		if (isread) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.OTHER_DAILYBUY, ArchiveConst.RedPoint,
					RedPointConst.HAS_RED);
		}

		OtherDailyDirectBuyFunction.getIns().targetAwardHandle(hero);
		// 目标奖励红点
		for (int state : targetAwardMap.values()) {
			if (state == DailyDirectBuyActConst.CAN_GET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.OTHER_DAILYBUY,
						DailyDirectBuyActConst.TARGETREDPOINT, RedPointConst.HAS_RED);
			}
		}

	}

}
