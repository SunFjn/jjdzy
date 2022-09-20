package com.teamtop.system.LoginLuxuryGifts;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.LoginLuxuryGifts.model.LoginLuxuryGifts;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.privilegeCard.PrivilegeCardFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_dlhl1_732;

public class LoginLuxuryGiftsManager {

	private static LoginLuxuryGiftsManager ins;

	private LoginLuxuryGiftsManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LoginLuxuryGiftsManager getIns() {
		if (ins == null) {
			ins = new LoginLuxuryGiftsManager();
		}
		return ins;
	}
	
	/**
	 * 打开界面
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			LoginLuxuryGifts loginLuxuryGifts = hero.getLoginLuxuryGifts();
			Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			int type = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				rewardData.add(new Object[] { type, rewardMap.get(type) });
			}
			int openDays = TimeDateUtil.betweenOpen();
			LoginLuxuryGiftsSender.sendCmd_2892(hero.getId(), rewardData.toArray(), openDays);
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsManager.class, hero.getId(), hero.getName(),
					"LoginLuxuryGiftsManager getReward");
		}
	}

	public void checkRewardState(Hero hero, LoginLuxuryGifts loginLuxuryGifts) {
		Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();

		int state = rewardMap.get(LoginLuxuryGiftsConst.VIP_REWARD);
		if (state == LoginLuxuryGiftsConst.State_Cannot_Get) {
			int lvl = Config_xtcs_004.getIns().get(LoginLuxuryGiftsConst.VIP_LEVEL_ID).getNum();
			if (hero.getVipLv() >= lvl) {
				rewardMap.put(LoginLuxuryGiftsConst.VIP_REWARD, LoginLuxuryGiftsConst.State_Can_Get);
			}
		}
		state = rewardMap.get(LoginLuxuryGiftsConst.LOGIN_REWARD);
		if (state == LoginLuxuryGiftsConst.State_Cannot_Get) {
			rewardMap.put(LoginLuxuryGiftsConst.LOGIN_REWARD, LoginLuxuryGiftsConst.State_Can_Get);
		}
		state = rewardMap.get(LoginLuxuryGiftsConst.CARD_REWARD);
		if (state == LoginLuxuryGiftsConst.State_Cannot_Get) {
			if (PrivilegeCardFunction.getIns().isOwnSupermacyCard(hero)) {
				rewardMap.put(LoginLuxuryGiftsConst.CARD_REWARD, LoginLuxuryGiftsConst.State_Can_Get);
			}
		}
	}

	/**
	 * 领取奖励
	 * @param hero
	 * @param type
	 */
	public void getReward(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, LoginLuxuryGiftsConst.SysId)) {
				return;
			}
			LoginLuxuryGifts loginLuxuryGifts = hero.getLoginLuxuryGifts();
			Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
			if (!rewardMap.containsKey(type)) {
				return;
			}
			int state = rewardMap.get(type);
			if (state == LoginLuxuryGiftsConst.State_Cannot_Get) {
				// 未满足条件
				LoginLuxuryGiftsSender.sendCmd_2894(hid, 0, 1);
				return;
			}
			if (state == LoginLuxuryGiftsConst.State_Already_Get) {
				// 已领取
				LoginLuxuryGiftsSender.sendCmd_2894(hid, 0, 2);
				return;
			}
			int openDays = TimeDateUtil.betweenOpen();
			Map<Integer, Map<Integer, Struct_dlhl1_732>> weekDayMap = LoginLuxuryGiftsCache.getWeekDayMap();
			Struct_dlhl1_732 rewardData = weekDayMap.get(openDays).get(type);
			int[][] reward = rewardData.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.LOGIN_LUXURY_GIFTS, null, true);
			rewardMap.put(type, LoginLuxuryGiftsConst.State_Already_Get);
			LoginLuxuryGiftsSender.sendCmd_2894(hid, 1, type);
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsManager.class, hero.getId(), hero.getName(),
					"LoginLuxuryGiftsManager getReward");
		}
	}

}
