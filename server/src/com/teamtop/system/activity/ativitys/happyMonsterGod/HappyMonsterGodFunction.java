package com.teamtop.system.activity.ativitys.happyMonsterGod;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_allpartylvbu_241;
import excel.struct.Struct_allpartylvbu_241;


public class HappyMonsterGodFunction {
	public static HappyMonsterGodFunction ins;
	public static synchronized HappyMonsterGodFunction getIns() {
		if(ins == null){
			ins = new HappyMonsterGodFunction();
		}
		return ins;
	}
	
	public void addNumByType(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HappyMonsterGod)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyMonsterGod)) {
			return;
		}
		try {
			HappyMonsterGod happyMonsterGod = (HappyMonsterGod)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyMonsterGod);
			happyMonsterGod.setMonsterGodNum(happyMonsterGod.getMonsterGodNum()+1);
			int goal=happyMonsterGod.getMonsterGodNum();
			//目标
			for (Struct_allpartylvbu_241 allparty_241:Config_allpartylvbu_241.getIns().getSortList()) {
				if(goal>=allparty_241.getYq()&&happyMonsterGod.getRewardMap().get(allparty_241.getId())==GameConst.REWARD_0) {
					happyMonsterGod.getRewardMap().put(allparty_241.getId(), GameConst.REWARD_1);
					HappyMonsterGodSender.sendCmd_2594(hero.getId(), allparty_241.getId(), GameConst.REWARD_1,goal);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HappyMonsterGodFunction.class,"addNumByType has wrong hid:"+hero.getId());
		}
	}
}
