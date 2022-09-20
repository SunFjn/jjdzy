package com.teamtop.system.activity.ativitys.seriesRechargeAct;

import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.seriesRechargeAct.model.SeriesRechargeAct;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_lxcz_764;

public class SeriesRechargeActFunction {
	private static volatile SeriesRechargeActFunction ins = null;

	public static SeriesRechargeActFunction getIns() {
		if (ins == null) {
			synchronized (SeriesRechargeActFunction.class) {
				if (ins == null) {
					ins = new SeriesRechargeActFunction();
				}
			}
		}
		return ins;
	}

	private SeriesRechargeActFunction() {
	}

	public void rechargeHandler(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				try {
					//  当天版本更新前玩家进行了充值，版本更新后，要计算当天已充值的金额（若活动正好当天开启）；
					if (!ActivityFunction.getIns().checkActOpen(ActivitySysId.SERIESRECHARGE_ACT)) {
						return;
					}
					SeriesRechargeAct seriesRechargeAct = (SeriesRechargeAct) ActivityFunction.getIns()
							.getActivityData(hero, ActivitySysId.SERIESRECHARGE_ACT);
					Map<Integer, Integer> awardStateMap = seriesRechargeAct.getAwardStateMap();
					int todayRecharge = seriesRechargeAct.getTodayRecharge();
					seriesRechargeAct.setTodayRecharge(todayRecharge + money);
					int newTodayRecharge = seriesRechargeAct.getTodayRecharge();
					Map<Integer, Integer[]> rechargeDayMap = seriesRechargeAct.getRechargeDayMap();
					boolean flag = false;
					Map<Integer, Map<Integer, Struct_lxcz_764>> configListMap = SeriesRechargeActSysCache
							.getConfigListMap().get(seriesRechargeAct.getPeriods());
					for (Entry<Integer, Map<Integer, Struct_lxcz_764>> entry : configListMap.entrySet()) {
						Integer rmb = entry.getKey();
						if (newTodayRecharge < rmb) {
							break;
						}
						Integer[] array = rechargeDayMap.get(rmb);
						int todayZeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
						if (array == null) {
							array = new Integer[] { todayZeroTime, 1 };
							rechargeDayMap.put(rmb, array);
						} else {
							int updateTime = array[0];
							if (todayZeroTime == updateTime) {
								continue;
							} else {
								array[0] = todayZeroTime;
								array[1] += 1;
							}
						}
						Map<Integer, Struct_lxcz_764> treeMap = entry.getValue();
						for (Struct_lxcz_764 struct_lxcz_764 : treeMap.values()) {
							int id = struct_lxcz_764.getId();
							if (array[1] >= struct_lxcz_764.getTianshu() && awardStateMap.get(id) == null) {
								awardStateMap.put(id, SeriesRechargeActConst.CAN_GET);
								flag = true;
							}
						}
					}

					if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERIESRECHARGE_ACT)) {
						return;
					}
					if (flag) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1,
								RedPointConst.HAS_RED);
						RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.SERIESRECHARGE_ACT, 1,
								RedPointConst.HAS_RED);
					}
					SeriesRechargeActManager.getIns().openUI(hero);
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
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERIESRECHARGE_ACT)) {
			return;
		}
		SeriesRechargeAct seriesRechargeAct = (SeriesRechargeAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.SERIESRECHARGE_ACT);
		Map<Integer, Integer> awardStateMap = seriesRechargeAct.getAwardStateMap();
		for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
			Integer state = entry.getValue();
			if (state == SeriesRechargeActConst.CAN_GET) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.SERIESRECHARGE_ACT, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.SERIESRECHARGE_ACT, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}
	}

}
