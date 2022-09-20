package com.teamtop.system.activity.ativitys.onedayRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.struct.Struct_drleichong_727;

public class OnedayRechargeEvent extends AbsSystemEvent {
	
	public static OnedayRechargeEvent ins;
	public static synchronized OnedayRechargeEvent getIns() {
		if(ins == null){
			ins = new OnedayRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_DayRecharge)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_DayRecharge)) {
			return;
		}
		boolean isHong=false;
		OnedayRecharge onedayRecharge = (OnedayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_DayRecharge);
		HashMap<Integer, Integer> rewardMap = onedayRecharge.getRewardMap();
		for (int rewardKey:rewardMap.keySet()) {
			int rewardSate=rewardMap.get(rewardKey);
			if (rewardSate==GameConst.REWARD_1) {
				isHong=true;
				break;
			}
		}
		//红点
		if (isHong) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_DayRecharge,1,RedPointConst.HAS_RED);
			return;
		}
		
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	@Override
	public void zeroHero(Hero hero,int now){
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_DayRecharge)) {
			return;
		}
		OnedayRecharge onedayRecharge =(OnedayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_DayRecharge);
		onedayRecharge.setRewardNum(0);
		HashMap<Integer, Integer> rewardMap = onedayRecharge.getRewardMap();
		int qs= onedayRecharge.getPeriods();
		for (Struct_drleichong_727  drleichong_727: OnedayRechargeCache.OnedayRechargeMap.get(qs).values()) {
			rewardMap.put(drleichong_727.getId(), GameConst.REWARD_0);
		}
		onedayRecharge.setRewardMap(rewardMap);
	}

}
