package com.teamtop.system.activity.ativitys.happyCrossKing;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class HappyCrossKingEvent extends AbsSystemEvent {

	public static HappyCrossKingEvent ins;
	public static synchronized HappyCrossKingEvent getIns() {
		if(ins == null){
			ins = new HappyCrossKingEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappyCrossKing)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyCrossKing)) {
			return;
		}
		boolean isHong=false;
		// 是否有未领取奖励
		HappyCrossKing happyCrossKing = (HappyCrossKing)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyCrossKing);
		HashMap<Integer, Integer> rewards = happyCrossKing.getRewardMap();
		for (int index:rewards.keySet()) {
			int rewardSate=rewards.get(index);
			if (rewardSate==GameConst.REWARD_1) {
				isHong=true;
				break;
			}
		}
		//红点
		if (isHong) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_HappyCrossKing, 1, RedPointConst.HAS_RED);
		}
		
	}

}
