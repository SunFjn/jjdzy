package com.teamtop.system.activity.ativitys.happySoloRun;

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

import excel.config.Config_allpartyddfh_241;
import excel.struct.Struct_allpartyddfh_241;


public class HappySoloRunManager extends AbstractActivityManager{

	public static HappySoloRunManager ins;
	public static synchronized HappySoloRunManager getIns() {
		if(ins == null){
			ins = new HappySoloRunManager();
		}
		return ins;
	}
	
	

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HappySoloRun)) {
			return;
		}
		// 活动开启处理
		// 检测奖励领取状态
		HappySoloRun happySoloRun = (HappySoloRun)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappySoloRun);
        HashMap<Integer, Integer> rewardMap = happySoloRun.getRewardMap();
        happySoloRun.setSoloRunNum(0);
		for (Struct_allpartyddfh_241  allparty_241: Config_allpartyddfh_241.getIns().getSortList()) {
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
		HappySoloRun happySoloRun = (HappySoloRun)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappySoloRun);
		HashMap<Integer, Integer> rewards=happySoloRun.getRewardMap();
		for (int index:rewards.keySet()) {
			int rewardSate=rewards.get(index);
			int[][] reward=Config_allpartyddfh_241.getIns().get(index).getReward();
			if (rewardSate==GameConst.REWARD_1) {
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.QUANMINGHAPPY, new Object[] {MailConst.QUANMINGHAPPY}, reward);
			}
		}
		happySoloRun.getRewardMap().clear();
	}

	@Override
	public boolean checkActOpen(Hero hero) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HappySoloRun happySoloRun = new HappySoloRun();
		happySoloRun.setHid(hero.getId());
		happySoloRun.setIndexId(activityInfo.getIndex());
		happySoloRun.setActId(activityInfo.getActId());
		happySoloRun.setPeriods(activityInfo.getPeriods());
		happySoloRun.setSoloRunNum(0);
		HashMap<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
		for (Struct_allpartyddfh_241  allparty_241: Config_allpartyddfh_241.getIns().getSortList()) {
			
			rewardMap.put(allparty_241.getId(), GameConst.REWARD_0);
		}
		happySoloRun.setRewardMap(rewardMap);
		return happySoloRun;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return HappySoloRun.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return HappySoloRunEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappySoloRun)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappySoloRun)) {
				return;
			}
			HappySoloRun happySoloRun = (HappySoloRun)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappySoloRun);
			
			Map<Integer, Integer> rewardMap = happySoloRun.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			for (int index:rewardMap.keySet()) {
				rewardData.add(new Object[] { index, rewardMap.get(index) });
			}
			HappySoloRunSender.sendCmd_2602(hero.getId(), rewardData.toArray(),happySoloRun.getSoloRunNum());
		} catch (Exception e) {
			LogTool.error(e, HappySoloRunManager.class, hero.getId(), hero.getName(),"HappySoloRunManager openUI");
		}
		
	}


	public void getreward(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappySoloRun)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappySoloRun)) {
				return;
			}
			HappySoloRun happySoloRun = (HappySoloRun)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappySoloRun);
			Struct_allpartyddfh_241 struct_allpartyboss_241 = Config_allpartyddfh_241.getIns().get(index);
            int[][] reward=struct_allpartyboss_241.getReward();
			if(happySoloRun.getRewardMap().get(index)==GameConst.REWARD_1) {
				if (UseAddUtil.canAdd(hero, reward, false)) {
					UseAddUtil.add(hero, reward, SourceGoodConst.HAPPYQMBOSS_REWARD, null,true);
					happySoloRun.getRewardMap().put(index, GameConst.REWARD_2);
					HappySoloRunSender.sendCmd_2604(hero.getId(), index, GameConst.REWARD_2,happySoloRun.getSoloRunNum());
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HappySoloRunManager.class, hero.getId(), hero.getName(),"HappySoloRunManager getreward has wrong");
		}
		
	}

}
