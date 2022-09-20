package com.teamtop.system.activity.ativitys.hefuFristRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_hfkhhfsc_286;
import excel.struct.Struct_hfkhhfsc_286;

public class HeFuFristRechargeEvent  extends AbsSystemEvent {
	
	private static HeFuFristRechargeEvent ins;

	private HeFuFristRechargeEvent() {
		
	}
	
	public static synchronized HeFuFristRechargeEvent getIns() {
		if (ins == null) {
			ins = new HeFuFristRechargeEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_FRIESTRECHARGE)) {
			return;
		}
		HeFuFristRecharge hefuFristRecharge = (HeFuFristRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_FRIESTRECHARGE);
		
		for (Struct_hfkhhfsc_286 hfkhhfsc_286: Config_hfkhhfsc_286.getIns().getSortList()) {
			HashMap<Integer, Integer> reward = hefuFristRecharge.getReward();
			if(!reward.containsKey(hfkhhfsc_286.getId())) {
				reward.put(hfkhhfsc_286.getId(), GameConst.REWARD_0);
			}
			int state=reward.get(hfkhhfsc_286.getId());
			if (state==GameConst.REWARD_1) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.HEFU_FRIESTRECHARGE, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			}
		}
		
	}


}
