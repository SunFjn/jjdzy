package com.teamtop.system.activity.ativitys.awayRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_lxlc2_728;
import excel.config.Config_lxlc2_745;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lxlc2_728;
import excel.struct.Struct_lxlc2_745;
import excel.struct.Struct_xtcs_004;

public class AwayRechargeEvent extends AbsSystemEvent{

	public static AwayRechargeEvent ins;
	public static synchronized AwayRechargeEvent getIns() {
		if(ins == null){
			ins = new AwayRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_AWAYEWCHARGE)) {
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_AWAYEWCHARGE)) {
			return;
		}
		AwayRecharge awayRecharge = (AwayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_AWAYEWCHARGE);
		//老充值奖励没领邮件发放
		for (int key:awayRecharge.getReward().keySet()) {
			Integer state = awayRecharge.getReward().get(key);
			if (state==GameConst.REWARD_1) {
				Struct_lxlc2_728 struct_lxlc2_728 = Config_lxlc2_728.getIns().get(key);
				if (struct_lxlc2_728!=null) {
					awayRecharge.getReward().put(key, GameConst.REWARD_2);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.AWAYRECHARGE_REWARD,
							new Object[] { MailConst.AWAYRECHARGE_REWARD}, struct_lxlc2_728.getJiangli());
				}
			}
		}
		//兼容本日充值
		if (awayRecharge.getTodayIsSuccess()>0&&awayRecharge.getTodayRewardSate()==GameConst.REWARD_0) {
			awayRecharge.setTodayRewardSate(GameConst.REWARD_1);
		}
		//改版
		if (awayRecharge.getBigReward()==null) {
			awayRecharge.setBigReward(new HashMap<>());
		}
		for(Struct_lxlc2_745 sortList:Config_lxlc2_745.getIns().getSortList()) {
			if (awayRecharge.getBigReward().containsKey(sortList.getId())) {
				if(awayRecharge.getBigReward().get(sortList.getId())==GameConst.REWARD_1
						&&awayRecharge.getPeriods()==sortList.getQishu()) {
					RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.Act_AWAYEWCHARGE,
							1, RedPointConst.HAS_RED);
				}
			}else {
				awayRecharge.getBigReward().put(sortList.getId(), GameConst.REWARD_0);
			}
		}
		//兼容累冲次数
		for(Struct_lxlc2_745 sortList:Config_lxlc2_745.getIns().getSortList()) {
			if(awayRecharge.getBigReward().get(sortList.getId())==GameConst.REWARD_0
					&&awayRecharge.getSuccessNum()>=sortList.getTianshu()
					&&awayRecharge.getPeriods()==sortList.getQishu()) {
				awayRecharge.getBigReward().put(sortList.getId(), GameConst.REWARD_1);
				AwayRechargeSender.sendCmd_2786(hero.getId(), awayRecharge.getSuccessNum(), sortList.getId(), GameConst.REWARD_1);
			}
		}
		
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		AwayRecharge awayRecharge = (AwayRecharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_AWAYEWCHARGE);
		awayRecharge.setTodayRecharge(0);
		awayRecharge.setTodayIsSuccess(0);
		if (awayRecharge.getTodayRewardSate()==GameConst.REWARD_1) {
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
			}
			if (rewardId!=0) {
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(rewardId);
				int[][] reward = struct_xtcs_004.getOther();
				if (reward!=null) {
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.NEW_AWAYRECHARGE_DAY,
							new Object[] { MailConst.NEW_AWAYRECHARGE_DAY}, reward);
				}
			}
		}
		awayRecharge.setTodayRewardSate(GameConst.REWARD_0);
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

}
