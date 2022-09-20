package com.teamtop.system.activity.ativitys.awayRecharge;

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
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lxlc2_728;
import excel.config.Config_lxlc2_745;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lxlc2_728;
import excel.struct.Struct_lxlc2_745;
import excel.struct.Struct_xtcs_004;

public class AwayRechargeManager extends AbstractActivityManager{

	public static AwayRechargeManager ins;
	public static synchronized AwayRechargeManager getIns() {
		if(ins == null){
			ins = new AwayRechargeManager();
		}
		return ins;
	}
	
	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		// 活动开启处理
		// 检测奖励领取状态
		AwayRecharge awayRecharge = (AwayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_AWAYEWCHARGE);
		awayRecharge.setTodayRecharge(0);
		awayRecharge.setTodayIsSuccess(0);
		awayRecharge.setSuccessNum(0);
		HashMap<Integer, Integer> rewardMap = new HashMap<>();
		for (Struct_lxlc2_728  lxlc2_728: Config_lxlc2_728.getIns().getSortList()) {
			rewardMap.put(lxlc2_728.getId(), GameConst.REWARD_0);
		}
		for(Struct_lxlc2_745 sortList:Config_lxlc2_745.getIns().getSortList()) {
		    awayRecharge.getBigReward().put(sortList.getId(), GameConst.REWARD_0);
		}
		awayRecharge.setReward(rewardMap);
		
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		AwayRecharge awayRecharge = (AwayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_AWAYEWCHARGE);
		AwayRechargeEvent.getIns().zeroHero(hero, 0);
		awayRecharge.setTodayRecharge(0);
		awayRecharge.setTodayIsSuccess(0);
		awayRecharge.setSuccessNum(0);
		if (awayRecharge.getBigReward()==null) {
			awayRecharge.setBigReward(new HashMap<>());
		}
		for(Struct_lxlc2_745 sortList:Config_lxlc2_745.getIns().getSortList()) {
			if (!awayRecharge.getBigReward().containsKey(sortList.getId())) {
				continue;
			}else if(awayRecharge.getBigReward().get(sortList.getId())==GameConst.REWARD_1
					&&awayRecharge.getPeriods()==sortList.getQishu()) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.NEW_AWAYRECHARGE_BIG,
						new Object[] { MailConst.NEW_AWAYRECHARGE_BIG}, sortList.getJiangli());
			}
		}
		awayRecharge.getReward().clear();
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		AwayRecharge awayRecharge  = new AwayRecharge();
		awayRecharge.setHid(hero.getId());
		awayRecharge.setIndexId(activityInfo.getIndex());
		awayRecharge.setActId(activityInfo.getActId());
		awayRecharge.setPeriods(activityInfo.getPeriods());
		awayRecharge.setTodayRecharge(0);
		awayRecharge.setTodayIsSuccess(0);
		
		awayRecharge.setSuccessNum(0);
		HashMap<Integer, Integer> rewardMap = new HashMap<>();
		for (Struct_lxlc2_728  lxlc2_728: Config_lxlc2_728.getIns().getSortList()) {
			rewardMap.put(lxlc2_728.getId(), GameConst.REWARD_0);
		}
		if (awayRecharge.getBigReward()==null) {
			awayRecharge.setBigReward(new HashMap<>());
		}
		for(Struct_lxlc2_745 sortList:Config_lxlc2_745.getIns().getSortList()) {
		    awayRecharge.getBigReward().put(sortList.getId(), GameConst.REWARD_0);
		}
		awayRecharge.setReward(rewardMap);
		return awayRecharge;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return AwayRecharge.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero,ActivitySysId.Act_AWAYEWCHARGE)) {
			return;
		}
		AwayRecharge awayRecharge = (AwayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_AWAYEWCHARGE);
		awayRecharge.setTodayRecharge(awayRecharge.getTodayRecharge()+money);
		int value=Config_xtcs_004.getIns().get(3201).getNum();
		if (awayRecharge.getTodayRecharge()>=value&&awayRecharge.getTodayIsSuccess()==0) {
			awayRecharge.setSuccessNum(awayRecharge.getSuccessNum()+1);
			awayRecharge.setTodayIsSuccess(1);
			awayRecharge.setTodayRewardSate(GameConst.REWARD_1);
			
			for(Struct_lxlc2_745 sortList:Config_lxlc2_745.getIns().getSortList()) {
				if(awayRecharge.getBigReward().get(sortList.getId())==GameConst.REWARD_0
						&&awayRecharge.getSuccessNum()>=sortList.getTianshu()
						&&awayRecharge.getPeriods()==sortList.getQishu()) {
					awayRecharge.getBigReward().put(sortList.getId(), GameConst.REWARD_1);
					AwayRechargeSender.sendCmd_2786(hero.getId(), awayRecharge.getSuccessNum(), sortList.getId(), GameConst.REWARD_1);
				}
			}
			AwayRechargeSender.sendCmd_2788(hero.getId(), awayRecharge.getTodayRewardSate(),awayRecharge.getTodayRecharge());
		}
		return;
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		
		return AwayRechargeEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero,ActivitySysId.Act_AWAYEWCHARGE)) {
				return;
			}
			AwayRecharge awayRecharge = (AwayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_AWAYEWCHARGE);
			Object[] rewardstate=new Object[awayRecharge.getBigReward().size()];
			int i=0;
			for (Struct_lxlc2_745  lxlc2_745: Config_lxlc2_745.getIns().getSortList()) {
				if (lxlc2_745.getQishu()==awayRecharge.getPeriods()) {
					rewardstate[i]=new Object[] {lxlc2_745.getId(),awayRecharge.getBigReward().get(lxlc2_745.getId())};
					i++;
				}
			}
			rewardstate=CommonUtil.removeNull(rewardstate);
			AwayRechargeSender.sendCmd_2782(hero.getId(), awayRecharge.getTodayRecharge(),awayRecharge.getPeriods(),awayRecharge.getSuccessNum(),awayRecharge.getTodayRewardSate(), rewardstate);
			
		} catch (Exception e) {
			LogTool.error(e, AwayRechargeManager.class, hero.getId(), hero.getName(), "openUI has wrong");
		}
	}

	public void getreward(Hero hero, int index) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero,ActivitySysId.Act_AWAYEWCHARGE)) {
				return;
			}
			AwayRecharge awayRecharge = (AwayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_AWAYEWCHARGE);
			Struct_lxlc2_745  lxlc2_745=Config_lxlc2_745.getIns().get(index);
			if (lxlc2_745.getQishu()!=awayRecharge.getPeriods()) {
				LogTool.warn("lxlc2_728.getQishu()!=awayRecharge.getPeriods()+id:"+awayRecharge.getHid(), AwayRechargeManager.class);
				return;
			}
			if (awayRecharge.getBigReward().get(index)==GameConst.REWARD_1) {
				if (UseAddUtil.canAdd(hero, lxlc2_745.getJiangli(), false)) {
					UseAddUtil.add(hero, lxlc2_745.getJiangli(), SourceGoodConst.AYRECHARGE_REWARD, null, true);
					awayRecharge.getBigReward().put(index, GameConst.REWARD_2);
					AwayRechargeSender.sendCmd_2784(hero.getId(), index, GameConst.REWARD_2);
					return;
				}
			}
			AwayRechargeSender.sendCmd_2784(hero.getId(), index,awayRecharge.getBigReward().get(index));
			return;
		} catch (Exception e) {
			LogTool.error(e, AwayRechargeManager.class, hero.getId(), hero.getName(), "getreward has wrong");
		}
		
	}
	
	
	public void gettodayRew(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero,ActivitySysId.Act_AWAYEWCHARGE)) {
				return;
			}
			AwayRecharge awayRecharge = (AwayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_AWAYEWCHARGE);
			if (awayRecharge.getTodayRewardSate()!=GameConst.REWARD_1) {
				LogTool.warn("awayRecharge.getTodayRewardSate()!=GameConst.REWARD_1", AwayRechargeManager.class);
				return;
			}
			int periods = awayRecharge.getPeriods();
			int rewardId=0;
			if (periods==1) {
				rewardId=AwayRechargeConst.QISHU_1;
			}else if (periods==2) {
				rewardId=AwayRechargeConst.QISHU_2;
			}else if (periods==3) {
				rewardId=AwayRechargeConst.QISHU_3;
			}else if (periods==4) {
				rewardId=AwayRechargeConst.QISHU_4;
			}else if (periods==5) {
				rewardId = 5209;
			}
			if (rewardId==0) {
				LogTool.warn("rewardId==0 has wrong", AwayRechargeManager.class);
				return;
			}
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(rewardId);
			int[][] reward = struct_xtcs_004.getOther();
			if (UseAddUtil.canAdd(hero, reward, false)) {
				awayRecharge.setTodayRewardSate(GameConst.REWARD_2);
				UseAddUtil.add(hero, reward, SourceGoodConst.AWAYRECHARGE, null, true);
				AwayRechargeSender.sendCmd_2788(hero.getId(), awayRecharge.getTodayRewardSate(),awayRecharge.getTodayRecharge());
				return;
			}
			AwayRechargeSender.sendCmd_2788(hero.getId(), awayRecharge.getTodayRewardSate(),awayRecharge.getTodayRecharge());
			return;
		} catch (Exception e) {
			LogTool.error(e, AwayRechargeManager.class, hero.getId(), hero.getName(), "getTodayReward has wrong");
		}
	}

}
