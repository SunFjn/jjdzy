package com.teamtop.system.activity.ativitys.happySoloRun;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigConst;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_allpartyddfh_241;
import excel.struct.Struct_allpartyddfh_241;

public class HappySoloRunFunction {

	public static HappySoloRunFunction ins;

	public static synchronized HappySoloRunFunction getIns() {
		if (ins == null) {
			ins = new HappySoloRunFunction();
		}
		return ins;
	}

	public void addNumByType(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HappySoloRun)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappySoloRun)) {
			return;
		}
		try {
			HappySoloRun happySoloRun = (HappySoloRun) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.Act_HappySoloRun);
			happySoloRun.setSoloRunNum(happySoloRun.getSoloRunNum() + 1);
			int goal = happySoloRun.getSoloRunNum();
			// 目标
			for (Struct_allpartyddfh_241 allparty_241 : Config_allpartyddfh_241.getIns().getSortList()) {
				if (goal >= allparty_241.getYq()
						&& happySoloRun.getRewardMap().get(allparty_241.getId()) == GameConst.REWARD_0) {
					happySoloRun.getRewardMap().put(allparty_241.getId(), GameConst.REWARD_1);
					HappySoloRunSender.sendCmd_2604(hero.getId(), allparty_241.getId(), GameConst.REWARD_1, goal);
				}
			}

		} catch (Exception e) {
			LogTool.error(e, HappySoloRunFunction.class, "addNumByType has wrong hid:" + hero.getId());
		}
	}

}
