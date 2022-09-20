package com.teamtop.system.activity.ativitys.happyQMboss;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class HappyQMbossEvent extends AbsSystemEvent {
	
	public static HappyQMbossEvent ins;
	public static synchronized HappyQMbossEvent getIns() {
		if(ins == null){
			ins = new HappyQMbossEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		
		
	}
	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappyQmboss)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyQmboss)) {
			return;
		}
		boolean isHong=false;
		// 是否有未领取奖励
		HappyQMboss happyQMboss = (HappyQMboss)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyQmboss);
		HashMap<Integer, Integer> rewards = happyQMboss.getRewardMap();
		for (int index:rewards.keySet()) {
			int rewardSate=rewards.get(index);
			if (rewardSate==GameConst.REWARD_1) {
				isHong=true;
				break;
			}
		}
		//红点
		if (isHong) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_HappyQmboss, 1, RedPointConst.HAS_RED);
		}
		
	}

}
