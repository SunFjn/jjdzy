package com.teamtop.system.weekCard;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.weekCard.model.WeekCardModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_weekcard_267;
import excel.struct.Struct_weekcard_267;

/**
 * 周卡
 * 
 * @author hzp
 *
 */
public class WeekCardManager {

	private static WeekCardManager ins;

	private WeekCardManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WeekCardManager getIns() {
		if (ins == null) {
			ins = new WeekCardManager();
		}
		return ins;
	}

	/**
	 * 打开周卡界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.WEEK_CARD_SYSID)) {
				WeekCardSender.sendCmd_4554(hid, 0);
				return;
			}
			WeekCardModel weekCardModel = hero.getWeekCardModel();
			weekCardModel.setDailyFirst(WeekCardConst.STATE_OPENED);
			int dailyAward = weekCardModel.getDailyAward();
			int endTime = weekCardModel.getEndTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			int leftTime = 0;
			if (endTime > 0 && endTime > currentTime) {
				leftTime = endTime - currentTime;
			}
			int sendState = WeekCardConst.SEND_CANNOT_GET;
			if (leftTime > 0) {
				if (dailyAward == WeekCardConst.STATE_ALREADY_GET) {
					sendState = WeekCardConst.SEND_ALREADY_GET;
				} else {
					sendState = WeekCardConst.SEND_CAN_GET;
				}
			}
			WeekCardSender.sendCmd_4552(hid, leftTime, sendState);
		} catch (Exception e) {
			LogTool.error(e, WeekCardManager.class, hero.getId(), hero.getName(), "WeekCardManager openUI");
		}
	}

	/**
	 * 只刷新数据，不更新每天第一次打开状态
	 * 
	 * @param hero
	 */
	public void openUpate(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.WEEK_CARD_SYSID)) {
				WeekCardSender.sendCmd_4554(hid, 0);
				return;
			}
			WeekCardModel weekCardModel = hero.getWeekCardModel();
			int dailyAward = weekCardModel.getDailyAward();
			int endTime = weekCardModel.getEndTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			int leftTime = 0;
			if (endTime > 0 && endTime > currentTime) {
				leftTime = endTime - currentTime;
			}
			int sendState = WeekCardConst.SEND_CANNOT_GET;
			if (leftTime > 0) {
				if (dailyAward == WeekCardConst.STATE_ALREADY_GET) {
					sendState = WeekCardConst.SEND_ALREADY_GET;
				} else {
					sendState = WeekCardConst.SEND_CAN_GET;
				}
			}
			WeekCardSender.sendCmd_4552(hid, leftTime, sendState);
		} catch (Exception e) {
			LogTool.error(e, WeekCardManager.class, hero.getId(), hero.getName(), "WeekCardManager openUI");
		}
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 */
	public void getAward(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.WEEK_CARD_SYSID)) {
				WeekCardSender.sendCmd_4554(hid, 0);
				return;
			}
			WeekCardFunction cardFunction = WeekCardFunction.getIns();
			if (!cardFunction.isWeekCardEffect(hero)) {
				WeekCardSender.sendCmd_4554(hid, 0);
				return;
			}
			WeekCardModel weekCardModel = hero.getWeekCardModel();
			int dailyAward = weekCardModel.getDailyAward();
			if (dailyAward == WeekCardConst.STATE_ALREADY_GET) {
				WeekCardSender.sendCmd_4554(hid, 2);
				return;
			}
			weekCardModel.setDailyAward(WeekCardConst.STATE_ALREADY_GET);
			Struct_weekcard_267 weekcard_267 = Config_weekcard_267.getIns().getSortList().get(0);
			int[][] reward = weekcard_267.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.WEEKCARD_DAILY_REWARD, UseAddUtil.getDefaultMail(), true);
			WeekCardSender.sendCmd_4554(hid, 1);
			cardFunction.updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WeekCardManager.class, hero.getId(), hero.getName(), "WeekCardManager getAward");
		}
	}

}
