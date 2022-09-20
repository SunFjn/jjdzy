package com.teamtop.system.sevenOneRecharge;

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

import excel.config.Config_dbcz1_733;
import excel.struct.Struct_dbcz1_733;

public class SevenOneRechargeEvent extends AbsSystemEvent {

	public static SevenOneRechargeEvent ins;
	public static  SevenOneRechargeEvent getIns() {
		if(ins == null){
			ins = new SevenOneRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		try {
			SevenOneRecharge sevenOneRecharge=hero.getSevenOneRecharge();
			if (sevenOneRecharge==null) {
				sevenOneRecharge=new SevenOneRecharge();
				sevenOneRecharge.setHid(hero.getId());
				sevenOneRecharge.setReward(new HashMap<>());
				//可领取次数/已领取次数
				HashMap<Integer,Integer[]> hasRewardNum=new HashMap<>();
				sevenOneRecharge.setHasRewardNum(hasRewardNum);
				
				for (Struct_dbcz1_733 dbcz1_733:Config_dbcz1_733.getIns().getSortList()) {
					int cishu=dbcz1_733.getCs();
					int xh = dbcz1_733.getXh();
					if (!sevenOneRecharge.getReward().containsKey(xh)) {
						HashMap<Integer, Integer> hashMap = new HashMap<Integer,Integer>();
						sevenOneRecharge.getReward().put(xh, hashMap);
					}
					HashMap<Integer, Integer> hashMap = sevenOneRecharge.getReward().get(xh);
					for (int i = 0; i <cishu; i++) {
						if(!hashMap.containsKey(i)) {
							hashMap.put(i,GameConst.REWARD_0);
						}
					}
					if (sevenOneRecharge.getHasRewardNum().get(xh)==null) {
						Integer[] getRewardNum=new Integer[] {0,0};
						sevenOneRecharge.getHasRewardNum().put(xh, getRewardNum);
					}
				}
				hero.setSevenOneRecharge(sevenOneRecharge);
			}else {
				if (sevenOneRecharge.getHasRewardNum()==null) {
					//改版
					HashMap<Integer,Integer[]> hasRewardNum=new HashMap<>();
					sevenOneRecharge.setHasRewardNum(hasRewardNum);
					//领取状态清空
					sevenOneRecharge.getReward().clear();
					
					for (Struct_dbcz1_733 dbcz1_733:Config_dbcz1_733.getIns().getSortList()) {
						int cishu=dbcz1_733.getCs();
						int xh = dbcz1_733.getXh();
						if (!sevenOneRecharge.getReward().containsKey(xh)) {
							HashMap<Integer, Integer> hashMap = new HashMap<Integer,Integer>();
							sevenOneRecharge.getReward().put(xh, hashMap);
						}
						HashMap<Integer, Integer> hashMap = sevenOneRecharge.getReward().get(xh);
						for (int i = 0; i <cishu; i++) {
							if(!hashMap.containsKey(i)) {
								hashMap.put(i,GameConst.REWARD_0);
							}
						}
						if (sevenOneRecharge.getHasRewardNum().get(xh)==null) {
							Integer[] getRewardNum=new Integer[] {0,0};
							sevenOneRecharge.getHasRewardNum().put(xh, getRewardNum);
						}
					}
					
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SevenOneRechargeEvent.class, hero.getId(), hero.getName(), "init has wrong");
		}
		
	}

	@Override
	public void login(Hero hero) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENNOERECHARGE)) return;
		SevenOneRecharge sevenOneRecharge=hero.getSevenOneRecharge();
		int openFuDay = TimeDateUtil.betweenOpen();
		if (!SevenOneRechargeCache.sevenOneRechargeHashMap.containsKey(openFuDay)) {
			LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenOneRechargeEvent.class);
			return;
		}
		HashMap<Integer, Struct_dbcz1_733> hashMap = SevenOneRechargeCache.sevenOneRechargeHashMap.get(openFuDay);
		for (Struct_dbcz1_733 dbcz1_733 : hashMap.values()) {
			int xh = dbcz1_733.getXh();
			int cishu=dbcz1_733.getCs();
			HashMap<Integer, Integer> rewardhashmap = sevenOneRecharge.getReward().get(xh);
			for (int i = 0; i <cishu; i++) {
				if (rewardhashmap.get(i)==GameConst.REWARD_1) {
					//红点
					RedPointFunction.getIns().addLoginRedPoint(hero,  SystemIdConst.SEVENNOERECHARGE,
							1, RedPointConst.HAS_RED);
					return;
				}
			}
		}
		
	}
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
		
	}
	@Override
	public void zeroHero(Hero hero,int now){
		SevenOneRecharge sevenOneRecharge=hero.getSevenOneRecharge();
		for (Struct_dbcz1_733 dbcz1_733:Config_dbcz1_733.getIns().getSortList()) {
			int xh = dbcz1_733.getXh();
			int cishu=dbcz1_733.getCs();
			Integer[] integers = sevenOneRecharge.getHasRewardNum().get(xh);
			Integer canNum= integers[0];
			Integer hasCt = integers[1];
			HashMap<Integer, Integer> rewardhashmap = sevenOneRecharge.getReward().get(xh);
			for (int i = 0; i <cishu; i++) {
				if (rewardhashmap.get(i)==GameConst.REWARD_1) {
					rewardhashmap.put(i, GameConst.REWARD_2);
					hasCt=hasCt+1;
					sevenOneRecharge.getHasRewardNum().put(xh, new Integer[] {canNum,hasCt});
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONERECHARGE_AWARD, new Object[] {MailConst.ONERECHARGE_AWARD}, dbcz1_733.getJl());
				}
			}
		}
	}

}
