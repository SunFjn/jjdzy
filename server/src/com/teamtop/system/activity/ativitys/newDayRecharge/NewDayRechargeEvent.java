package com.teamtop.system.activity.ativitys.newDayRecharge;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_drlc2_734;
import excel.struct.Struct_drlc2_734;

public class NewDayRechargeEvent extends AbsSystemEvent{

	public static NewDayRechargeEvent ins;
	public static synchronized NewDayRechargeEvent getIns() {
		if(ins == null){
			ins = new NewDayRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		
		
	}

	@Override
	public void login(Hero hero) {
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWDAYRECHARGE);
		if (!checkHeroActOpen) {
			return;
		}
		NewDayRecharge newDayRecharge = (NewDayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWDAYRECHARGE);
		//+档次
		for (Struct_drlc2_734 drlc2_734:Config_drlc2_734.getIns().getSortList()) {
			if (!newDayRecharge.getRewardMap().containsKey(drlc2_734.getId())) {
				newDayRecharge.getRewardMap().put(drlc2_734.getId(), GameConst.REWARD_0);
			}
		}
		int week = TimeDateUtil.getWeek();
		ConcurrentHashMap<Integer, Struct_drlc2_734> concurrentHashMap = NewDayRechargeCache.NewDayRechargeHashMap.get(week);
		for (Struct_drlc2_734 drlc2_734:concurrentHashMap.values()) {
			if (newDayRecharge.getRewardMap().get(drlc2_734.getId())==GameConst.REWARD_1) {
				RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.Act_NEWDAYRECHARGE,
						1, RedPointConst.HAS_RED);
			}
		}
		
	}
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero,int now){
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWDAYRECHARGE);
		if (!checkHeroActOpen) {
			return;
		}
		NewDayRecharge newDayRecharge = (NewDayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWDAYRECHARGE);
		newDayRecharge.setRechargeNum(0);
		for (Struct_drlc2_734 drlc2_734:Config_drlc2_734.getIns().getSortList()) {
			if (newDayRecharge.getRewardMap().containsKey(drlc2_734.getId())&&newDayRecharge.getRewardMap().get(drlc2_734.getId())==GameConst.REWARD_1) {
				newDayRecharge.getRewardMap().put(drlc2_734.getId(), GameConst.REWARD_2);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONEDAYRECAHARE, new Object[] {MailConst.ONEDAYRECAHARE}, drlc2_734.getReward());
			}
		}
	}

}
