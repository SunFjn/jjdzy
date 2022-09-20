package com.teamtop.system.openDaysSystem.otherSevenGroupBuy;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;

import excel.config.Config_sctg3_730;
import excel.struct.Struct_sctg3_730;


public class OtherSevenGroupBuyEvent extends AbsSystemEvent {

	
	private static OtherSevenGroupBuyEvent ins;
	public static OtherSevenGroupBuyEvent getIns(){
		if(ins == null) {
			ins = new OtherSevenGroupBuyEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		//OtherSevenGroupBuyManager.getIns().openUI(hero);
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
		
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.Other_SevenGroupBuy)) {
			return;
		}
		OtherSevenGroupBuyManager.getIns().openUI(hero);
		
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.Other_SevenGroupBuy);
		OtherSevenGroupBuy groupBuy = (OtherSevenGroupBuy) OtherSevenGroupBuyManager.getIns().getSystemModel(hero, uid);
		if (groupBuy!=null) {
			groupBuy.setIsFristNum(0);
			groupBuy.setTodayRrmb(0);
		}
		for (Struct_sctg3_730 sctg3_730: Config_sctg3_730.getIns().getSortList()) {
			Integer rewardState = groupBuy.getRewards().get(sctg3_730.getId());
			if (rewardState!=null&&rewardState==GameConst.REWARD_1) {
				groupBuy.getRewards().put(sctg3_730.getId(), GameConst.REWARD_0);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_FRISTGROUP_AWARDS,
						new Object[] { MailConst.MAIL_FRISTGROUP_AWARDS }, sctg3_730.getJiangli());
			}
		}
	
	}
	
	@Override
	public void zeroPub(int now){
		OtherSevenGroupBuyCache.fristRechargeNum=0;
	}

}
