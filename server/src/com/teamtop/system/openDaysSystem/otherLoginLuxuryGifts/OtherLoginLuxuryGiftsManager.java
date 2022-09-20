package com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts.model.OtherLoginLuxuryGifts;
import com.teamtop.system.privilegeCard.PrivilegeCardFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_dlhl3_732;
import excel.struct.Struct_hdfl_012;

public class OtherLoginLuxuryGiftsManager extends AbsOpenDaysManager {

	private static OtherLoginLuxuryGiftsManager ins;

	private OtherLoginLuxuryGiftsManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OtherLoginLuxuryGiftsManager getIns() {
		if (ins == null) {
			ins = new OtherLoginLuxuryGiftsManager();
		}
		return ins;
	}
	
	/**
	 * 打开界面
	 */
	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_LOGIN_LUXURY)) {
			return;
		}
		try {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_LOGIN_LUXURY);
			OtherLoginLuxuryGifts loginLuxuryGifts = (OtherLoginLuxuryGifts) getSystemModel(hero, uid);
			Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			int type = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				rewardData.add(new Object[] { type, rewardMap.get(type) });
			}
			int openDays = TimeDateUtil.betweenOpen();
			OtherLoginLuxuryGiftsSender.sendCmd_4630(hero.getId(), openDays,rewardData.toArray());
		} catch (Exception e) {
			LogTool.error(e, OtherLoginLuxuryGiftsManager.class, hero.getId(), hero.getName(),
					"LoginLuxuryGiftsManager getReward");
		}
	}

	public void checkRewardState(Hero hero, OtherLoginLuxuryGifts loginLuxuryGifts) {
		Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();

		int state = rewardMap.get(OtherLoginLuxuryGiftsConst.VIP_REWARD);
		if (state == OtherLoginLuxuryGiftsConst.State_Cannot_Get) {
			int lvl = Config_xtcs_004.getIns().get(OtherLoginLuxuryGiftsConst.VIP_LEVEL_ID).getNum();
			if (hero.getVipLv() >= lvl) {
				rewardMap.put(OtherLoginLuxuryGiftsConst.VIP_REWARD, OtherLoginLuxuryGiftsConst.State_Can_Get);
			}
		}
		state = rewardMap.get(OtherLoginLuxuryGiftsConst.LOGIN_REWARD);
		if (state == OtherLoginLuxuryGiftsConst.State_Cannot_Get) {
			rewardMap.put(OtherLoginLuxuryGiftsConst.LOGIN_REWARD, OtherLoginLuxuryGiftsConst.State_Can_Get);
		}
		state = rewardMap.get(OtherLoginLuxuryGiftsConst.CARD_REWARD);
		if (state == OtherLoginLuxuryGiftsConst.State_Cannot_Get) {
			if (PrivilegeCardFunction.getIns().isOwnSupermacyCard(hero)) {
				rewardMap.put(OtherLoginLuxuryGiftsConst.CARD_REWARD, OtherLoginLuxuryGiftsConst.State_Can_Get);
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_LOGIN_LUXURY)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_LOGIN_LUXURY);
			OtherLoginLuxuryGifts loginLuxuryGifts = (OtherLoginLuxuryGifts) getSystemModel(hero, uid);
			Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
			if (!rewardMap.containsKey(type)) {
				return;
			}
			int state = rewardMap.get(type);
			if (state == OtherLoginLuxuryGiftsConst.State_Cannot_Get) {
				// 未满足条件
				OtherLoginLuxuryGiftsSender.sendCmd_4632(hid, 0, 1);
				return;
			}
			if (state == OtherLoginLuxuryGiftsConst.State_Already_Get) {
				// 已领取
				OtherLoginLuxuryGiftsSender.sendCmd_4632(hid, 0, 2);
				return;
			}
			int openDays = TimeDateUtil.betweenOpen();
			Map<Integer, Map<Integer, Struct_dlhl3_732>> weekDayMap = OtherLoginLuxuryGiftsCache.getWeekDayMap();
			Struct_dlhl3_732 rewardData = weekDayMap.get(openDays).get(type);
			int[][] reward = rewardData.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.LOGIN_LUXURY_GIFTS, null, true);
			rewardMap.put(type, OtherLoginLuxuryGiftsConst.State_Already_Get);
			OtherLoginLuxuryGiftsSender.sendCmd_4632(hid, 1, type);
		} catch (Exception e) {
			LogTool.error(e, OtherLoginLuxuryGiftsManager.class, hero.getId(), hero.getName(),
					"LoginLuxuryGiftsManager getReward");
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		OtherLoginLuxuryGiftsFunction.getIns().checkRewardState(hero);

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		int openDays = TimeDateUtil.betweenOpen();
		int days = openDays - 1;
		if (days == 0) {
			return;
		}
		long hid = hero.getId();
		// 发放未领取奖励
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
				Map<Integer, Struct_dlhl3_732> map = weekDayMap.get(days);
				if(map==null) {
					continue;
				}
				rewardData = map.get(type);
				int[][] reward = rewardData.getReward();
				MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { hero.getId() }, reward);
			}
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		OtherLoginLuxuryGifts otherLoginLuxuryGifts = (OtherLoginLuxuryGifts) opSysDataMap.get(uid);
		if (otherLoginLuxuryGifts == null) {
			Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
			int open = hdfl_012.getOpen();
			int end = hdfl_012.getEnd();
			otherLoginLuxuryGifts = new OtherLoginLuxuryGifts();
			Map<Integer, Integer> rewardMap = new HashMap<>();
			Iterator<Integer> iterator = OtherLoginLuxuryGiftsCache.getRewardTypeSet().iterator();
			int type = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				rewardMap.put(type, 0);
			}
			otherLoginLuxuryGifts.setRewardMap(rewardMap);
		}
		return otherLoginLuxuryGifts;
	}

	@Override
	public Class<?> getSystemModel() {
		return OtherLoginLuxuryGifts.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return OtherLoginLuxuryGiftsSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_LOGIN_LUXURY)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_LOGIN_LUXURY);
		OtherLoginLuxuryGifts loginLuxuryGifts = (OtherLoginLuxuryGifts) getSystemModel(hero, uid);
		Map<Integer, Integer> rewardMap = loginLuxuryGifts.getRewardMap();
		int state = rewardMap.get(OtherLoginLuxuryGiftsConst.RECHARGE_REWARD);
		if (state == OtherLoginLuxuryGiftsConst.State_Cannot_Get) {
			rewardMap.put(OtherLoginLuxuryGiftsConst.RECHARGE_REWARD, OtherLoginLuxuryGiftsConst.State_Can_Get);
		}
		state = rewardMap.get(OtherLoginLuxuryGiftsConst.CARD_REWARD);
		if (state == OtherLoginLuxuryGiftsConst.State_Cannot_Get) {
			if (PrivilegeCardFunction.getIns().isOwnSupermacyCard(hero)) {
				rewardMap.put(OtherLoginLuxuryGiftsConst.CARD_REWARD, OtherLoginLuxuryGiftsConst.State_Can_Get);
			}
		}
		state = rewardMap.get(OtherLoginLuxuryGiftsConst.VIP_REWARD);
		if (state == OtherLoginLuxuryGiftsConst.State_Cannot_Get) {
			int lvl = Config_xtcs_004.getIns().get(OtherLoginLuxuryGiftsConst.VIP_LEVEL_ID).getNum();
			if (hero.getVipLv() >= lvl) {
				rewardMap.put(OtherLoginLuxuryGiftsConst.VIP_REWARD, OtherLoginLuxuryGiftsConst.State_Can_Get);
			}
		}
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
