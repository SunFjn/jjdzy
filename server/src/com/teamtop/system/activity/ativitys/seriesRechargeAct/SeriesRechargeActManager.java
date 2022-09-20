package com.teamtop.system.activity.ativitys.seriesRechargeAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.seriesRechargeAct.model.SeriesRechargeAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lxcz_764;
import excel.struct.Struct_lxcz_764;

public class SeriesRechargeActManager extends AbstractActivityManager {
	private static volatile SeriesRechargeActManager ins = null;

	public static SeriesRechargeActManager getIns() {
		if (ins == null) {
			synchronized (SeriesRechargeActManager.class) {
				if (ins == null) {
					ins = new SeriesRechargeActManager();
				}
			}
		}
		return ins;
	}

	private SeriesRechargeActManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERIESRECHARGE_ACT)) {
			return;
		}
		SeriesRechargeAct seriesRechargeAct = (SeriesRechargeAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.SERIESRECHARGE_ACT);
		Map<Integer, Integer> awardStateMap = seriesRechargeAct.getAwardStateMap();
		Map<Integer, Integer[]> rechargeDayMap = seriesRechargeAct.getRechargeDayMap();
		Map<Integer, Map<Integer, Struct_lxcz_764>> configListMap = SeriesRechargeActSysCache.getConfigListMap()
				.get(seriesRechargeAct.getPeriods());
		ArrayList<Object[]> awardList = new ArrayList<>();
		for (Entry<Integer, Map<Integer, Struct_lxcz_764>> entry : configListMap.entrySet()) {
			ArrayList<Object[]> objArrayList = new ArrayList<>();
			Map<Integer, Struct_lxcz_764> treeMap = entry.getValue();
			for (Struct_lxcz_764 struct_lxcz_764 : treeMap.values()) {
				int id = struct_lxcz_764.getId();
				Integer state = Optional.ofNullable(awardStateMap).map(map -> map.get(id))
						.orElse(SeriesRechargeActConst.NOT_REACH);
				objArrayList.add(new Object[] { id, state });
			}
			Integer rmb = entry.getKey();
			Integer day = Optional.ofNullable(rechargeDayMap).map(map -> map.get(rmb)).map(array -> array[1]).orElse(0);
			awardList.add(new Object[] { objArrayList.toArray(), day });
		}
		int todayRecharge = seriesRechargeAct.getTodayRecharge();
		SeriesRechargeActSender.sendCmd_10200(hero.getId(), awardList.toArray(), todayRecharge);
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param awardId 要领取的奖励id
	 */
	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERIESRECHARGE_ACT)) {
				return;
			}
			Struct_lxcz_764 struct_lxcz_764 = Config_lxcz_764.getIns().get(awardId);
			if (struct_lxcz_764 == null) {
				SeriesRechargeActSender.sendCmd_10202(hero.getId(), SeriesRechargeActConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			SeriesRechargeAct seriesRechargeAct = (SeriesRechargeAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.SERIESRECHARGE_ACT);
			Map<Integer, Integer> awardStateMap = seriesRechargeAct.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				SeriesRechargeActSender.sendCmd_10202(hero.getId(), SeriesRechargeActConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == SeriesRechargeActConst.GETTED) {
				SeriesRechargeActSender.sendCmd_10202(hero.getId(), SeriesRechargeActConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, SeriesRechargeActConst.GETTED);
			int[][] reward = struct_lxcz_764.getJiangli();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.SERIESRECHARGE_ACT_REWARD, UseAddUtil.getDefaultMail(), true);
			SeriesRechargeActSender.sendCmd_10202(hero.getId(), SeriesRechargeActConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward awardId:" + awardId);
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
		int oneDayRecharge = hero.getOneDayRecharge();
		if (oneDayRecharge > 0) {
			SeriesRechargeActFunction.getIns().rechargeHandler(hero, oneDayRecharge, 0);
		}
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		// 补发邮件奖励
		Integer configId = 0;
		try {
			SeriesRechargeAct seriesRechargeAct = (SeriesRechargeAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.SERIESRECHARGE_ACT);
			Map<Integer, Integer> awardStateMap = seriesRechargeAct.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				Integer state = entry.getValue();
				if (state == SeriesRechargeActConst.CAN_GET) {
					configId = entry.getKey();
					Struct_lxcz_764 struct_lxcz_764 = Config_lxcz_764.getIns().get(configId);
					int[][] reward = struct_lxcz_764.getJiangli();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.SERIESRECHARGE_ACT_REWARD,
							new Object[] { MailConst.SERIESRECHARGE_ACT_REWARD }, reward);
					entry.setValue(SeriesRechargeActConst.GETTED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "handleEnd configId:" + configId);
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		SeriesRechargeAct seriesRechargeAct = new SeriesRechargeAct(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		seriesRechargeAct.setAwardStateMap(new HashMap<>());
		// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
		seriesRechargeAct.setRechargeDayMap(new HashMap<>());
		return seriesRechargeAct;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return SeriesRechargeAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		SeriesRechargeActFunction.getIns().rechargeHandler(hero, money, product_id);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return SeriesRechargeActEvent.getIns();
	}

}
