package com.teamtop.system.activity.ativitys.totalRecharge;

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

import excel.config.Config_leichong1_725;
import excel.struct.Struct_leichong1_725;

public class TotalRechargeManager extends AbstractActivityManager {

	public static TotalRechargeManager ins;
	public static synchronized TotalRechargeManager getIns() {
		if(ins == null){
			ins = new TotalRechargeManager();
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
		TotalRecharge totalRecharge = (TotalRecharge)hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.Act_TOTALRECHARGE);
		HashMap<Integer, Integer> rewardMap = totalRecharge.getRewardMap();
		for (Struct_leichong1_725 struct_leichong1_725 : TotalRechargeSysCache.getConfigMap()
				.get(totalRecharge.getPeriods()).getConfigList()) {
			rewardMap.put(struct_leichong1_725.getId(), GameConst.REWARD_0);
		}
		totalRecharge.setRewardMap(rewardMap);
		totalRecharge.setRewardNum(0);
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		// 活动开启处理
		// 检测奖励领取状态
		TotalRecharge totalRecharge = (TotalRecharge)hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.Act_TOTALRECHARGE);
		HashMap<Integer, Integer> rewardMap = totalRecharge.getRewardMap();
		for (int rewardKey:rewardMap.keySet()) {
			int rewardSate=rewardMap.get(rewardKey);
			Map<Integer, Struct_leichong1_725> configMap = TotalRechargeSysCache.getConfigMap()
					.get(totalRecharge.getPeriods()).getConfigMap();
			Struct_leichong1_725 struct_leichong1_725 = configMap.get(rewardKey);
			if (struct_leichong1_725 == null) {
				struct_leichong1_725 = Config_leichong1_725.getIns().get(rewardKey);
				if (struct_leichong1_725 == null) {
					continue;
				}
			}
			int[][] reward = struct_leichong1_725.getReward();
			if (rewardSate==GameConst.REWARD_1) {
				rewardMap.put(rewardKey, GameConst.REWARD_2);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.TOTALRECAHARE,
						new Object[] {MailConst.TOTALRECAHARE }, reward);
			}
		}
		totalRecharge.getRewardMap().clear();
		totalRecharge.setRewardNum(0);
	}

	@Override
	public boolean checkActOpen(Hero hero) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		TotalRecharge totalRecharge = new TotalRecharge();
		totalRecharge.setHid(hero.getId());
		totalRecharge.setIndexId(activityInfo.getIndex());
		totalRecharge.setActId(activityInfo.getActId());
		totalRecharge.setPeriods(activityInfo.getPeriods());
		totalRecharge.setRewardNum(0);
		HashMap<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
		for (Struct_leichong1_725 struct_leichong1_725 : TotalRechargeSysCache.getConfigMap()
				.get(totalRecharge.getPeriods()).getConfigList()) {
			rewardMap.put(struct_leichong1_725.getId(), GameConst.REWARD_0);
		}
		totalRecharge.setRewardMap(rewardMap);
		return totalRecharge;
	}

	@Override
	public Class<?> getActivityData() {
		return TotalRecharge.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_TOTALRECHARGE)) {
			return;
		}
		TotalRecharge totalRecharge = (TotalRecharge) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.Act_TOTALRECHARGE);
		totalRecharge.setRewardNum(totalRecharge.getRewardNum() + money);
		HashMap<Integer, Integer> rewardMap = totalRecharge.getRewardMap();
		for (int rewardKey : rewardMap.keySet()) {
			int rewardSate = rewardMap.get(rewardKey);
			int periods = totalRecharge.getPeriods();
			if (periods==0) {
				periods=1;
			}
			Map<Integer, Struct_leichong1_725> configMap = TotalRechargeSysCache.getConfigMap().get(periods).getConfigMap();
			int rewardNum = configMap.get(rewardKey).getCoin();
			if (rewardSate == GameConst.REWARD_0 && totalRecharge.getRewardNum() >= rewardNum) {
				rewardMap.put(rewardKey, GameConst.REWARD_1);
				TotalRechargeSender.sendCmd_2474(hero.getId(), rewardKey, GameConst.REWARD_1);
			}
		}
		TotalRechargeSender.sendCmd_2476(hero.getId(), totalRecharge.getRewardNum());
		return;
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return TotalRechargeEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_TOTALRECHARGE)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_TOTALRECHARGE)) {
				return;
			}
			TotalRecharge totalRecharge = (TotalRecharge)hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.Act_TOTALRECHARGE);

			Map<Integer, Integer> rewardMap = totalRecharge.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			for (int index:rewardMap.keySet()) {
				rewardData.add(new Object[] { index, rewardMap.get(index) });
			}
			TotalRechargeSender.sendCmd_2472(hero.getId(), totalRecharge.getRewardNum(), rewardData.toArray());
		} catch (Exception e) {
			LogTool.error(e, TotalRechargeManager.class, hero.getId(), hero.getName(),"TotalRechargeManager openUI");
		}
		
	}


	public void getreward(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_TOTALRECHARGE)) {
				return;
			}
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_TOTALRECHARGE)) {
				return;
			}
			TotalRecharge totalRecharge = (TotalRecharge) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.Act_TOTALRECHARGE);
			if (!totalRecharge.getRewardMap().containsKey(index)) {
				return;
			}
			
			int state = totalRecharge.getRewardMap().get(index);
			if (state == GameConst.REWARD_1) {
				int periods = totalRecharge.getPeriods();
				if (periods==0) {
					periods=1;
				}
				Map<Integer, Struct_leichong1_725> configMap = TotalRechargeSysCache.getConfigMap().get(periods).getConfigMap();
				Struct_leichong1_725 excel = configMap.get(index);
				int[][] reward = excel.getReward();
				if (UseAddUtil.canAddJK(hero, reward, false, excel.getJiankong())) {
					totalRecharge.getRewardMap().put(index, GameConst.REWARD_2);
					UseAddUtil.addJK(hero, reward, SourceGoodConst.ACT_TORALRECHARGE, null, true, excel.getJiankong());
					TotalRechargeSender.sendCmd_2474(hero.getId(), index, GameConst.REWARD_2);
				}
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, TotalRechargeManager.class, "getreward has wrong");
		}
		
	}

}
