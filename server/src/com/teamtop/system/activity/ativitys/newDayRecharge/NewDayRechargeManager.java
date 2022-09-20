package com.teamtop.system.activity.ativitys.newDayRecharge;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_drlc2_734;
import excel.struct.Struct_drlc2_734;

public class NewDayRechargeManager extends AbstractActivityManager{

	public static NewDayRechargeManager ins;
	public static synchronized NewDayRechargeManager getIns() {
		if(ins == null){
			ins = new NewDayRechargeManager();
		}
		return ins;
	}
	
	@Override
	public void actOpen() {
		
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		NewDayRecharge newDayRecharge = (NewDayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWDAYRECHARGE);
		newDayRecharge.setHid(hero.getId());
		newDayRecharge.setRechargeNum(0);
		newDayRecharge.setRewardMap(new HashMap<>());
		for (Struct_drlc2_734 drlc2_734:Config_drlc2_734.getIns().getSortList()) {
			newDayRecharge.getRewardMap().put(drlc2_734.getId(), GameConst.REWARD_0);
		}
		
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		NewDayRecharge newDayRecharge = (NewDayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWDAYRECHARGE);
		newDayRecharge.setHid(hero.getId());
		newDayRecharge.setRechargeNum(0);
		for (Struct_drlc2_734 drlc2_734:Config_drlc2_734.getIns().getSortList()) {
			if (newDayRecharge.getRewardMap().containsKey(drlc2_734.getId())&&newDayRecharge.getRewardMap().get(drlc2_734.getId())==GameConst.REWARD_1) {
				newDayRecharge.getRewardMap().put(drlc2_734.getId(), GameConst.REWARD_2);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONEDAYRECAHARE, new Object[] {MailConst.ONEDAYRECAHARE}, drlc2_734.getReward());
			}
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		NewDayRecharge newDayRecharge = new NewDayRecharge();
		newDayRecharge.setHid(hero.getId());
		newDayRecharge.setIndexId(activityInfo.getIndex());
		newDayRecharge.setActId(activityInfo.getActId());
		newDayRecharge.setPeriods(activityInfo.getPeriods());
		newDayRecharge.setRechargeNum(0);
		newDayRecharge.setPeriods(activityInfo.getPeriods());
		newDayRecharge.setRewardMap(new HashMap<>());
		for (Struct_drlc2_734 drlc2_734:Config_drlc2_734.getIns().getSortList()) {
			newDayRecharge.getRewardMap().put(drlc2_734.getId(), GameConst.REWARD_0);
		}
		return newDayRecharge;
	}

	@Override
	public Class<?> getActivityData() {
		return NewDayRecharge.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWDAYRECHARGE);
			if (!checkHeroActOpen) {
				return;
			}
			boolean ischarge=false;
			NewDayRecharge newDayRecharge = (NewDayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWDAYRECHARGE);
			int week = TimeDateUtil.getWeek();
			ConcurrentHashMap<Integer, Struct_drlc2_734> concurrentHashMap = NewDayRechargeCache.NewDayRechargeHashMap.get(week);
			newDayRecharge.setRechargeNum(newDayRecharge.getRechargeNum()+money);
			for (Struct_drlc2_734 drlc2_734:concurrentHashMap.values()) {
				if (newDayRecharge.getRewardMap().get(drlc2_734.getId())==GameConst.REWARD_0&&newDayRecharge.getRechargeNum()>=drlc2_734.getCoin()) {
					newDayRecharge.getRewardMap().put(drlc2_734.getId(), GameConst.REWARD_1);
					NewDayRechargeSender.sendCmd_2934(hero.getId(), newDayRecharge.getRechargeNum(), drlc2_734.getId(),  GameConst.REWARD_1);
                    ischarge=true;				
				}
			}
			if (!ischarge) {
				NewDayRechargeSender.sendCmd_2934(hero.getId(), newDayRecharge.getRechargeNum(), 0, 0);
			}
		} catch (Exception e) {
			LogTool.error(e, NewDayRechargeManager.class, hero.getId(), hero.getName(), "rechargeHandle has wrong");
		}
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return NewDayRechargeEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWDAYRECHARGE);
			if (!checkHeroActOpen) {
				return;
			}
			NewDayRecharge newDayRecharge = (NewDayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWDAYRECHARGE);
			int week = TimeDateUtil.getWeek();
			ConcurrentHashMap<Integer, Struct_drlc2_734> concurrentHashMap = NewDayRechargeCache.NewDayRechargeHashMap.get(week);
		    Object[] states=new Object[concurrentHashMap.size()];
		    int i=0;
			for (Struct_drlc2_734 drlc2_734:concurrentHashMap.values()) {
				states[i]=new Object[] {drlc2_734.getId(),newDayRecharge.getRewardMap().get(drlc2_734.getId())};
				i++;
			}
			NewDayRechargeSender.sendCmd_2932(hero.getId(), week, newDayRecharge.getRechargeNum(), states);
		    return;
			
		} catch (Exception e) {
			LogTool.error(e, NewDayRechargeManager.class, hero.getId(), hero.getName(), "openUI has wrong");
		}
		
	}

	public void getreward(Hero hero, int index) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWDAYRECHARGE);
			if (!checkHeroActOpen) {
				return;
			}
			NewDayRecharge newDayRecharge = (NewDayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWDAYRECHARGE);
			int week = TimeDateUtil.getWeek();
			ConcurrentHashMap<Integer, Struct_drlc2_734> concurrentHashMap = NewDayRechargeCache.NewDayRechargeHashMap.get(week);
			if (!concurrentHashMap.containsKey(index)) {
				LogTool.warn("HashMap.containsKey(index) :"+hero.getId()+" name:"+hero.getName(), NewDayRechargeManager.class);
				return;
			}
			Struct_drlc2_734 struct_drlc2_734 = concurrentHashMap.get(index);
			if (newDayRecharge.getRewardMap().get(index)!=GameConst.REWARD_1) {
				LogTool.warn("getRewardMap().get(index)!=GameConst.REWARD_1 :"+hero.getId()+" name:"+hero.getName(), NewDayRechargeManager.class);
				return;
			}
			
			if(UseAddUtil.canAddJK(hero, struct_drlc2_734.getReward(), false, struct_drlc2_734.getJiankong())) {
				newDayRecharge.getRewardMap().put(index, GameConst.REWARD_2);
				UseAddUtil.addJK(hero, struct_drlc2_734.getReward(), SourceGoodConst.REWARD_ACTDAYRECHARGE, null, true, struct_drlc2_734.getJiankong());
			}
			NewDayRechargeSender.sendCmd_2934(hero.getId(), newDayRecharge.getRechargeNum(), index, newDayRecharge.getRewardMap().get(index));
			return;
		} catch (Exception e) {
			LogTool.error(e, NewDayRechargeManager.class, hero.getId(), hero.getName(), "getreward has wrong");
		}
		
	}

}
