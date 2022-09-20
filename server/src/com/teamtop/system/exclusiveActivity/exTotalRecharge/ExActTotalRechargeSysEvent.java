package com.teamtop.system.exclusiveActivity.exTotalRecharge;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.exclusiveActivity.AbsExActSystemEvent;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.exTotalRecharge.model.ExActTotalRechargeSys;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_zshdljcz_315;
import excel.struct.Struct_zshdljcz_315;

public class ExActTotalRechargeSysEvent extends AbsExActSystemEvent {
	public static ExActTotalRechargeSysEvent ins;

	public static ExActTotalRechargeSysEvent getIns() {
		if (ins == null) {
			ins = new ExActTotalRechargeSysEvent();
		}
		return ins;
	}

	public ExActTotalRechargeSysEvent() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void init(Hero hero, int id) {
	}

	@Override
	public void login(Hero hero, int id) {
		// TODO Auto-generated method stub
		zeroHero(hero, 0, id);
//		if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//			return;
//		}
		if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
			return;
		}
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActTotalRechargeSys totalRechargeSys = (ExActTotalRechargeSys) activityData.getExActivityMap().get(id);
		boolean isHong = false;
		int qs = totalRechargeSys.getQs();
		Map<Integer, Struct_zshdljcz_315> map = Config_zshdljcz_315.getIns().getMap();
		HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
		Iterator<Integer> iterator = rewardMap.keySet().iterator();
		for (;iterator.hasNext();) {
			int rewardKey = iterator.next();
			Struct_zshdljcz_315 zshdljcz_315 = map.get(rewardKey);
			if (zshdljcz_315 != null && qs != zshdljcz_315.getQs()) {
				iterator.remove();
				continue;
			}
			int rewardSate = rewardMap.get(rewardKey);
			if (rewardSate == GameConst.REWARD_1) {
				isHong = true;
				break;
			}
		}
		// 红点
		if (isHong) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.EXCLUSIVE_TOTAL_RECHARGE, id,
					RedPointConst.HAS_RED);
			return;
		}
	}

	@Override
	public void loginReset(Hero hero, int now, int id) {
		// TODO Auto-generated method stub
		zeroHero(hero, now, id);
	}

	@Override
	public void zeroHero(Hero hero, int now, int id) {
		// TODO Auto-generated method stub
		// 补发邮件奖励
//		int day = Config_xitong_001.getIns().get(SystemIdConst.OTHER_TOTAL_RECHARGE).getDay();
//		int betweenOpen = TimeDateUtil.betweenOpen();
//		if (betweenOpen >= day % 1000 + 1) {
//			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_TOTAL_RECHARGE);
//			OtherTotalRechargeSys totalRechargeSys = (OtherTotalRechargeSys) OtherTotalRechargeSysManager.getIns()
//					.getSystemModel(hero, uid);
//			HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
//			int qs = totalRechargeSys.getQs();
		// Map<Integer, Struct_zshdljcz_315> map =
		// OtherTotalRechargeCache.getQsMap().get(qs);
//			for (int rewardKey : rewardMap.keySet()) {
//				int rewardSate = rewardMap.get(rewardKey);
//				int[][] reward = map.get(rewardKey).getReward();
//				if (rewardSate == GameConst.REWARD_1) {
//					rewardMap.put(rewardKey, GameConst.REWARD_2);
//					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.TOTALRECAHARE,
//							new Object[] { MailConst.TOTALRECAHARE }, reward);
//				}
//			}
//		}
	}

}
