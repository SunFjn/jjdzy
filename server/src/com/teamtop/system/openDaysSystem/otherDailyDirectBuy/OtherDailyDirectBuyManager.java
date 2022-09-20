package com.teamtop.system.openDaysSystem.otherDailyDirectBuy;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActConst;
import com.teamtop.system.dailyDirectBuy.DailyDirectBuyConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_mrzg3_256;
import excel.config.Config_mrzgmb_256;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_mrzg3_256;
import excel.struct.Struct_mrzgmb_256;

public class OtherDailyDirectBuyManager extends AbsOpenDaysManager {

	private static OtherDailyDirectBuyManager ins;

	public static OtherDailyDirectBuyManager getIns() {
		if (ins == null) {
			ins = new OtherDailyDirectBuyManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAILYBUY)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAILYBUY);

		OtherDailyDirectBuy dailyDirectBuy = (OtherDailyDirectBuy) getSystemModel(hero, uid);
		Map<Integer, Integer> awardList = dailyDirectBuy.getAwardMap();
		int qs = dailyDirectBuy.getQs();
		int dayIndex = TimeDateUtil.betweenOpen() - qs * 7;
		Map<Integer, List<Struct_mrzg3_256>> map = OtherDailyDirectBuyCache.getDailyDirectBuyConfigMap().get(qs);
		Object[] awardArray = new Object[map.size()];
		Iterator<Entry<Integer, List<Struct_mrzg3_256>>> iterator = map.entrySet().iterator();
		for (; iterator.hasNext();) {
			Entry<Integer, List<Struct_mrzg3_256>> entry = iterator.next();
			int day = entry.getKey() - 1;
			List<Struct_mrzg3_256> list = entry.getValue();
			Object[] twoArray = new Object[list.size()];
			for (int i = 0; i < list.size(); i++) {
				int id = list.get(i).getId();
				Integer status = awardList.get(id);
				if (status == null) {
					status = DailyDirectBuyActConst.NOTBUY;
					awardList.put(id, status);
				}
				twoArray[i] = new Object[] { id, status };
			}
			awardArray[day] = new Object[] { twoArray };
		}

		// 目标奖励
		Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
		List<Struct_mrzgmb_256> targetAwardConfigList = OtherDailyDirectBuyCache.getTargetAwardConfigMap().get(qs);
		int size = targetAwardConfigList.size();
		List<Object[]> objTargetList = new ArrayList<>();
		for (int i = 0; i < size; i++) {
			int id = targetAwardConfigList.get(i).getBianhao();
			Integer state = Optional.ofNullable(targetAwardMap).map(mapper -> mapper.get(id))
					.orElse(DailyDirectBuyActConst.NOT_REACH);
			objTargetList.add(new Object[] { id, state });
		}
		int targetTimes = 0;
		for (int state : awardList.values()) {
			if (state != DailyDirectBuyActConst.NOTBUY) {
				targetTimes++;
			}
		}
		int endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();
		OtherDailyDirectBuySender.sendCmd_7000(hero.getId(), awardArray, dayIndex, objTargetList.toArray(), targetTimes,
				endTime);

	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param 为每日直购表id
	 */
	public void getAward(Hero hero, int level) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAILYBUY)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAILYBUY);
		OtherDailyDirectBuy dailyDirectBuy = (OtherDailyDirectBuy) getSystemModel(hero, uid);
		Map<Integer, Integer> map = dailyDirectBuy.getAwardMap();

		Integer status = map.get(level);
		// 未购买无法领取
		if (status == null) {
			OtherDailyDirectBuySender.sendCmd_7002(hero.getId(), DailyDirectBuyActConst.NOTBUY_FAILURE, level);
			return;
		}
		// 重复领取
		if (status == DailyDirectBuyActConst.GETTED) {
			OtherDailyDirectBuySender.sendCmd_7002(hero.getId(), DailyDirectBuyActConst.REP_FAILURE, level);
			return;
		}
		if (status == DailyDirectBuyActConst.BUY_NOTGET) {
			map.put(level, DailyDirectBuyActConst.GETTED);
			int[][] reward = Config_mrzg3_256.getIns().get(level).getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.DAILYDIRECTBUY_OTHER_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
			OtherDailyDirectBuySender.sendCmd_7002(hero.getId(), DailyDirectBuyActConst.SUCCESS, level);
		}
	}

	/**
	 * 领取目标奖励 7005
	 * 
	 * @param targetId| 目标表id| int
	 */
	public void getTargetAward(Hero hero, int targetId) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAILYBUY)) {
				return;
			}
			Struct_mrzgmb_256 struct_mrzgmb_256 = Config_mrzgmb_256.getIns().get(targetId);
			if (struct_mrzgmb_256 == null) {
				OtherDailyDirectBuySender.sendCmd_7006(hero.getId(), DailyDirectBuyActConst.FAILURE_NOT_AWARD,
						targetId);
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAILYBUY);
			OtherDailyDirectBuy dailyDirectBuy = (OtherDailyDirectBuy) getSystemModel(hero, uid);
			Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
			Integer state = targetAwardMap.get(targetId);
			if (state == null) {
				OtherDailyDirectBuySender.sendCmd_7006(hero.getId(), DailyDirectBuyActConst.FAILURE_NOT_REACH,
						targetId);
				return;
			}
			if (state == DailyDirectBuyConst.GETTED) {
				OtherDailyDirectBuySender.sendCmd_7006(hero.getId(), DailyDirectBuyActConst.FAILURE_NOT_REP, targetId);
				return;
			}
			targetAwardMap.put(targetId, DailyDirectBuyActConst.GETTED);
			int[][] reward = struct_mrzgmb_256.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.DAILYDIRECTBUY_OTHER_TARGET_AWARD, UseAddUtil.getDefaultMail(),
					true);
			OtherDailyDirectBuySender.sendCmd_7006(hero.getId(), DailyDirectBuyActConst.SUCCESS, targetId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getTargetAward targetId:" + targetId);
		}

	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		Integer id = 0;
		Integer targetId = 0;
		try {
			OtherDailyDirectBuy dailyDirectBuy = (OtherDailyDirectBuy) getSystemModel(hero, uid);
			Map<Integer, Integer> awardList = dailyDirectBuy.getAwardMap();
			// 补发邮件
			for (Map.Entry<Integer, Integer> entry : awardList.entrySet()) {
				if (entry.getValue() == DailyDirectBuyActConst.BUY_NOTGET) {
					id = entry.getKey();
					int[][] reward = Config_mrzg3_256.getIns().get(id).getReward();
					Object[] contentData = new Object[] { MailConst.MAIL_DAILYDIRECTBUY_AWARD };
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_DAILYDIRECTBUY_AWARD,
							contentData, reward);
				}
			}

			// 目标奖励邮件补发
			Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
			for (Entry<Integer, Integer> entry : targetAwardMap.entrySet()) {
				targetId = entry.getKey();
				Integer state = entry.getValue();
				if (state == DailyDirectBuyActConst.CAN_GET) {
					Struct_mrzgmb_256 struct_mrzgmb_256 = Config_mrzgmb_256.getIns().get(targetId);
					int[][] reward = struct_mrzgmb_256.getReward();
					Object[] contentData = new Object[] { MailConst.DAILYDIRECTBUY_TARGET_AWARD };
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.DAILYDIRECTBUY_TARGET_AWARD,
							contentData, reward);
					targetAwardMap.put(targetId, DailyDirectBuyActConst.GETTED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "handleEnd id:" + id + " targetId:" + targetId);
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		OtherDailyDirectBuy otherDailyDirectBuy = (OtherDailyDirectBuy) opSysDataMap.get(uid);
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int qs = struct_hdfl_012.getQs();
		if (otherDailyDirectBuy == null) {
			otherDailyDirectBuy = new OtherDailyDirectBuy();
			otherDailyDirectBuy.setAwardMap(new HashMap<>());
			otherDailyDirectBuy.setTargetAwardMap(new HashMap<>());
			otherDailyDirectBuy.setQs(qs);
		}
		return otherDailyDirectBuy;
	}

	@Override
	public Class<?> getSystemModel() {
		return OtherDailyDirectBuy.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return OtherDailyDirectBuyEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {

	}

}
