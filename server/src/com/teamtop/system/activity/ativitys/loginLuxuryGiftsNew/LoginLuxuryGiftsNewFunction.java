package com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew.model.LoginLuxuryGiftsNew;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_dlhl2_732;

public class LoginLuxuryGiftsNewFunction {

	private static LoginLuxuryGiftsNewFunction ins;

	private LoginLuxuryGiftsNewFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LoginLuxuryGiftsNewFunction getIns() {
		if (ins == null) {
			ins = new LoginLuxuryGiftsNewFunction();
		}
		return ins;
	}

	/**
	 * 检测红点
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_LoginLuxuryGiftsNew)) {
				return false;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_LoginLuxuryGiftsNew)) {
				return false;
			}
			LoginLuxuryGiftsNew activityData = (LoginLuxuryGiftsNew) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.Act_LoginLuxuryGiftsNew);
			Map<Integer, Integer> rewardMap = activityData.getRewardMap();
			Set<Integer> rewardSet = new HashSet<>(rewardMap.keySet());
			Iterator<Integer> iterator = rewardSet.iterator();
			for (; iterator.hasNext();) {
				int id = iterator.next();
				if (rewardMap.get(id) == LoginLuxuryGiftsNewConst.State_Can_Get) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsNewFunction.class, "LoginLuxuryGiftsFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
						LoginLuxuryGiftsNewConst.RedPoint, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_LoginLuxuryGiftsNew,
						LoginLuxuryGiftsNewConst.RedPoint, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_LoginLuxuryGiftsNew,
						LoginLuxuryGiftsNewConst.RedPoint, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsNewFunction.class, "LoginLuxuryGiftsFunction updateRedPoint");
		}
	}

	/**
	 * 检测奖励
	 * @param hero
	 */
	public void checkRewardState(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_LoginLuxuryGiftsNew)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_LoginLuxuryGiftsNew)) {
				return;
			}
			LoginLuxuryGiftsNew activityData = (LoginLuxuryGiftsNew) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.Act_LoginLuxuryGiftsNew);
			if(activityData==null) {
				return;
			}
			LoginLuxuryGiftsNewManager.getIns().checkRewardState(hero, activityData);
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsNewFunction.class, "LoginLuxuryGiftsFunction checkRewardState");
		}
	}

	/**
	 * 补发奖励
	 */
	public void sendAward(Hero hero) {
		long hid = hero.getId();
		try {
			int week = TimeDateUtil.getWeek() - 1;
			if (week == 0) {
				week = 7;
			}
			// 发放未领取奖励
			LoginLuxuryGiftsNew activityData = (LoginLuxuryGiftsNew) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.Act_LoginLuxuryGiftsNew);
			Map<Integer, Map<Integer, Struct_dlhl2_732>> weekDayMap = LoginLuxuryGiftsNewCache.getWeekDayMap();
			Map<Integer, Integer> rewardMap = activityData.getRewardMap();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			int type = 0;
			int state = 0;
			int mailId = MailConst.LOGINLUXURYGIFTS;
			Struct_dlhl2_732 rewardData = null;
			for (; iterator.hasNext();) {
				type = iterator.next();
				state = rewardMap.get(type);
				if (state == LoginLuxuryGiftsNewConst.State_Can_Get) {// 可领取
					rewardMap.put(type, LoginLuxuryGiftsNewConst.State_Already_Get);
					// 邮件
					rewardData = weekDayMap.get(week).get(type);
					int[][] reward = rewardData.getReward();
					MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { hero.getId() }, reward);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsNewFunction.class, hid, hero.getName(),
					"LoginLuxuryGiftsNewFunction sendAward");
		}
	}

}
