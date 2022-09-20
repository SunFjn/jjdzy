package com.teamtop.system.activity.ativitys.hefuRechargeBack;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_hfkhczfl_286;
import excel.config.Config_hfkhczfljl_286;
import excel.struct.Struct_hfkhczfl_286;
import excel.struct.Struct_hfkhczfljl_286;

public class HeFuRechargeBackEvent extends AbsSystemEvent {
	

	private static HeFuRechargeBackEvent ins;

	private HeFuRechargeBackEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeFuRechargeBackEvent getIns() {
		if (ins == null) {
			ins = new HeFuRechargeBackEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		
		
	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_RECHARGEBACK)) {
			return;
		}
		HeFuRechargeBack actData = (HeFuRechargeBack) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_RECHARGEBACK);
		
		int recharge = actData.getRecharge();
		for (Struct_hfkhczfljl_286 struct_hfkhczfljl_286:Config_hfkhczfljl_286.getIns().getSortList()) {
			int taskid=struct_hfkhczfljl_286.getId();
			if (!actData.getTaskInfo().containsKey(taskid)) {
				actData.getTaskInfo().put(taskid, 0);
			}
			int state=GameConst.REWARD_0;
			if (actData.getReward().contains(taskid)) {
				state=GameConst.REWARD_2;
			}
			Struct_hfkhczfl_286 hfkhczfl_286 = Config_hfkhczfl_286.getIns().get(taskid/1000);
			int num = actData.getTaskInfo().get(taskid);
			if (num>=struct_hfkhczfljl_286.getCs()&&recharge>=hfkhczfl_286.getCz()&&state!=GameConst.REWARD_2) {
				//红点
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.HEFU_RECHARGEBACK, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
				break;
			}
		}
		
		
	}

}
