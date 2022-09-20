package com.teamtop.system.activity.ativitys.countryTreasure;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_ewjl_753;
import excel.struct.Struct_ewjl_753;

public class CountryTreasureEvent extends AbsSystemEvent {
	public static CountryTreasureEvent ins;

	public static CountryTreasureEvent getIns() {
		if (ins == null) {
			ins = new CountryTreasureEvent();
		}
		return ins;
	}

	private CountryTreasureEvent() {
	}

	@Override
	public void init(Hero hero) {
		
		
	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_COUNTRYTREASURE)) {
			return;
		}
		CountryTreasure countryTreasure = (CountryTreasure) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_COUNTRYTREASURE);
		for (Integer key:countryTreasure.getExtraRewards().keySet()) {
			Struct_ewjl_753 bzjc_753 = Config_ewjl_753.getIns().get(key);
			if (bzjc_753.getQs()==countryTreasure.getPeriods()&&bzjc_753.getLs()==countryTreasure.getLun()&&countryTreasure.getExtraRewards().get(key)==GameConst.REWARD_1) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_COUNTRYTREASURE, 1, RedPointConst.HAS_RED);
			    break;
			}
		}
		
	}

}
