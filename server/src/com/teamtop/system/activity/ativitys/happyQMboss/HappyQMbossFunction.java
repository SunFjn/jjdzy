package com.teamtop.system.activity.ativitys.happyQMboss;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_allpartyboss_241;
import excel.struct.Struct_allpartyboss_241;

public class HappyQMbossFunction {
	
	public static HappyQMbossFunction ins;
	public static synchronized HappyQMbossFunction getIns() {
		if(ins == null){
			ins = new HappyQMbossFunction();
		}
		return ins;
	}
	
	public void addNumByType(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HappyQmboss)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyQmboss)) {
			return;
		}
		try {
			HappyQMboss happyQMboss = (HappyQMboss)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyQmboss);
			happyQMboss.setQmBossNum(happyQMboss.getQmBossNum()+1);
			int goal=happyQMboss.getQmBossNum();
			HashMap<Integer, Integer> rewardMap = happyQMboss.getRewardMap();
			//目标
			for (Struct_allpartyboss_241 allparty_241:Config_allpartyboss_241.getIns().getSortList()) {
				if(goal>=allparty_241.getYq()&& rewardMap.get(allparty_241.getId())!=null&& rewardMap.get(allparty_241.getId())==GameConst.REWARD_0) {
					happyQMboss.getRewardMap().put(allparty_241.getId(), GameConst.REWARD_1);
					HappyQMbossSender.sendCmd_2574(hero.getId(), allparty_241.getId(), GameConst.REWARD_1,goal);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HappyQMbossFunction.class,"addNumByType has wrong hid:"+hero.getId());
		}
	}

}
