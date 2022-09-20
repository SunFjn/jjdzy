package com.teamtop.system.openDaysSystem.monsterKingTotalRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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
import com.teamtop.system.openDaysSystem.monsterKingTotalRecharge.model.MonsterKingTotalRecharge;
import com.teamtop.util.log.LogTool;

import excel.config.Config_wszwlc_284;
import excel.struct.Struct_wszwlc_284;

public class MonsterKingTotalRechargeManager extends AbsOpenDaysManager {
	private static volatile MonsterKingTotalRechargeManager ins = null;

	public static MonsterKingTotalRechargeManager getIns() {
		if (ins == null) {
			synchronized (MonsterKingTotalRechargeManager.class) {
				if (ins == null) {
					ins = new MonsterKingTotalRechargeManager();
				}
			}
		}
		return ins;
	}

	private MonsterKingTotalRechargeManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE)) {
			return;
		}
		MonsterKingTotalRecharge mkTotalRecharge = MonsterKingTotalRechargeFunction.getIns().getModel(hero);
		Map<Integer, Integer> awardStateMap = mkTotalRecharge.getAwardStateMap();
		int qs = mkTotalRecharge.getQs();
		int rechargeYb = mkTotalRecharge.getRechargeYb();
		Map<Integer, Struct_wszwlc_284> configMap = MonsterKingTotalRechargeSysCache.getQsConfigMap().get(qs);
		Iterator<Struct_wszwlc_284> iterator = configMap.values().iterator();
		ArrayList<Object> awardList = new ArrayList<>();
		for (; iterator.hasNext();) {
			Struct_wszwlc_284 wszwlc_284 = iterator.next();
			int id = wszwlc_284.getId();
			if (rechargeYb >= wszwlc_284.getLj() && awardStateMap.get(id) == null) {
				awardStateMap.put(id, MonsterKingTotalRechargeConst.CAN_GET);
			}
			Integer state = Optional.ofNullable(awardStateMap).map(map -> map.get(id))
					.orElse(MonsterKingTotalRechargeConst.NOT_REACH);
			awardList.add(new Object[] { id, state });
		}
		MonsterKingTotalRechargeSender.sendCmd_9100(hero.getId(), awardList.toArray(), rechargeYb);
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param awardId 要领取的奖励id
	 */
	public void getReward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE)) {
				return;
			}
			Struct_wszwlc_284 struct_wszwlc_284 = Config_wszwlc_284.getIns().get(awardId);
			if (struct_wszwlc_284 == null) {
				MonsterKingTotalRechargeSender.sendCmd_9102(hero.getId(), MonsterKingTotalRechargeConst.FAILURE_NOT_AWARD,
						awardId);
				return;
			}
			MonsterKingTotalRecharge mkTotalRecharge = MonsterKingTotalRechargeFunction.getIns().getModel(hero);
			Map<Integer, Integer> awardStateMap = mkTotalRecharge.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				MonsterKingTotalRechargeSender.sendCmd_9102(hero.getId(), MonsterKingTotalRechargeConst.FAILURE_NOT_REACH,
						awardId);
				return;
			}
			if (state == MonsterKingTotalRechargeConst.GETTED) {
				MonsterKingTotalRechargeSender.sendCmd_9102(hero.getId(), MonsterKingTotalRechargeConst.FAILURE_NOT_REP,
						awardId);
				return;
			}
			awardStateMap.put(awardId, MonsterKingTotalRechargeConst.GETTED);
			int[][] reward = struct_wszwlc_284.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.MONSTER_KING_TOTAL_RECHARGE, UseAddUtil.getDefaultMail(),
					true);
			MonsterKingTotalRechargeSender.sendCmd_9102(hero.getId(), MonsterKingTotalRechargeConst.SUCCESS, awardId);
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
		MonsterKingTotalRechargeFunction.getIns().rechargeYB(hero, 0, 0);
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
			MonsterKingTotalRecharge mkTotalRecharge = (MonsterKingTotalRecharge) MonsterKingTotalRechargeManager
					.getIns()
					.getSystemModel(hero, uid);
			int mailId = MailConst.MONSTER_KING_TOTAL_RECHARGE;
			Map<Integer, Integer> awardStateMap = mkTotalRecharge.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				Integer state = entry.getValue();
				if (state == MonsterKingTotalRechargeConst.CAN_GET) {
					entry.setValue(MonsterKingTotalRechargeConst.GETTED);
					configId = entry.getKey();
					Struct_wszwlc_284 struct_wszwlc_284 = Config_wszwlc_284.getIns().get(configId);
					int[][] reward = struct_wszwlc_284.getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId, new Object[] { mailId }, reward);
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
		MonsterKingTotalRecharge mkTotalRecharge = (MonsterKingTotalRecharge) heroOpenDaysSysData.getOpSysDataMap()
				.get(uid);
		if (mkTotalRecharge == null) {
			mkTotalRecharge = new MonsterKingTotalRecharge();
			mkTotalRecharge.setAwardStateMap(new HashMap<>());
			// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
			mkTotalRecharge.setRechargeYb(hero.getOneDayRecharge());
		}
		return mkTotalRecharge;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return MonsterKingTotalRecharge.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return MonsterKingTotalRechargeEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		MonsterKingTotalRechargeFunction.getIns().rechargeYB(hero, money, product_id);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
