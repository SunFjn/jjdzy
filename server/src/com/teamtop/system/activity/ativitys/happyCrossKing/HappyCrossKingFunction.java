package com.teamtop.system.activity.ativitys.happyCrossKing;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_allpartylsxx_241;
import excel.struct.Struct_allpartylsxx_241;


public class HappyCrossKingFunction {
	
	public static HappyCrossKingFunction ins;
	public static synchronized HappyCrossKingFunction getIns() {
		if(ins == null){
			ins = new HappyCrossKingFunction();
		}
		return ins;
	}
	
	public void addNumByType(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HappyCrossKing)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyCrossKing)) {
			return;
		}
		try {
			HappyCrossKing happyCrossKing = (HappyCrossKing)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyCrossKing);
			if (hero.getCrossKing().getDuanwei()>happyCrossKing.getCrossKingNum()) {
				happyCrossKing.setCrossKingNum(hero.getCrossKing().getDuanwei());
			}
			int goal=happyCrossKing.getCrossKingNum();
			//目标
			for (Struct_allpartylsxx_241 allparty_241:Config_allpartylsxx_241.getIns().getSortList()) {
				if(goal>=allparty_241.getYq()&&happyCrossKing.getRewardMap().get(allparty_241.getId())==GameConst.REWARD_0) {
					happyCrossKing.getRewardMap().put(allparty_241.getId(), GameConst.REWARD_1);
					HappyCrossKingSender.sendCmd_2584(hero.getId(), allparty_241.getId(), GameConst.REWARD_1,goal);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HappyCrossKingFunction.class,"addNumByType has wrong hid:"+hero.getId());
		}
	}
}
