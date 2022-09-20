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
import excel.config.Config_xslday1_338;
import excel.config.Config_xsljh1_338;
import excel.config.Config_xslweek1_338;
import excel.struct.Struct_kssj1_338;
import excel.struct.Struct_xslday1_338;
import excel.struct.Struct_xsljh1_338;
import excel.struct.Struct_xslweek1_338;

public class WarOrderManagerNew extends AbstractActivityManager {

	private static WarOrderManagerNew ins;

	private WarOrderManagerNew() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderManagerNew getIns() {
		if (ins == null) {
			ins = new WarOrderManagerNew();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER2)) {
				return;
			}
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WARORDER2);
			List<Object[]> sendData = new ArrayList<>();
			WarOrderFunction.getIns().checkALLTask(hero);// 检查全部任务
			WarOrderFunction.getIns().updateLevel(hero, ActivitySysId.WARORDER2);
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
					sendData1.add(new Object[] { level, state });// 等级 领取状态
				}
				sendData.add(new Object[] { warOrderState, sendData1.toArray() });// 战令类型
			}
			int buyState = model.getBuyState();
			int level = model.getLevel();
			int exp = model.getExp();
			int buyNum = model.getBuyNum();
			WarOrderSender.sendCmd_12250(hid, sendData.toArray(), buyState, level, exp, buyNum,
					ActivitySysId.WARORDER2);
		} catch (Exception e) {
			LogTool.error(e, WarOrderManagerNew.class, hid, hero.getName(), "WarOrderManager openUI");
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
			if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER2)) {
				WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap()
						.get(ActivitySysId.WARORDER2);
				int periods = model.getPeriods();
				for (Struct_xsljh1_338 xsljh1_338 : Config_xsljh1_338.getIns().getMap().values()) {
					int shangpin = WarOrderConst.GOODS_ID2;
					int qs = xsljh1_338.getQs();
					if (periods != qs) {
						continue;
					}
					if (shangpin == product_id) {
						// 战令
						if (model.getBuyState() == WarOrderConst.BUY) {
							// 已购买
							break;
						}
						model.setBuyState(WarOrderConst.BUY);
						int level = model.getLevel();
						Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
						Map<Integer, Integer> map = warOrderMap.get(WarOrderConst.BUY);// 进阶后的战令
						for (int i = 1; i <= level; i++) {
							map.put(i, WarOrderConst.CAN_GET);// 购买后遍历到最高等级全部为可领取
						}
						int[][] Reward = xsljh1_338.getReward();
						UseAddUtil.add(hero, Reward, SourceGoodConst.KLSG, UseAddUtil.getDefaultMail(), true); // 发放奖励
						ChatManager.getIns().broadCast(ChatConst.RYXZ_2, new Object[] { hero.getNameZoneid() });
					}
				}
				openUI(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderManagerNew.class, hid, hero.getName(), "WarOrderManager rechargeHandle");
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		int oneDayConsume = hero.getOneDayConsume();// 兼容消费
		// 犒赏三军
		WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_3, oneDayConsume);
		WarOrderFunction.getIns().updateRedPoint(hero);
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
					.get(ActivitySysId.WARORDER2);
			int buyState = model.getBuyState();
			int periods = model.getPeriods();

			// 每日补发
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
			int mailId1 = MailConst.RYXZ_DAYAWARD;
			if (maxReward.length > 0) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId1, new Object[] { mailId1 },
						maxReward);
			}

			// 周补发
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
			int mailId11 = MailConst.RYXZ_WEEKAWARD;
			if (maxReward1.length > 0) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId11, new Object[] { mailId11 },
						maxReward1);
			}

			WarOrderFunction.getIns().updateLevel(hero, ActivitySysId.WARORDER2);// 更新等级和奖励

			// 战令等级补发
			Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
			List<int[]> dropArr = new ArrayList<>();
			Iterator<Integer> iterator = warOrderMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer type = iterator.next();
				if (buyState < type) {
					// 没购买三国战令
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
					int mailId = MailConst.RYXZ_LEVELAWARD;
					if (Reward != null) {
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId, new Object[] { mailId },
								Reward);
					}
				}
			}
//			if (dropArr.size() > 0) {
//				int[][] drops = new int[dropArr.size()][];
//				int[][] reward = dropArr.toArray(drops);
//			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, WarOrderManagerNew.class, hid, hero.getName(), "WarOrderManager handleEnd");
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
		warOrderMap.put(0, map);// 普通战令
		warOrderMap.put(WarOrderConst.BUY, map1);// 进阶战令
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
