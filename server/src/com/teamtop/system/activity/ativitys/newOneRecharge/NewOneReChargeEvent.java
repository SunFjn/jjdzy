package com.teamtop.system.activity.ativitys.newOneRecharge;

import java.util.HashMap;
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

import excel.config.Config_dbcz2_733;
import excel.struct.Struct_dbcz2_733;


public class NewOneReChargeEvent extends AbsSystemEvent{
	
	public static NewOneReChargeEvent ins;
	public static synchronized NewOneReChargeEvent getIns() {
		if(ins == null){
			ins = new NewOneReChargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		
		
	}

	@Override
	public void login(Hero hero) {
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWONERECHARGE);
		if (!checkHeroActOpen) {
			return;
		}
		NewOneReCharge newOneRecharge = (NewOneReCharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWONERECHARGE);
		if (newOneRecharge.getHasRewardNum()==null) {
			return;
		}
		for (Struct_dbcz2_733 dbcz2_733:Config_dbcz2_733.getIns().getSortList()) {
			int cishu=dbcz2_733.getCs();
			int xh = dbcz2_733.getXh();
			if (!newOneRecharge.getReward().containsKey(xh)) {
				HashMap<Integer, Integer> hashMap = new HashMap<Integer,Integer>();
				newOneRecharge.getReward().put(xh, hashMap);
			}
			HashMap<Integer, Integer> hashMap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i <cishu; i++) {
				if(!hashMap.containsKey(i)) {
					hashMap.put(i,GameConst.REWARD_0);
				}
			}
			if (newOneRecharge.getHasRewardNum().get(xh)==null) {
				Integer[] getRewardNum=new Integer[] {0,0};
				newOneRecharge.getHasRewardNum().put(xh, getRewardNum);
			}
		}
		
		int week = TimeDateUtil.getWeek();
		ConcurrentHashMap<Integer, Struct_dbcz2_733> concurrentHashMap = NewOneReChargeCache.NewOneReChargeHashMap.get(week);
		for (Struct_dbcz2_733 dbcz2_733:concurrentHashMap.values()) {
			int xh = dbcz2_733.getXh();
			int cishu=dbcz2_733.getCs();
			HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i <cishu; i++) {
				if (rewardhashmap.get(i)==GameConst.REWARD_1) {
					RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.Act_NEWONERECHARGE,
							1, RedPointConst.HAS_RED);
					return;
				}
			}
		}
		
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero,int now){
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWONERECHARGE);
		if (!checkHeroActOpen) {
			return;
		}
		NewOneReCharge newOneRecharge = (NewOneReCharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWONERECHARGE);
		if (newOneRecharge.getHasRewardNum()==null) {
			return;
		}
		int week = TimeDateUtil.getWeek()-1;
		if (week==0) {
			week=7;
		}
		ConcurrentHashMap<Integer, Struct_dbcz2_733> concurrentHashMap = NewOneReChargeCache.NewOneReChargeHashMap.get(week);
		for (Struct_dbcz2_733 dbcz2_733:concurrentHashMap.values()) {
			int cishu=dbcz2_733.getCs();
			int xh = dbcz2_733.getXh();
			if (newOneRecharge.getHasRewardNum().containsKey(xh)) {
				Integer[] integers = newOneRecharge.getHasRewardNum().get(xh);
				Integer canNum= integers[0];
				Integer hasCt = integers[1];
				HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
				for (int i = 0; i <cishu; i++) {
					if (rewardhashmap.get(i)==GameConst.REWARD_1) {
						rewardhashmap.put(i, GameConst.REWARD_2);
						hasCt=hasCt+1;
						newOneRecharge.getHasRewardNum().put(xh, new Integer[] {canNum,hasCt});
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONERECHARGE_AWARD, new Object[] {MailConst.ONERECHARGE_AWARD}, dbcz2_733.getJl());
					}
				}
			}
		}
	
	}
}
