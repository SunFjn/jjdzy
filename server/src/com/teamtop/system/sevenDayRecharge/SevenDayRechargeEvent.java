package com.teamtop.system.sevenDayRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_drlc1_734;
import excel.struct.Struct_drlc1_734;

public class SevenDayRechargeEvent extends AbsSystemEvent {

	private static SevenDayRechargeEvent ins;
	public static SevenDayRechargeEvent getIns(){
		if(ins == null) {
			ins = new SevenDayRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		try {
			if (hero.getSevenDayRecharge()==null) {
				SevenDayRecharge sevenDayRecharge=new SevenDayRecharge();
				sevenDayRecharge.setHid(hero.getId());
				sevenDayRecharge.setReward(new HashMap<>());
				for (Struct_drlc1_734 drlc1_734:Config_drlc1_734.getIns().getSortList()) {
					sevenDayRecharge.getReward().put(drlc1_734.getId(), GameConst.REWARD_0);
				}
				hero.setSevenDayRecharge(sevenDayRecharge);
			}
			//+档次
			SevenDayRecharge sevenDayRecharge = hero.getSevenDayRecharge();
			if (sevenDayRecharge.getReward().size()!=Config_drlc1_734.getIns().getMap().size()) {
				for (Struct_drlc1_734 drlc1_734:Config_drlc1_734.getIns().getSortList()) {
					if (!sevenDayRecharge.getReward().containsKey(drlc1_734.getId())) {
						sevenDayRecharge.getReward().put(drlc1_734.getId(), GameConst.REWARD_0);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SevenDayRechargeEvent.class, hero.getId(), hero.getName(), "init has wrong");
		}
		
	}

	@Override
	public void login(Hero hero) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENDAYRECHARGE)) return;
		SevenDayRecharge sevenDayRecharge=hero.getSevenDayRecharge();
		int openFuDay = TimeDateUtil.betweenOpen();
		if (!SevenDayRechargeCache.sevenDayRechargeHashMap.containsKey(openFuDay)) {
			LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenDayRechargeEvent.class);
			return;
		}
		HashMap<Integer, Struct_drlc1_734> hashMap = SevenDayRechargeCache.sevenDayRechargeHashMap.get(openFuDay);
		for (Struct_drlc1_734 drlc1_734 : hashMap.values()) {
			if (sevenDayRecharge.getReward().containsKey(drlc1_734.getId())&&sevenDayRecharge.getReward().get(drlc1_734.getId())==GameConst.REWARD_1) {
				//红点
				RedPointFunction.getIns().addLoginRedPoint(hero,  SystemIdConst.SEVENDAYRECHARGE,
    					1, RedPointConst.HAS_RED);
				return;
			}
		}
		
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		SevenDayRecharge sevenDayRecharge=hero.getSevenDayRecharge();
		sevenDayRecharge.setTodayRecharge(0);
		for (Struct_drlc1_734 drlc1_734: Config_drlc1_734.getIns().getSortList()) {
			if (sevenDayRecharge.getReward().containsKey(drlc1_734.getId())&&sevenDayRecharge.getReward().get(drlc1_734.getId())==GameConst.REWARD_1) {
				sevenDayRecharge.getReward().put(drlc1_734.getId(), GameConst.REWARD_2);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONEDAYRECAHARE, new Object[] {MailConst.ONEDAYRECAHARE}, drlc1_734.getReward());
			}
		}
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

}
