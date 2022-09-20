package com.teamtop.system.openDaysSystem.specialAnimalSendGift;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.specialAnimalSendGift.model.SpecialAnimalSendGift;
import com.teamtop.system.openDaysSystem.specialAnimalSendGift.model.SpecialAnimalSendGiftModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_ysslrw_018;

public class SpecialAnimalSendGiftFunction {
	private static volatile SpecialAnimalSendGiftFunction ins = null;

	public static SpecialAnimalSendGiftFunction getIns() {
		if (ins == null) {
			synchronized (SpecialAnimalSendGiftFunction.class) {
				if (ins == null) {
					ins = new SpecialAnimalSendGiftFunction();
				}
			}
		}
		return ins;
	}

	private SpecialAnimalSendGiftFunction() {
	}

	/**
	 * 取得万兽之王-连充豪礼model
	 * 
	 * @param hero
	 * @return
	 */
	public SpecialAnimalSendGift getModel(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SPECIALANIMALDIR_SENDGIFT);
		SpecialAnimalSendGift model = (SpecialAnimalSendGift) SpecialAnimalSendGiftManager.getIns().getSystemModel(hero,
				uid);
		return model;
	}

	/**
	 * 充值处理
	 * 
	 * @param hero
	 * @param money
	 * @param product_id
	 */
	public void rechargeHandler(Hero hero, int money, int product_id) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				try {
					//  当天版本更新前玩家进行了充值，版本更新后，要计算当天已充值的金额（若活动正好当天开启）；
					if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.SPECIALANIMALDIR_SENDGIFT)) {
						return;
					}
					SpecialAnimalSendGift specialAnimalSendGift = getModel(hero);
					int totalRecharge = specialAnimalSendGift.getTotalRecharge();
					specialAnimalSendGift.setTotalRecharge(totalRecharge + money);
				} catch (Exception e) {
					// TODO: handle exception
					LogTool.error(e, this, hero.getId(), hero.getName(),
							"rechargeHandler money:" + money + " product_id:" + product_id);
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return hero.getId();
			}
		});
	}

	/**
	 * 任务处理
	 * 
	 * @param hero
	 * @param type
	 * @param add
	 * @param parameter
	 */
	public void taskHandler(Hero hero, int type, int add, int parameter) {
		int qs = 0;
		try {
			if (add == 0 && parameter == 0) {
				return;
			}
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SPECIALANIMALDIR_SENDGIFT)) {
				return;
			}
			SpecialAnimalSendGift specialAnimalSendGift = getModel(hero);
			Map<Integer, SpecialAnimalSendGiftModel> taskMap = specialAnimalSendGift.getTaskMap();
			SpecialAnimalSendGiftModel model = taskMap.get(type);
			if (model == null) {
				model = new SpecialAnimalSendGiftModel();
				model.setAwardStateMap(new HashMap<>());
				taskMap.put(type, model);
			}
			int newParameter = 0;
			if (type == 3) {
				newParameter = parameter;
			} else {
				newParameter = model.getParameter() + add + parameter;
			}
			model.setParameter(newParameter);
			qs = specialAnimalSendGift.getQs();
			Map<Integer, Struct_ysslrw_018> map = SpecialAnimalSendGiftSysCache.getTaskConfigMap().get(qs).get(type);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			boolean flag = false;
			for (Struct_ysslrw_018 struct_ysslrw_018 : map.values()) {
				if (newParameter >= struct_ysslrw_018.getCanshu()) {
					int id = struct_ysslrw_018.getId();
					if (awardStateMap.get(id) == null) {
						awardStateMap.put(id, SpecialAnimalSendGiftConst.CAN_GET);
						flag = true;
					}
				} else {
					break;
				}
			}

			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SPECIALANIMALDIR_SENDGIFT)) {
				return;
			}
			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SPECIALANIMALDIR_SENDGIFT, 1,
						RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"taskHandler type:" + type + " add:" + add + " parameter:" + parameter + " qs:" + qs);
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SPECIALANIMALDIR_SENDGIFT)) {
			return;
		}
		SpecialAnimalSendGift specialAnimalSendGift = getModel(hero);
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
					if (isLogin) {
						RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MONSTER_KING, 1,
								RedPointConst.HAS_RED);
						RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SPECIALANIMALDIR_SENDGIFT, 1,
								RedPointConst.HAS_RED);
						break;
					} else {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING, 1,
								RedPointConst.HAS_RED);
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SPECIALANIMALDIR_SENDGIFT, 1,
								RedPointConst.HAS_RED);
						break;
					}
				}
			}
		}
	}

}
