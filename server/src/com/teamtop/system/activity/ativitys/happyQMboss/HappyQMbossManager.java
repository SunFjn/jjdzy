package com.teamtop.system.activity.ativitys.happyQMboss;

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

import excel.config.Config_allpartyboss_241;
import excel.struct.Struct_allpartyboss_241;

public class HappyQMbossManager extends AbstractActivityManager {
	
	public static HappyQMbossManager ins;
	public static synchronized HappyQMbossManager getIns() {
		if(ins == null){
			ins = new HappyQMbossManager();
		}
		return ins;
	}
	

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HappyQmboss)) {
			return;
		}
		// 活动开启处理
		// 检测奖励领取状态
		HappyQMboss happyQMboss = (HappyQMboss)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyQmboss);
        HashMap<Integer, Integer> rewardMap = happyQMboss.getRewardMap();
        happyQMboss.setQmBossNum(0);
		for (Struct_allpartyboss_241  allparty_241: Config_allpartyboss_241.getIns().getSortList()) {
			rewardMap.put(allparty_241.getId(), GameConst.REWARD_0);
		}
		
		
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		long hid = hero.getId();
		// 发放未领取奖励
		HappyQMboss happyQMboss = (HappyQMboss)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyQmboss);
		HashMap<Integer, Integer> rewards=happyQMboss.getRewardMap();
		for (int index:rewards.keySet()) {
			int rewardSate=rewards.get(index);
			int[][] reward=Config_allpartyboss_241.getIns().get(index).getReward();
			if (rewardSate==GameConst.REWARD_1) {
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.QUANMINGHAPPY, new Object[] {MailConst.QUANMINGHAPPY}, reward);
			}
		}
		happyQMboss.getRewardMap().clear();
	}

	@Override
	public boolean checkActOpen(Hero hero) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HappyQMboss happyQMboss = new HappyQMboss();
		happyQMboss.setHid(hero.getId());
		happyQMboss.setIndexId(activityInfo.getIndex());
		happyQMboss.setActId(activityInfo.getActId());
		happyQMboss.setPeriods(activityInfo.getPeriods());
		happyQMboss.setQmBossNum(0);
		HashMap<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
		for (Struct_allpartyboss_241  allparty_241: Config_allpartyboss_241.getIns().getSortList()) {
			
			rewardMap.put(allparty_241.getId(), GameConst.REWARD_0);
		}
		happyQMboss.setRewardMap(rewardMap);
		return happyQMboss;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return HappyQMboss.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return HappyQMbossEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappyQmboss)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyQmboss)) {
				return;
			}
			HappyQMboss happyQMboss = (HappyQMboss)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyQmboss);
			
			Map<Integer, Integer> rewardMap = happyQMboss.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			for (int index:rewardMap.keySet()) {
				rewardData.add(new Object[] { index, rewardMap.get(index) });
			}
			HappyQMbossSender.sendCmd_2572(hero.getId(), rewardData.toArray(),happyQMboss.getQmBossNum());
		} catch (Exception e) {
			LogTool.error(e, HappyQMbossManager.class, hero.getId(), hero.getName(),"HappyQMbossManager openUI");
		}
		
	}


	public void getreward(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappyQmboss)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyQmboss)) {
				return;
			}
            HappyQMboss happyQMboss = (HappyQMboss)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyQmboss);
            Struct_allpartyboss_241 struct_allpartyboss_241 = Config_allpartyboss_241.getIns().get(index);
            int[][] reward=struct_allpartyboss_241.getReward();
            HashMap<Integer, Integer> rewardMap = happyQMboss.getRewardMap();
			if(rewardMap.get(index)!=null&& rewardMap.get(index)==GameConst.REWARD_1) {
				if (UseAddUtil.canAdd(hero, reward, false)) {
					UseAddUtil.add(hero, reward, SourceGoodConst.HAPPYQMBOSS_REWARD, null,true);
					happyQMboss.getRewardMap().put(index, GameConst.REWARD_2);
					HappyQMbossSender.sendCmd_2574(hero.getId(), index, GameConst.REWARD_2,happyQMboss.getQmBossNum());
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HappyQMbossManager.class, hero.getId(), hero.getName(),"getreward has wrong");
		}
		
	}

}
