package com.teamtop.system.openDaysSystem.otherAwayRecharge;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;

public class OtherAwayRechargeEvent extends AbsSystemEvent {

	private static OtherAwayRechargeEvent ins;
	public static OtherAwayRechargeEvent getIns(){
		if(ins == null) {
			ins = new OtherAwayRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		
		
	}

	@Override
	public void login(Hero hero) {
		
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_AWAYRECHARGE)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_AWAYRECHARGE);
		OtherAwayRecharge otherAwayRecharge=(OtherAwayRecharge)OtherAwayRechargeManager.getIns().getSystemModel(hero, uid);
		boolean isread=false;
		if (otherAwayRecharge.getTodayRewardSate()==GameConst.REWARD_1) {
			isread=true;
		}
		
		
		
		
		
	}
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_AWAYRECHARGE)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_AWAYRECHARGE);
		OtherAwayRecharge otherAwayRecharge=(OtherAwayRecharge)OtherAwayRechargeManager.getIns().getSystemModel(hero, uid);
		otherAwayRecharge.setTodayRecharge(0);
		otherAwayRecharge.setTodayIsSuccess(0);
		if (otherAwayRecharge.getTodayRewardSate()==GameConst.REWARD_1) {
			int qs = otherAwayRecharge.getQs();
			int rewardId=0;
			if (qs==1) {
				rewardId=OtherAwayRechargeConst.QISHU_1;
			}else if (qs==2) {
				rewardId=OtherAwayRechargeConst.QISHU_2;
			}else if (qs==3) {
				rewardId=OtherAwayRechargeConst.QISHU_3;
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
		otherAwayRecharge.setTodayRewardSate(GameConst.REWARD_0);
	}

}
