package com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts.model.OtherLoginLuxuryGifts;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_dlhl3_732;

public class OtherLoginLuxuryGiftsFunction {
	
	private static OtherLoginLuxuryGiftsFunction ins;
	
	private OtherLoginLuxuryGiftsFunction() {
		// TODO Auto-generated constructor stub
	}
	
	public static synchronized OtherLoginLuxuryGiftsFunction getIns() {
		if (ins == null) {
			ins = new OtherLoginLuxuryGiftsFunction();
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
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_LOGIN_LUXURY);
			OtherLoginLuxuryGifts loginLuxuryGifts = (OtherLoginLuxuryGifts) OtherLoginLuxuryGiftsManager.getIns()
					.getSystemModel(hero, uid);
			OtherLoginLuxuryGiftsManager.getIns().checkRewardState(hero, loginLuxuryGifts);
			Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
			Set<Integer> rewardSet = new HashSet<>(rewardMap.keySet());
			Iterator<Integer> iterator = rewardSet.iterator();
			for (; iterator.hasNext();) {
				int id = iterator.next();
				if (rewardMap.get(id) == OtherLoginLuxuryGiftsConst.State_Can_Get) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OtherLoginLuxuryGiftsFunction.class, hero.getId(), hero.getName(),
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_LOGIN_LUXURY)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.OTHER_LOGIN_LUXURY,
						OtherLoginLuxuryGiftsConst.RedPoint, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.OTHER_LOGIN_LUXURY,
						OtherLoginLuxuryGiftsConst.RedPoint, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, OtherLoginLuxuryGiftsFunction.class, hero.getId(), hero.getName(),
					"LoginLuxuryGiftsFunction updateRedPoint");
		}
	}

	/**
	 * 检测奖励
	 * @param hero
	 */
	public void checkRewardState(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_LOGIN_LUXURY)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_LOGIN_LUXURY);
			OtherLoginLuxuryGifts loginLuxuryGifts = (OtherLoginLuxuryGifts) OtherLoginLuxuryGiftsManager.getIns()
					.getSystemModel(hero, uid);
			OtherLoginLuxuryGiftsManager.getIns().checkRewardState(hero, loginLuxuryGifts);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, OtherLoginLuxuryGiftsFunction.class, "LoginLuxuryGiftsFunction checkRewardState");
		}
	}
	
	/**
	 * 奖励补发
	 * @param hero
	 * @param days
	 */
	public void sendAward(Hero hero, int days) {
		days -= 1;
		if (days == 0) {
			return;
		}
		long hid = hero.getId();
		// 发放未领取奖励
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_LOGIN_LUXURY);
		OtherLoginLuxuryGifts loginLuxuryGifts = (OtherLoginLuxuryGifts) OtherLoginLuxuryGiftsManager.getIns()
				.getSystemModel(hero, uid);
		Map<Integer, Map<Integer, Struct_dlhl3_732>> weekDayMap = OtherLoginLuxuryGiftsCache.getWeekDayMap();
		Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
		Iterator<Integer> iterator = rewardMap.keySet().iterator();
		int type = 0;
		int state = 0;
		int mailId = MailConst.LOGINLUXURYGIFTS;
		Struct_dlhl3_732 rewardData = null;
		for(;iterator.hasNext();) {
			type = iterator.next();
			state = rewardMap.get(type);
			if (state == OtherLoginLuxuryGiftsConst.State_Can_Get) {// 可领取
				rewardMap.put(type, OtherLoginLuxuryGiftsConst.State_Already_Get);
				//邮件
				rewardData = weekDayMap.get(days).get(type);
				int[][] reward = rewardData.getReward();
				MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { hero.getId() }, reward);
			}
		}
	}

}
