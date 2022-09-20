package com.teamtop.system.sevenAwayRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lxlc1_728;
import excel.config.Config_lxlc1_745;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lxlc1_745;

public class SevenAwayRechargeEvent extends AbsSystemEvent {

	private static SevenAwayRechargeEvent ins;
	public static SevenAwayRechargeEvent getIns(){
		if(ins == null) {
			ins = new SevenAwayRechargeEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		if (hero.getSevenAwayRecharge()==null) {
			SevenAwayRecharge sevenAwayRecharge=new SevenAwayRecharge();
		    sevenAwayRecharge.setHid(hero.getId());
		    HashMap<Integer, Integer> reward=new HashMap<>();
		    int size=Config_lxlc1_728.getIns().getSortList().size();
		    for(int i=1;i<=size;i++) {
		    	reward.put(i, GameConst.REWARD_0);
		    }
		    sevenAwayRecharge.setReward(reward);
		    sevenAwayRecharge.setTodayRewardSate(GameConst.REWARD_0);
		    HashMap<Integer, Integer> bigReward=new HashMap<>();
		    for (Struct_lxlc1_745 lxlc1_745:Config_lxlc1_745.getIns().getSortList()) {
		    	bigReward.put(lxlc1_745.getId(), GameConst.REWARD_0);
			}
		    sevenAwayRecharge.setBigReward(bigReward);
			hero.setSevenAwayRecharge(sevenAwayRecharge);
		}else if (hero.getSevenAwayRecharge().getBigReward()==null) {
			SevenAwayRecharge sevenAwayRecharge=hero.getSevenAwayRecharge();
		    sevenAwayRecharge.setTodayRewardSate(GameConst.REWARD_0);
		    HashMap<Integer, Integer> bigReward=new HashMap<>();
		    for (Struct_lxlc1_745 lxlc1_745:Config_lxlc1_745.getIns().getSortList()) {
		    	bigReward.put(lxlc1_745.getId(), GameConst.REWARD_0);
			}
		    sevenAwayRecharge.setBigReward(bigReward);
			hero.setSevenAwayRecharge(sevenAwayRecharge);
		}
	}
	@Override
	public void login(Hero hero) {
		SevenAwayRecharge sevenAwayRecharge=hero.getSevenAwayRecharge();
		//发老奖励
		SevenAwayReFunction.getIns().sendOldSysReward(hero);
		//改版
		if (sevenAwayRecharge.getBigReward()==null) {
		    sevenAwayRecharge.setTodayRewardSate(GameConst.REWARD_0);
		    HashMap<Integer, Integer> bigReward=new HashMap<>();
		    for (Struct_lxlc1_745 lxlc1_745:Config_lxlc1_745.getIns().getSortList()) {
		    	bigReward.put(lxlc1_745.getId(), GameConst.REWARD_0);
			}
		    sevenAwayRecharge.setBigReward(bigReward);
		}
		//兼容今日充值的奖励
		if (sevenAwayRecharge.getTodayIsSuccess()>0&&sevenAwayRecharge.getTodayRewardSate()==GameConst.REWARD_0) {
			sevenAwayRecharge.setTodayRewardSate(GameConst.REWARD_1);
		}
		//兼容累计充值奖励
		HashMap<Integer, Integer> bigReward = sevenAwayRecharge.getBigReward();
		int successNum = sevenAwayRecharge.getSuccessNum();
		for (Struct_lxlc1_745 lxlc1_745:Config_lxlc1_745.getIns().getSortList()) {
			int id = lxlc1_745.getId();
			if (!bigReward.containsKey(id)) {
				bigReward.put(id, GameConst.REWARD_0);
			}
			if (bigReward.get(id)==GameConst.REWARD_0&&successNum>=lxlc1_745.getTianshu()) {
				bigReward.put(id, GameConst.REWARD_1);
				SevenAwayRechargeSender.sendCmd_2776(hero.getId(), sevenAwayRecharge.getSuccessNum(), id, GameConst.REWARD_1);
			}
		}
		
		boolean readPoint=false;
		if (HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENAWAYRECHARGE)) {
			if (sevenAwayRecharge.getTodayRewardSate()==GameConst.REWARD_1) {
				readPoint=true;
			}
			for (int state:sevenAwayRecharge.getBigReward().values()) {
				if (state==GameConst.REWARD_1) {
					readPoint=true;
				}
			}
			if (readPoint) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SEVENAWAYRECHARGE, ArchiveConst.RedPoint,
						RedPointConst.HAS_RED);
			}
		}
		
	}
	
	public void zeroHero(Hero hero,int now){
		SevenAwayRecharge sevenAwayRecharge=hero.getSevenAwayRecharge();
		int[][] reward = Config_xtcs_004.getIns().get(5201).getOther();
		if (sevenAwayRecharge.getTodayRewardSate()==GameConst.REWARD_1) {
			if (reward!=null) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.NEW_AWAYRECHARGE_DAY,
						new Object[] { MailConst.NEW_AWAYRECHARGE_DAY}, reward);
			}
		}
		sevenAwayRecharge.setTodayRecharge(0);
		sevenAwayRecharge.setTodayIsSuccess(0);
		sevenAwayRecharge.setTodayRewardSate(GameConst.REWARD_0);
		int num=TimeDateUtil.betweenOpen();
		if (num>=8) {
			for (int key:sevenAwayRecharge.getBigReward().keySet()) {
				if (sevenAwayRecharge.getBigReward().get(key)==GameConst.REWARD_1) {
					sevenAwayRecharge.getBigReward().put(key, GameConst.REWARD_2);
					Struct_lxlc1_745 struct_lxlc1_745 = Config_lxlc1_745.getIns().get(key);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.NEW_AWAYRECHARGE_BIG,
							new Object[] { MailConst.NEW_AWAYRECHARGE_BIG}, struct_lxlc1_745.getJiangli());
					
				}
			}
			
		}
		
	
		
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

}
