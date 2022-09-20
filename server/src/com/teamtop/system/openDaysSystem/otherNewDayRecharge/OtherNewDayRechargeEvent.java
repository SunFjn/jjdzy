package com.teamtop.system.openDaysSystem.otherNewDayRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_drlc3_734;
import excel.struct.Struct_drlc3_734;

public class OtherNewDayRechargeEvent extends AbsSystemEvent {

	private static OtherNewDayRechargeEvent ins;
	public static OtherNewDayRechargeEvent getIns(){
		if(ins == null) {
			ins = new OtherNewDayRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		
	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAY_RECHARGE)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAY_RECHARGE);
		OtherNewDayRecharge sevenDayRecharge = (OtherNewDayRecharge) OtherNewDayRechargeManager.getIns()
				.getSystemModel(hero, uid);
		int openFuDay = TimeDateUtil.betweenOpen();
		if (!OtherNewDayRechargeCache.newDayRechargeHashMap.containsKey(openFuDay)) {
			LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, OtherNewDayRechargeEvent.class);
			return;
		}
		HashMap<Integer, Struct_drlc3_734> hashMap = OtherNewDayRechargeCache.newDayRechargeHashMap.get(openFuDay);
		for (Struct_drlc3_734 drlc3_734 : hashMap.values()) {
			if (sevenDayRecharge.getReward().containsKey(drlc3_734.getId())
					&& sevenDayRecharge.getReward().get(drlc3_734.getId()) == GameConst.REWARD_1) {
				//红点
				RedPointFunction.getIns().addLoginRedPoint(hero,  SystemIdConst.SEVENDAYRECHARGE,
    					1, RedPointConst.HAS_RED);
				return;
			}
		}
		
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAY_RECHARGE);
		OtherNewDayRecharge sevenDayRecharge = (OtherNewDayRecharge) OtherNewDayRechargeManager.getIns()
				.getSystemModel(hero, uid);
//		int todayRecharge = sevenDayRecharge.getTodayRecharge();
		sevenDayRecharge.setTodayRecharge(0);
//		HashMap<Integer, Struct_drlc3_734> hashMap = OtherNewDayRechargeCache.newDayRechargeHashMap.get(21);
		for (Struct_drlc3_734 drlc3_734 : Config_drlc3_734.getIns().getSortList()) {
//			if (hashMap.containsKey(drlc3_734.getId())&&sevenDayRecharge.getReward().get(drlc3_734.getId())==GameConst.REWARD_0&&todayRecharge>=drlc3_734.getCoin()) {
//				sevenDayRecharge.getReward().put(drlc3_734.getId(), GameConst.REWARD_1);
//			}
			if (sevenDayRecharge.getReward().containsKey(drlc3_734.getId())
					&& sevenDayRecharge.getReward().get(drlc3_734.getId()) == GameConst.REWARD_1) {
				sevenDayRecharge.getReward().put(drlc3_734.getId(), GameConst.REWARD_2);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONEDAYRECAHARE,
						new Object[] { MailConst.ONEDAYRECAHARE }, drlc3_734.getReward());
			}
		}
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

}
