package com.teamtop.system.sevenGroupBuy;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_sctg_730;
import excel.struct.Struct_sctg_730;

public class SevenGroupBuyEvent extends AbsSystemEvent{

	public static SevenGroupBuyEvent ins;
	
	public static  SevenGroupBuyEvent getIns() {
		if(ins == null){
			ins = new SevenGroupBuyEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		try {
			if (hero.getSevenGroupBuy()==null) {
				SevenGroupBuy sevenGroupBuy=new SevenGroupBuy();
				sevenGroupBuy.setHid(hero.getId());
				sevenGroupBuy.setTodayRrmb(0);
				sevenGroupBuy.setRewards(new HashMap<>());
				for (Struct_sctg_730 struct_sctg_730:Config_sctg_730.getIns().getSortList()) {
					sevenGroupBuy.getRewards().put(struct_sctg_730.getId(), GameConst.REWARD_0);
				}
				hero.setSevenGroupBuy(sevenGroupBuy);
			}
		} catch (Exception e) {
			LogTool.error(e, SevenGroupBuyEvent.class, hero.getId(), hero.getName(), "SevenGroupBuyEvent init has wrong");
		}
		
	}

	@Override
	public void login(Hero hero) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENFIRSTGROUP)) return;
		SevenGroupBuy sevenGroupBuy=hero.getSevenGroupBuy();
		int openFuDay = TimeDateUtil.betweenOpen();
		if (!SevenGroupBuyCache.sevenGroupBuySysMap.containsKey(openFuDay)) {
			LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenGroupBuyEvent.class);
			return;
		}
		HashMap<Integer, Struct_sctg_730> sctg_730Map = SevenGroupBuyCache.sevenGroupBuySysMap.get(openFuDay);
		Object[] rewards=new Object[sctg_730Map.size()];
		int a=0;
		for (Struct_sctg_730 sctg_730: sctg_730Map.values()) {
			//本人奖励状态
			Integer rewardState = sevenGroupBuy.getRewards().get(sctg_730.getId());
			if (rewardState==GameConst.REWARD_0) {
				if (sevenGroupBuy.getIsFristNum()>0) {
					if (sctg_730.getJine()==1&&SevenGroupBuyCache.fristRechargeNum>=sctg_730.getRenshu()) {
						//1：充值任意金额
						sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_1);
					}else if (sctg_730.getJine()>1&&sevenGroupBuy.getTodayRrmb()>=sctg_730.getJine()&&SevenGroupBuyCache.fristRechargeNum>=sctg_730.getRenshu()) {
						// x（大于1的具体值）：充值指定金额
						sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_1);
					}
				}
				if (sctg_730.getJine()==0&&SevenGroupBuyCache.fristRechargeNum>=sctg_730.getRenshu()) {
					sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_1);
				}
			}
			rewards[a]=new Object[] {sctg_730.getId(),sevenGroupBuy.getRewards().get(sctg_730.getId())};
			a++;
		}
		SevenGroupBuySender.sendCmd_2850(hero.getId(), hero.getSevenGroupBuy().getTodayRrmb(), SevenGroupBuyCache.fristRechargeNum, rewards);
	}
	@Override
	public void loginReset(Hero hero,int now){
		if (hero.getSevenGroupBuy()!=null) {
			hero.getSevenGroupBuy().setIsFristNum(0);
			hero.getSevenGroupBuy().setTodayRrmb(0);
		}
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENFIRSTGROUP)) return;
		SevenGroupBuy sevenGroupBuy=hero.getSevenGroupBuy();
		int openFuDay = TimeDateUtil.betweenOpen();
		if (!SevenGroupBuyCache.sevenGroupBuySysMap.containsKey(openFuDay)) {
			LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenGroupBuyEvent.class);
			return;
		}
		for (Struct_sctg_730 sctg_730: Config_sctg_730.getIns().getSortList()) {
			if (sevenGroupBuy.getRewards().get(sctg_730.getId())==GameConst.REWARD_1) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_FRISTGROUP_AWARDS,
						new Object[] { MailConst.MAIL_FRISTGROUP_AWARDS }, sctg_730.getJiangli());
				sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_2);
			}
		}
	}
	@Override
	public void zeroHero(Hero hero,int now){
		if (hero.getSevenGroupBuy()!=null) {
			hero.getSevenGroupBuy().setIsFristNum(0);
			hero.getSevenGroupBuy().setTodayRrmb(0);
		}
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENFIRSTGROUP)) return;
		SevenGroupBuy sevenGroupBuy=hero.getSevenGroupBuy();
		int openFuDay = TimeDateUtil.betweenOpen();
		if (!SevenGroupBuyCache.sevenGroupBuySysMap.containsKey(openFuDay)) {
			LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenGroupBuyEvent.class);
			return;
		}
		HashMap<Integer, Struct_sctg_730> sctg_730Map = SevenGroupBuyCache.sevenGroupBuySysMap.get(openFuDay);
		Object[] rewards=new Object[sctg_730Map.size()];
		int a=0;
		for (Struct_sctg_730 sctg_730: Config_sctg_730.getIns().getSortList()) {
			if (sevenGroupBuy.getRewards().get(sctg_730.getId())==GameConst.REWARD_1) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_FRISTGROUP_AWARDS,
						new Object[] { MailConst.MAIL_FRISTGROUP_AWARDS }, sctg_730.getJiangli());
				sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_2);
			}
			if (sctg_730.getTianshu()==openFuDay) {
				rewards[a]=new Object[] {sctg_730.getId(),sevenGroupBuy.getRewards().get(sctg_730.getId())};
				a++;
			}
		}
		SevenGroupBuySender.sendCmd_2850(hero.getId(), hero.getSevenGroupBuy().getTodayRrmb(), 0, rewards);
		
		
	}
	@Override
	public void zeroPub(int now){
		SevenGroupBuyCache.fristRechargeNum=0;
	}

}
