package com.teamtop.system.activity.ativitys.hefuRechargeBack;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

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

import excel.config.Config_hfkhczfl_286;
import excel.config.Config_hfkhczfljl_286;
import excel.struct.Struct_hfkhczfl_286;
import excel.struct.Struct_hfkhczfljl_286;


public class HeFuRechargeBackManager extends AbstractActivityManager{

	public static HeFuRechargeBackManager ins;
	public static synchronized HeFuRechargeBackManager getIns() {
		if(ins == null){
			ins = new HeFuRechargeBackManager();
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
		
		HeFuRechargeBack actData = (HeFuRechargeBack) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_RECHARGEBACK);
		
		int recharge = actData.getRecharge();
		
		
		for (Struct_hfkhczfljl_286 struct_hfkhczfljl_286:Config_hfkhczfljl_286.getIns().getSortList()) {
			int taskid=struct_hfkhczfljl_286.getId();
			Struct_hfkhczfl_286 hfkhczfl_286 = Config_hfkhczfl_286.getIns().get(taskid/1000);
			int num = actData.getTaskInfo().get(taskid);
			if (num>=struct_hfkhczfljl_286.getCs()&&recharge>=hfkhczfl_286.getCz()&&!actData.getReward().contains(taskid)) {
				actData.getReward().add(taskid);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.HEFU_RECHARGE_BACK, new Object[]{MailConst.HEFU_RECHARGE_BACK},struct_hfkhczfljl_286.getReward());
			}
		}
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HeFuRechargeBack heFuRechargeBack = new HeFuRechargeBack(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		heFuRechargeBack.setRecharge(hero.getOneDayRecharge());
		Set<Integer> reward = new HashSet<>();
		heFuRechargeBack.setReward(reward);
		HashMap<Integer, Integer> taskInfo=new HashMap<>();
		heFuRechargeBack.setTaskInfo(taskInfo);
		//hfkhczfljl_286
		for (Struct_hfkhczfljl_286 hfkhczfljl_286:Config_hfkhczfljl_286.getIns().getSortList()) {
			taskInfo.put(hfkhczfljl_286.getId(), 0);
		}
		return heFuRechargeBack;
	}

	@Override
	public Class<?> getActivityData() {
		return HeFuRechargeBack.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_RECHARGEBACK)) {
			return;
		}
		HeFuRechargeBack actData = (HeFuRechargeBack) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_RECHARGEBACK);
		
		actData.setRecharge(actData.getRecharge()+money);
		int recharge = actData.getRecharge();
		for (Struct_hfkhczfljl_286 struct_hfkhczfljl_286:Config_hfkhczfljl_286.getIns().getSortList()) {
			int taskid=struct_hfkhczfljl_286.getId();
			Struct_hfkhczfl_286 hfkhczfl_286 = Config_hfkhczfl_286.getIns().get(taskid/1000);
			int num = actData.getTaskInfo().get(taskid);
			if (num>=struct_hfkhczfljl_286.getCs()&&recharge>=hfkhczfl_286.getCz()&&!actData.getReward().contains(taskid)) {
				HeFuRechargeBackSender.sendCmd_9522(hero.getId(), taskid, GameConst.REWARD_1);
			}
		}
		
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return HeFuRechargeBackEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_RECHARGEBACK)) {
				return;
			}
			HeFuRechargeBack actData = (HeFuRechargeBack) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_RECHARGEBACK);
			
			int recharge = actData.getRecharge();
			Object[] taskInfos=new Object[Config_hfkhczfljl_286.getIns().size()];
			int i=0;
			for (Struct_hfkhczfljl_286 struct_hfkhczfljl_286:Config_hfkhczfljl_286.getIns().getSortList()) {
				int taskid=struct_hfkhczfljl_286.getId();
				if (!actData.getTaskInfo().containsKey(taskid)) {
					actData.getTaskInfo().put(taskid, 0);
				}
				int state=GameConst.REWARD_0;
				if (actData.getReward().contains(taskid)) {
					state=GameConst.REWARD_2;
				}
				Struct_hfkhczfl_286 hfkhczfl_286 = Config_hfkhczfl_286.getIns().get(taskid/1000);
				int num = actData.getTaskInfo().get(taskid);
				if (num>=struct_hfkhczfljl_286.getCs()&&recharge>=hfkhczfl_286.getCz()&&state!=GameConst.REWARD_2) {
					state=GameConst.REWARD_1;
				}
				taskInfos[i]=new Object[] {taskid,num,state};
				i++;
			}
			HeFuRechargeBackSender.sendCmd_9520(hero.getId(), ActivitySysId.HEFU_RECHARGEBACK, actData.getRecharge(), taskInfos);
		} catch (Exception e) {
			LogTool.error(e, HeFuRechargeBackManager.class, "openUI has wrong");
			
		}
	}



	public void getreward(Hero hero, int index) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_RECHARGEBACK)) {
				return;
			}
			HeFuRechargeBack actData = (HeFuRechargeBack) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_RECHARGEBACK);
			
			int recharge = actData.getRecharge();
			Struct_hfkhczfljl_286 struct_hfkhczfljl_286=Config_hfkhczfljl_286.getIns().get(index);
			int taskid=struct_hfkhczfljl_286.getId();
			if (actData.getReward().contains(taskid)) {
				return;
			}
			
			Struct_hfkhczfl_286 hfkhczfl_286 = Config_hfkhczfl_286.getIns().get(taskid/1000);
			int num = actData.getTaskInfo().get(taskid);
			if (num>=struct_hfkhczfljl_286.getCs()&&recharge>=hfkhczfl_286.getCz()&&!actData.getReward().contains(taskid)) {
				actData.getReward().add(taskid);
				int[][] goods = struct_hfkhczfljl_286.getReward();
				UseAddUtil.add(hero, goods, SourceGoodConst.HEFU_RECHARGE_GIFT, UseAddUtil.getDefaultMail(), true);
				HeFuRechargeBackSender.sendCmd_9522(hero.getId(), taskid, GameConst.REWARD_2);
			}
			
		} catch (Exception e) {
			LogTool.error(e, HeFuRechargeBackManager.class, "getreward has wrong");
		}
		
	}

}
