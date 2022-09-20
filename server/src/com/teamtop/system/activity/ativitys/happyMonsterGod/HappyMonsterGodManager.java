package com.teamtop.system.activity.ativitys.happyMonsterGod;

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

import excel.config.Config_allpartylvbu_241;
import excel.struct.Struct_allpartylvbu_241;


public class HappyMonsterGodManager extends AbstractActivityManager  {
	
	public static HappyMonsterGodManager ins;
	public static synchronized HappyMonsterGodManager getIns() {
		if(ins == null){
			ins = new HappyMonsterGodManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
	}

	@Override
	public void heroActOpen(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HappyMonsterGod)) {
			return;
		}
		// 活动开启处理
		// 检测奖励领取状态
		HappyMonsterGod happyMonsterGod = (HappyMonsterGod)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyMonsterGod);
        HashMap<Integer, Integer> rewardMap = happyMonsterGod.getRewardMap();
        happyMonsterGod.setMonsterGodNum(0);
		for (Struct_allpartylvbu_241  allparty_241: Config_allpartylvbu_241.getIns().getSortList()) {
			rewardMap.put(allparty_241.getId(), GameConst.REWARD_0);
		}
		
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		long hid = hero.getId();
		// 发放未领取奖励
		HappyMonsterGod happyMonsterGod = (HappyMonsterGod)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyMonsterGod);
		HashMap<Integer, Integer> rewards=happyMonsterGod.getRewardMap();
		for (int index:rewards.keySet()) {
			int rewardSate=rewards.get(index);
			int[][] reward=Config_allpartylvbu_241.getIns().get(index).getReward();
			if (rewardSate==GameConst.REWARD_1) {
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.QUANMINGHAPPY, new Object[] {MailConst.QUANMINGHAPPY}, reward);
			}
		}
		happyMonsterGod.getRewardMap().clear();
	}

	@Override
	public boolean checkActOpen(Hero hero) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HappyMonsterGod happyMonsterGod = new HappyMonsterGod();
		happyMonsterGod.setHid(hero.getId());
		happyMonsterGod.setIndexId(activityInfo.getIndex());
		happyMonsterGod.setActId(activityInfo.getActId());
		happyMonsterGod.setPeriods(activityInfo.getPeriods());
		happyMonsterGod.setMonsterGodNum(0);
		
		HashMap<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
		for (Struct_allpartylvbu_241  allparty_241: Config_allpartylvbu_241.getIns().getSortList()) {
			rewardMap.put(allparty_241.getId(), GameConst.REWARD_0);
		}
		happyMonsterGod.setRewardMap(rewardMap);
		return happyMonsterGod;
	}

	@Override
	public Class<?> getActivityData() {
		
		return HappyMonsterGod.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return HappyMonsterGodEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappyMonsterGod)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyMonsterGod)) {
				return;
			}
			HappyMonsterGod happyMonsterGod = (HappyMonsterGod)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyMonsterGod);
			Map<Integer, Integer> rewardMap = happyMonsterGod.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			for (int index:rewardMap.keySet()) {
				rewardData.add(new Object[] { index, rewardMap.get(index) });
			}
			HappyMonsterGodSender.sendCmd_2592(hero.getId(), rewardData.toArray(),happyMonsterGod.getMonsterGodNum());
		} catch (Exception e) {
			LogTool.error(e, HappyMonsterGodManager.class, hero.getId(), hero.getName(),"HappyMonsterGodManager openUI");
		}
		
	}


	public void getreward(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappyMonsterGod)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyMonsterGod)) {
				return;
			}
			HappyMonsterGod happyMonsterGod = (HappyMonsterGod)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyMonsterGod);
			Struct_allpartylvbu_241 struct_allpartyboss_241 = Config_allpartylvbu_241.getIns().get(index);
            int[][] reward=struct_allpartyboss_241.getReward();
			if(happyMonsterGod.getRewardMap().get(index)==GameConst.REWARD_1) {
				if (UseAddUtil.canAdd(hero, reward, false)) {
					UseAddUtil.add(hero, reward, SourceGoodConst.HAPPYQMBOSS_REWARD, null,true);
					happyMonsterGod.getRewardMap().put(index, GameConst.REWARD_2);
					HappyMonsterGodSender.sendCmd_2594(hero.getId(), index, GameConst.REWARD_2,happyMonsterGod.getMonsterGodNum());
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HappyMonsterGodManager.class, hero.getId(), hero.getName(),"getreward has wrong");
		}
		
	}

}
