package com.teamtop.system.LoginLuxuryGifts;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.LoginLuxuryGifts.model.LoginLuxuryGifts;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_dlhl1_732;

public class LoginLuxuryGiftsFunction {
	
	private static LoginLuxuryGiftsFunction ins;
	
	private LoginLuxuryGiftsFunction() {
		// TODO Auto-generated constructor stub
	}
	
	public static synchronized LoginLuxuryGiftsFunction getIns() {
		if (ins == null) {
			ins = new LoginLuxuryGiftsFunction();
		}
		return ins;
	}
	
	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			LoginLuxuryGifts loginLuxuryGifts = hero.getLoginLuxuryGifts();
			LoginLuxuryGiftsManager.getIns().checkRewardState(hero, loginLuxuryGifts);
			Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
			Set<Integer> rewardSet = new HashSet<>(rewardMap.keySet());
			Iterator<Integer> iterator = rewardSet.iterator();
			for (; iterator.hasNext();) {
				int id = iterator.next();
				if (rewardMap.get(id) == LoginLuxuryGiftsConst.State_Can_Get) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsFunction.class, hero.getId(), hero.getName(),
					"LoginLuxuryGiftsFunction checkRedPoint");
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
			if (!HeroFunction.getIns().checkSystemOpen(hero, LoginLuxuryGiftsConst.SysId)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, LoginLuxuryGiftsConst.SysId,
						LoginLuxuryGiftsConst.RedPoint, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, LoginLuxuryGiftsConst.SysId,
						LoginLuxuryGiftsConst.RedPoint, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsFunction.class, hero.getId(), hero.getName(),
					"LoginLuxuryGiftsFunction updateRedPoint");
		}
	}

	/**
	 * 检测奖励
	 * @param hero
	 */
	public void checkRewardState(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, LoginLuxuryGiftsConst.SysId)) {
				return;
			}
			LoginLuxuryGifts loginLuxuryGifts = hero.getLoginLuxuryGifts();
			LoginLuxuryGiftsManager.getIns().checkRewardState(hero, loginLuxuryGifts);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, LoginLuxuryGiftsFunction.class, "LoginLuxuryGiftsFunction checkRewardState");
		}
	}
	
	/**
	 * 奖励补发
	 * @param hero
	 * @param days
	 */
	public void sendAward(Hero hero, int days) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, LoginLuxuryGiftsConst.SysId)) {
			return;
		}
		days -= 1;
		if (days == 0) {
			return;
		}
		long hid = hero.getId();
		// 发放未领取奖励
		LoginLuxuryGifts activityData = hero.getLoginLuxuryGifts();
		Map<Integer, Map<Integer, Struct_dlhl1_732>> weekDayMap = LoginLuxuryGiftsCache.getWeekDayMap();
		Map<Integer, Integer> rewardMap = activityData.getRewardMap();
		Iterator<Integer> iterator = rewardMap.keySet().iterator();
		int type = 0;
		int state = 0;
		int mailId = MailConst.LOGINLUXURYGIFTS;
		Struct_dlhl1_732 rewardData = null;
		for(;iterator.hasNext();) {
			type = iterator.next();
			state = rewardMap.get(type);
			if (state == LoginLuxuryGiftsConst.State_Can_Get) {// 可领取
				rewardMap.put(type, LoginLuxuryGiftsConst.State_Already_Get);
				//邮件
				rewardData = weekDayMap.get(days).get(type);
				int[][] reward = rewardData.getReward();
				MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { hero.getId() }, reward);
			}
		}
	}

}
