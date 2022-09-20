package com.teamtop.system.activity.ativitys.luckSign;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.luckSign.model.LuckSign;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_xyfqhd_508;
import excel.struct.Struct_xyfqmr_508;

public class LuckSignFunction {
	private static LuckSignFunction ins;

	private LuckSignFunction() {
	}

	public static synchronized LuckSignFunction getIns() {
		if (ins == null) {
			ins = new LuckSignFunction();
		}
		return ins;
	}

	public void targetHandler(Hero hero, LuckSign model) {
		// TODO Auto-generated method stub
		int times = 0;
		try {
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Map<Integer, Integer> awards = model.getAwards();
			times = model.getParameter();
			int periods = model.getPeriods();
			int dayNum = model.getDayNum();
			// 总的目标
			List<Struct_xyfqhd_508> list = LuckSignSysCache.getTargetConfigMap().get(periods);
			int size = list.size();
			for (int i = 0; i < size; i++) {
				Struct_xyfqhd_508 struct_xyfqhd_508 = list.get(i);
				int id = struct_xyfqhd_508.getId();
				if (times >= struct_xyfqhd_508.getTime() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, LuckSignConst.CAN_GET);
				}
			}
			// 每日目标
			List<Struct_xyfqmr_508> list1 = LuckSignSysCache.getDayTargetConfigMap().get(periods);
			int size1 = list1.size();
			for (int i = 0; i < size1; i++) {
				Struct_xyfqmr_508 struct_xyfqmr_508 = list1.get(i);
				int id = struct_xyfqmr_508.getId();
				if (dayNum >= struct_xyfqmr_508.getTime() && awards.get(id) == null) {
					awards.put(id, LuckSignConst.CAN_GET);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "LuckSignFunction targetHandler times:" + times);
		}
	}

	/**
	 * 登录推送图标显示红点
	 * 
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCK_SIGN);
			if (!checkHeroActOpen) {
				return;
			}
			LuckSign model = (LuckSign) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.LUCK_SIGN);
			if (model == null)
				return;

			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Iterator<Integer> iterator = awardStateMap.values().iterator();
			while (iterator.hasNext()) {
				Integer state = iterator.next();
				if (state == LuckSignConst.CAN_GET) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.LUCK_SIGN,
							1, RedPointConst.HAS_RED);
				}
			}

			Map<Integer, Integer> award = model.getAwards();
			Iterator<Integer> iterator1 = award.values().iterator();
			while (iterator1.hasNext()) {
				Integer state = iterator1.next();
				if (state == LuckSignConst.CAN_GET) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.LUCK_SIGN, 2,
							RedPointConst.HAS_RED);
				}
			}

		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "LuckSignActFunction loginRed");
		}
	}

	/**
	 * 推送图标显示红点
	 * 
	 * index 1 总的目标红点 2 每日目标红点
	 * 
	 * @param hero
	 */
	public void checkRed(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCK_SIGN);
			if (!checkHeroActOpen) {
				return;
			}
			LuckSign model = (LuckSign) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.LUCK_SIGN);
			if (model == null)
				return;

			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Iterator<Integer> iterator = awardStateMap.values().iterator();
			while (iterator.hasNext()) {
				Integer state = iterator.next();
				if (state == LuckSignConst.CAN_GET) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.LUCK_SIGN,
							1, RedPointConst.HAS_RED);
				}
			}

			Map<Integer, Integer> award = model.getAwards();
			Iterator<Integer> iterator1 = award.values().iterator();
			while (iterator1.hasNext()) {
				Integer state = iterator1.next();
				if (state == LuckSignConst.CAN_GET) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.LUCK_SIGN,
							2, RedPointConst.HAS_RED);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "LuckSignFunction checkRed");
		}
	}
}
