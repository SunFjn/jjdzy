package com.teamtop.system.openDaysSystem.otherTotalRecharge;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.otherTotalRecharge.model.OtherTotalRechargeSys;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_leichong3_725;
import excel.config.Config_xitong_001;
import excel.struct.Struct_leichong3_725;

public class OtherTotalRechargeSysEvent extends AbsSystemEvent {
	public static OtherTotalRechargeSysEvent ins;

	public static OtherTotalRechargeSysEvent getIns() {
		if (ins == null) {
			ins = new OtherTotalRechargeSysEvent();
		}
		return ins;
	}

	public OtherTotalRechargeSysEvent() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		zeroHero(hero, 0);
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_TOTAL_RECHARGE)) {
			return;
		}
		boolean isHong = false;
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_TOTAL_RECHARGE);
		OtherTotalRechargeSys totalRechargeSys = (OtherTotalRechargeSys) OtherTotalRechargeSysManager.getIns()
				.getSystemModel(hero, uid);
		int qs = totalRechargeSys.getQs();
		Map<Integer, Struct_leichong3_725> map = Config_leichong3_725.getIns().getMap();
		HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
		Iterator<Integer> iterator = rewardMap.keySet().iterator();
		for (;iterator.hasNext();) {
			int rewardKey = iterator.next();
			Struct_leichong3_725 leichong3_725 = map.get(rewardKey);
			if(leichong3_725!=null&&qs!=leichong3_725.getQs()) {
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
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY, 1,
					RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.OTHER_TOTAL_RECHARGE, 1,
					RedPointConst.HAS_RED);
			return;
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
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
//			Map<Integer, Struct_leichong3_725> map = OtherTotalRechargeCache.getQsMap().get(qs);
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
