package com.teamtop.system.activity.ativitys.godGenDiscount;

import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ActivityDao;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godGenDiscount.model.GodGenDiscount;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_herooff_287;
import excel.struct.Struct_herooff_287;

public class GodGenDiscountFunction {

	private static volatile GodGenDiscountFunction ins = null;

	public static GodGenDiscountFunction getIns() {
		if (ins == null) {
			synchronized (GodGenDiscountFunction.class) {
				if (ins == null) {
					ins = new GodGenDiscountFunction();
				}
			}
		}
		return ins;
	}

	private GodGenDiscountFunction() {
	}

	/**
	 * 增加寻宝次数
	 * 
	 * @param hero
	 * @param addTimes
	 */
	public void addTimes(Hero hero, int addTimes) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GODGENDISCOUNT_ACT)) {
				return;
			}
			GodGenDiscount model = (GodGenDiscount) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.GODGENDISCOUNT_ACT);
			if(model == null) {
				return;
			}
			int times = model.getTimes();
			model.setTimes(times + addTimes);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "GodGenDiscountFunction addTimes:" + addTimes);
		}

	}

	/**
	 * 折扣
	 * 
	 * @param hero
	 * @param oriPrice 原价
	 * @return
	 */
	public int[][] discount(Hero hero, int[][] oriPrice) {
		int times = 0;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GODGENDISCOUNT_ACT)) {
				return oriPrice;
			}
			GodGenDiscount model = (GodGenDiscount) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.GODGENDISCOUNT_ACT);
			times = model.getTimes();
			List<Struct_herooff_287> sortList = Config_herooff_287.getIns().getSortList();
			int[][] dis = null;
			for (Struct_herooff_287 struct_herooff_287 : sortList) {
				int[] condition = struct_herooff_287.getTime()[0];
				if (times >= condition[0] && (condition[1] == 0 || times <= condition[1])) {
					double discount = struct_herooff_287.getOff() / 100.0;
					dis = CommonUtil.copyArrayAndNumCeil(oriPrice, discount);
					break;
				}
			}
			if (dis == null) {
				dis = oriPrice;
				StringBuilder oriPriceStr = CommonUtil.attrToString(oriPrice);
				LogTool.warn("GodGenDiscountFunction discount oriPrice:" + oriPriceStr == null ? ""
						: oriPriceStr.toString() + " times:" + times, this);
			}
			return dis;
		} catch (Exception e) {
			// TODO: handle exception
			StringBuilder oriPriceStr = CommonUtil.attrToString(oriPrice);
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"GodGenDiscountFunction discount oriPrice:" + oriPriceStr == null ? ""
							: oriPriceStr.toString() + " times:" + times);
		}
		return oriPrice;
	}

	/**
	 * gm清数据
	 */
	public void gm() {
		// 删除区服所有玩家对应活动数据
		ActivityDao.getIns().deleteActGM(ActivitySysId.GODGENDISCOUNT_ACT);
		try {
			HeroDao.getIns().updateZeroTime();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int zeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			boolean online = HeroFunction.getIns().isOnline(hero.getId());
			if (!online) {
				continue;
			}
			hero.setZeroTime(zeroTime);
			hero.setOneDayRecharge(0);
			Map<Integer, ActivityData> activityDataMap = hero.getHeroActivityData().getActivityDataMap();
			activityDataMap.remove(ActivitySysId.GODGENDISCOUNT_ACT);
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			ActivityInfo activityInfo = activityMap.get(ActivitySysId.GODGENDISCOUNT_ACT);
			if (activityInfo != null) {
				// 活动在开，清空数据
				ActivityData activityData = GodGenDiscountManager.getIns().getActivityData(hero, activityInfo);
				activityDataMap.put(ActivitySysId.GODGENDISCOUNT_ACT, activityData);
			}
		}
	}

}
