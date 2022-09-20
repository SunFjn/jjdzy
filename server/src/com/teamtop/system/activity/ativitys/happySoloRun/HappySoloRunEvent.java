package com.teamtop.system.activity.ativitys.happySoloRun;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class HappySoloRunEvent extends AbsSystemEvent {

	public static HappySoloRunEvent ins;
	public static synchronized HappySoloRunEvent getIns() {
		if(ins == null){
			ins = new HappySoloRunEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		
		
	}
	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappySoloRun)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappySoloRun)) {
			return;
		}
		boolean isHong=false;
		// 是否有未领取奖励
		HappySoloRun happySoloRun = (HappySoloRun)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappySoloRun);
		HashMap<Integer, Integer> rewards = happySoloRun.getRewardMap();
		for (int index:rewards.keySet()) {
			int rewardSate=rewards.get(index);
			if (rewardSate==GameConst.REWARD_1) {
				isHong=true;
				break;
			}
		}
		//红点
		if (isHong) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_HappySoloRun, 1, RedPointConst.HAS_RED);
		}
		
	}


}
