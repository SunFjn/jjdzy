package com.teamtop.system.openDaysSystem.goodPolicyHasGift;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.goodPolicyHasGift.model.GoodPolicyHasGift;
import com.teamtop.system.openDaysSystem.goodPolicyHasGift.model.GoodPolicyHasGiftModel;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.qice.model.QiCeModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_qcyljh_327;
import excel.struct.Struct_qcylrw_327;

public class GoodPolicyHasGiftFunction {
	private static volatile GoodPolicyHasGiftFunction ins = null;

	public static GoodPolicyHasGiftFunction getIns() {
		if (ins == null) {
			synchronized (GoodPolicyHasGiftFunction.class) {
				if (ins == null) {
					ins = new GoodPolicyHasGiftFunction();
				}
			}
		}
		return ins;
	}

	private GoodPolicyHasGiftFunction() {
	}

	/**
	 * 取得运筹帷幄_奇策有礼model
	 * 
	 * @param hero
	 * @return
	 */
	public GoodPolicyHasGift getModel(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.GOODPOLICYHASGIFT);
		GoodPolicyHasGift model = (GoodPolicyHasGift) GoodPolicyHasGiftManager.getIns().getSystemModel(hero, uid);
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
					if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.GOODPOLICYHASGIFT)) {
						return;
					}
					GoodPolicyHasGift goodPolicyHasGift = getModel(hero);
					int totalRecharge = goodPolicyHasGift.getTotalRecharge();
					goodPolicyHasGift.setTotalRecharge(totalRecharge + money);
					Map<Integer, Struct_qcyljh_327> map = GoodPolicyHasGiftSysCache.getActiveConfigMap()
							.get(goodPolicyHasGift.getQs());
					for (Struct_qcyljh_327 struct_qcyljh_327 : map.values()) {
						int newTotalRecharge = goodPolicyHasGift.getTotalRecharge();
						int rmb = struct_qcyljh_327.getRmb();
						if (newTotalRecharge >= rmb) {
							RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.YUNCHOUWEIWO, 1,
									RedPointConst.HAS_RED);
							RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GOODPOLICYHASGIFT, 1,
									RedPointConst.HAS_RED);
							break;
						}

					}

				} catch (Exception e) {
					// TODO: handle exception
					LogTool.error(e, this, hero.getId(), hero.getName(),
							"GoodPolicyHasGiftFunction rechargeHandler money:" + money + " product_id:" + product_id);
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
	public void taskHandler(Hero hero, int type) {
		int qs = 0;
		int oldParameter = 0;
		int newParameter = 0;
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.GOODPOLICYHASGIFT)) {
				return;
			}
			GoodPolicyHasGift goodPolicyHasGift = getModel(hero);
			Map<Integer, GoodPolicyHasGiftModel> taskMap = goodPolicyHasGift.getTaskMap();
			GoodPolicyHasGiftModel model = taskMap.get(type);
			if (model == null) {
				model = new GoodPolicyHasGiftModel();
				model.setAwardStateMap(new HashMap<>());
				taskMap.put(type, model);
			}
			oldParameter = model.getParameter();
			qs = goodPolicyHasGift.getQs();
			if (qs == 0) {
				LogTool.warn("GoodPolicyHasGiftFunction taskHandler type:" + type + " oldParameter:" + oldParameter
						+ " qs:" + qs, this);
				return;
			}
			newParameter = getParameter(hero, type);
			if (newParameter == 0 && oldParameter == 0) {
				return;
			}
			if (newParameter < oldParameter) {
				LogTool.warn("GoodPolicyHasGiftFunction taskHandler newParameter < oldParameter type:" + type
						+ " oldParameter:" + oldParameter + "newParameter:" + newParameter + " qs:" + qs, this);
			}
			model.setParameter(newParameter);
			Map<Integer, Struct_qcylrw_327> map = GoodPolicyHasGiftSysCache.getTaskConfigMap().get(qs).get(type);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			boolean flag = false;
			for (Struct_qcylrw_327 struct_qcylrw_327 : map.values()) {
				int id = struct_qcylrw_327.getId();
				if (newParameter >= struct_qcylrw_327.getCanshu() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, GoodPolicyHasGiftConst.CAN_GET);
					flag = true;
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.YUNCHOUWEIWO, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GOODPOLICYHASGIFT, 1,
						RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "GoodPolicyHasGiftFunction taskHandler type:" + type
					+ " oldParameter:" + oldParameter + "newParameter:" + newParameter + " qs:" + qs);
		}
	}

	public int getParameter(Hero hero, int type) {
		QiCe qiCe = hero.getQiCe();
		if (type == 3) {
			return (int) qiCe.getStrength();
		}
		int parameter = 0;
		HashMap<Integer, QiCeModel> qiCeMap = qiCe.getQiCeMap();
		for (QiCeModel model : qiCeMap.values()) {
			if (type == 1) {
				parameter++;
			} else if (type == 2) {
				parameter += model.getJieLv() / 10;
			} else if (type == 4) {
				parameter += model.getStar();
			}
		}
		return parameter;
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.GOODPOLICYHASGIFT)) {
			return;
		}
		GoodPolicyHasGift goodPolicyHasGift = getModel(hero);
		Map<Integer, GoodPolicyHasGiftModel> taskMap = goodPolicyHasGift.getTaskMap();
		boolean isRedPoint = false;
		for (Entry<Integer, GoodPolicyHasGiftModel> entry : taskMap.entrySet()) {
			GoodPolicyHasGiftModel model = entry.getValue();
			if (!model.isActive()) {
				Integer type = entry.getKey();
				Struct_qcyljh_327 struct_qcyljh_327 = GoodPolicyHasGiftSysCache.getActiveConfigMap()
						.get(goodPolicyHasGift.getQs()).get(type);
				int totalRecharge = goodPolicyHasGift.getTotalRecharge();
				int rmb = struct_qcyljh_327.getRmb();
				if (totalRecharge >= rmb) {
					isRedPoint = true;
					break;
				}
				continue;
			}
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			if (awardStateMap == null) {
				continue;
			}
			for (Entry<Integer, Byte> awardStateEntry : awardStateMap.entrySet()) {
				Byte state = awardStateEntry.getValue();
				if (state == GoodPolicyHasGiftConst.CAN_GET) {
					isRedPoint = true;
					break;
				}
			}
			if (isRedPoint) {
				break;
			}
		}
		if (isRedPoint) {
			if (isLogin) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.YUNCHOUWEIWO, 1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.GOODPOLICYHASGIFT, 1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.YUNCHOUWEIWO, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GOODPOLICYHASGIFT, 1,
						RedPointConst.HAS_RED);
			}
		}
	}

}
