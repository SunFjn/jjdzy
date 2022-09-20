package com.teamtop.system.dailyDirectBuy;

import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActCache;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActConst;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActFunction;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActManager;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.model.DailyDirectBuyAct;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.dailyDirectBuy.model.DailyDirectBuy;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.otherDailyDirectBuy.OtherDailyDirectBuy;
import com.teamtop.system.openDaysSystem.otherDailyDirectBuy.OtherDailyDirectBuyCache;
import com.teamtop.system.openDaysSystem.otherDailyDirectBuy.OtherDailyDirectBuyFunction;
import com.teamtop.system.openDaysSystem.otherDailyDirectBuy.OtherDailyDirectBuyManager;
import com.teamtop.system.openDaysSystem.otherDailyDirectBuy.OtherDailyDirectBuySender;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_mrzg1_256;
import excel.config.Config_mrzg3_256;
import excel.config.Config_shop_011;
import excel.config.Config_xitong_001;
import excel.struct.Struct_mrzg1_256;
import excel.struct.Struct_mrzg2_256;
import excel.struct.Struct_mrzg3_256;
import excel.struct.Struct_mrzgmb_256;

public class DailyDirectBuyFunction {
	private static DailyDirectBuyFunction ins;

	private DailyDirectBuyFunction() {
		// TODO Auto-generated constructor stub
	}

	public static DailyDirectBuyFunction getIns() {
		if (ins == null) {
			ins = new DailyDirectBuyFunction();
		}
		return ins;
	}

	/**
	 * 定位每日直购表id，用来作为每日直购奖励列表里的Map<Integer, Integer>的key
	 * 
	 * @param day         为开服天数
	 * @param configIndex 为充值商品index
	 * @return
	 */
	public int getKey(int day, int configIndex, Hero hero) {
		try {
			List<Struct_mrzg1_256> list = DailyDirectBuyCache.getDailyDirectBuyConfigMap().get(day);
			for (int i = 0; i < list.size(); i++) {
				Struct_mrzg1_256 struct_mrzg1_256 = list.get(i);
				if (struct_mrzg1_256.getCz() == configIndex) {
					return struct_mrzg1_256.getId();
				}
			}
			throw new Exception("getKey has wrong");
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, DailyDirectBuyFunction.class, hero.getId(), hero.getName(), "getKey has wrong");
			return 0;
		}
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		Map<Integer, Integer> awardMap = hero.getDailyDirectBuy().getAwardMap();
		for (int state : awardMap.values()) {
			if (state == DailyDirectBuyConst.BUY_NOTGET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, DailyDirectBuyConst.SYSTEMID,
						DailyDirectBuyConst.REDPOINT, RedPointConst.HAS_RED);
			}
		}
		// 目标奖励红点
		Map<Integer, Integer> targetAwardMap = hero.getDailyDirectBuy().getTargetAwardMap();
		for (int state : targetAwardMap.values()) {
			if (state == DailyDirectBuyConst.CAN_GET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, DailyDirectBuyConst.SYSTEMID,
						DailyDirectBuyConst.TARGETREDPOINT, RedPointConst.HAS_RED);
			}
		}
	}

	/**
	 * 每日直购充值处理，供recharge方法调用
	 * 
	 * @param hero
	 * @param paramMap 支付相关参数
	 */
	public void dailyDirectBuyRechargeHandle(Hero hero, Map<String, String> paramMap, String parameters) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
			try {
				// 每日直购表id
				int itemid = Integer.parseInt(parameters);
				DailyDirectBuy dailyDirectBuy = hero.getDailyDirectBuy();
				Struct_mrzg1_256 struct_mrzg1_256 = Config_mrzg1_256.getIns().get(itemid);
				if (struct_mrzg1_256 == null) {
					LogTool.warn("struct_mrzg1_256==null " + itemid, DailyDirectBuyFunction.class);
					return;
				}
				int day = struct_mrzg1_256.getDay();
				if (!checkCanRechargeDate(day)) {
					LogTool.warn("DailyDirectBuyFunction checkCanRechargeDate itemid:" + itemid + " name:"
							+ hero.getNameZoneid() + " hid:" + hero.getId(), this);
					return;
				}
				Integer state = dailyDirectBuy.getAwardMap().get(itemid);
				if (state == null) {
					dailyDirectBuy.getAwardMap().put(itemid, DailyDirectBuyConst.NOTBUY);
					state = DailyDirectBuyConst.NOTBUY;
				}
				if (state == DailyDirectBuyConst.NOTBUY) {
					dailyDirectBuy.getAwardMap().put(itemid, DailyDirectBuyConst.BUY_NOTGET);
					targetAwardHandle(hero);
					DailyDirectBuySender.sendCmd_3706(hero.getId(), itemid);
				}

			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, DailyDirectBuyFunction.class, hero.getId(), hero.getName(),
						"dailyDirectBuyRechargeHandle has wrong");
			}
		}

	}

	public boolean checkCanRechargeDate(int day) {
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (day <= betweenOpen) {
			return true;
		}
		return false;

	}

	/**
	 * 取得每日直购系统结束时间
	 * 
	 * @return
	 */
	public int getEndTime() {
		int endDay = Config_xitong_001.getIns().get(DailyDirectBuyConst.SYSTEMID).getDay() % 1000;
		int endTime = (endDay - TimeDateUtil.betweenOpen()) * TimeDateUtil.ONE_DAY_INT
				+ TimeDateUtil.getTomorrowZeroTimeReturnInt();
		return endTime;
	}

	/**
	 * 目标奖励处理
	 * 
	 * @param hero
	 */
	public void targetAwardHandle(Hero hero) {
		int targetTimes = 0;
		try {
			DailyDirectBuy dailyDirectBuy = hero.getDailyDirectBuy();
			Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
			targetTimes = dailyDirectBuy.getAwardMap().size();
			List<Struct_mrzgmb_256> targetAwardConfigList = DailyDirectBuyCache.getTargetAwardConfigList();
			boolean flag = false;
			for (Struct_mrzgmb_256 struct_mrzgmb_256 : targetAwardConfigList) {
				int bianhao = struct_mrzgmb_256.getBianhao();
				if (targetTimes >= struct_mrzgmb_256.getCishu() && targetAwardMap.get(bianhao) == null) {
					targetAwardMap.put(bianhao, DailyDirectBuyConst.CAN_GET);
					flag = true;
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, DailyDirectBuyConst.SYSTEMID,
						DailyDirectBuyConst.TARGETREDPOINT, RedPointConst.HAS_RED);
			}
			DailyDirectBuyManager.getIns().openUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "targetAwardHandle targetTimes:" + targetTimes);
		}
	}

	public void daojuRecharge(Hero hero, int money, int product_id) {
		int pType = Config_shop_011.getIns().get(product_id).getType();
		if (pType != RechargeConst.DAILYDIRECTBUY) {
			return;
		}
		if (HeroFunction.getIns().checkSystemOpen(hero, DailyDirectBuyConst.SYSTEMID)) {
			int betweenOpen = TimeDateUtil.betweenOpen();
			List<Struct_mrzg1_256> list = DailyDirectBuyCache.getDailyDirectBuyConfigMap().get(betweenOpen);
			Struct_mrzg1_256 struct = null;
			for (Struct_mrzg1_256 struct_mrzg1_256 : list) {
				if (struct_mrzg1_256.getCz() == product_id) {
					struct = struct_mrzg1_256;
					break;
				}
			}
			if (struct == null) {
				return;
			}
			Map<Integer, Integer> awardMap = hero.getDailyDirectBuy().getAwardMap();
			Integer state = awardMap.get(struct.getId());
			if (state == null) {
				awardMap.put(struct.getId(), DailyDirectBuyConst.BUY_NOTGET);
				targetAwardHandle(hero);
				DailyDirectBuyManager.getIns().openUI(hero);
			}
			return;
		} else if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
			int activityOpenDays = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.ACT_DAILYDIRECTBUY);
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.ACT_DAILYDIRECTBUY);
			int periods = activityInfo.getPeriods();
			Map<Integer, Map<Integer, List<Struct_mrzg2_256>>> dailyDirectBuyConfigMap = DailyDirectBuyActCache
					.getDailyDirectBuyConfigMap();
			List<Struct_mrzg2_256> list = dailyDirectBuyConfigMap.get(periods).get(activityOpenDays);
			Struct_mrzg2_256 struct = null;
			for (Struct_mrzg2_256 struct_mrzg2_256 : list) {
				if (struct_mrzg2_256.getCz() == product_id) {
					struct = struct_mrzg2_256;
					break;
				}
			}
			if (struct == null) {
				return;
			}
			DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_DAILYDIRECTBUY);
			Map<Integer, Integer> awardList = dailyDirectBuy.getAwardList();
			Integer state = awardList.get(struct.getId());
			if (state == null) {
				awardList.put(struct.getId(), DailyDirectBuyActConst.BUY_NOTGET);
				DailyDirectBuyActFunction.getIns().targetAwardHandle(hero);
				DailyDirectBuyActManager.getIns().openUI(hero);
			}
			return;
		} else if (OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAILYBUY)) {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAILYBUY);
			OtherDailyDirectBuy dailyDirectBuy = (OtherDailyDirectBuy) OtherDailyDirectBuyManager.getIns()
					.getSystemModel(hero, uid);
			int betweenOpen = TimeDateUtil.betweenOpen();
			int index = betweenOpen % 7;
			if (index == 0) {
				index = 7;
			}
			// 每日直购表id
			int itemid = 0;
			List<Struct_mrzg3_256> list = OtherDailyDirectBuyCache.getDailyDirectBuyConfigMap()
					.get(dailyDirectBuy.getQs()).get(index);
			for (int i = 0; i < list.size(); i++) {
				Struct_mrzg3_256 struct_mrzg3_256 = list.get(i);
				if (struct_mrzg3_256.getCz() == product_id) {
					itemid = struct_mrzg3_256.getId();
					break;
				}
			}
			Struct_mrzg3_256 struct_mrzg3_256 = Config_mrzg3_256.getIns().get(itemid);
			if (struct_mrzg3_256 == null) {
				LogTool.warn("daojuRecharge OtherDailyBuyRecharge struct_mrzg3_256==null " + itemid,
						OtherDailyDirectBuyFunction.class);
				return;
			}
			Integer state = dailyDirectBuy.getAwardMap().get(itemid);
			if (state == null) {
				LogTool.warn("daojuRecharge OtherDailyBuyRecharge state==null itemid:" + itemid + " name:"
						+ hero.getNameZoneid() + " hid:" + hero.getId(), OtherDailyDirectBuyFunction.class);
				return;
			} else if (state == DailyDirectBuyConst.NOTBUY) {
				dailyDirectBuy.getAwardMap().put(itemid, DailyDirectBuyConst.BUY_NOTGET);
				OtherDailyDirectBuyFunction.getIns().targetAwardHandle(hero);
				OtherDailyDirectBuySender.sendCmd_7004(hero.getId(), itemid);
			}
		}

	}
}
