package com.teamtop.system.openDaysSystem.goodPolicyHasGift;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.goodPolicyHasGift.model.GoodPolicyHasGift;
import com.teamtop.system.openDaysSystem.goodPolicyHasGift.model.GoodPolicyHasGiftModel;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_qcylrw_327;
import excel.struct.Struct_qcyljh_327;
import excel.struct.Struct_qcylrw_327;

public class GoodPolicyHasGiftManager extends AbsOpenDaysManager {
	private static volatile GoodPolicyHasGiftManager ins = null;

	public static GoodPolicyHasGiftManager getIns() {
		if (ins == null) {
			synchronized (GoodPolicyHasGiftManager.class) {
				if (ins == null) {
					ins = new GoodPolicyHasGiftManager();
				}
			}
		}
		return ins;
	}

	private GoodPolicyHasGiftManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.GOODPOLICYHASGIFT)) {
			return;
		}
		GoodPolicyHasGift goodPolicyHasGift = GoodPolicyHasGiftFunction.getIns().getModel(hero);
		Map<Integer, GoodPolicyHasGiftModel> taskMap = goodPolicyHasGift.getTaskMap();
		int qs = goodPolicyHasGift.getQs();
		Map<Integer, Map<Integer, Struct_qcylrw_327>> taskConfigMap = GoodPolicyHasGiftSysCache.getTaskConfigMap()
				.get(qs);

		ArrayList<Object[]> awardList = new ArrayList<>();
		for (Entry<Integer, Map<Integer, Struct_qcylrw_327>> entry : taskConfigMap.entrySet()) {
			Integer type = entry.getKey();
			GoodPolicyHasGiftModel model = Optional.ofNullable(taskMap).map(map -> map.get(type))
					.orElse(GoodPolicyHasGiftConst.DEFAULT_MODEL);
			boolean isActive = model.isActive();
			ArrayList<Object[]> objArrayList = new ArrayList<>();
			Map<Integer, Struct_qcylrw_327> map = entry.getValue();
			for (Struct_qcylrw_327 struct_qcylrw_327 : map.values()) {
				int id = struct_qcylrw_327.getId();
				Byte state = Optional.ofNullable(model.getAwardStateMap()).filter(predicate -> isActive)
						.map(mapper -> mapper.get(id)).orElse(GoodPolicyHasGiftConst.NOT_REACH);
				objArrayList.add(new Object[] { id, state });
			}
			awardList.add(
					new Object[] { type, isActive ? GoodPolicyHasGiftConst.ACTIVE : GoodPolicyHasGiftConst.NO_ACTIVE,
							model.getParameter(), objArrayList.toArray() });
		}
		int totalRecharge = goodPolicyHasGift.getTotalRecharge();
		GoodPolicyHasGiftSender.sendCmd_9950(hero.getId(), awardList.toArray(), totalRecharge);
	}

	public void active(Hero hero, int type) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.GOODPOLICYHASGIFT)) {
				return;
			}
			GoodPolicyHasGift goodPolicyHasGift = GoodPolicyHasGiftFunction.getIns().getModel(hero);
			Struct_qcyljh_327 struct_qcyljh_327 = GoodPolicyHasGiftSysCache.getActiveConfigMap()
					.get(goodPolicyHasGift.getQs()).get(type);
			if (struct_qcyljh_327 == null) {
				return;
			}
			Map<Integer, GoodPolicyHasGiftModel> taskMap = goodPolicyHasGift.getTaskMap();
			GoodPolicyHasGiftModel model = Optional.ofNullable(taskMap).map(map -> map.get(type)).orElseGet(() -> {
				GoodPolicyHasGiftModel newModel = new GoodPolicyHasGiftModel();
				newModel.setAwardStateMap(new HashMap<>());
				return newModel;
			});
			if (model.isActive()) {
				GoodPolicyHasGiftSender.sendCmd_9952(hero.getId(), GoodPolicyHasGiftConst.FAILURE_NOT_REP, type);
				return;
			}
			int rmb = struct_qcyljh_327.getRmb();
			int totalRecharge = goodPolicyHasGift.getTotalRecharge();
			if (totalRecharge < rmb) {
				GoodPolicyHasGiftSender.sendCmd_9952(hero.getId(), GoodPolicyHasGiftConst.FAILURE_NOT_REACH, type);
				return;
			}
			model.setActive(true);
			taskMap.put(type, model);
			GoodPolicyHasGiftSender.sendCmd_9952(hero.getId(), GoodPolicyHasGiftConst.SUCCESS, type);
			openUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "GoodPolicyHasGiftManager active type:" + type);
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.GOODPOLICYHASGIFT)) {
				return;
			}
			Struct_qcylrw_327 struct_qcylrw_327 = Config_qcylrw_327.getIns().get(awardId);
			if (struct_qcylrw_327 == null) {
				GoodPolicyHasGiftSender.sendCmd_9954(hero.getId(), GoodPolicyHasGiftConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			GoodPolicyHasGift goodPolicyHasGift = GoodPolicyHasGiftFunction.getIns().getModel(hero);
			Map<Integer, GoodPolicyHasGiftModel> taskMap = goodPolicyHasGift.getTaskMap();
			int type = struct_qcylrw_327.getLeixing();
			GoodPolicyHasGiftModel model = Optional.ofNullable(taskMap).map(map -> map.get(type))
					.orElse(GoodPolicyHasGiftConst.DEFAULT_MODEL);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			Byte state = null;
			if (!model.isActive() || (state = awardStateMap.get(awardId)) == null) {
				// 未激活或满足条件
				GoodPolicyHasGiftSender.sendCmd_9954(hero.getId(), GoodPolicyHasGiftConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == GoodPolicyHasGiftConst.GETTED) {
				GoodPolicyHasGiftSender.sendCmd_9954(hero.getId(), GoodPolicyHasGiftConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, GoodPolicyHasGiftConst.GETTED);
			int[][] reward = struct_qcylrw_327.getPutong();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.GOODPOLICYHASGIFT_REWARD, UseAddUtil.getDefaultMail(), true);
			GoodPolicyHasGiftSender.sendCmd_9954(hero.getId(), GoodPolicyHasGiftConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"GoodPolicyHasGiftManager getAward awardId:" + awardId);
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
		GoodPolicyHasGiftFunction.getIns().rechargeHandler(hero, 0, 0);
		// 异兽送礼任务初始化
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QICE)) {
			return;
		}
		// 运筹帷幄_奇策有礼 奇策激活
		GoodPolicyHasGiftFunction.getIns().taskHandler(hero, 1);
		// 运筹帷幄_奇策有礼 奇策进阶
		GoodPolicyHasGiftFunction.getIns().taskHandler(hero, 2);
		// 运筹帷幄_奇策有礼 奇策战力
		GoodPolicyHasGiftFunction.getIns().taskHandler(hero, 3);
		// 运筹帷幄_奇策有礼 奇策星数
		GoodPolicyHasGiftFunction.getIns().taskHandler(hero, 4);
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
			GoodPolicyHasGift goodPolicyHasGift = (GoodPolicyHasGift) GoodPolicyHasGiftManager.getIns()
					.getSystemModel(hero, uid);

			Map<Integer, GoodPolicyHasGiftModel> taskMap = goodPolicyHasGift.getTaskMap();
			for (Entry<Integer, GoodPolicyHasGiftModel> entry : taskMap.entrySet()) {
				GoodPolicyHasGiftModel model = entry.getValue();
				if (!model.isActive()) {
					continue;
				}
				Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
				if (awardStateMap == null) {
					continue;
				}
				for (Entry<Integer, Byte> awardStateEntry : awardStateMap.entrySet()) {
					Byte state = awardStateEntry.getValue();
					if (state == GoodPolicyHasGiftConst.CAN_GET) {
						configId = awardStateEntry.getKey();
						Struct_qcylrw_327 struct_qcylrw_327 = Config_qcylrw_327.getIns().get(configId);
						int[][] reward = struct_qcylrw_327.getPutong();
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.GOODPOLICYHASGIFT_REWARD,
								new Object[] { MailConst.GOODPOLICYHASGIFT_REWARD }, reward);
						awardStateEntry.setValue(GoodPolicyHasGiftConst.GETTED);
					}
				}
			}

		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"GoodPolicyHasGiftManager handleEnd configId:" + configId);
		}

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		// TODO Auto-generated method stub
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		GoodPolicyHasGift model = (GoodPolicyHasGift) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (model == null) {
			model = new GoodPolicyHasGift();
			model.setTaskMap(new HashMap<>());
			model.setTotalRecharge(hero.getOneDayRecharge());
		}
		return model;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return GoodPolicyHasGift.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return GoodPolicyHasGiftEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		GoodPolicyHasGiftFunction.getIns().rechargeHandler(hero, money, product_id);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
