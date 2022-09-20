package com.teamtop.system.activity.ativitys.hefuFristRecharge;

import java.util.HashMap;

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

import excel.config.Config_hfkhhfsc_286;
import excel.struct.Struct_hfkhhfsc_286;

public class HeFuFristRechargeManager extends AbstractActivityManager{
	

	public static HeFuFristRechargeManager ins;
	public static synchronized HeFuFristRechargeManager getIns() {
		if(ins == null){
			ins = new HeFuFristRechargeManager();
		}
		return ins;
	}
	

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		HeFuFristRecharge hefuFristRecharge = (HeFuFristRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_FRIESTRECHARGE);
		HashMap<Integer, Integer> reward = hefuFristRecharge.getReward();
		for (int key: reward.keySet()) {
			Integer state = hefuFristRecharge.getReward().get(key);
			if (state==GameConst.REWARD_1) {
				hefuFristRecharge.getReward().put(key, GameConst.REWARD_2);
				Struct_hfkhhfsc_286 struct_hfkhhfsc_286 = Config_hfkhhfsc_286.getIns().get(key);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.HEFU_FRISTRECHARGE, new Object[]{MailConst.HEFU_FRISTRECHARGE}, struct_hfkhhfsc_286.getReward());
			}
			
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HeFuFristRecharge hefuFristRecharge = new HeFuFristRecharge(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		
		HashMap<Integer, Integer> reward=new HashMap<Integer, Integer>();
		hefuFristRecharge.setReward(reward);
		for (Struct_hfkhhfsc_286 hfkhhfsc_286: Config_hfkhhfsc_286.getIns().getSortList()) {
			reward.put(hfkhhfsc_286.getId(), GameConst.REWARD_0);
		}
		return hefuFristRecharge;
	}

	@Override
	public Class<?> getActivityData() {
		return HeFuFristRecharge.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_FRIESTRECHARGE)) {
				return;
			}
			HeFuFristRecharge hefuFristRecharge = (HeFuFristRecharge) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_FRIESTRECHARGE);
			for (Struct_hfkhhfsc_286 hfkhhfsc_286: Config_hfkhhfsc_286.getIns().getSortList()) {
				HashMap<Integer, Integer> reward = hefuFristRecharge.getReward();
				if(!reward.containsKey(hfkhhfsc_286.getId())) {
					reward.put(hfkhhfsc_286.getId(), GameConst.REWARD_0);
				}
				int state=reward.get(hfkhhfsc_286.getId());
				if (state==GameConst.REWARD_0&&hfkhhfsc_286.getCz()==product_id) {
					reward.put(hfkhhfsc_286.getId(), GameConst.REWARD_1);
					HeFuFristRechargeSender.sendCmd_9632(hero.getId(), hfkhhfsc_286.getId(), GameConst.REWARD_1);
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeFuFristRechargeManager.class, "rechargeHandle has wrong");
		}
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return HeFuFristRechargeEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_FRIESTRECHARGE)) {
				return;
			}
			HeFuFristRecharge hefuFristRecharge = (HeFuFristRecharge) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_FRIESTRECHARGE);
			
			int size = Config_hfkhhfsc_286.getIns().getSortList().size();
			Object[] rewardstate=new Object[size];
			int i=0;
			for (Struct_hfkhhfsc_286 hfkhhfsc_286: Config_hfkhhfsc_286.getIns().getSortList()) {
				HashMap<Integer, Integer> reward = hefuFristRecharge.getReward();
				if(!reward.containsKey(hfkhhfsc_286.getId())) {
					reward.put(hfkhhfsc_286.getId(), GameConst.REWARD_0);
				}
				int state=reward.get(hfkhhfsc_286.getId());
				rewardstate[i]=new Object[] {hfkhhfsc_286.getId(),state};
				i++;
			}
			HeFuFristRechargeSender.sendCmd_9630(hero.getId(), rewardstate);
			return;
		} catch (Exception e) {
			LogTool.error(e, HeFuFristRechargeManager.class, "HeFuFristRechargeManager has wrong");
		}
		
	}


	public void getreward(Hero hero, int index) {
		try {
			
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_FRIESTRECHARGE)) {
				return;
			}
			HeFuFristRecharge hefuFristRecharge = (HeFuFristRecharge) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_FRIESTRECHARGE);
			
			Integer state = hefuFristRecharge.getReward().get(index);
			if (state==GameConst.REWARD_1) {
				Struct_hfkhhfsc_286 struct_hfkhhfsc_286 = Config_hfkhhfsc_286.getIns().get(index);
				hefuFristRecharge.getReward().put(index, GameConst.REWARD_2);
				UseAddUtil.add(hero, struct_hfkhhfsc_286.getReward(), SourceGoodConst.HEFU_FRIST_RECHARGE, UseAddUtil.getDefaultMail(), true);
				HeFuFristRechargeSender.sendCmd_9632(hero.getId(), index, GameConst.REWARD_2);
				return;
			}
			HeFuFristRechargeSender.sendCmd_9632(hero.getId(), index, state);
			return;
		} catch (Exception e) {
			LogTool.error(e, HeFuFristRechargeManager.class, "getreward has wrong");
		}
		
	}

}
