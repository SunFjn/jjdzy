package com.teamtop.system.activity.ativitys.happyCrossKing;

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

import excel.config.Config_allpartylsxx_241;
import excel.struct.Struct_allpartylsxx_241;

public class HappyCrossKingManager extends AbstractActivityManager {

	public static HappyCrossKingManager ins;
	public static synchronized HappyCrossKingManager getIns() {
		if(ins == null){
			ins = new HappyCrossKingManager();
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
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HappyCrossKing)) {
			return;
		}
		// 活动开启处理
		// 检测奖励领取状态
		HappyCrossKing happyCrossKing = (HappyCrossKing)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyCrossKing);
        HashMap<Integer, Integer> rewardMap = happyCrossKing.getRewardMap();
        happyCrossKing.setCrossKingNum(0);
		for (Struct_allpartylsxx_241  allparty_241: Config_allpartylsxx_241.getIns().getSortList()) {
			rewardMap.put(allparty_241.getId(), GameConst.REWARD_0);
		}
		
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		long hid = hero.getId();
		// 发放未领取奖励
		HappyCrossKing happyCrossKing = (HappyCrossKing)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyCrossKing);
		HashMap<Integer, Integer> rewards=happyCrossKing.getRewardMap();
		for (int index:rewards.keySet()) {
			int rewardSate=rewards.get(index);
			int[][] reward=Config_allpartylsxx_241.getIns().get(index).getReward();
			if (rewardSate==GameConst.REWARD_1) {
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.QUANMINGHAPPY, new Object[] {MailConst.QUANMINGHAPPY}, reward);
			}
		}
		happyCrossKing.getRewardMap().clear();
	}

	@Override
	public boolean checkActOpen(Hero hero) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HappyCrossKing happyCrossKing = new HappyCrossKing();
		happyCrossKing.setHid(hero.getId());
		happyCrossKing.setIndexId(activityInfo.getIndex());
		happyCrossKing.setActId(activityInfo.getActId());
		happyCrossKing.setPeriods(activityInfo.getPeriods());
		happyCrossKing.setCrossKingNum(hero.getCrossKing().getDuanwei());
		HashMap<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
		for (Struct_allpartylsxx_241  allparty_241: Config_allpartylsxx_241.getIns().getSortList()) {
			rewardMap.put(allparty_241.getId(), GameConst.REWARD_0);
		}
		happyCrossKing.setRewardMap(rewardMap);
		return happyCrossKing;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return HappyCrossKing.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return HappyCrossKingEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappyCrossKing)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyCrossKing)) {
				return;
			}
			HappyCrossKing happyCrossKing = (HappyCrossKing)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyCrossKing);
			
			Map<Integer, Integer> rewardMap = happyCrossKing.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			for (int index:rewardMap.keySet()) {
				rewardData.add(new Object[] { index, rewardMap.get(index) });
			}
			HappyCrossKingSender.sendCmd_2582(hero.getId(), rewardData.toArray(),happyCrossKing.getCrossKingNum());
		} catch (Exception e) {
			LogTool.error(e, HappyCrossKingManager.class, hero.getId(), hero.getName(),"HappyCrossKingManager openUI");
		}
		
	}


	public void getreward(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_HappyCrossKing)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_HappyCrossKing)) {
				return;
			}
			HappyCrossKing happyCrossKing = (HappyCrossKing)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_HappyCrossKing);
			Struct_allpartylsxx_241 struct_allpartyboss_241 = Config_allpartylsxx_241.getIns().get(index);
            int[][] reward=struct_allpartyboss_241.getReward();
			if(happyCrossKing.getRewardMap().get(index)==GameConst.REWARD_1) {
				if (UseAddUtil.canAdd(hero, reward, false)) {
					UseAddUtil.add(hero, reward, SourceGoodConst.HAPPYQMBOSS_REWARD, null,true);
					happyCrossKing.getRewardMap().put(index, GameConst.REWARD_2);
					HappyCrossKingSender.sendCmd_2584(hero.getId(), index, GameConst.REWARD_2,happyCrossKing.getCrossKingNum());
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HappyCrossKingManager.class, hero.getId(), hero.getName(),"getreward has wrong");
		}
		
	}

}
