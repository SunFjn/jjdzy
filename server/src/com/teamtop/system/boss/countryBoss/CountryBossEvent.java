package com.teamtop.system.boss.countryBoss;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.system.tigerPass.TigerPassFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_gjboss_738;
import excel.config.Config_gjbsgj_738;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_gjboss_738;
import excel.struct.Struct_gjbsgj_738;

public class CountryBossEvent extends AbsSystemEvent{

	private static CountryBossEvent ins = null;

	public static  CountryBossEvent getIns() {
		if (ins == null) {
			ins = new CountryBossEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		CountryBoss countryBoss = hero.getCountryBoss();
		int dayRestNum=Config_xtcs_004.getIns().get(CountryBossConst.DAYRESTNUM).getNum();
		if (countryBoss==null) {
			countryBoss =new CountryBoss();
			countryBoss.setHid(hero.getId());
			countryBoss.setBattleBossId(0);
			countryBoss.setDayTimes(dayRestNum);
			countryBoss.setBuyTimes(0);
			countryBoss.setRestTime(CountryBossSysCache.getCountryBossCache().getRestTime());
			countryBoss.setBossReward(new HashMap<>());
			int size = Config_gjboss_738.getIns().size();
			for (int i = 1; i <= size; i++) {
				countryBoss.getBossReward().put(i, GameConst.REWARD_0);
			}
			countryBoss.setHurtByBossid(new HashMap<Integer, Long>());
			hero.setCountryBoss(countryBoss);
		}else {
			if (countryBoss.getHurtByBossid()==null) {
				countryBoss.setHurtByBossid(new HashMap<Integer, Long>());
			}
		}
		
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, CountryBossConst.SYS_ID)) {
			return;
		}
		if (hero.getCountryType()==0) {
			LogTool.warn("hero.getCountryType()==0 hid:"+hero.getId(), CountryBossManager.class);
			return;
		}
		CountryBossCache countryBossCache = CountryBossSysCache.getCountryBossCache();
		if (countryBossCache==null) {
			LogTool.warn("countryBossCache==null "+hero.getId(), CountryBossManager.class);
			return;
		}
		ConcurrentHashMap<Integer, CountryBossModel> countryBossMap = CountryBossSysCache.getCountryBossCache().getCountryBossMap();
		if (countryBossMap==null) {
			LogTool.warn("countryBossMap==null "+hero.getId(), CountryBossManager.class);
			return;
		}
		CountryBoss countryBoss = hero.getCountryBoss();
		int dayRestNum=Config_xtcs_004.getIns().get(CountryBossConst.DAYRESTNUM).getNum();
		if (countryBoss.getRestTime()!=CountryBossSysCache.getCountryBossCache().getRestTime()) {
			//虎牢关放在这里先周重置一段时间
			TigerPassFunction.getIns().weekreset(hero);
			
			//一周个人重置
			countryBoss =new CountryBoss();
			countryBoss.setHid(hero.getId());
			countryBoss.setBattleBossId(0);
			countryBoss.setDayTimes(dayRestNum);
			countryBoss.setBuyTimes(0);
			countryBoss.setRestTime(CountryBossSysCache.getCountryBossCache().getRestTime());
			countryBoss.setBossReward(new HashMap<>());
			int size = Config_gjboss_738.getIns().size();
			for (int i = 1; i <= size; i++) {
				countryBoss.getBossReward().put(i, GameConst.REWARD_0);
			}
			if (countryBoss.getHurtByBossid()==null) {
				countryBoss.setHurtByBossid(new HashMap<Integer,Long>());
			}else {
				countryBoss.getHurtByBossid().clear();
			}
			hero.setCountryBoss(countryBoss);
			
		}
		
		CountryBossModel countryBossModel = countryBossMap.get(hero.getCountryType());
		int size = Config_gjboss_738.getIns().size();
		/*if (countryBossModel.getBossId()<size&&countryBossModel.getCurhp()<=0) {
			CountryBossFunction.getIns().creatNewBoss(hero.getCountryType(), countryBossModel.getBossId());
		}*/
		int nowBossid= countryBossModel.getBossId();
		long nowBossBool=(long)countryBossModel.getCurhp();
		boolean hasReward=false;
		int rewardState=0;
		for (Struct_gjboss_738 Struct_gjboss_738: Config_gjboss_738.getIns().getSortList()) {
			int cengshu=Struct_gjboss_738.getCengshu();
			if(countryBoss.getBossReward().containsKey(cengshu)) {
				rewardState=countryBoss.getBossReward().get(cengshu);
				if (nowBossid==size&&nowBossBool<=0&&rewardState==GameConst.REWARD_0) {
					countryBoss.getBossReward().put(cengshu, GameConst.REWARD_1);
					rewardState=GameConst.REWARD_1;
				}else if (nowBossid>cengshu&&rewardState==GameConst.REWARD_0) {
					countryBoss.getBossReward().put(cengshu, GameConst.REWARD_1);
					rewardState=GameConst.REWARD_1;
				}
			}else {
				countryBoss.getBossReward().put(cengshu, GameConst.REWARD_0);
			}
			if (rewardState==GameConst.REWARD_1) {
				hasReward=true;
			}
		}
		boolean isRed=false;
		if (countryBoss.getDayTimes()>0&&countryBossModel.getBossId()<=size&&countryBossModel.getCurhp()>0) {
			isRed=true;
		}
		//红点
		if (isRed||hasReward) {
			RedPointFunction.getIns().addLoginRedPoint(hero, CountryBossConst.SYS_ID, 1, RedPointConst.HAS_RED);
		}
		
	}
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		//奖励找回处理(重置前)
		RewardBackFunction.getIns().handle(hero,CountryBossConst.SYS_ID,0);
		CountryBoss countryBoss = hero.getCountryBoss();
		int dayRestNum=Config_xtcs_004.getIns().get(CountryBossConst.DAYRESTNUM).getNum();
		countryBoss.setDayTimes(dayRestNum);
		countryBoss.setBuyTimes(0);
		//奖励找回处理(重置后)
		RewardBackFunction.getIns().handle(hero,CountryBossConst.SYS_ID,1);
		if (TimeDateUtil.getWeek()==1) {
			login(hero);
		}else {
			RedPointFunction.getIns().addLoginRedPoint(hero, CountryBossConst.SYS_ID, 1, RedPointConst.HAS_RED);
		}
	}
	@Override
	public void logout(Hero hero){
		//CountryBossManager.getIns().quit(hero);
		CountryBossFunction.getIns().heroOutCountryBoss(hero);
	}
	
	@Override
	public void zeroPub(int now){
		if (TimeDateUtil.getWeek()==1) {
			CountryBossCache countryBossCache = CountryBossSysCache.getCountryBossCache();
			List<CountryBossRank> rankList = countryBossCache.getRankList();
			ConcurrentHashMap<Integer, List<Long>> joinerByCountry = countryBossCache.getJoinerByCountry();
			//发国家排名奖励
			Collections.sort(rankList, CountryBossRankComparator.getIns());
			for (int i = 0; i < rankList.size(); i++) {
				//第几名
				int index=i+1;
				Struct_gjbsgj_738 struct_gjbsgj_738 = Config_gjbsgj_738.getIns().get(index);
				int[][] reward=struct_gjbsgj_738.getJiangli();
				CountryBossRank countryBossRank = rankList.get(i);
				int countryType=countryBossRank.getType();
				if (joinerByCountry.containsKey(countryType)) {
					List<Long> arrayList = joinerByCountry.get(countryType);
					if (arrayList!=null) {
						//发邮件
						for (int j = 0; j < arrayList.size(); j++) {
							Long long1 = arrayList.get(j);
							MailFunction.getIns().sendMailWithFujianData2(long1, MailConst.COUNTRY_AWARD,
									new Object[] { MailConst.COUNTRY_AWARD,index}, reward);
						}
					}
				}
				
			}
			CountryBossFunction.getIns().initCountryBoss();
			CountryBossSysCache.getCountryBossCache().setRestTime(TimeDateUtil.getCurrentTime());
			CountryBossSysCache.getIns().updateGloalData();
			
		}
	}

}
