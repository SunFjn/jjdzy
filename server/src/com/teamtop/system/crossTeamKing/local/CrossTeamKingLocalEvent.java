package com.teamtop.system.crossTeamKing.local;

import java.util.HashSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.crossTeamKing.CrossTeamKingConst;
import com.teamtop.system.crossTeamKing.CrossTeamKingFunction;
import com.teamtop.system.crossTeamKing.CrossTeamKingSender;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_kfwzmb_770;

public class CrossTeamKingLocalEvent extends AbsSystemEvent{
	
	private static CrossTeamKingLocalEvent ins = null;

	public static CrossTeamKingLocalEvent getIns() {
		if (ins == null) {
			ins = new CrossTeamKingLocalEvent();
		}
		return ins;
	}


	@Override
	public void init(Hero hero) {
		CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
		int leftNum = Config_xtcs_004.getIns().get(CrossTeamKingConst.BATTLE_NUM).getNum();
		if (crossTeamKingLocal==null) {
			crossTeamKingLocal=new CrossTeamKingLocal();
			crossTeamKingLocal.setHid(hero.getId());
			crossTeamKingLocal.setLeftNum(leftNum);
			crossTeamKingLocal.setReborenType(0);
			crossTeamKingLocal.setDuanwei(1);
			crossTeamKingLocal.setRewards(new HashSet<Integer>());
			crossTeamKingLocal.setWeekResetTime(CrossTeamKingLocalCache.getWeekRestTime());
			hero.setCrossTeamKingLocal(crossTeamKingLocal);
		}
		
	}

	@Override
	public void login(Hero hero) {
		CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
		if (crossTeamKingLocal.getWeekResetTime()!=CrossTeamKingLocalCache.getWeekRestTime()) {
			//重置
			int leftNum=Config_xtcs_004.getIns().get(CrossTeamKingConst.BATTLE_NUM).getNum();
			crossTeamKingLocal.setJf(0);
			crossTeamKingLocal.setRank(0);
			crossTeamKingLocal.setDuanwei(1);
			crossTeamKingLocal.setLeftNum(leftNum);
			crossTeamKingLocal.setReborenType(0);
			crossTeamKingLocal.setWeekResetTime(CrossTeamKingLocalCache.getWeekRestTime());
			LogTool.info("CrossTeamKingLocal rest login success hid "+hero.getId(), crossTeamKingLocal.getClass());
		}
		if (CrossTeamKingFunction.getIns().getActSate()) {
			CrossTeamKingSender.sendCmd_10820(hero.getId(), 1);
		}else {
			CrossTeamKingSender.sendCmd_10820(hero.getId(), 0);
		}
		if (CrossTeamKingFunction.getIns().getActSate()&&crossTeamKingLocal.getLeftNum()>0) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.CROSS_TEAMKING, ArchiveConst.RedPoint,
					RedPointConst.HAS_RED);
		}
		
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	
	public void zeroHero(Hero hero,int now){
		if (CrossZone.isCrossServer()) {
			// 跨服
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
			return;
		}
		
		CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
		crossTeamKingLocal.setBuyNum(0);
	
		//每日奖励邮件补发
		int reborenType = crossTeamKingLocal.getReborenType();
		if (reborenType!=0) {
			ConcurrentHashMap<Integer, Struct_kfwzmb_770> concurrentHashMap = CrossTeamKingLocalCache.goalRewardMap.get(reborenType);
			for (Struct_kfwzmb_770 kfwzmb_770:concurrentHashMap.values()) {
				int index = kfwzmb_770.getId();
				if (crossTeamKingLocal.getBattleWinNum()>=kfwzmb_770.getCs()&&!crossTeamKingLocal.getRewards().contains(index)) {
					crossTeamKingLocal.getRewards().add(index);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.CROSSTEAMKING_DAYREWARD, new Object[] { MailConst.CROSSTEAMKING_DAYREWARD,kfwzmb_770.getCs()}, kfwzmb_770.getJl());
				}
			}
		}
		crossTeamKingLocal.setRewards(new HashSet<Integer>());
		crossTeamKingLocal.setBattleWinNum(0);
		crossTeamKingLocal.setWinAwayNum(0);
		
		int leftNum=Config_xtcs_004.getIns().get(CrossTeamKingConst.BATTLE_NUM).getNum();
		if (TimeDateUtil.getWeek()==1) {
			crossTeamKingLocal.setLeftNum(leftNum);
		}else {
			crossTeamKingLocal.setLeftNum(crossTeamKingLocal.getLeftNum()+leftNum);
		}
		
		
	}
	
	public void zeroPub(int now){
		if (CrossZone.isCrossServer()) {
			// 跨服
			return;
		}
		if (TimeDateUtil.getWeek()==1) {
			int leftNum=Config_xtcs_004.getIns().get(CrossTeamKingConst.BATTLE_NUM).getNum();
			CrossTeamKingFunction.getIns().sendRankReward();
			int currentTime = TimeDateUtil.getMondayZeroTime();
			CrossTeamKingLocalCache.setWeekRestTime(currentTime);
			CrossTeamKingLocalCache.getTeamKingRankSys().getRankCache().clear();
			
			for (Hero hero : HeroCache.getHeroMap().values()) {
				if (HeroFunction.getIns().isOnline(hero.getId())) {
					CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
					crossTeamKingLocal.setJf(0);
					crossTeamKingLocal.setRank(0);
					crossTeamKingLocal.setDuanwei(1);
					crossTeamKingLocal.setLeftNum(leftNum);
					
					int reborenType = crossTeamKingLocal.getReborenType();
					if (reborenType!=0) {
						ConcurrentHashMap<Integer, Struct_kfwzmb_770> concurrentHashMap = CrossTeamKingLocalCache.goalRewardMap.get(reborenType);
						for (Struct_kfwzmb_770 kfwzmb_770:concurrentHashMap.values()) {
							int index = kfwzmb_770.getId();
							if (crossTeamKingLocal.getBattleWinNum()>=kfwzmb_770.getCs()&&!crossTeamKingLocal.getRewards().contains(index)) {
								crossTeamKingLocal.getRewards().add(index);
								MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.CROSSTEAMKING_DAYREWARD, new Object[] { MailConst.CROSSTEAMKING_DAYREWARD,kfwzmb_770.getCs()}, kfwzmb_770.getJl());
							}
						}
						crossTeamKingLocal.setRewards(new HashSet<Integer>());
						crossTeamKingLocal.setBattleWinNum(0);
					}
					crossTeamKingLocal.setReborenType(0);
					crossTeamKingLocal.setWeekResetTime(currentTime);
					LogTool.info("CrossTeamKingLocal rest zeroPub success hid "+hero.getId(), crossTeamKingLocal.getClass());
				}
			}
			
		}
	}
	
	

}
