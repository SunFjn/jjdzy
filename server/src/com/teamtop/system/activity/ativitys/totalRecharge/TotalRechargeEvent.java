package com.teamtop.system.activity.ativitys.totalRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.struct.Struct_leichong1_725;

public class TotalRechargeEvent extends AbsSystemEvent{
	
	public static TotalRechargeEvent ins;
	public static synchronized TotalRechargeEvent getIns() {
		if(ins == null){
			ins = new TotalRechargeEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_TOTALRECHARGE)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_TOTALRECHARGE)) {
			return;
		}
		boolean isHong=false;
		TotalRecharge totalRecharge = (TotalRecharge)hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.Act_TOTALRECHARGE);
		HashMap<Integer, Integer> rewardMap = totalRecharge.getRewardMap();
		//+档次
		for (Struct_leichong1_725 struct_leichong1_725 : TotalRechargeSysCache.getConfigMap()
				.get(totalRecharge.getPeriods()).getConfigList()) {
			if (!rewardMap.containsKey(struct_leichong1_725.getId())) {
				rewardMap.put(struct_leichong1_725.getId(), GameConst.REWARD_0);
			}
		}
		for (int rewardKey:rewardMap.keySet()) {
			int rewardSate=rewardMap.get(rewardKey);
			if (rewardSate==GameConst.REWARD_1) {
				isHong=true;
				break;
			}
		}
		//红点
		if (isHong) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY, 1, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero,ActivitySysId.Act_TOTALRECHARGE,1,RedPointConst.HAS_RED);
			return;
		}

		
	}

}
