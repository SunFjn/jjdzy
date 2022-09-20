package com.teamtop.system.openDaysSystem.seriesRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.seriesRecharge.model.SeriesRecharge;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lchl_756;
import excel.struct.Struct_lchl_756;

public class SeriesRechargeManager extends AbsOpenDaysManager {
	private static volatile SeriesRechargeManager ins = null;

	public static SeriesRechargeManager getIns() {
		if (ins == null) {
			synchronized (SeriesRechargeManager.class) {
				if (ins == null) {
					ins = new SeriesRechargeManager();
				}
			}
		}
		return ins;
	}

	private SeriesRechargeManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE)) {
			return;
		}
		SeriesRecharge seriesRecharge = SeriesRechargeFunction.getIns().getModel(hero);
		Map<Integer, Integer> awardStateMap = seriesRecharge.getAwardStateMap();
		Map<Integer, Integer[]> rechargeDayMap = seriesRecharge.getRechargeDayMap();
		Map<Integer, Map<Integer, Struct_lchl_756>> configListMap = SeriesRechargeSysCache.getConfigListMap()
				.get(seriesRecharge.getQs());
		ArrayList<Object[]> awardList = new ArrayList<>();
		for (Entry<Integer, Map<Integer, Struct_lchl_756>> entry : configListMap.entrySet()) {
			ArrayList<Object[]> objArrayList = new ArrayList<>();
			Map<Integer, Struct_lchl_756> treeMap = entry.getValue();
			for (Struct_lchl_756 struct_lchl_756 : treeMap.values()) {
				int id = struct_lchl_756.getId();
				Integer state = Optional.ofNullable(awardStateMap).map(map -> map.get(id))
						.orElse(SeriesRechargeConst.NOT_REACH);
				objArrayList.add(new Object[] { id, state });
			}
			Integer rmb = entry.getKey();
			Integer day = Optional.ofNullable(rechargeDayMap).map(map -> map.get(rmb)).map(array -> array[1]).orElse(0);
			awardList.add(new Object[] { objArrayList.toArray(), day });
		}
		int todayRecharge = seriesRecharge.getTodayRecharge();
		SeriesRechargeSender.sendCmd_8800(hero.getId(), awardList.toArray(), todayRecharge);
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.KING_OF_MONSTERS_SERIESRECHARGE)) {
				return;
			}
			Struct_lchl_756 struct_lchl_756 = Config_lchl_756.getIns().get(awardId);
			if (struct_lchl_756 == null) {
				SeriesRechargeSender.sendCmd_8802(hero.getId(), SeriesRechargeConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			SeriesRecharge seriesRecharge = SeriesRechargeFunction.getIns().getModel(hero);
			Map<Integer, Integer> awardStateMap = seriesRecharge.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				SeriesRechargeSender.sendCmd_8802(hero.getId(), SeriesRechargeConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == SeriesRechargeConst.GETTED) {
				SeriesRechargeSender.sendCmd_8802(hero.getId(), SeriesRechargeConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, SeriesRechargeConst.GETTED);
			int[][] reward = struct_lchl_756.getJiangli();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.KING_OF_MONSTERS_SERIESRECHARGE_REWARD,
					UseAddUtil.getDefaultMail(), true);
			SeriesRechargeSender.sendCmd_8802(hero.getId(), SeriesRechargeConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward awardId:" + awardId);
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub
		// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
		SeriesRechargeFunction.getIns().rechargeHandler(hero, 0, 0);
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO Auto-generated method stub
		// 补发邮件奖励
		Integer configId = 0;
		try {
			SeriesRecharge seriesRecharge = (SeriesRecharge) SeriesRechargeManager.getIns().getSystemModel(hero, uid);
			Map<Integer, Integer> awardStateMap = seriesRecharge.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				Integer state = entry.getValue();
				if (state == SeriesRechargeConst.CAN_GET) {
					configId = entry.getKey();
					Struct_lchl_756 struct_lchl_756 = Config_lchl_756.getIns().get(configId);
					int[][] reward = struct_lchl_756.getJiangli();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
							MailConst.KING_OF_MONSTERS_SERIESRECHARGE_REWARD,
							new Object[] { MailConst.KING_OF_MONSTERS_SERIESRECHARGE_REWARD }, reward);
					entry.setValue(SeriesRechargeConst.GETTED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "handleEnd configId:" + configId);
		}

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		// TODO Auto-generated method stub
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		SeriesRecharge seriesRecharge = (SeriesRecharge) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (seriesRecharge == null) {
			seriesRecharge = new SeriesRecharge();
			seriesRecharge.setAwardStateMap(new HashMap<>());
			// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
			seriesRecharge.setRechargeDayMap(new HashMap<>());
			seriesRecharge.setTodayRecharge(hero.getOneDayRecharge());
		}
		return seriesRecharge;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return SeriesRecharge.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return SeriesRechargeEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		SeriesRechargeFunction.getIns().rechargeHandler(hero, money, product_id);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
