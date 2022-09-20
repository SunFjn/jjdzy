package com.teamtop.system.openDaysSystem.seriesRecharge;

import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.seriesRecharge.model.SeriesRecharge;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_lchl_756;

public class SeriesRechargeFunction {
	private static volatile SeriesRechargeFunction ins = null;

	public static SeriesRechargeFunction getIns() {
		if (ins == null) {
			synchronized (SeriesRechargeFunction.class) {
				if (ins == null) {
					ins = new SeriesRechargeFunction();
				}
			}
		}
		return ins;
	}

	private SeriesRechargeFunction() {
	}

	/**
	 * 取得万兽之王-连充豪礼model
	 * 
	 * @param hero
	 * @return
	 */
	public SeriesRecharge getModel(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE);
		SeriesRecharge model = (SeriesRecharge) SeriesRechargeManager.getIns().getSystemModel(hero, uid);
		return model;
	}

	public void rechargeHandler(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				try {
					//  当天版本更新前玩家进行了充值，版本更新后，要计算当天已充值的金额（若活动正好当天开启）；
					if (!OpenDaysSystemFunction.getIns()
							.isSystemActOpen(SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE)) {
						return;
					}
					SeriesRecharge seriesRecharge = getModel(hero);
					Map<Integer, Integer> awardStateMap = seriesRecharge.getAwardStateMap();
					int todayRecharge = seriesRecharge.getTodayRecharge();
					seriesRecharge.setTodayRecharge(todayRecharge + money);
					int newTodayRecharge = seriesRecharge.getTodayRecharge();
					Map<Integer, Integer[]> rechargeDayMap = seriesRecharge.getRechargeDayMap();
					boolean flag = false;
					Map<Integer, Map<Integer, Struct_lchl_756>> configListMap = SeriesRechargeSysCache
							.getConfigListMap().get(seriesRecharge.getQs());
					for (Entry<Integer, Map<Integer, Struct_lchl_756>> entry : configListMap.entrySet()) {
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
						Map<Integer, Struct_lchl_756> treeMap = entry.getValue();
						for (Struct_lchl_756 struct_lchl_756 : treeMap.values()) {
							int id = struct_lchl_756.getId();
							if (array[1] >= struct_lchl_756.getTianshu() && awardStateMap.get(id) == null) {
								awardStateMap.put(id, SeriesRechargeConst.CAN_GET);
								flag = true;
							}
						}
					}

					if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero,
							SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE)) {
						return;
					}
					if (flag) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING, 1,
								RedPointConst.HAS_RED);
						RedPointFunction.getIns().fastUpdateRedPoint(hero,
								SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE, 1, RedPointConst.HAS_RED);
					}
					SeriesRechargeManager.getIns().openUI(hero);
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
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE)) {
			return;
		}
		SeriesRecharge seriesRecharge = getModel(hero);
		Map<Integer, Integer> awardStateMap = seriesRecharge.getAwardStateMap();
		for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
			Integer state = entry.getValue();
			if (state == SeriesRechargeConst.CAN_GET) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MONSTER_KING, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}
	}

}
