package com.teamtop.system.activity.ativitys.warOrder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.warOrder.model.WarOrder;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_kssj1_338;
import excel.config.Config_kssjbuy1_338;
import excel.config.Config_xslday1_338;
import excel.config.Config_xsljh1_338;
import excel.config.Config_xslweek1_338;
import excel.struct.Struct_kssj1_338;
import excel.struct.Struct_kssjbuy1_338;
import excel.struct.Struct_xslday1_338;
import excel.struct.Struct_xsljh1_338;
import excel.struct.Struct_xslweek1_338;

public class WarOrderManager extends AbstractActivityManager {

	private static WarOrderManager ins;

	private WarOrderManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderManager getIns() {
		if (ins == null) {
			ins = new WarOrderManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER1)) {
				return;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER1);
			List<Object[]> sendData = new ArrayList<>();
			WarOrderFunction.getIns().checkALLTask(hero);// ??????????????????
			WarOrderFunction.getIns().updateLevel(hero, ActivitySysId.WARORDER1);
			int periods = model.getPeriods();
			Map<Integer, Map<Integer, Struct_kssj1_338>> OrderMap = WarOrderSysCache.getWarOrderMap(periods);
			Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
			Iterator<Integer> iterator = OrderMap.keySet().iterator();
			while (iterator.hasNext()) {
				List<Object[]> sendData1 = new ArrayList<>();
				Integer warOrderState = iterator.next();
				Map<Integer, Struct_kssj1_338> map = OrderMap.get(warOrderState);
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
			int buyNum = model.getBuyNum();
			WarOrderSender.sendCmd_12250(hid, sendData.toArray(), buyState, level, exp, buyNum,
					ActivitySysId.WARORDER1);
			WarOrderManagerNew.getIns().openUI(hero);
			WarOrderFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WarOrderManager.class, hid, hero.getName(), "WarOrderManager openUI");
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
	public void getWarOrderReward(Hero hero, int type, int level, int getState, int actId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, actId)) {
				return;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(actId);
			int periods = model.getPeriods();
			if (getState == 1) {
				// ????????????
				int[][] maxReward = new int[][] {};
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
						Map<Integer, Map<Integer, Struct_kssj1_338>> typeSgzljlMap = WarOrderSysCache
								.getWarOrderMap(periods);
						Map<Integer, Struct_kssj1_338> map2 = typeSgzljlMap.get(warOrderSatate);
						Struct_kssj1_338 struct_kssj1_338 = map2.get(warOrderLevel);
						if (warOrderLevel > orderLevel) {
							continue;
						}
						int state1 = map.get(warOrderLevel);
						if (state1 == WarOrderConst.CAN_GET) {
							if (warOrderSatate == 0) {
								if (!UseAddUtil.canAdd(hero, struct_kssj1_338.getReward(), false)) {
									return;
								}
								maxReward = CommonUtil.arrayPlusArraysItems(maxReward, struct_kssj1_338.getReward());
								isGet = true;
								map.put(warOrderLevel, WarOrderConst.ALREADY_GET);
							} else if (warOrderSatate == 1 && buyState == WarOrderConst.BUY) {
								// ??????????????????
								if (!UseAddUtil.canAdd(hero, struct_kssj1_338.getReward1(), false)) {
									return;
								}
								maxReward = CommonUtil.arrayPlusArraysItems(maxReward, struct_kssj1_338.getReward1());
								isGet = true;
								map.put(warOrderLevel, WarOrderConst.ALREADY_GET);
							}
						}
					}
				}
				if (!isGet) {
					// ????????????????????????
					WarOrderSender.sendCmd_12252(hid, 2, getState, type, level, actId);
					return;
				}
				if (maxReward != null) {
					UseAddUtil.add(hero, maxReward, SourceGoodConst.KLSG_REWARD, UseAddUtil.getDefaultMail(),
							true);
				}
				WarOrderSender.sendCmd_12252(hid, 3, getState, type, level, actId);
				openUI(hero);
				return;
			} else if (getState == 0) {
				// ????????????
				Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
				if (type > model.getBuyState()) {
					// ????????????????????????????????????
					WarOrderSender.sendCmd_12252(hid, 0, getState, type, level, actId);
					return;
				}
				Map<Integer, Integer> map = warOrderMap.get(type);
				Integer orderState = map.get(level);
				if (orderState != WarOrderConst.CAN_GET) {
					// ???????????????????????????
					WarOrderSender.sendCmd_12252(hid, 1, getState, type, level, actId);
					return;
				}
				Map<Integer, Map<Integer, Struct_kssj1_338>> typeSgzljlMap = WarOrderSysCache
						.getWarOrderMap(periods);
				Map<Integer, Struct_kssj1_338> map2 = typeSgzljlMap.get(type);
				Struct_kssj1_338 kssj1_338 = map2.get(level);
				int[][] reward = null;
				if (type == 0) {
					reward = kssj1_338.getReward();
				} else if (type == 1) {
					reward = kssj1_338.getReward1();
				}
				if (reward != null) {
					UseAddUtil.add(hero, reward, SourceGoodConst.KLSG_REWARD, UseAddUtil.getDefaultMail(),
							true);
				}
				map.put(level, WarOrderConst.ALREADY_GET);
				WarOrderSender.sendCmd_12252(hid, 3, getState, type, level, actId);
				openUI(hero);
				WarOrderFunction.getIns().updateRedPoint(hero);
			} else {
				// ?????????
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderManager.class, hid, hero.getName(), "WarOrderManager getReward, level=" + level);
		}
	}

	public void openTaskUI(Hero hero, int actId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, actId)) {
				return;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(actId);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> activeMap = model.getActiveMap();
			int periods = model.getPeriods();
			Map<Integer, Map<Integer, Struct_xslweek1_338>> typeTaskMap = WarOrderSysCache
					.getTypeTaskMap(periods);
			Iterator<Integer> iterator = typeTaskMap.keySet().iterator();
			int type = 0;
			Integer typeNum = 0;
			Map<Integer, Integer> stateMap = null;
			Map<Integer, Struct_xslweek1_338> taskMap = null;
			Iterator<Struct_xslweek1_338> iterator2 = null;
			Struct_xslweek1_338 xslweek1_338 = null;
			int id = 0;
			Integer state = 0;
			List<Object[]> taskData = new ArrayList<>();
			WarOrderFunction.getIns().checkALLTask(hero); // ??????????????????
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
					xslweek1_338 = iterator2.next();
					id = xslweek1_338.getId();
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
			WarOrderSender.sendCmd_12254(hid, taskData.toArray(), actId);
		} catch (Exception e) {
			LogTool.error(e, WarOrderManager.class, hid, hero.getName(), "WarOrderManager openTaskUI");
		}
	}

	/**
	 * ??????????????????
	 * 
	 * @param hero
	 * @param type
	 * @param taskId
	 */
	public void getReward(Hero hero, int type, int taskId, int getState, int actId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, actId)) {
				return;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(actId);
			int periods = model.getPeriods();
			if (getState == 1) {
				boolean isGet = false;
				int[][] maxReward = new int[][] {};
				Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
				
				Iterator<Integer> iterator = rewardMap.keySet().iterator();
				while (iterator.hasNext()) {
					Integer taskType = iterator.next();
					Map<Integer, Integer> stateMap = rewardMap.get(taskType);
					Iterator<Integer> iterator2 = stateMap.keySet().iterator();
					while (iterator2.hasNext()) {
						Integer id = iterator2.next();
						Integer state = stateMap.get(id);
						if (state == WarOrderConst.ALREADY_GET) {
							// ?????????
							continue;
						}
						Struct_xslweek1_338 excel = Config_xslweek1_338.getIns().get(id);
						int exp = excel.getExp();
						model.setExp(model.getExp()+exp);
						int[][] reward = excel.getReward();
						if (reward != null) {
							maxReward = CommonUtil.arrayPlusArraysItems(maxReward, reward);
						}
						stateMap.put(id, WarOrderConst.ALREADY_GET);
						isGet = true;
					}
				}
				if (!isGet) {
					// ????????????????????????
					WarOrderSender.sendCmd_12256(hid, 0, 3, 0, model.getLevel(), model.getExp(), getState, actId);
					return;
				}
				if (maxReward != null) {
					UseAddUtil.add(hero, maxReward, SourceGoodConst.KLSG_TASKREWARD,
							UseAddUtil.getDefaultMail(), true);
				}
				WarOrderFunction.getIns().updateLevel(hero, actId);// ?????????????????????
				WarOrderFunction.getIns().checkALLTask(hero);// ??????????????????
				WarOrderSender.sendCmd_12256(hid, 1, type, taskId, model.getLevel(), model.getExp(), getState, actId);
				WarOrderFunction.getIns().updateRedPoint(hero);
			} else {
				Map<Integer, Struct_xslweek1_338> taskMap = WarOrderSysCache.getTypeTaskMap(periods).get(type);
				if (!taskMap.containsKey(taskId)) {
					// ????????????id
					return;
				}
				Struct_xslweek1_338 xslweek1_338 = taskMap.get(taskId);
				int id = xslweek1_338.getId();
				Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
				Map<Integer, Integer> stateMap = rewardMap.get(type);
				if (!stateMap.containsKey(id)) {
					// if (stateMap.get(taskId) == WarOrderConst.CANNOT_GET) {
					// ???????????????
					WarOrderSender.sendCmd_12256(hid, 0, 1, 0, model.getLevel(), model.getExp(), getState, actId);
					return;
				}
				Integer state = stateMap.get(id);
				if (state == WarOrderConst.ALREADY_GET) {
					// ?????????
					WarOrderSender.sendCmd_12256(hid, 0, 2, 0, model.getLevel(), model.getExp(), getState, actId);
					return;
				}
				stateMap.put(id, WarOrderConst.ALREADY_GET);
				int[][] reward = xslweek1_338.getReward();
				if (reward != null) {
					UseAddUtil.add(hero, reward, SourceGoodConst.KLSG_TASKREWARD, UseAddUtil.getDefaultMail(),
							true);
				}
				int exp = xslweek1_338.getExp();
				model.setExp(model.getExp()+exp);
				WarOrderFunction.getIns().updateLevel(hero, actId);// ?????????????????????
				WarOrderFunction.getIns().checkALLTask(hero);// ??????????????????
				WarOrderSender.sendCmd_12256(hid, 1, type, taskId, model.getLevel(), model.getExp(), getState, actId);
				WarOrderFunction.getIns().updateRedPoint(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderManager.class, hid, hero.getName(), "WarOrderManager getReward, taskId=" + taskId);
		}
	}

	public void openDayTaskUI(Hero hero, int actId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, actId)) {
				return;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(actId);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getDayRewardMap();
			Map<Integer, Integer> activeMap = model.getDayActiveMap();
			int periods = model.getPeriods();
			Map<Integer, Map<Integer, Struct_xslday1_338>> typeTaskMap = WarOrderSysCache.getDayTypeTaskMap(periods);
			Iterator<Integer> iterator = typeTaskMap.keySet().iterator();
			int type = 0;
			Integer typeNum = 0;
			Map<Integer, Integer> stateMap = null;
			Map<Integer, Struct_xslday1_338> taskMap = null;
			Iterator<Struct_xslday1_338> iterator2 = null;
			Struct_xslday1_338 xslday1_338 = null;
			int id = 0;
			Integer state = 0;
			List<Object[]> taskData = new ArrayList<>();
			WarOrderFunction.getIns().checkALLTask(hero); // ??????????????????
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
					xslday1_338 = iterator2.next();
					id = xslday1_338.getId();
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
			WarOrderSender.sendCmd_12258(hid, taskData.toArray(), actId);
		} catch (Exception e) {
			LogTool.error(e, WarOrderManager.class, hid, hero.getName(), "WarOrderManager openDayTaskUI");
		}
	}

	/**
	 * ????????????????????????
	 * 
	 * @param hero
	 * @param type
	 * @param taskId
	 */
	public void getDayReward(Hero hero, int type, int taskId, int getState, int actId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, actId)) {
				return;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(actId);
			int periods = model.getPeriods();
			if (getState == 1) {
				boolean isGet = false;
				int[][] maxReward = new int[][] {};
				Map<Integer, Map<Integer, Integer>> rewardMap = model.getDayRewardMap();

				Iterator<Integer> iterator = rewardMap.keySet().iterator();
				while (iterator.hasNext()) {
					Integer taskType = iterator.next();
					Map<Integer, Integer> stateMap = rewardMap.get(taskType);
					Iterator<Integer> iterator2 = stateMap.keySet().iterator();
					while (iterator2.hasNext()) {
						Integer id = iterator2.next();
						Integer state = stateMap.get(id);
						if (state == WarOrderConst.ALREADY_GET) {
							// ?????????
							continue;
						}
						Struct_xslday1_338 excel = Config_xslday1_338.getIns().get(id);
						int exp = excel.getExp();
						model.setExp(model.getExp() + exp);
						int[][] reward = excel.getReward();
						if (reward != null) {
							maxReward = CommonUtil.arrayPlusArraysItems(maxReward, reward);
						}
						stateMap.put(id, WarOrderConst.ALREADY_GET);
						isGet = true;
					}
				}
				if (!isGet) {
					// ????????????????????????
					WarOrderSender.sendCmd_12260(hid, 0, 3, 0, model.getLevel(), model.getExp(), getState, actId);
					return;
				}
				if (maxReward != null) {
					UseAddUtil.add(hero, maxReward, SourceGoodConst.KLSG_TASKREWARD,
							UseAddUtil.getDefaultMail(), true);
				}
				WarOrderFunction.getIns().updateLevel(hero, actId);// ?????????????????????
				WarOrderFunction.getIns().checkALLTask(hero);// ??????????????????
				WarOrderSender.sendCmd_12260(hid, 1, type, taskId, model.getLevel(), model.getExp(), getState, actId);
				WarOrderFunction.getIns().updateRedPoint(hero);
			} else {
				Map<Integer, Struct_xslday1_338> taskMap = WarOrderSysCache.getDayTypeTaskMap(periods).get(type);
				if (!taskMap.containsKey(taskId)) {
					// ????????????id
					return;
				}
				Struct_xslday1_338 xslday1_338 = taskMap.get(taskId);
				int id = xslday1_338.getId();
				Map<Integer, Map<Integer, Integer>> rewardMap = model.getDayRewardMap();
				Map<Integer, Integer> stateMap = rewardMap.get(type);
				if (!stateMap.containsKey(id)) {
					// if (stateMap.get(taskId) == WarOrderConst.CANNOT_GET) {
					// ???????????????
					WarOrderSender.sendCmd_12260(hid, 0, 1, 0, model.getLevel(), model.getExp(), getState, actId);
					return;
				}
				Integer state = stateMap.get(id);
				if (state == WarOrderConst.ALREADY_GET) {
					// ?????????
					WarOrderSender.sendCmd_12260(hid, 0, 2, 0, model.getLevel(), model.getExp(), getState, actId);
					return;
				}
				stateMap.put(id, WarOrderConst.ALREADY_GET);
				int[][] reward = xslday1_338.getReward();
				if (reward != null) {
					UseAddUtil.add(hero, reward, SourceGoodConst.KLSG_TASKREWARD, UseAddUtil.getDefaultMail(),
							true);
				}
				int exp = xslday1_338.getExp();
				model.setExp(model.getExp() + exp);
				WarOrderFunction.getIns().updateLevel(hero, actId);// ?????????????????????
				WarOrderFunction.getIns().checkALLTask(hero);// ??????????????????
				WarOrderSender.sendCmd_12260(hid, 1, type, taskId, model.getLevel(), model.getExp(), getState, actId);
				WarOrderFunction.getIns().updateRedPoint(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderManager.class, hid, hero.getName(),
					"WarOrderManager getDayReward, taskId=" + taskId);
		}
	}

	/**
	 * ????????????
	 * 
	 * @param hero
	 */
	public void buyLevel(Hero hero, int actId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, actId)) {
				return;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(actId);
			int buyNum = model.getBuyNum();
			int periods = model.getPeriods();
			Struct_kssjbuy1_338 struct_kssjbuy1_338 = Config_kssjbuy1_338.getIns().get(periods * 100 + buyNum + 1);
			if (struct_kssjbuy1_338 == null) {
				// ??????????????????
				WarOrderSender.sendCmd_12262(hid, 1, model.getBuyNum(), model.getLevel(), actId);
				return;
			}
			int[][] consume = struct_kssjbuy1_338.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				// ????????????
				WarOrderSender.sendCmd_12262(hid, 2, model.getBuyNum(), model.getLevel(), actId);
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.KLSG_BUYNUM, true);

			model.setBuyNum(buyNum + 1);
			int level = model.getLevel();
			List<Struct_kssj1_338> sortList = Config_kssj1_338.getIns().getSortList();
			for (Struct_kssj1_338 excel : sortList) {
				if (excel.getQs() != periods) {
					continue;
				}
				if (level == excel.getLv()) {
					model.setExp(model.getExp() + excel.getExp());
				}
			}
			WarOrderFunction.getIns().updateLevel(hero, actId);// ?????????????????????
			WarOrderSender.sendCmd_12262(hid, 0, model.getBuyNum(), model.getLevel(), actId);
			openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, WarOrderManager.class, hid, hero.getName(), "WarOrderManager openUI");
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
			if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER1)) {
				WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
						.get(ActivitySysId.WARORDER1);
				int periods = model.getPeriods();
				for (Struct_xsljh1_338 xsljh1_338 : Config_xsljh1_338.getIns().getMap().values()) {
					int shangpin = WarOrderConst.GOODS_ID1;
					int qs = xsljh1_338.getQs();
					if (periods != qs) {
						continue;
					}
					if (shangpin == product_id) {
						// ??????
						if (model.getBuyState() == WarOrderConst.BUY) {
							// ?????????
							break;
						}
						model.setBuyState(WarOrderConst.BUY);
						int level = model.getLevel();
						Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
						Map<Integer, Integer> map = warOrderMap.get(WarOrderConst.BUY);// ??????????????????
						for (int i = 1; i <= level; i++) {
							map.put(i, WarOrderConst.CAN_GET);// ????????????????????????????????????????????????
						}
						int[][] Reward = xsljh1_338.getReward();
						UseAddUtil.add(hero, Reward, SourceGoodConst.KLSG, UseAddUtil.getDefaultMail(), true); // ????????????
						ChatManager.getIns().broadCast(ChatConst.GJKS_2, new Object[] { hero.getNameZoneid() });
					}
				}
				openUI(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderManager.class, hid, hero.getName(), "WarOrderManager rechargeHandle");
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
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
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER1);
			int buyState = model.getBuyState();
			int periods = model.getPeriods();

			// ????????????
			int[][] maxReward = new int[][] {};
			Map<Integer, Map<Integer, Integer>> dayRewardMap = model.getDayRewardMap();
			Iterator<Map<Integer, Integer>> iterator2 = dayRewardMap.values().iterator();
			while (iterator2.hasNext()) {
				Map<Integer, Integer> next = iterator2.next();
				Iterator<Integer> iterator3 = next.keySet().iterator();
				while (iterator3.hasNext()) {
					Integer id = iterator3.next();
					Integer value = next.get(id);
					if (value == WarOrderConst.CAN_GET) {
						Struct_xslday1_338 excel = Config_xslday1_338.getIns().get(id);
						int[][] reward1 = excel.getReward();
						if (reward1 != null) {
							maxReward = CommonUtil.arrayPlusArraysItems(maxReward, reward1);
						}
						next.put(id, WarOrderConst.ALREADY_GET);
						int exp = excel.getExp();
						model.setExp(model.getExp() + exp);
					}
				}
			}
			int mailId1 = MailConst.WARORDER_DAYAWARD;
			if (maxReward.length > 0) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId1, new Object[] { mailId1 },
						maxReward);
			}

			// ?????????
			int[][] maxReward1 = new int[][] {};
			Map<Integer, Map<Integer, Integer>> rewardMap1 = model.getRewardMap();
			Iterator<Map<Integer, Integer>> iterator21 = rewardMap1.values().iterator();
			while (iterator21.hasNext()) {
				Map<Integer, Integer> next = iterator21.next();
				Iterator<Integer> iterator3 = next.keySet().iterator();
				while (iterator3.hasNext()) {
					Integer id = iterator3.next();
					Integer value = next.get(id);
					if (value == WarOrderConst.CAN_GET) {
						Struct_xslweek1_338 excel = Config_xslweek1_338.getIns().get(id);
						int[][] reward1 = excel.getReward();
						if (reward1 != null) {
							maxReward1 = CommonUtil.arrayPlusArraysItems(maxReward1, reward1);
						}
						next.put(id, WarOrderConst.ALREADY_GET);
						int exp = excel.getExp();
						model.setExp(model.getExp() + exp);
					}
				}
			}
			int mailId11 = MailConst.WARORDER_WEEKAWARD;
			if (maxReward1.length > 0) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId11, new Object[] { mailId11 },
						maxReward1);
			}

			WarOrderFunction.getIns().updateLevel(hero, ActivitySysId.WARORDER1);// ?????????????????????

			// ??????????????????
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
				Iterator<Integer> iterator211 = map.keySet().iterator();
				while (iterator211.hasNext()) {
					Integer level = iterator211.next();
					Map<Integer, Map<Integer, Struct_kssj1_338>> warOrder = WarOrderSysCache.getWarOrderMap(periods);
					Map<Integer, Struct_kssj1_338> sgzljlMap = warOrder.get(type);
					Struct_kssj1_338 struct_kssj1_338 = sgzljlMap.get(level);
					Integer state = map.get(level);
					if (state != WarOrderConst.CAN_GET) {
						continue;
					}
					int[][] Reward = null;
					if (type == 0) {
						Reward = struct_kssj1_338.getReward();
						for (int i = 0; i < Reward.length; i++) {
							dropArr.add(Reward[i]);
						}
						map.put(level, WarOrderConst.ALREADY_GET);
						warOrderMap.put(0, map);
					} else if (type == WarOrderConst.BUY) {
						Reward = struct_kssj1_338.getReward1();
						for (int i = 0; i < Reward.length; i++) {
							dropArr.add(Reward[i]);
						}
						map.put(level, WarOrderConst.ALREADY_GET);
						warOrderMap.put(WarOrderConst.BUY, map);
					}
					int mailId = MailConst.KLSG_WEEKAWARD;
					if (Reward != null) {
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId, new Object[] { mailId },
								Reward);
					}
				}
			}
			// if (dropArr.size() > 0) {
			// int[][] drops = new int[dropArr.size()][];
			// int[][] reward = dropArr.toArray(drops);
			// }
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, WarOrderManager.class, hid, hero.getName(), "WarOrderManager handleEnd");
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		WarOrder data = new WarOrder(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		Map<Integer, Integer> dayActiveMap = new HashMap<>();
		Map<Integer, Map<Integer, Integer>> dayRewardMap = new HashMap<>();
		int periods = data.getPeriods();
		Iterator<Integer> iterator1 = WarOrderSysCache.getDayTypeTaskMap(periods).keySet().iterator();
		for (; iterator1.hasNext();) {
			int type = iterator1.next();
			Map<Integer, Integer> map2 = new HashMap<>();
			dayRewardMap.put(type, map2);
		}
		Map<Integer, Integer> activeMap = new HashMap<>();
		Map<Integer, Map<Integer, Integer>> rewardMap = new HashMap<>();
		Iterator<Integer> iterator = WarOrderSysCache.getTypeTaskMap(periods).keySet().iterator();
		for (; iterator.hasNext();) {
			int type = iterator.next();
			Map<Integer, Integer> map0 = new HashMap<>();
			rewardMap.put(type, map0);
		}
		Map<Integer, Map<Integer, Integer>> warOrderMap = new HashMap<>();
		Map<Integer, Integer> map = new HashMap<>();
		Map<Integer, Integer> map1 = new HashMap<>();
		warOrderMap.put(0, map);// ????????????
		warOrderMap.put(WarOrderConst.BUY, map1);// ????????????
		for (Struct_kssj1_338 kssj1_338 : Config_kssj1_338.getIns().getMap().values()) {
			if (kssj1_338.getQs() != periods) {
				continue;
			}
			map.put(kssj1_338.getLv(), WarOrderConst.CANNOT_GET);
			map1.put(kssj1_338.getLv(), WarOrderConst.CANNOT_GET);
		}
		data.setActiveMap(activeMap);
		data.setRewardMap(rewardMap);
		data.setDayActiveMap(dayActiveMap);
		data.setDayRewardMap(dayRewardMap);
		data.setWarOrderMap(warOrderMap);
		return data;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return WarOrder.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return WarOrderSysEvent.getIns();
	}


}
