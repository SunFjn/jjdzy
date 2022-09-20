package com.teamtop.system.openDaysSystem.specialAnimalSendGift;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

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
import com.teamtop.system.openDaysSystem.specialAnimalSendGift.model.SpecialAnimalSendGift;
import com.teamtop.system.openDaysSystem.specialAnimalSendGift.model.SpecialAnimalSendGiftModel;
import com.teamtop.system.specialAnimalDir.SpecialAnimalDirFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ysslrw_018;
import excel.struct.Struct_yssljh_018;
import excel.struct.Struct_ysslrw_018;

public class SpecialAnimalSendGiftManager extends AbsOpenDaysManager {
	private static volatile SpecialAnimalSendGiftManager ins = null;

	public static SpecialAnimalSendGiftManager getIns() {
		if (ins == null) {
			synchronized (SpecialAnimalSendGiftManager.class) {
				if (ins == null) {
					ins = new SpecialAnimalSendGiftManager();
				}
			}
		}
		return ins;
	}

	private SpecialAnimalSendGiftManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SPECIALANIMALDIR_SENDGIFT)) {
			return;
		}
		SpecialAnimalSendGift specialAnimalSendGift = SpecialAnimalSendGiftFunction.getIns().getModel(hero);
		Map<Integer, SpecialAnimalSendGiftModel> taskMap = specialAnimalSendGift.getTaskMap();
		int qs = specialAnimalSendGift.getQs();
		Map<Integer, Map<Integer, Struct_ysslrw_018>> taskConfigMap = SpecialAnimalSendGiftSysCache.getTaskConfigMap()
				.get(qs);

		ArrayList<Object[]> awardList = new ArrayList<>();
		for (Entry<Integer, Map<Integer, Struct_ysslrw_018>> entry : taskConfigMap.entrySet()) {
			Integer type = entry.getKey();
			SpecialAnimalSendGiftModel model = Optional.ofNullable(taskMap).map(map -> map.get(type))
					.orElse(SpecialAnimalSendGiftConst.DEFAULT_MODEL);
			boolean isActive = model.isActive();
			ArrayList<Object[]> objArrayList = new ArrayList<>();
			Map<Integer, Struct_ysslrw_018> map = entry.getValue();
			for (Struct_ysslrw_018 struct_ysslrw_018 : map.values()) {
				int id = struct_ysslrw_018.getId();
				Byte state = Optional.ofNullable(model.getAwardStateMap()).filter(predicate -> isActive)
						.map(mapper -> mapper.get(id)).orElse(SpecialAnimalSendGiftConst.NOT_REACH);
				objArrayList.add(new Object[] { id, state });
			}
			awardList.add(new Object[] { type,
					isActive ? SpecialAnimalSendGiftConst.ACTIVE : SpecialAnimalSendGiftConst.NO_ACTIVE,
					model.getParameter(), objArrayList.toArray() });
		}
		int totalRecharge = specialAnimalSendGift.getTotalRecharge();
		SpecialAnimalSendGiftSender.sendCmd_9220(hero.getId(), awardList.toArray(), totalRecharge, qs);
	}

	public void active(Hero hero, int type) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SPECIALANIMALDIR_SENDGIFT)) {
				return;
			}
			SpecialAnimalSendGift specialAnimalSendGift = SpecialAnimalSendGiftFunction.getIns().getModel(hero);
			Struct_yssljh_018 struct_yssljh_018 = SpecialAnimalSendGiftSysCache.getActiveConfigMap()
					.get(specialAnimalSendGift.getQs()).get(type);
			if (struct_yssljh_018 == null) {
				return;
			}
			Map<Integer, SpecialAnimalSendGiftModel> taskMap = specialAnimalSendGift.getTaskMap();
			SpecialAnimalSendGiftModel model = Optional.ofNullable(taskMap).map(map -> map.get(type)).orElseGet(() -> {
				SpecialAnimalSendGiftModel newModel = new SpecialAnimalSendGiftModel();
				newModel.setAwardStateMap(new HashMap<>());
				return newModel;
			});
			if (model.isActive()) {
				SpecialAnimalSendGiftSender.sendCmd_9222(hero.getId(), SpecialAnimalSendGiftConst.FAILURE_NOT_REP,
						type);
				return;
			}
			int rmb = struct_yssljh_018.getRmb();
			int totalRecharge = specialAnimalSendGift.getTotalRecharge();
			if (totalRecharge < rmb) {
				SpecialAnimalSendGiftSender.sendCmd_9222(hero.getId(), SpecialAnimalSendGiftConst.FAILURE_NOT_REACH,
						type);
				return;
			}
			model.setActive(true);
			taskMap.put(type, model);
			SpecialAnimalSendGiftSender.sendCmd_9222(hero.getId(), SpecialAnimalSendGiftConst.SUCCESS, type);
			openUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "active type:" + type);
		}
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param awardId 要领取的奖励id
	 */
	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SPECIALANIMALDIR_SENDGIFT)) {
				return;
			}
			Struct_ysslrw_018 struct_ysslrw_018 = Config_ysslrw_018.getIns().get(awardId);
			if (struct_ysslrw_018 == null) {
				SpecialAnimalSendGiftSender.sendCmd_9224(hero.getId(), SpecialAnimalSendGiftConst.FAILURE_NOT_AWARD,
						awardId);
				return;
			}
			SpecialAnimalSendGift specialAnimalSendGift = SpecialAnimalSendGiftFunction.getIns().getModel(hero);
			Map<Integer, SpecialAnimalSendGiftModel> taskMap = specialAnimalSendGift.getTaskMap();
			int type = struct_ysslrw_018.getLeixing();
			SpecialAnimalSendGiftModel model = Optional.ofNullable(taskMap).map(map -> map.get(type))
					.orElse(SpecialAnimalSendGiftConst.DEFAULT_MODEL);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			Byte state = null;
			if (!model.isActive() || (state = awardStateMap.get(awardId)) == null) {
				// 未激活或满足条件
				SpecialAnimalSendGiftSender.sendCmd_9224(hero.getId(), SpecialAnimalSendGiftConst.FAILURE_NOT_REACH,
						awardId);
				return;
			}
			if (state == SpecialAnimalSendGiftConst.GETTED) {
				SpecialAnimalSendGiftSender.sendCmd_9224(hero.getId(), SpecialAnimalSendGiftConst.FAILURE_NOT_REP,
						awardId);
				return;
			}
			awardStateMap.put(awardId, SpecialAnimalSendGiftConst.GETTED);
			int[][] reward = struct_ysslrw_018.getPutong();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.SPECIALANIMALDIR_SENDGIFT_REWARD, UseAddUtil.getDefaultMail(),
					true);
			SpecialAnimalSendGiftSender.sendCmd_9224(hero.getId(), SpecialAnimalSendGiftConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward awardId:" + awardId);
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub
		// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
		SpecialAnimalSendGiftFunction.getIns().rechargeHandler(hero, 0, 0);
		// 异兽送礼任务初始化
		SpecialAnimalDirFunction.getIns().specialAnimalSendGiftTaskInit(hero);
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO Auto-generated method stub
		// 补发邮件奖励
		Integer configId = 0;
		try {
			SpecialAnimalSendGift specialAnimalSendGift = (SpecialAnimalSendGift) SpecialAnimalSendGiftManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, SpecialAnimalSendGiftModel> taskMap = specialAnimalSendGift.getTaskMap();
			for (Entry<Integer, SpecialAnimalSendGiftModel> entry : taskMap.entrySet()) {
				SpecialAnimalSendGiftModel model = entry.getValue();
				if (!model.isActive()) {
					continue;
				}
				Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
				if (awardStateMap == null) {
					continue;
				}
				for (Entry<Integer, Byte> awardStateEntry : awardStateMap.entrySet()) {
					Byte state = awardStateEntry.getValue();
					if (state == SpecialAnimalSendGiftConst.CAN_GET) {
						configId = awardStateEntry.getKey();
						Struct_ysslrw_018 struct_ysslrw_018 = Config_ysslrw_018.getIns().get(configId);
						int[][] reward = struct_ysslrw_018.getPutong();
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
								MailConst.SPECIALANIMALDIR_SENDGIFT_REWARD,
								new Object[] { MailConst.SPECIALANIMALDIR_SENDGIFT_REWARD }, reward);
						awardStateEntry.setValue(SpecialAnimalSendGiftConst.GETTED);
					}
				}
			}

		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "handleEnd configId:" + configId);
		}

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		// TODO Auto-generated method stub
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		SpecialAnimalSendGift specialAnimalSendGift = (SpecialAnimalSendGift) heroOpenDaysSysData.getOpSysDataMap()
				.get(uid);
		if (specialAnimalSendGift == null) {
			specialAnimalSendGift = new SpecialAnimalSendGift();
			specialAnimalSendGift.setTaskMap(new HashMap<>());
			specialAnimalSendGift.setTotalRecharge(hero.getOneDayRecharge());
		}
		return specialAnimalSendGift;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return SpecialAnimalSendGift.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return SpecialAnimalSendGiftEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		SpecialAnimalSendGiftFunction.getIns().rechargeHandler(hero, money, product_id);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
