package com.teamtop.system.activity.ativitys.warOrder;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.warOrder.model.WarOrder;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_xslday1_338;
import excel.struct.Struct_xslday1_338;

public class WarOrderSysEvent extends AbsSystemEvent {

	private static WarOrderSysEvent ins;

	private WarOrderSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderSysEvent getIns() {
		if (ins == null) {
			ins = new WarOrderSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER1)) {
			WarOrderFunction.getIns().checkALLTask(hero);
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.WARORDER1, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER2)) {
			WarOrderFunction.getIns().checkALLTask(hero);
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.WARORDER2, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}
	
	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		zeroHero(hero, now);
	}
	
	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER1)) {
			WarOrderFunction.getIns().checkALLTask(hero);
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.WARORDER1);
			if (model == null) {
				return;
			}
			model.setBuyNum(0);

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
			int mailId1 = MailConst.WARORDER_DAYAWARD;
			if (maxReward.length > 0) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId1, new Object[] { mailId1 },
						maxReward);
			}

			// 每日奖励重置
			Map<Integer, Map<Integer, Integer>> dayRewardMap1 = new HashMap<>();
			int periods = model.getPeriods();
			Iterator<Integer> iterator1 = WarOrderSysCache.getDayTypeTaskMap(periods).keySet().iterator();
			for (; iterator1.hasNext();) {
				int type = iterator1.next();
				Map<Integer, Integer> map2 = new HashMap<>();
				dayRewardMap1.put(type, map2);
			}
			model.setDayRewardMap(dayRewardMap1);

			// 每日完成度重置
			Map<Integer, Integer> dayActiveMap = model.getDayActiveMap();
			dayActiveMap.clear();
		}

		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WARORDER2)) {
			WarOrderFunction.getIns().checkALLTask(hero);
			WarOrder model = (WarOrder) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.WARORDER2);
			if (model == null) {
				return;
			}
			model.setBuyNum(0);

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

			// 每日奖励重置
			Map<Integer, Map<Integer, Integer>> dayRewardMap1 = new HashMap<>();
			int periods = model.getPeriods();
			Iterator<Integer> iterator1 = WarOrderSysCache.getDayTypeTaskMap(periods).keySet().iterator();
			for (; iterator1.hasNext();) {
				int type = iterator1.next();
				Map<Integer, Integer> map2 = new HashMap<>();
				dayRewardMap1.put(type, map2);
			}
			model.setDayRewardMap(dayRewardMap1);

			// 每日完成度重置
			Map<Integer, Integer> dayActiveMap = model.getDayActiveMap();
			dayActiveMap.clear();
		}

	}
	
}
