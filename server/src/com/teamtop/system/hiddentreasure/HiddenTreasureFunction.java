package com.teamtop.system.hiddentreasure;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.GodGenSendGiftActFunction;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.CrossGodGenSendGiftActLC;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftAct;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.godGenSendGift.GodGenSendGiftConst;
import com.teamtop.system.godGenSendGift.GodGenSendGiftFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hiddentreasure.model.HiddenTreasureModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class HiddenTreasureFunction {

	private static HiddenTreasureFunction ins;

	private HiddenTreasureFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HiddenTreasureFunction getIns() {
		if (ins == null) {
			ins = new HiddenTreasureFunction();
		}
		return ins;
	}

	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, HiddenTreasureConst.SysId)) {
				return false;
			}
			HiddenTreasureModel model = hero.getHiddenTreasureModel();
			int useTime = model.getUseTime();
			if (useTime == 0) {
				return true;
			}
			int num = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), HiddenTreasureConst.ONE_COST_NUM);
			if (num > 0) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, HiddenTreasureFunction.class, "HiddenTreasureFunction checkRedPoint");
		}
		return false;
	}

	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, HiddenTreasureConst.SysId)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (!redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, HiddenTreasureConst.SysId,
						HiddenTreasureConst.RedPoint, RedPointConst.NO_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, HiddenTreasureConst.SysId,
						HiddenTreasureConst.RedPoint, RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, HiddenTreasureFunction.class, "HiddenTreasureFunction updateRedPoint");
		}
	}

	/**
	 * 取得结束时间戳
	 * 
	 * @return
	 */
	public int getEndTime(Hero hero) {
		// 神将送礼(系统)
		if (GodGenSendGiftFunction.getIns().checkOpen(hero)) {
			int qsDay = GodGenSendGiftFunction.getIns().getQsDay();
			int tomorrowZeroTime = TimeDateUtil.getTomorrowZeroTimeReturnInt();
			int currentTime = TimeDateUtil.getCurrentTime();
			int day = qsDay == 0 ? 0 : GodGenSendGiftConst.AWARD_CYCLE - qsDay;
			return tomorrowZeroTime - currentTime + day * TimeDateUtil.ONE_DAY_INT;
		}
		// 神将送礼(活动)
		if (GodGenSendGiftActFunction.getIns().checkOpen(hero)) {
			int endTime = GodGenSendGiftActFunction.getIns().getEndTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			return endTime - currentTime;
		}
		return 0;
	}

	/**
	 * 神将送礼相关处理
	 * 
	 * @param hero
	 * @param addTimes
	 */
	public void GodGenSendGiftSysAndActUpdateHandle(Hero hero, int addTimes) {
		try {
			// 神将送礼(系统)
			if (GodGenSendGiftFunction.getIns().checkOpen(hero)) {
				GodGenSendGiftFunction.getIns().updateTargetAwardStateMap(hero, addTimes);
				// 刷新排名
				GodGenSendGiftFunction.getIns().refreshRankList(hero, 1);
				return;
			}
			// 神将送礼(活动)
			if (GodGenSendGiftActFunction.getIns().checkOpen(hero)) {
				GodGenSendGiftAct godGenSendGiftAct = (GodGenSendGiftAct) ActivityFunction.getIns()
						.getActivityData(hero, ActivitySysId.ACT_GODGENSENDGIFT);
				GodGenSendGiftActFunction.getIns().heroDataHandle(godGenSendGiftAct);
				int totalTimes = godGenSendGiftAct.getTotalTimes();
				godGenSendGiftAct.setTotalTimes(totalTimes + addTimes);
				CrossGodGenSendGiftActLC.getIns().addUpdateConsumeRankListToCen(hero, godGenSendGiftAct, 1, addTimes);
				return;
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, HiddenTreasureFunction.class, "GodGenSendGiftSysAndActUpdateHandle addTimes:" + addTimes);
		}
	}
}
