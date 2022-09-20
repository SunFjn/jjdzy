package com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew.model.LoginLuxuryGiftsNew;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.privilegeCard.PrivilegeCardFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_dlhl2_732;

public class LoginLuxuryGiftsNewManager extends AbstractActivityManager {

	private static LoginLuxuryGiftsNewManager loginLuxuryGiftsManager;

	private LoginLuxuryGiftsNewManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LoginLuxuryGiftsNewManager getIns() {
		if (loginLuxuryGiftsManager == null) {
			loginLuxuryGiftsManager = new LoginLuxuryGiftsNewManager();
		}
		return loginLuxuryGiftsManager;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// 活动开启处理
		// 检测奖励领取状态
		LoginLuxuryGiftsNew activityData = (LoginLuxuryGiftsNew) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.Act_LoginLuxuryGiftsNew);
		Map<Integer, Integer> rewardMap = activityData.getRewardMap();
		int state = rewardMap.get(LoginLuxuryGiftsNewConst.LOGIN_REWARD);
		if (state == LoginLuxuryGiftsNewConst.State_Cannot_Get) {
			rewardMap.put(LoginLuxuryGiftsNewConst.LOGIN_REWARD, LoginLuxuryGiftsNewConst.State_Can_Get);
		}
		checkRewardState(hero, activityData);
	}
	
	public void checkRewardState(Hero hero, LoginLuxuryGiftsNew activityData) {
		Map<Integer, Integer> rewardMap = activityData.getRewardMap();
		int state = rewardMap.get(LoginLuxuryGiftsNewConst.VIP_REWARD);
		if (state == LoginLuxuryGiftsNewConst.State_Cannot_Get) {
			int lvl = Config_xtcs_004.getIns().get(LoginLuxuryGiftsNewConst.VIP_LEVEL_ID).getNum();
			if (hero.getVipLv() >= lvl) {
				rewardMap.put(LoginLuxuryGiftsNewConst.VIP_REWARD, LoginLuxuryGiftsNewConst.State_Can_Get);
			}
		}
		state = rewardMap.get(LoginLuxuryGiftsNewConst.CARD_REWARD);
		if (state == LoginLuxuryGiftsNewConst.State_Cannot_Get) {
			if (PrivilegeCardFunction.getIns().isOwnSupermacyCard(hero)) {
				rewardMap.put(LoginLuxuryGiftsNewConst.CARD_REWARD, LoginLuxuryGiftsNewConst.State_Can_Get);
			}
		}
		LoginLuxuryGiftsNewFunction.getIns().updateRedPoint(hero);
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		LoginLuxuryGiftsNewFunction.getIns().sendAward(hero);
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		LoginLuxuryGiftsNew act = new LoginLuxuryGiftsNew(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(),
				activityInfo.getPeriods());
		Map<Integer, Integer> rewardMap = new HashMap<>();
		Iterator<Integer> iterator = LoginLuxuryGiftsNewCache.getRewardTypeSet().iterator();
		int type = 0;
		for (; iterator.hasNext();) {
			type = iterator.next();
			rewardMap.put(type, 0);
		}
		act.setRewardMap(rewardMap);
		return act;
	}

	@Override
	public Class<?> getActivityData() {
		return LoginLuxuryGiftsNew.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return LoginLuxuryGiftsNewSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_LoginLuxuryGiftsNew)) {
			return;
		}
		// 检测奖励领取状态
		LoginLuxuryGiftsNew activityData = (LoginLuxuryGiftsNew) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.Act_LoginLuxuryGiftsNew);
		Map<Integer, Integer> rewardMap = activityData.getRewardMap();
		int state = rewardMap.get(LoginLuxuryGiftsNewConst.RECHARGE_REWARD);
		if (state == LoginLuxuryGiftsNewConst.State_Cannot_Get) {
			rewardMap.put(LoginLuxuryGiftsNewConst.RECHARGE_REWARD, LoginLuxuryGiftsNewConst.State_Can_Get);
		}
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_LoginLuxuryGiftsNew)) {
				return;
			}
			LoginLuxuryGiftsNew activityData = (LoginLuxuryGiftsNew) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.Act_LoginLuxuryGiftsNew);
			Map<Integer, Integer> rewardMap = activityData.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			int type = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				rewardData.add(new Object[] { type, rewardMap.get(type) });
			}
			LoginLuxuryGiftsNewSender.sendCmd_2870(hero.getId(), rewardData.toArray(), activityData.getActId(),
					activityData.getPeriods());
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsNewManager.class, hero.getId(), hero.getName(),
					"LoginLuxuryGiftsNewManager openUI");
		}
	}

	public void getReward(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_LoginLuxuryGiftsNew)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_LoginLuxuryGiftsNew)) {
				return;
			}
			LoginLuxuryGiftsNew activityData = (LoginLuxuryGiftsNew) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.Act_LoginLuxuryGiftsNew);
			Map<Integer, Integer> rewardMap = activityData.getRewardMap();
			if (!rewardMap.containsKey(type)) {
				return;
			}
			int state = rewardMap.get(type);
			if (state == LoginLuxuryGiftsNewConst.State_Cannot_Get) {
				// 未满足条件
				LoginLuxuryGiftsNewSender.sendCmd_2872(hid, 0, 1);
				return;
			}
			if (state == LoginLuxuryGiftsNewConst.State_Already_Get) {
				// 已领取
				LoginLuxuryGiftsNewSender.sendCmd_2872(hid, 0, 2);
				return;
			}
			int week = TimeDateUtil.getWeek();
			Map<Integer, Map<Integer, Struct_dlhl2_732>> weekDayMap = LoginLuxuryGiftsNewCache.getWeekDayMap();
			Struct_dlhl2_732 rewardData = weekDayMap.get(week).get(type);
			int[][] reward = rewardData.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.LOGIN_LUXURY_GIFTS, null, true);
			rewardMap.put(type, LoginLuxuryGiftsNewConst.State_Already_Get);
			LoginLuxuryGiftsNewSender.sendCmd_2872(hid, 1, type);
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsNewManager.class, hero.getId(), hero.getName(),
					"LoginLuxuryGiftsNewManager getReward");
		}
	}

}
