package com.teamtop.system.activity.ativitys.holidayMall;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_jrscspb_334;
import excel.config.Config_jrscsxb_334;
import excel.config.Config_jrsczkb_334;
import excel.struct.Struct_jrscspb_334;
import excel.struct.Struct_jrscsxb_334;
import excel.struct.Struct_jrscybb_334;
import excel.struct.Struct_jrsczkb_334;

public class HolidayMallManager extends AbstractActivityManager {
	private static volatile HolidayMallManager ins = null;

	public static HolidayMallManager getIns() {
		if (ins == null) {
			synchronized (HolidayMallManager.class) {
				if (ins == null) {
					ins = new HolidayMallManager();
				}
			}
		}
		return ins;
	}

	private HolidayMallManager() {
	}


	@Override
	public void actOpen() {
	}

	@Override
	public void heroActOpen(Hero hero) {
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HolidayMall model = new HolidayMall();
		model.setItemInfoMap(new HashMap<>());
		model.setPeriods(activityInfo.getPeriods());
		model.setHid(hero.getId());
		model.setActId(activityInfo.getActId());
		model.setIndexId(activityInfo.getIndex());
		Struct_jrscsxb_334 struct_jrscsxb_334 = Config_jrscsxb_334.getIns().get(model.getPeriods());
		int sx = struct_jrscsxb_334.getSx();
		model.setRefreshTimes(sx);// ??????????????????
		model.setTimes(1);// ??????????????????
		model.setCountTimes(1);
		int periods = model.getPeriods();
		Map<Integer, Integer> itemInfoMap = model.getItemInfoMap();
		Map<Integer, Struct_jrscspb_334> qsShopMap = HolidayMallCache.getQsShopMap(periods);
		int size = qsShopMap.size();
		int num = struct_jrscsxb_334.getXs();
		if (num > size) {
			num = size;
		}
		List<Integer> multiRandomNumInArea = RandomUtil.getMultiRandomNumInArea(1, size, num);
		for (Integer index : multiRandomNumInArea) {
			Struct_jrscspb_334 struct_jrscspb_334 = qsShopMap.get(periods * 1000 + index);
			if (struct_jrscspb_334 == null) {
				continue;
			}
			itemInfoMap.put(struct_jrscspb_334.getId(), 0);
		}
		ProbabilityEventModel pe = HolidayMallCache.getQsProMap(periods);
		Object eventByProbability = ProbabilityEventUtil.getEventByProbability(pe);
		Struct_jrsczkb_334 struct_jrsczkb_334 = Config_jrsczkb_334.getIns().get((int) eventByProbability);
		int id = struct_jrsczkb_334.getId();
		model.setCutDown(id);
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		return HolidayMall.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return HolidayMallEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HOLIDAY_MALL_ACT)) {
				return;
			}
			HolidayMall model = HolidayMallFunction.getIns().getModel(hero);
			List<Object[]> itemInfos = new ArrayList<>();
			for (Entry<Integer, Integer> entry : model.getItemInfoMap().entrySet()) {
				Integer cfgId = entry.getKey();
				Integer count = entry.getValue();
				itemInfos.add(new Object[] { cfgId, count });
			}
			int refreshTimes = model.getRefreshTimes();
			int times = model.getTimes();
			int prop1 = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), HolidayMallConst.PROP_1);
			int cutDown = model.getCutDown();
			int countTimes = model.getCountTimes();
			HolidayMallSender.sendCmd_10800(hero.getId(), itemInfos.toArray(), refreshTimes, times, prop1, cutDown,
					countTimes);
		} catch (Exception e) {
			LogTool.error(e, HolidayMallManager.class, hero.getId(), hero.getName(), "openUI fail");
		}
	}

	/**
	 * ??????????????????
	 * 
	 * @param hero
	 */
	public void refreshShopData(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HOLIDAY_MALL_ACT)) {
				return;
			}
			HolidayMall model = HolidayMallFunction.getIns().getModel(hero);
			Map<Integer, Integer> itemInfoMap = model.getItemInfoMap();
			// ???????????????
			int periods = model.getPeriods();
			Struct_jrscsxb_334 struct_jrscsxb_334 = Config_jrscsxb_334.getIns().get(periods);
			if (struct_jrscsxb_334 == null) {
				return;
			}
			int[][] cost = struct_jrscsxb_334.getSp();
			if (!UseAddUtil.canUse(hero, cost)) {
				// ????????????
				HolidayMallSender.sendCmd_10802(hero.getId(), 2);
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.HOLIDAY_MALL_REFRESH_SHOP, true);
			Map<Integer, Struct_jrscspb_334> qsShopMap = HolidayMallCache.getQsShopMap(periods);
			int size = qsShopMap.size();
			int num = struct_jrscsxb_334.getXs();
			if (num > size) {
				num = size;
			}
			itemInfoMap.clear();
			List<Integer> multiRandomNumInArea = RandomUtil.getMultiRandomNumInArea(1, size, num);
			for (Integer index : multiRandomNumInArea) {
				Struct_jrscspb_334 struct_jrscspb_334 = qsShopMap.get(periods * 1000 + index);
				if (struct_jrscspb_334 == null) {
					continue;
				}
				itemInfoMap.put(struct_jrscspb_334.getId(), 0);
			}
			ProbabilityEventModel pe = HolidayMallCache.getQsProMap(periods);
			Object eventByProbability = ProbabilityEventUtil.getEventByProbability(pe);// ????????????????????????
			Struct_jrsczkb_334 struct_jrsczkb_334 = Config_jrsczkb_334.getIns().get((int) eventByProbability);
			int id = struct_jrsczkb_334.getId();
			model.setCutDown(id);// ????????????
			model.setGl(0);// ????????????
			model.setCountTimes(1);// ?????????????????????1???
			// int sx = struct_jrscsxb_334.getSx();
			// model.setRefreshTimes(sx);// ????????????????????????
			openUI(hero);
			HolidayMallSender.sendCmd_10802(hero.getId(), 1);
		} catch (Exception e) {
			LogTool.error(e, HolidayMallManager.class, hero.getId(), hero.getName(), "refreshShopData fail");
		}
	}

	/**
	 * ????????????????????????
	 * 
	 * @param hero
	 */
	public void refreshCutDownData(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HOLIDAY_MALL_ACT)) {
				return;
			}
			HolidayMall model = HolidayMallFunction.getIns().getModel(hero);
			int times = model.getTimes();
			int periods = model.getPeriods();
			int refreshTimes = model.getRefreshTimes();
			Integer cutDown = model.getCutDown();
			Struct_jrscsxb_334 struct_jrscsxb_334 = Config_jrscsxb_334.getIns().get(periods);
			if (struct_jrscsxb_334 == null) {
				return;
			}
			if (refreshTimes <= 0) {
				// ????????????????????????
				HolidayMallSender.sendCmd_10804(hero.getId(), 4);
				return;
			}
			Struct_jrsczkb_334 excel = Config_jrsczkb_334.getIns().get(cutDown + 1);
			if (excel == null) {
				// ?????????????????????
				HolidayMallSender.sendCmd_10804(hero.getId(), 5);
				return;
			}
			Map<Integer, Struct_jrscybb_334> qsYuanBaoMap = HolidayMallCache.getQsYuanBaoMap(periods);
			int[][] cost;
			Struct_jrscybb_334 struct_jrscybb_334 = qsYuanBaoMap.get(model.getCountTimes());
			if (struct_jrscybb_334 != null) {
				// ?????????????????????????????????
				cost = struct_jrscybb_334.getJg();
			} else {
				// ?????????????????????????????????????????????
				int size = qsYuanBaoMap.size();
				Struct_jrscybb_334 struct_jrscybb_3342 = qsYuanBaoMap.get(size);
				cost = struct_jrscybb_3342.getJg();
			}
			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), HolidayMallConst.PROP_1);
			if (times > 0) {
				// ????????????
				model.setTimes(times - 1);
			} else if (canUseNum < 1) {
				// ????????????
				if (!UseAddUtil.canUse(hero, cost)) {
					// ????????????
					HolidayMallSender.sendCmd_10804(hero.getId(), 2);
					return;
				}
				UseAddUtil.use(hero, cost, SourceGoodConst.HOLIDAY_MALL_REFRESH_DATA, true);
				model.setRefreshTimes(refreshTimes - 1);
			} else {
				// ????????????
				if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, HolidayMallConst.PROP_1)) {
					// ????????????
					HolidayMallSender.sendCmd_10804(hero.getId(), 3);
					return;
				}
				UseAddUtil.use(hero, GameConst.TOOL, 1, HolidayMallConst.PROP_1,
						SourceGoodConst.HOLIDAY_MALL_REFRESH_DATA, true);
				model.setRefreshTimes(refreshTimes - 1);
			}
			model.setCountTimes(model.getCountTimes() + 1);
			Integer gl = model.getGl();
			Struct_jrsczkb_334 struct_jrsczkb_334 = Config_jrsczkb_334.getIns().get(cutDown);
			int cg = struct_jrsczkb_334.getCg();// ????????????
			int yz = struct_jrsczkb_334.getYz();
			int randomNumInAreas = RandomUtil.getRandomNumInAreas(0, 100000);
			if (cg < randomNumInAreas) {
				// ??????????????????
				int addyz = struct_jrsczkb_334.getAddyz();
				model.setGl(gl + addyz);
				if (model.getGl() >= yz) {
					// ????????????????????????
					model.setGl(0);// ????????????
					ProbabilityEventModel probabilityEventModel = new ProbabilityEventModel();
					for (int[] up : struct_jrsczkb_334.getTj()) {
						probabilityEventModel.addProbabilityEvent(up[1], up[0]);
					}
					int execlId = (int) ProbabilityEventUtil.getEventByProbability(probabilityEventModel);
					Struct_jrsczkb_334 struct_jrsczkb_3342 = Config_jrsczkb_334.getIns().get(execlId);
					if (struct_jrsczkb_3342 != null) {
						model.setCutDown(struct_jrsczkb_3342.getId());// ????????????
					}
				}
			} else {
				// ??????
				model.setGl(0);// ????????????
				ProbabilityEventModel probabilityEventModel = new ProbabilityEventModel();
				for (int[] up : struct_jrsczkb_334.getTj()) {
					probabilityEventModel.addProbabilityEvent(up[1], up[0]);
				}
				int execlId = (int) ProbabilityEventUtil.getEventByProbability(probabilityEventModel);
				Struct_jrsczkb_334 struct_jrsczkb_3342 = Config_jrsczkb_334.getIns().get(execlId);
				if (struct_jrsczkb_3342 != null) {
					model.setCutDown(struct_jrsczkb_3342.getId());// ????????????
				}
			}
			openUI(hero);
			HolidayMallSender.sendCmd_10804(hero.getId(), 1);
		} catch (Exception e) {
			LogTool.error(e, HolidayMallManager.class, hero.getId(), hero.getName(), "refreshCutDownData fail");
		}
	}

	/**
	 * ??????
	 * 
	 * @param hero
	 * @param id
	 *            ??????????????????id
	 */
	public void buy(Hero hero, int id) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HOLIDAY_MALL_ACT)) {
				return;
			}
			HolidayMall model = HolidayMallFunction.getIns().getModel(hero);
			Struct_jrscspb_334 struct_jrscspb_334 = Config_jrscspb_334.getIns().get(id);
			if (struct_jrscspb_334 == null) {
				// ???????????????
				HolidayMallSender.sendCmd_10806(hero.getId(), 4, id);
				return;
			}
			Map<Integer, Integer> itemInfoMap = model.getItemInfoMap();
			Integer num = itemInfoMap.get(id);
			int index = model.getCutDown();
			Struct_jrsczkb_334 struct_jrsczkb_334 = Config_jrsczkb_334.getIns().get(index);
			int zk = struct_jrsczkb_334.getZk();
			Double cutDown = zk / 1000d;
			int time = struct_jrscspb_334.getTime();
			if (time > 0 && num >= time) {
				// ??????????????????
				HolidayMallSender.sendCmd_10806(hero.getId(), 3, id);
				return;
			}
			int[][] yj = struct_jrscspb_334.getYj();
			int[][] money = CommonUtil.copyArrayAndNumCeil(yj, cutDown);
			if (!UseAddUtil.canUse(hero, money)) {
				// ????????????
				HolidayMallSender.sendCmd_10806(hero.getId(), 2, id);
				return;
			}
			itemInfoMap.put(id, num + 1);// ???????????????1
			int[][] item = struct_jrscspb_334.getDj();
			// ??????
			UseAddUtil.use(hero, money, SourceGoodConst.HOLIDAY_MALL_BUY, true);
			// ????????????
			UseAddUtil.add(hero, item, SourceGoodConst.HOLIDAY_MALL_BUYITEM, UseAddUtil.getDefaultMail(), true);
			HolidayMallSender.sendCmd_10806(hero.getId(), 1, id);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, HolidayMallManager.class, hid, hero.getName(), "buy id:" + id);
		}
	}

}
