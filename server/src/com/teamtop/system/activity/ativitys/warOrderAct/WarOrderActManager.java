package com.teamtop.system.activity.ativitys.warOrderAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.warOrderAct.model.WarOrderAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_sgzljin_332;
import excel.config.Config_sgzljl_332;
import excel.config.Config_sgzlshop_332;
import excel.struct.Struct_sgzljin_332;
import excel.struct.Struct_sgzljl_332;
import excel.struct.Struct_sgzlrw_332;
import excel.struct.Struct_sgzlshop_332;

public class WarOrderActManager extends AbstractActivityManager {

	private static WarOrderActManager ins;

	private WarOrderActManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderActManager getIns() {
		if (ins == null) {
			ins = new WarOrderActManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			List<Object[]> sendData = new ArrayList<>();
			List<Object[]> sendData1 = new ArrayList<>();
			WarOrderActFunction.getIns().checkALLTask(hero);// ??????????????????
			WarOrderActFunction.getIns().updateLevel(hero);
			int periods = model.getPeriods();
			Map<Integer, Map<Integer, Struct_sgzljl_332>> OrderMap = WarOrderActSysCache.getWarOrderMap(periods);
			Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
			Iterator<Integer> iterator = OrderMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer warOrderState = iterator.next();
				Map<Integer, Struct_sgzljl_332> map = OrderMap.get(warOrderState);
				Iterator<Integer> iterator2 = map.keySet().iterator();
				while (iterator2.hasNext()) {
					Integer level = iterator2.next();
					Map<Integer, Integer> heroWarOrderMap = warOrderMap.get(warOrderState);
					Integer state = heroWarOrderMap.get(level);
					if (state == null) {
						state = 0;
						heroWarOrderMap.put(level, state);
					}
					sendData1.add(new Object[] { level, state });// ?????? ????????????
				}
				sendData.add(new Object[] { warOrderState, sendData1.toArray() });// ????????????
			}
			int buyState = model.getBuyState();
			int level = model.getLevel();
			int exp = model.getExp();
			WarOrderActSender.sendCmd_10400(hid, sendData.toArray(), buyState, level, exp);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActManager.class, hid, hero.getName(), "WarOrderActManager openUI");
		}
	}

	/**
	 * ??????????????????
	 * 
	 * @param hero
	 * @param type
	 *            ????????????
	 * @param level
	 *            ????????????
	 * @param getState
	 *            ???????????? 0???????????? 1????????????
	 */
	public void getWarOrderReward(Hero hero, int type, int level, int getState) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			int periods = model.getPeriods();
			if (getState == 1) {
				// ????????????
				Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
				int buyState = model.getBuyState();
				int orderLevel = model.getLevel();
				boolean isGet = false;
				Iterator<Integer> iterator = warOrderMap.keySet().iterator();
				while (iterator.hasNext()) {
					int warOrderSatate = iterator.next();
					Map<Integer, Integer> map = warOrderMap.get(warOrderSatate);
					Iterator<Integer> iterator2 = map.keySet().iterator();
					while (iterator2.hasNext()) {
						int warOrderLevel = iterator2.next();
						Map<Integer, Map<Integer, Struct_sgzljl_332>> typeSgzljlMap = WarOrderActSysCache
								.getWarOrderMap(periods);
						Map<Integer, Struct_sgzljl_332> map2 = typeSgzljlMap.get(warOrderSatate);
						Struct_sgzljl_332 struct_sgzljl_332 = map2.get(warOrderLevel);
						if (warOrderLevel > orderLevel) {
							break;
						}
						int state1 = map.get(warOrderLevel);
						if (state1 == WarOrderActConst.CAN_GET) {
							if (warOrderSatate == 0) {
								if (!UseAddUtil.canAdd(hero, struct_sgzljl_332.getPutong(), false)) {
									return;
								}
								UseAddUtil.add(hero, struct_sgzljl_332.getPutong(),
										SourceGoodConst.WARORDER_REWARD, UseAddUtil.getDefaultMail(), true);
								isGet = true;
								map.put(warOrderLevel, WarOrderActConst.ALREADY_GET);
							} else if (warOrderSatate == 1 && buyState == WarOrderActConst.BUY) {
								// ??????????????????
								if (!UseAddUtil.canAdd(hero, struct_sgzljl_332.getJinjie(), false)) {
									return;
								}
								UseAddUtil.add(hero, struct_sgzljl_332.getJinjie(),
										SourceGoodConst.WARORDER_REWARD, UseAddUtil.getDefaultMail(), true);
								isGet = true;
								map.put(warOrderLevel, WarOrderActConst.ALREADY_GET);
							}
						}
					}
				}
				if (!isGet) {
					// ????????????????????????
					WarOrderActSender.sendCmd_10402(hid, 2, getState, type, level);
					return;
				}
				WarOrderActSender.sendCmd_10402(hid, 3, getState, type, level);
				// openUI(hero);
				return;
			} else if (getState == 0) {
				// ????????????
				Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
				if (type > model.getBuyState()) {
					// ????????????????????????????????????
					WarOrderActSender.sendCmd_10402(hid, 0, getState, type, level);
					return;
				}
				Map<Integer, Integer> map = warOrderMap.get(type);
				Integer orderState = map.get(level);
				if (orderState != WarOrderActConst.CAN_GET) {
					// ???????????????????????????
					WarOrderActSender.sendCmd_10402(hid, 1, getState, type, level);
					return;
				}
				Map<Integer, Map<Integer, Struct_sgzljl_332>> typeSgzljlMap = WarOrderActSysCache
						.getWarOrderMap(periods);
				Map<Integer, Struct_sgzljl_332> map2 = typeSgzljlMap.get(type);
				Struct_sgzljl_332 sgzljl_332 = map2.get(level);
				int[][] reward = null;
				if (type == 0) {
					reward = sgzljl_332.getPutong();
				} else if (type == 1) {
					reward = sgzljl_332.getJinjie();
				}
				if (!UseAddUtil.canAdd(hero, reward, false)) {
					return;
				}
				UseAddUtil.add(hero, reward, SourceGoodConst.WARORDER_REWARD, UseAddUtil.getDefaultMail(), true);
				map.put(level, WarOrderActConst.ALREADY_GET);
				WarOrderActSender.sendCmd_10402(hid, 3, getState, type, level);
				// openUI(hero);
				WarOrderActFunction.getIns().updateRedPoint(hero);
			} else {
				// ?????????
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderActManager.class, hid, hero.getName(),
					"WarOrderActManager getReward, level=" + level);
		}
	}

	public void openTaskUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> activeMap = model.getActiveMap();
			int periods = model.getPeriods();
			Map<Integer, Map<Integer, Struct_sgzlrw_332>> typeTaskMap = WarOrderActSysCache
					.getTypeTaskMap(periods);
			Iterator<Integer> iterator = typeTaskMap.keySet().iterator();
			int type = 0;
			Integer typeNum = 0;
			Map<Integer, Integer> stateMap = null;
			Map<Integer, Struct_sgzlrw_332> taskMap = null;
			Iterator<Struct_sgzlrw_332> iterator2 = null;
			Struct_sgzlrw_332 sgzlrw_332 = null;
			int id = 0;
			Integer state = 0;
			List<Object[]> taskData = new ArrayList<>();
			WarOrderActFunction.getIns().checkALLTask(hero); // ??????????????????
			for (; iterator.hasNext();) {
				type = iterator.next();
				typeNum = activeMap.get(type);
				if (typeNum == null) {
					typeNum = 0;
				}
				stateMap = rewardMap.get(type);
				List<Object[]> taskList = new ArrayList<>();
				taskMap = typeTaskMap.get(type);
				iterator2 = taskMap.values().iterator();
				for (; iterator2.hasNext();) {
					state = 0;
					sgzlrw_332 = iterator2.next();
					id = sgzlrw_332.getId();
					if (stateMap != null) {
						state = stateMap.get(id);
					}
					if (state == null) {
						// continue;
						state = 0;
					}
					taskList.add(new Object[] { id, state });// ??????id ????????????
				}
				taskData.add(new Object[] { type, typeNum, taskList.toArray() });// ???????????? ?????????
			}
			WarOrderActSender.sendCmd_10404(hid, taskData.toArray());
		} catch (Exception e) {
			LogTool.error(e, WarOrderActManager.class, hid, hero.getName(), "WarOrderActManager openUI");
		}
	}

	/**
	 * ??????????????????
	 * 
	 * @param hero
	 * @param type
	 * @param taskId
	 */
	public void getReward(Hero hero, int type, int taskId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			int periods = model.getPeriods();
			Map<Integer, Struct_sgzlrw_332> taskMap = WarOrderActSysCache.getTypeTaskMap(periods).get(type);
			if (!taskMap.containsKey(taskId)) {
				// ????????????id
				return;
			}
			Struct_sgzlrw_332 sgzlrw_332 = taskMap.get(taskId);
			int id = sgzlrw_332.getId();
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> stateMap = rewardMap.get(type);
			if (!stateMap.containsKey(id)) {
				// if (stateMap.get(taskId) == WarOrderActConst.CANNOT_GET) {
				// ???????????????
				WarOrderActSender.sendCmd_10406(hid, 0, 1, 0, model.getLevel(), model.getExp());
				return;
			}
			Integer state = stateMap.get(id);
			if (state == WarOrderActConst.ALREADY_GET) {
				// ?????????
				WarOrderActSender.sendCmd_10406(hid, 0, 2, 0, model.getLevel(), model.getExp());
				return;
			}
			stateMap.put(id, WarOrderActConst.ALREADY_GET);
			int[][] reward = sgzlrw_332.getPutong();
			UseAddUtil.add(hero, reward, SourceGoodConst.WARORDER_TASKREWARD, UseAddUtil.getDefaultMail(), true);
			WarOrderActFunction.getIns().updateLevel(hero);// ?????????????????????
			WarOrderActFunction.getIns().checkALLTask(hero);// ??????????????????
			WarOrderActSender.sendCmd_10406(hid, 1, type, taskId, model.getLevel(), model.getExp());
			WarOrderActFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActManager.class, hid, hero.getName(),
					"WarOrderActManager getReward, taskId=" + taskId);
		}
	 }

	/**
	 * ??????????????????
	 * 
	 * @param hero
	 */
	public void openShopUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			Map<Integer, Integer> buyMap = model.getBuyMap();
			int periods = model.getPeriods();
			List<Struct_sgzlshop_332> list = Config_sgzlshop_332.getIns().getSortList();
			List<Object> shopList = new ArrayList<>();
			for (Struct_sgzlshop_332 sgzlshop_332 : list) {
				int qs = sgzlshop_332.getQs();
				if (periods != qs) {
					continue;
				}
				Integer num = buyMap.get(sgzlshop_332.getId());
				if (num == null) {
					num = 0;
					buyMap.put(sgzlshop_332.getId(), num);
				}
				shopList.add(new Object[] { sgzlshop_332.getId(), num });
			}
			int prop1 = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), WarOrderActConst.PROP_1);
			int prop2 = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), WarOrderActConst.PROP_2);
			WarOrderActSender.sendCmd_10408(hero.getId(), shopList.toArray(), prop1, prop2);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActManager.class, hid, hero.getName(), "WarOrderActManager openShopUI");
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
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			Struct_sgzlshop_332 struct_sgzlshop_332 = Config_sgzlshop_332.getIns().get(id);
			if (struct_sgzlshop_332 == null) {
				WarOrderActSender.sendCmd_10410(hero.getId(), 0, id);
				return;
			}
			Map<Integer, Integer> buyMap = model.getBuyMap();
			Integer num = buyMap.get(id);
			int time = struct_sgzlshop_332.getTime();
			if (time > 0 && num >= time) {
				// ??????????????????
				WarOrderActSender.sendCmd_10410(hero.getId(), 3, id);
				return;
			}
			int[][] money = struct_sgzlshop_332.getMoney();
			if (!UseAddUtil.canUse(hero, money)) {
				// ????????????
				WarOrderActSender.sendCmd_10410(hero.getId(), 2, id);
				return;
			}
			buyMap.put(id, num + 1);// ???????????????1
			int[][] item = struct_sgzlshop_332.getItem();
			// ??????
			UseAddUtil.use(hero, money, SourceGoodConst.WARORDERSHOP_BUY, true);
			// ????????????
			UseAddUtil.add(hero, item, SourceGoodConst.WARORDERSHOP_BUYITEM, UseAddUtil.getDefaultMail(), true);
			WarOrderActSender.sendCmd_10410(hero.getId(), 1, id);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, WarOrderActManager.class, hid, hero.getName(), "buy id:" + id);
		}
	}


	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER_ACT)) {
				return;
			}
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			int periods = model.getPeriods();
			for (Struct_sgzljin_332 sgzljin_332 : Config_sgzljin_332.getIns().getMap().values()) {
				int shangpin = sgzljin_332.getShangpin();
				int qs = sgzljin_332.getQs();
				if (periods != qs) {
					continue;
				}
				if (shangpin == product_id) {
					// ??????
					if (model.getBuyState() == WarOrderActConst.BUY) {
						// ?????????
						break;
					}
					model.setBuyState(WarOrderActConst.BUY);
					int level = model.getLevel();
					Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
					Map<Integer, Integer> map = warOrderMap.get(WarOrderActConst.BUY);// ??????????????????
					for (int i = 1; i <= level; i++) {
						map.put(i, WarOrderActConst.CAN_GET);// ????????????????????????????????????????????????
					}
					int[][] jinjie = sgzljin_332.getJinjie();
					UseAddUtil.add(hero, jinjie, SourceGoodConst.WARORDER, UseAddUtil.getDefaultMail(), true); // ????????????
				}
			}
			// ????????????
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_10, money);
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_15, money);
			openUI(hero);
			openTaskUI(hero);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActManager.class, hid, hero.getName(), "WarOrderActManager rechargeHandle");
		}
	}


	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		int oneDayRecharge = hero.getOneDayRecharge();// ????????????
		// ????????????
		WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_10, oneDayRecharge);
		WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_15, oneDayRecharge);
		int oneDayConsume = hero.getOneDayConsume();// ????????????
		// ????????????
		WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_14, oneDayConsume);

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			WarOrderAct model = (WarOrderAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER_ACT);
			int buyState = model.getBuyState();
			int periods = model.getPeriods();
			Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
			List<int[]> dropArr = new ArrayList<>();
			Iterator<Integer> iterator = warOrderMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer type = iterator.next();
				if (buyState < type) {
					// ?????????????????????
					break;
				}
				Map<Integer, Integer> map = warOrderMap.get(type);
				Iterator<Integer> iterator2 = map.keySet().iterator();
				while (iterator2.hasNext()) {
					Integer level = iterator2.next();
					Map<Integer, Map<Integer, Struct_sgzljl_332>> warOrder = WarOrderActSysCache
							.getWarOrderMap(periods);
					Map<Integer, Struct_sgzljl_332> sgzljlMap = warOrder.get(type);
					Struct_sgzljl_332 struct_sgzljl_332 = sgzljlMap.get(level);
					Integer state = map.get(level);
					if (state != WarOrderActConst.CAN_GET) {
						continue;
					}
					if (type == 0) {
						int[][] putong = struct_sgzljl_332.getPutong();
						for (int i = 0; i < putong.length; i++) {
							dropArr.add(putong[i]);
						}
						map.put(level, WarOrderActConst.ALREADY_GET);
						warOrderMap.put(0, map);
					} else if (type == WarOrderActConst.BUY) {
						int[][] jinjie = struct_sgzljl_332.getJinjie();
						for (int i = 0; i < jinjie.length; i++) {
							dropArr.add(jinjie[i]);
						}
						map.put(level, WarOrderActConst.ALREADY_GET);
						warOrderMap.put(WarOrderActConst.BUY, map);
					}
				}
			}
			if (dropArr.size() == 0) {
				return;
			}
			int[][] drops = new int[dropArr.size()][];
			int[][] reward = dropArr.toArray(drops);
			int mailId = MailConst.WARORDER_AWARD;
			if (reward != null) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId, new Object[] { mailId }, reward);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, WarOrderActManager.class, hid, hero.getName(), "WarOrderActManager handleEnd");
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		WarOrderAct data = new WarOrderAct(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		Map<Integer, Integer> activeMap = new HashMap<>();
		Map<Integer, Map<Integer, Integer>> rewardMap = new HashMap<>();
		int periods = data.getPeriods();
		Iterator<Integer> iterator = WarOrderActSysCache.getTypeTaskMap(periods).keySet().iterator();
		int type = 0;
		for (; iterator.hasNext();) {
			type = iterator.next();
			Map<Integer, Integer> map0 = new HashMap<>();
			rewardMap.put(type, map0);
		}
		Map<Integer, Map<Integer, Integer>> warOrderMap = new HashMap<>();
		Map<Integer, Integer> map = new HashMap<>();
		Map<Integer, Integer> map1 = new HashMap<>();
		warOrderMap.put(0, map);// ????????????
		warOrderMap.put(WarOrderActConst.BUY, map1);// ????????????
		for (Struct_sgzljl_332 sgzljl_332 : Config_sgzljl_332.getIns().getMap().values()) {
			if (sgzljl_332.getQs() != periods) {
				continue;
			}
			map.put(sgzljl_332.getDengji(), WarOrderActConst.CANNOT_GET);
			map1.put(sgzljl_332.getDengji(), WarOrderActConst.CANNOT_GET);
		}
		Map<Integer, Integer> loginDayMap = new HashMap<>();
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (loginDayMap.get(betweenOpen) == null) {
			loginDayMap.put(betweenOpen, 0);
		}
		Map<Integer, Integer> buyMap = new HashMap<>();
		for (Struct_sgzlshop_332 sgzlshop_332 : Config_sgzlshop_332.getIns().getSortList()) {
			if (periods != sgzlshop_332.getQs()) {
				continue;
			}
			int id = sgzlshop_332.getId();
			buyMap.put(id, 0);
		}
		data.setLoginDay(loginDayMap);
		data.setActiveMap(activeMap);
		data.setRewardMap(rewardMap);
		data.setWarOrderMap(warOrderMap);
		data.setBuyMap(buyMap);
		return data;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return WarOrderAct.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return WarOrderActSysEvent.getIns();
	}

}
