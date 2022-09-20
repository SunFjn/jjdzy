package com.teamtop.system.activity.ativitys.dailyDirectBuy;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.model.DailyDirectBuyAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_mrzg2_256;
import excel.struct.Struct_mrzg2_256;
import excel.struct.Struct_mrzgmb_256;

public class DailyDirectBuyActFunction {
	private static DailyDirectBuyActFunction ins;

	private DailyDirectBuyActFunction() {
		// TODO Auto-generated constructor stub
	}

	public static DailyDirectBuyActFunction getIns() {
		if (ins == null) {
			ins = new DailyDirectBuyActFunction();
		}
		return ins;
	}

	/**
	 * 定位每日直购表id，用来作为每日直购奖励列表里的Map<Integer, Integer>的key
	 * 
	 * @param day         为活动第几天
	 * @param configIndex 为充值商品index
	 * @return
	 */
	public int getKey(int day, int configIndex, Hero hero) {
		try {
			ActivityData activityData = ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_DAILYDIRECTBUY);
			List<Struct_mrzg2_256> list = DailyDirectBuyActCache.getDailyDirectBuyConfigMap()
					.get(activityData.getPeriods()).get(day);
			for (int i = 0; i < list.size(); i++) {
				Struct_mrzg2_256 struct_mrzg2_256 = list.get(i);
				if (struct_mrzg2_256.getCz() == configIndex) {
					return struct_mrzg2_256.getId();
				}
			}
			throw new Exception("getKey has wrong");
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, DailyDirectBuyActFunction.class, hero.getId(), hero.getName(), "getKey has wrong");
			return 0;
		}
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_DAILYDIRECTBUY);
		Map<Integer, Integer> awardList = dailyDirectBuy.getAwardList();
		Iterator<Integer> iterator = awardList.values().iterator();
		for (; iterator.hasNext();) {
			int state = iterator.next();
			if (state == DailyDirectBuyActConst.BUY_NOTGET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_DAILYDIRECTBUY,
						DailyDirectBuyActConst.REDPOINT, RedPointConst.HAS_RED);
			}
		}

		// 目标奖励红点
		Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
		for (int state : targetAwardMap.values()) {
			if (state == DailyDirectBuyActConst.CAN_GET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_DAILYDIRECTBUY,
						DailyDirectBuyActConst.TARGETREDPOINT, RedPointConst.HAS_RED);
			}
		}
	}

	/**
	 * 每日直购充值(活动)处理，供recharge方法调用
	 * 
	 * @param hero
	 * @param paramMap 支付相关参数
	 */
	public void dailyDirectBuyRechargeHandle(Hero hero, Map<String, String> paramMap, String parameters) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
			return;
		}
		try {
			// 第几天的订单
			int itemid = Integer.parseInt(parameters);
			DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_DAILYDIRECTBUY);
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
				return;
			}
			Struct_mrzg2_256 struct_mrzg2_256 = Config_mrzg2_256.getIns().get(itemid);
			int day = struct_mrzg2_256.getDay();
			if (!checkCanRechargeDate(day)) {
				LogTool.warn("DailyDirectBuyActFunction checkCanRechargeDate itemid:" + itemid + " name:"
						+ hero.getNameZoneid() + " hid:"
						+ hero.getId(), this);
				return;
			}
			Map<Integer, Integer> map = dailyDirectBuy.getAwardList();
			Integer status = map.get(itemid);
			if (status == null) {
				map.put(itemid, DailyDirectBuyActConst.BUY_NOTGET);
				targetAwardHandle(hero);
				DailyDirectBuyActSender.sendCmd_3724(hero.getId(), itemid);
			}
		} catch (Exception e) {
			LogTool.error(e, DailyDirectBuyActFunction.class, hero.getId(), hero.getName(),
					"dailyDirectBuyRechargeHandle has wrong");
		}

	}

	public boolean checkCanRechargeDate(int day) {
		int openDays = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.ACT_DAILYDIRECTBUY);
		if (day <= openDays) {
			return true;
		}
		return false;

	}

	/**
	 * 目标奖励处理
	 * 
	 * @param hero
	 */
	public void targetAwardHandle(Hero hero) {
		int targetTimes = 0;
		try {
			DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_DAILYDIRECTBUY);
			int periods = dailyDirectBuy.getPeriods();
			Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
			targetTimes = dailyDirectBuy.getAwardList().size();
			List<Struct_mrzgmb_256> list = DailyDirectBuyActCache.getTargetAwardConfigMap().get(periods);
			boolean flag = false;
			for (Struct_mrzgmb_256 struct_mrzgmb_256 : list) {
				int bianhao = struct_mrzgmb_256.getBianhao();
				if (targetTimes >= struct_mrzgmb_256.getCishu() && targetAwardMap.get(bianhao) == null) {
					targetAwardMap.put(bianhao, DailyDirectBuyActConst.CAN_GET);
					flag = true;
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_DAILYDIRECTBUY,
						DailyDirectBuyActConst.TARGETREDPOINT, RedPointConst.HAS_RED);
			}
			DailyDirectBuyActManager.getIns().openUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "targetAwardHandle targetTimes:" + targetTimes);
		}
	}

	/**
	 * 检测当前项目是否可充值（两期活动过渡问题）
	 */
	public boolean checkCanRecharge(Hero hero, long product_id, String param) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
				return true;
			}
			DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_DAILYDIRECTBUY);
			int periods = dailyDirectBuy.getPeriods();
			int mid = Integer.parseInt(param);
			Struct_mrzg2_256 struct_mrzg2_256 = Config_mrzg2_256.getIns().get(mid);
			if (struct_mrzg2_256 != null) {
				if (struct_mrzg2_256.getQs() != periods) {
					try {
						DailyDirectBuyActManager.getIns().openUI(hero);
					} catch (Exception e) {
						LogTool.error(e, DailyDirectBuyActFunction.class, hero.getId(), hero.getName(),
								"DailyDirectBuyActFunction openUI, product_id=" + product_id + ", param=" + param);
					}
					return false;
				}
			} else {
				return false;
			}
		} catch (Exception e) {
			LogTool.error(e, DailyDirectBuyActFunction.class, hero.getId(), hero.getName(),
					"DailyDirectBuyActFunction checkCanRecharge, product_id=" + product_id + ", param=" + param);
		}
		return true;
	}

	/**
	 * 每日直购(活动),供GM调用
	 * 
	 * @param hero
	 * @param product_id 充值商品id
	 * @param day        充值的天数，从1开始
	 */
	public void GM(Hero hero, int product_id, int day) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
			return;
		}
		DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_DAILYDIRECTBUY);
		DailyDirectBuyActManager dh = DailyDirectBuyActManager.getIns();
		dh.rechargeHandle(hero, 0, product_id);
	}
}
