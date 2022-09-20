package com.teamtop.system.totalRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.totalRecharge.model.TotalRechargeSys;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_leichong_725;
import excel.config.Config_xitong_001;
import excel.struct.Struct_leichong_725;

public class TotalRechargeSysEvent extends AbsSystemEvent {
	public static TotalRechargeSysEvent ins;

	public static TotalRechargeSysEvent getIns() {
		if (ins == null) {
			ins = new TotalRechargeSysEvent();
		}
		return ins;
	}

	public TotalRechargeSysEvent() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		TotalRechargeSys totalRechargeSys = hero.getTotalRechargeSys();
		if (totalRechargeSys == null) {
			totalRechargeSys = new TotalRechargeSys();
			totalRechargeSys.setHid(hero.getId());
			HashMap<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
			for (Struct_leichong_725 struct_leichong_725 : Config_leichong_725.getIns().getSortList()) {
				rewardMap.put(struct_leichong_725.getId(), GameConst.REWARD_0);
			}
			totalRechargeSys.setRewardMap(rewardMap);
			hero.setTotalRechargeSys(totalRechargeSys);
		}
		//+档次
		if (totalRechargeSys.getRewardMap().size()!=Config_leichong_725.getIns().getSortList().size()) {
			for (Struct_leichong_725 struct_leichong_725 : Config_leichong_725.getIns().getSortList()) {
				if (!totalRechargeSys.getRewardMap().containsKey(struct_leichong_725.getId())) {
					totalRechargeSys.getRewardMap().put(struct_leichong_725.getId(), GameConst.REWARD_0);
				}
			}
		}
		
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		zeroHero(hero, 0);
		if (!HeroFunction.getIns().checkSystemOpen(hero, TotalRechargeSysConst.SYS_ID)) {
			return;
		}
		boolean isHong = false;
		TotalRechargeSys totalRechargeSys = hero.getTotalRechargeSys();
		HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
		for (int rewardKey : rewardMap.keySet()) {
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
			RedPointFunction.getIns().addLoginRedPoint(hero, TotalRechargeSysConst.SYS_ID, 1, RedPointConst.HAS_RED);
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
		int day = Config_xitong_001.getIns().get(TotalRechargeSysConst.SYS_ID).getDay();
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (betweenOpen >= day % 1000 + 1) {
			TotalRechargeSys totalRechargeSys = hero.getTotalRechargeSys();
			HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
			for (int rewardKey : rewardMap.keySet()) {
				int rewardSate = rewardMap.get(rewardKey);
				if (Config_leichong_725.getIns().getMap().containsKey(rewardKey)) {
					int[][] reward = Config_leichong_725.getIns().get(rewardKey).getReward();
					if (rewardSate == GameConst.REWARD_1) {
						rewardMap.put(rewardKey, GameConst.REWARD_2);
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.TOTALRECAHARE,
								new Object[] { MailConst.TOTALRECAHARE }, reward);
					}
				}
			}
		}
	}

}
