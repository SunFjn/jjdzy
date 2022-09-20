package com.teamtop.system.exclusiveActivity.exOneRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.exclusiveActivity.AbsExActSystemEvent;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshddbcz_315;
import excel.struct.Struct_zshddbcz_315;


public class ExActOneRechargeEvent extends AbsExActSystemEvent{
	
	public static ExActOneRechargeEvent ins;
	public static synchronized ExActOneRechargeEvent getIns() {
		if(ins == null){
			ins = new ExActOneRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero, int id) {
		
		
	}

	@Override
	public void login(Hero hero, int id) {
//		if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//			return;
//		}
		if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
			return;
		}
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActOneRecharge newOneRecharge = (ExActOneRecharge) activityData.getExActivityMap().get(id);
		if (newOneRecharge.getHasRewardNum() == null) {
			return;
		}
		int nowQs = newOneRecharge.getQs();
		for (Struct_zshddbcz_315 zshddbcz_315 : Config_zshddbcz_315.getIns().getSortList()) {
			int cishu = zshddbcz_315.getCs();
			int xh = zshddbcz_315.getXh();
			int qs = zshddbcz_315.getQs();
			if (qs != nowQs) {
				continue;
			}
			if (!newOneRecharge.getReward().containsKey(xh)) {
				HashMap<Integer, Integer> hashMap = new HashMap<Integer, Integer>();
				newOneRecharge.getReward().put(xh, hashMap);
			}
			HashMap<Integer, Integer> hashMap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i < cishu; i++) {
				if (!hashMap.containsKey(i)) {
					hashMap.put(i, GameConst.REWARD_0);
				}
			}
			if (newOneRecharge.getHasRewardNum().get(xh) == null) {
				// Integer[] getRewardNum = new Integer[] { 0, 0 };
				List<Integer> getRewardNum = new ArrayList<>();
				getRewardNum.add(0);
				getRewardNum.add(0);
				newOneRecharge.getHasRewardNum().put(xh, getRewardNum);
			}
		}

//		ConcurrentHashMap<Integer, Struct_zshddbcz_315> concurrentHashMap = ExActOneRechargeCache.NewOneReChargeHashMap
//				.get(nowQs);
//		for (Struct_zshddbcz_315 zshddbcz_315 : concurrentHashMap.values()) {
//			int xh = zshddbcz_315.getXh();
//			int cishu = zshddbcz_315.getCs();
//			HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
//			for (int i = 0; i < cishu; i++) {
//				if (rewardhashmap.get(i) == GameConst.REWARD_1) {
//					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.OTHER_ONE_RECHARGE, 1,
//							RedPointConst.HAS_RED);
//					return;
//				}
//			}
//		}
		boolean checkRedPoint = ExActOneRechargeFunction.getIns().checkRedPoint(hero, id);
		if(checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.EXACT_ONE_RECHARGE, id, RedPointConst.HAS_RED);
		}
	}
	
	@Override
	public void loginReset(Hero hero, int now, int id) {
		zeroHero(hero, now, id);
	}

	@Override
	public void zeroHero(Hero hero, int now, int id) {
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOneRecharge newOneRecharge = (ExActOneRecharge) activityData.getExActivityMap().get(id);
			if (newOneRecharge.getHasRewardNum() == null) {
				return;
			}
			int qs = newOneRecharge.getQs();
			ConcurrentHashMap<Integer, Struct_zshddbcz_315> concurrentHashMap = ExActOneRechargeCache.NewOneReChargeHashMap
					.get(qs);
			if (concurrentHashMap == null) {
				return;
			}
			for (Struct_zshddbcz_315 zshddbcz_315 : concurrentHashMap.values()) {
				int cishu = zshddbcz_315.getCs();
				int xh = zshddbcz_315.getXh();
				if (newOneRecharge.getHasRewardNum().containsKey(xh)) {
					List<Integer> integers = newOneRecharge.getHasRewardNum().get(xh);
					Integer canNum = integers.get(0);
					Integer hasCt = integers.get(1);
					HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
					for (int i = 0; i < cishu; i++) {
						if (rewardhashmap.get(i) == GameConst.REWARD_1) {
							rewardhashmap.put(i, GameConst.REWARD_2);
							hasCt = hasCt + 1;
							List<Integer> rewardList = new ArrayList<>();
							rewardList.add(canNum);
							rewardList.add(hasCt);
							newOneRecharge.getHasRewardNum().put(xh, rewardList);
							MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.EXACT_ONERECHARGE_AWARD,
									new Object[] { MailConst.EXACT_ONERECHARGE_AWARD }, zshddbcz_315.getJl());
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "ExActOneRechargeEvent zeroHero");
		}
	}
}
