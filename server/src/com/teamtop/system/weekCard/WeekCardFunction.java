package com.teamtop.system.weekCard;

import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.materialFuben.MaterialFubenManager;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.weekCard.model.WeekCardModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_weekcard_267;
import excel.struct.Struct_weekcard_267;

public class WeekCardFunction {

	private static WeekCardFunction ins;

	private WeekCardFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WeekCardFunction getIns() {
		if (ins == null) {
			ins = new WeekCardFunction();
		}
		return ins;
	}

	/** 是否周卡有效时间内 */
	public boolean isWeekCardEffect(Hero hero) {
		try {
			WeekCardModel weekCardModel = hero.getWeekCardModel();
			int endTime = weekCardModel.getEndTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			if (endTime > currentTime) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, WeekCardFunction.class, hero.getId(), hero.getName(), "WeekCardFunction isWeekCardEffect");
		}
		return false;
	}

	/**
	 * 秘境协助次数
	 */
	public int getMJHelpNum(Hero hero) {
		try {
			if (!isWeekCardEffect(hero)) {
				return 0;
			}
			// if (!HeroFunction.getIns().checkSystemOpen(hero,
			// SystemIdConst.WEEK_CARD_SYSID)) {
			// return 0;
			// }
			Struct_weekcard_267 struct_weekcard = Config_weekcard_267.getIns().getSortList().get(0);
			int tq2 = struct_weekcard.getTq2();
			return tq2;
		} catch (Exception e) {
			LogTool.error(e, WeekCardFunction.class, hero.getId(), hero.getName(), "WeekCardFunction getMJHelpNum");
		}
		return 0;
	}

	/**
	 * 秘境扫荡次数
	 */
	public int getMJMopUp(Hero hero) {
		try {
			if (!isWeekCardEffect(hero)) {
				return 0;
			}
			// if (!HeroFunction.getIns().checkSystemOpen(hero,
			// SystemIdConst.WEEK_CARD_SYSID)) {
			// return 0;
			// }
			Struct_weekcard_267 struct_weekcard = Config_weekcard_267.getIns().getSortList().get(0);
			int tq1 = struct_weekcard.getTq1();
			return tq1;
		} catch (Exception e) {
			LogTool.error(e, WeekCardFunction.class, hero.getId(), hero.getName(), "WeekCardFunction getMJMopUp");
		}
		return 0;
	}

	/**
	 * 材料副本次数
	 * 
	 * @param hero
	 * @return
	 */
	public int getMaterialFuben(Hero hero) {
		try {
			if (!isWeekCardEffect(hero)) {
				return 0;
			}
			Struct_weekcard_267 struct_weekcard = Config_weekcard_267.getIns().getSortList().get(0);
			int tq1 = struct_weekcard.getTq3();
			return tq1;
		} catch (Exception e) {
			LogTool.error(e, WeekCardFunction.class, hero.getId(), hero.getName(), "WeekCardFunction getMJMopUp");
		}
		return 0;
	}

	public void recharge(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.WEEK_CARD_SYSID)) {
				return;
			}
			WeekCardModel weekCardModel = hero.getWeekCardModel();
			int todayZeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
			int currentTime = TimeDateUtil.getCurrentTime();
			int endTime = weekCardModel.getEndTime();
			if (currentTime > endTime) {
				weekCardModel.setStartTime(todayZeroTime);
				int nextFewDayTime = TimeDateUtil.getNextFewDayTime(WeekCardConst.DAYS);
				endTime = TimeDateUtil.getOneDayZeroTime(nextFewDayTime);
			} else if (endTime > 0) {
				endTime += TimeDateUtil.ONE_DAY_INT * WeekCardConst.DAYS;
			}
			weekCardModel.setEndTime(endTime);
			WeekCardManager.getIns().openUpate(hero);
			updateRedPoint(hero);
			// 刷新秘境协助次数
			CrossSJMiJingEvent.getIns().login(hero);
			// 刷新材料副本
			MaterialFubenManager.getIns().showInfo(hero);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_45, 0);
		} catch (Exception e) {
			LogTool.error(e, WeekCardFunction.class, hero.getId(), hero.getName(), "WeekCardFunction recharge");
		}
	}

	/**
	 * 更新红点
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WEEK_CARD_SYSID,
						WeekCardConst.redPoint, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WEEK_CARD_SYSID,
						WeekCardConst.redPoint, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, WeekCardFunction.class, hero.getId(), hero.getName(), "WeekCardFunction updateRedPoint");
		}
	}

	/**
	 * 检测红点
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (hero == null) {
				return false;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.WEEK_CARD_SYSID)) {
				return false;
			}
			if (!isWeekCardEffect(hero)) {
				return false;
			}
			WeekCardModel weekCardModel = hero.getWeekCardModel();
			int dailyFirst = weekCardModel.getDailyFirst();
			if (dailyFirst != WeekCardConst.STATE_OPENED) {
				return true;
			}
			int dailyAward = weekCardModel.getDailyAward();
			if (dailyAward == WeekCardConst.STATE_CANNOT) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, WeekCardFunction.class, hero.getId(), hero.getName(), "WeekCardFunction checkRedPoint");
		}
		return false;
	}

	public void sendReward(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.WEEK_CARD_SYSID)) {
				return;
			}
			WeekCardModel weekCardModel = hero.getWeekCardModel();
			int dailyAward = weekCardModel.getDailyAward();
			if (dailyAward == WeekCardConst.STATE_ALREADY_GET) {
				return;
			}
			int endTime = weekCardModel.getEndTime();
			int zeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
			if (isWeekCardEffect(hero) || endTime == zeroTime) {
				weekCardModel.setDailyAward(WeekCardConst.STATE_ALREADY_GET);
				long hid = hero.getId();
				int mailId = MailConst.MAIL_ID_WEEKCARD_REWARD;
				Struct_weekcard_267 weekcard_267 = Config_weekcard_267.getIns().getSortList().get(0);
				int[][] reward = weekcard_267.getReward();
				MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
			}
		} catch (Exception e) {
			LogTool.error(e, WeekCardFunction.class, hero.getId(), hero.getName(), "WeekCardFunction sendReward");
		}
	}

}
