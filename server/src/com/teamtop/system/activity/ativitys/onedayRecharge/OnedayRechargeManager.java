package com.teamtop.system.activity.ativitys.onedayRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_drleichong_727;
import excel.struct.Struct_drleichong_727;


public class OnedayRechargeManager extends AbstractActivityManager{
	public static OnedayRechargeManager ins;
	public static synchronized OnedayRechargeManager getIns() {
		if(ins == null){
			ins = new OnedayRechargeManager();
		}
		return ins;
	}
	
	@Override
	public void actOpen() {

		
	}

	@Override
	public void heroActOpen(Hero hero) {
		// 活动开启处理
		// 检测奖励领取状态
		OnedayRecharge onedayRecharge =(OnedayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_DayRecharge);
		onedayRecharge.setRewardNum(0);
		HashMap<Integer, Integer> rewardMap = onedayRecharge.getRewardMap();
		int qs= onedayRecharge.getPeriods();
		for (Struct_drleichong_727  drleichong_727: OnedayRechargeCache.OnedayRechargeMap.get(qs).values()) {
			rewardMap.put(drleichong_727.getId(), GameConst.REWARD_0);
		}
		onedayRecharge.setRewardMap(rewardMap);
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		OnedayRecharge onedayRecharge =(OnedayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_DayRecharge);
		HashMap<Integer, Integer> rewardMap = onedayRecharge.getRewardMap();
		for (int rewardKey:rewardMap.keySet()) {
			int rewardSate=rewardMap.get(rewardKey);
			int[][] reward=Config_drleichong_727.getIns().get(rewardKey).getReward();
			if (rewardSate==GameConst.REWARD_1) {
				rewardMap.put(rewardKey, GameConst.REWARD_2);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONEDAYRECAHARE, new Object[] {MailConst.ONEDAYRECAHARE}, reward);
			}
		}
		onedayRecharge.getRewardMap().clear();
		onedayRecharge.setRewardNum(0);
	}

	@Override
	public boolean checkActOpen(Hero hero) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		OnedayRecharge onedayRecharge = new OnedayRecharge();
		onedayRecharge.setHid(hero.getId());
		onedayRecharge.setIndexId(activityInfo.getIndex());
		onedayRecharge.setActId(activityInfo.getActId());
		onedayRecharge.setPeriods(activityInfo.getPeriods());
		onedayRecharge.setRewardNum(0);
		HashMap<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
		for (Struct_drleichong_727  drleichong_727: OnedayRechargeCache.OnedayRechargeMap.get(activityInfo.getPeriods()).values()) {
			rewardMap.put(drleichong_727.getId(), GameConst.REWARD_0);
		}
		onedayRecharge.setRewardMap(rewardMap);
		return onedayRecharge;
	}

	@Override
	public Class<?> getActivityData() {
		return OnedayRecharge.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_DayRecharge)) {
			return;
		}
		/*OnedayRecharge onedayRecharge = (OnedayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_DayRecharge);
		onedayRecharge.setRewardNum(onedayRecharge.getRewardNum()+money);
		HashMap<Integer, Integer> rewardMap = onedayRecharge.getRewardMap();
		for (int rewardKey:rewardMap.keySet()) {
			int rewardSate=rewardMap.get(rewardKey);
			int rewardNum=Config_drleichong_727.getIns().get(rewardKey).getCoin();
			if (rewardSate==GameConst.REWARD_0&&onedayRecharge.getRewardNum()>=rewardNum) {
				rewardMap.put(rewardKey, GameConst.REWARD_1);
				OnedayRechargeSender.sendCmd_2524(hero.getId(), rewardKey, GameConst.REWARD_1);
			}
		}
		OnedayRechargeSender.sendCmd_2526(hero.getId(), onedayRecharge.getRewardNum());*/
		return;
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return OnedayRechargeEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_DayRecharge)) {
				return;
			}
			/*OnedayRecharge onedayRecharge = (OnedayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_DayRecharge);
			
			Map<Integer, Integer> rewardMap = onedayRecharge.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			for (int index:rewardMap.keySet()) {
				rewardData.add(new Object[] { index, rewardMap.get(index) });
			}
			OnedayRechargeSender.sendCmd_2522(hero.getId(), onedayRecharge.getRewardNum(), rewardData.toArray());*/
		} catch (Exception e) {
			LogTool.error(e, OnedayRechargeManager.class, hero.getId(), hero.getName(),"OnedayRechargeManager openUI");
		}
		
	}

	public void getreward(Hero hero, int index) {
		try {
			/*if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_DayRecharge)) {
				LogTool.warn("checkSystemOpen no", OnedayRechargeManager.class);
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_DayRecharge)) {
				LogTool.warn("checkSwitch no", OnedayRechargeManager.class);
				return;
			}
			OnedayRecharge onedayRecharge = (OnedayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_DayRecharge);
			if (!onedayRecharge.getRewardMap().containsKey(index)) {
				LogTool.warn("!onedayRecharge.getRewardMap().containsKey(index) "+index, OnedayRechargeManager.class);
				return;
			}
			int state=onedayRecharge.getRewardMap().get(index);
			if (state==GameConst.REWARD_1) {
				int[][] reward=Config_drleichong_727.getIns().get(index).getReward();
				if (UseAddUtil.canAdd(hero, reward, false)) {
					onedayRecharge.getRewardMap().put(index, GameConst.REWARD_2);
					UseAddUtil.add(hero, reward, SourceGoodConst.ACT_DAYRECHARGE, null, true);
					OnedayRechargeSender.sendCmd_2524(hero.getId(), index, GameConst.REWARD_2);
				}
			}*/
			return;
		} catch (Exception e) {
			LogTool.error(e, OnedayRechargeManager.class, "getreward has wrong");
		}
	}

}
