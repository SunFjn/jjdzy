package com.teamtop.system.openDaysSystem.monsterKingTotalRecharge;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.monsterKingTotalRecharge.model.MonsterKingTotalRecharge;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_wszwlc_284;

public class MonsterKingTotalRechargeFunction {
	private static volatile MonsterKingTotalRechargeFunction ins = null;

	public static MonsterKingTotalRechargeFunction getIns() {
		if (ins == null) {
			synchronized (MonsterKingTotalRechargeFunction.class) {
				if (ins == null) {
					ins = new MonsterKingTotalRechargeFunction();
				}
			}
		}
		return ins;
	}

	private MonsterKingTotalRechargeFunction() {
	}

	/**
	 * 取得少主活动-累计充值model
	 * 
	 * @param hero
	 * @return
	 */
	public MonsterKingTotalRecharge getModel(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_TOTAL_RECHARGE);
		MonsterKingTotalRecharge model = (MonsterKingTotalRecharge) MonsterKingTotalRechargeManager.getIns()
				.getSystemModel(hero,
				uid);
		return model;
	}

	public void rechargeYB(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		try {
			// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.MONSTER_KING_TOTAL_RECHARGE)) {
				return;
			}
			MonsterKingTotalRecharge mkTotalRecharge = getModel(hero);
			Map<Integer, Integer> awardStateMap = mkTotalRecharge.getAwardStateMap();
			int rechargeYb = mkTotalRecharge.getRechargeYb();
			mkTotalRecharge.setRechargeYb(rechargeYb + money);
			int newRechargeYb = mkTotalRecharge.getRechargeYb();

			int qs = mkTotalRecharge.getQs();
			Map<Integer, Struct_wszwlc_284> configMap = MonsterKingTotalRechargeSysCache.getQsConfigMap().get(qs);
			boolean flag = false;
			Iterator<Struct_wszwlc_284> iterator = configMap.values().iterator();
			for (; iterator.hasNext();) {
				Struct_wszwlc_284 struct_wszwlc_284 = iterator.next();
				int id = struct_wszwlc_284.getId();
				if (newRechargeYb >= struct_wszwlc_284.getLj() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, MonsterKingTotalRechargeConst.CAN_GET);
					flag = true;
				}
			}

			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE)) {
				return;
			}
			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE, 1,
						RedPointConst.HAS_RED);
			}
			MonsterKingTotalRechargeManager.getIns().openUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"rechargeYB money:" + money + " product_id:" + product_id);
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE)) {
			return;
		}
		MonsterKingTotalRecharge mkTotalRecharge = getModel(hero);
		Map<Integer, Integer> awardStateMap = mkTotalRecharge.getAwardStateMap();
		for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
			Integer state = entry.getValue();
			if (state == MonsterKingTotalRechargeConst.CAN_GET) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MONSTER_KING, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}
	}

}
