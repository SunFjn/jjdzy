package com.teamtop.system.boss.countryBoss;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.qmboss.BossHurtInfo;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_gjboss_738;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_gjboss_738;

public class CountryBossManager {
	
	private static CountryBossManager ins = null;

	public static synchronized CountryBossManager getIns() {
		if (ins == null) {
			ins = new CountryBossManager();
		}
		return ins;
	}

	public void openUi(Hero hero) {
		try {
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
			CountryBossModel countryBossModel = countryBossMap.get(hero.getCountryType());
			if (countryBossModel==null) {
				LogTool.warn("countryBossModel==null "+hero.getId(), CountryBossManager.class);
				return;
			}
			Object[] killBossinfo=new Object[] {};
			ConcurrentHashMap<Integer, CountryRankJioner> killersByCountry = CountryBossSysCache.getCountryBossCache().getNewkillersByCountry().get(hero.getCountryType());
			
			/*for (int key: killersByCountry.keySet()) {
				CountryRankJioner countryRankJioner = killersByCountry.get(key);
				if (countryRankJioner!=null) {
					Long killerid = countryRankJioner.getKillerid();
					if (killerid!=null&&killerid!=0) {
						Hero hero1 =HeroCache.getHero(killerid, HeroConst.FIND_TYPE_BASIC);
						killBossinfo[key-1]=new Object[] {key,hero1.getNameZoneid()};
					}else {
						killBossinfo[key-1]=new Object[] {key,""};
					}
				}
			}*/
			if (killersByCountry.size()>0) {
				killBossinfo=new Object[killersByCountry.size()];
				for (int i = 1; i <=killersByCountry.size(); i++) {
					CountryRankJioner countryRankJioner = killersByCountry.get(i);
					if (countryRankJioner!=null) {
						Long killerid = countryRankJioner.getKillerid();
						if (killerid!=null&&killerid!=0) {
							Hero hero1 =HeroCache.getHero(killerid, HeroConst.FIND_TYPE_BASIC);
							killBossinfo[i-1]=new Object[] {i,hero1.getNameZoneid()};
						}else {
							killBossinfo[i-1]=new Object[] {i,""};
						}
					}
				}
			}
			CountryBoss countryBoss = hero.getCountryBoss();
			Object[] rewards=new Object[Config_gjboss_738.getIns().size()];
			int size = Config_gjboss_738.getIns().size();
			/*if (countryBossModel.getBossId()<size&&countryBossModel.getCurhp()<=0) {
				CountryBossFunction.getIns().creatNewBoss(hero.getCountryType(), countryBossModel.getBossId());
			}*/
			int nowBossid= countryBossModel.getBossId();
			long nowBossBool=(long)countryBossModel.getCurhp();
			for (Struct_gjboss_738 Struct_gjboss_738: Config_gjboss_738.getIns().getSortList()) {
				int cengshu=Struct_gjboss_738.getCengshu();
				if(countryBoss.getBossReward().containsKey(cengshu)) {
					int rewardState=countryBoss.getBossReward().get(cengshu);
					if (cengshu==size&&nowBossid==size&&nowBossBool<=0&&rewardState==GameConst.REWARD_0) {
						countryBoss.getBossReward().put(cengshu, GameConst.REWARD_1);
						rewardState=GameConst.REWARD_1;
					}else if (nowBossid>cengshu&&rewardState==GameConst.REWARD_0) {
						countryBoss.getBossReward().put(cengshu, GameConst.REWARD_1);
						rewardState=GameConst.REWARD_1;
					}
					rewards[cengshu-1]=new Object[] {cengshu,rewardState};
				}else {
					countryBoss.getBossReward().put(cengshu, GameConst.REWARD_0);
					rewards[cengshu-1]=new Object[] {cengshu,GameConst.REWARD_0};
				}
			}
			killBossinfo=CommonUtil.removeNull(killBossinfo);
			CountryBossSender.sendCmd_3202(hero.getId(), countryBossModel.getBossId(), (long)countryBossModel.getHpmax(),(long)countryBossModel.getCurhp(), 
					killBossinfo, countryBoss.getDayTimes(), countryBoss.getBuyTimes(), rewards);
			// 成就树
			if (countryBossModel.getBossId() >= size && countryBossModel.getCurhp() == 0) {
				AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_6, 5, 0);
			}
		} catch (Exception e) {
			LogTool.error(e, CountryBossManager.class, hero.getId(), hero.getName(), "openUi has wrong");
		}
		
	}

	public void inbattle(Hero hero,int bossIndex) {
		try {
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
			CountryBossModel countryBossModel = countryBossMap.get(hero.getCountryType());
			if (countryBossModel==null) {
				LogTool.warn("countryBossModel==null "+hero.getId(), CountryBossManager.class);
				return;
			}
			if (countryBossModel.getBossId()!=bossIndex||countryBossModel.getCurhp()<=0) {
				CountryBossSender.sendCmd_3204(hero.getId(), 2,bossIndex);
				return;
			}
			if (countryBossModel.getInHeros().contains(hero.getId())) {
				CountryBossSender.sendCmd_3204(hero.getId(), 3,bossIndex);
				return;
			}
			CountryBoss countryBoss = hero.getCountryBoss();
			if (countryBoss.getDayTimes()<=0) {
				CountryBossSender.sendCmd_3204(hero.getId(), 1,bossIndex);
				return;
			}
			
			List<CountryBossDamgModel> rankList = countryBossModel.getRankList();
			CountryBossDamgModel model = new CountryBossDamgModel();
			model.setHid(hero.getId());
			if(!rankList.contains(model)){
				model.setName(hero.getNameZoneid());
				rankList.add(model);
			}else{
				model = rankList.get(rankList.indexOf(model));
			}
			FinalFightAttr fightAttr = BattleFunction.initHero(hero);
			model.setAttrmap(fightAttr);
			model.fullHp();
			model.setInTime(TimeDateUtil.getCurrentTime());
			
			Struct_gjboss_738 struct_gjboss_738 = Config_gjboss_738.getIns().get(countryBossModel.getBossId());
			int bossid = struct_gjboss_738.getBoss()[0][1];
			
			double ap=struct_gjboss_738.getShanghai();
			int p=struct_gjboss_738.getGuding();
			double x=(ap/100l);
			long hurt = (long) (fightAttr.getHpMax()*x+p);
			
			FinalFightAttr target = BattleFunction.initNPC(bossid);
			long damg =(long) Math.max(BattleFunction.calcDamg(fightAttr, target),1);
			
			BossHurtInfo bossHurtInfo=new BossHurtInfo();
			bossHurtInfo.setBossId(countryBossModel.getBossId());
			bossHurtInfo.setOnehurtAB(damg);
			bossHurtInfo.setOnehurtBA(hurt);
			model.setBossHurtInfo(bossHurtInfo);
			countryBossModel.getInHeros().add(hero.getId());
			int i =0;
			CountryBossSender.sendCmd_3204(hero.getId(), 0,bossIndex);
			for (int j = 0; j < countryBossModel.getInHeros().size(); j++) {
				long h=countryBossModel.getInHeros().get(j);
				if(i++>5) break;
				Hero hero1=HeroCache.getHero(h);
				HeroFunction.getIns().sendBattleHeroAttr(hero1, hero.getId());
				HeroFunction.getIns().sendBattleHeroAttr(hero, h);
			}
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_6, 1, 0);
			return;
		} catch (Exception e) {
			LogTool.error(e, CountryBossManager.class, hero.getId(), hero.getName(), "quit has wrong");
		}
		
	}

	/**
	 * 退出扣次数 发奖励
	 * @param hero
	 */
	public void quit(Hero hero) {
		try {
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
			CountryBossModel countryBossModel = countryBossMap.get(hero.getCountryType());
			if (countryBossModel==null) {
				LogTool.warn("countryBossModel==null "+hero.getId(), CountryBossManager.class);
				return;
			}
			CountryBoss countryBoss = hero.getCountryBoss();
			if (countryBoss.getDayTimes()<=0) {
				LogTool.warn("countryBoss.getDayTimes()<=0 "+hero.getId(), CountryBossManager.class);
				return;
			}
			if (countryBossModel.getInHeros().contains(hero.getId())) {
				countryBoss.setDayTimes(countryBoss.getDayTimes()-1);
				countryBossModel.getInHeros().remove(hero.getId());
				countryBoss.setBattleBossId(0);
				int[][] reward=Config_xtcs_004.getIns().get(CountryBossConst.BATTLE_REWARD).getOther();
				UseAddUtil.add(hero, reward, SourceGoodConst.BOSS_JOINREWARD, null, true);
				CountryBossSender.sendCmd_3208(hero.getId(), 0);
			}else {
				CountryBossSender.sendCmd_3208(hero.getId(), 0);
			}
			
		} catch (Exception e) {
			LogTool.error(e, CountryBossManager.class, hero.getId(), hero.getName(), "quit has wrong");
		}
		
	}

	public void buyTime(Hero hero,int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, CountryBossConst.SYS_ID)) {
				return;
			}
			if (num<=0) {
				return;
			}
			if (hero.getCountryType()==0) {
				LogTool.warn("hero.getCountryType()==0 hid:"+hero.getId(), CountryBossManager.class);
				return;
			}
			CountryBoss countryBoss = hero.getCountryBoss();
//			int dayRestNum=Config_xtcs_004.getIns().get(CountryBossConst.DAYRESTNUM).getNum();
			
//			if (countryBoss.getDayTimes()>=dayRestNum) {
//				CountryBossSender.sendCmd_3214(hero.getId(), 1, countryBoss.getDayTimes());
//				return;
//			}
			int buyLimit=Config_xtcs_004.getIns().get(CountryBossConst.BUY_MAX).getNum();
			int hasbuyNum=countryBoss.getBuyTimes()+num;
			if (hasbuyNum>buyLimit) {
				CountryBossSender.sendCmd_3214(hero.getId(), 2, countryBoss.getDayTimes());
				return;
			}
			int[][] buyCost=Config_xtcs_004.getIns().get(CountryBossConst.BUY_COST).getOther();
			if (!UseAddUtil.canUse(hero, buyCost,num)) {
				CountryBossSender.sendCmd_3214(hero.getId(), 3, countryBoss.getDayTimes());
				return;
			}
			UseAddUtil.use(hero, buyCost,num, SourceGoodConst.BOSS_BUYCOST, true);
			countryBoss.setDayTimes(countryBoss.getDayTimes()+num);
			countryBoss.setBuyTimes(countryBoss.getBuyTimes()+num);
			CountryBossSender.sendCmd_3214(hero.getId(), 0, countryBoss.getDayTimes());
			return;
		} catch (Exception e) {
			LogTool.error(e, CountryBossManager.class, hero.getId(), hero.getName(), "quit has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 * @param bossId
	 */
	public void getReward(Hero hero, int bossId) {
		try {
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
			CountryBossModel countryBossModel = countryBossMap.get(hero.getCountryType());
			if (countryBossModel==null) {
				LogTool.warn("countryBossModel==null "+hero.getId(), CountryBossManager.class);
				return;
			}
			CountryBoss countryBoss = hero.getCountryBoss();
			int size = Config_gjboss_738.getIns().size();
			int nowBossid= countryBossModel.getBossId();
			long nowBossBool=(long)countryBossModel.getCurhp();
			for (int i = 1; i <= size; i++) {
				if(countryBoss.getBossReward().containsKey(i)) {
					int rewardState=countryBoss.getBossReward().get(i);
					if (i==size&&nowBossid==size&&nowBossBool==0&&rewardState==GameConst.REWARD_0) {
						countryBoss.getBossReward().put(i, GameConst.REWARD_1);
					}else if (nowBossid>i&&rewardState==GameConst.REWARD_0) {
						countryBoss.getBossReward().put(i, GameConst.REWARD_1);
					}
				}else {
					countryBoss.getBossReward().put(i, GameConst.REWARD_0);
				}
			}
			if (countryBoss.getBossReward().get(bossId)==GameConst.REWARD_1) {
				Struct_gjboss_738 struct_gjboss_738 = Config_gjboss_738.getIns().get(bossId);
				int[][] reward=struct_gjboss_738.getJiangli();
				if (UseAddUtil.canAdd(hero, struct_gjboss_738.getJiangli(), false)) {
					UseAddUtil.add(hero, reward, SourceGoodConst.BOSS_PASS, null, true);
					countryBoss.getBossReward().put(bossId, GameConst.REWARD_2);
					CountryBossSender.sendCmd_3216(hero.getId(), 0, bossId);
					return;
				}else {
					CountryBossSender.sendCmd_3216(hero.getId(), 2, bossId);
					return;
				}
			}else {
				CountryBossSender.sendCmd_3216(hero.getId(), 1, bossId);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, CountryBossManager.class, hero.getId(), hero.getName(), "getReward has wrong");
		}
		
	}
	/**
	 * 打开排行榜
	 * @param hero
	 * @param index
	 */
	public void openrank(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, CountryBossConst.SYS_ID)) {
				return;
			}
			CountryBoss crossBoss=hero.getCountryBoss();
			long myHurt=0;
			HashMap<Integer, Long> hurtByBossid = crossBoss.getHurtByBossid();
			if (hurtByBossid==null) {
				hurtByBossid=new HashMap<>();
				crossBoss.setHurtByBossid(hurtByBossid);
			}
			if (hurtByBossid.containsKey(index)) {
				myHurt=hurtByBossid.get(index);
			}
			int countryType = hero.getCountryType();
			if (countryType==0) {
				LogTool.warn("hero.getCountryType()==0 hid:"+hero.getId(), CountryBossManager.class);
				return;
			}
			CountryBossCache countryBossCache = CountryBossSysCache.getCountryBossCache();
			if (countryBossCache==null) {
				LogTool.warn("countryBossCache==null "+hero.getId(), CountryBossManager.class);
				return;
			}
			if (!countryBossCache.getNewkillersByCountry().containsKey(countryType)) {
				LogTool.warn("!containsKey(countryType) "+hero.getId(), CountryBossManager.class);
				return;
			}
			ConcurrentHashMap<Integer, CountryRankJioner> concurrentHashMap = countryBossCache.getNewkillersByCountry().get(countryType);
			if (!concurrentHashMap.containsKey(index)) {
				LogTool.warn("!concurrentHashMap.contains(index) "+hero.getId(), CountryBossManager.class);
				return;
			}
			CountryRankJioner countryRankJioner = concurrentHashMap.get(index);
			if (countryRankJioner.getHurtRankArr()==null) {
				LogTool.warn("!countryRankJioner.getHurtRankArr()==null"+hero.getId(), CountryBossManager.class);
				return;
			}
			Object[]  hurtlist=new Object[] {};
			List<CountryHurter> hurtRankArr = countryRankJioner.getHurtRankArr();
			if (hurtRankArr!=null&&hurtRankArr.size()>0) {
				int size = hurtRankArr.size();
				hurtlist=new Object[size];
				for (int i = 0; i < size; i++) {
					CountryHurter countryHurter = hurtRankArr.get(i);
					hurtlist[i]=new Object[] {countryHurter.getHid(),countryHurter.getName(),countryHurter.getHurt()};
				}
			}
			CountryBossSender.sendCmd_3218(hero.getId(), index, hurtlist, myHurt);
			return;
		} catch (Exception e) {
			LogTool.error(e, CountryBossManager.class, hero.getId(), hero.getName(), "getReward has wrong");
		}
		
	}

	public void countryrank(Hero hero) {
		try {
			CountryBossCache countryBossCache = CountryBossSysCache.getCountryBossCache();
			if (countryBossCache==null) {
				LogTool.warn("countryBossCache==null "+hero.getId(), CountryBossManager.class);
				return;
			}
			Object[] countrylist=new Object[] {};
			List<CountryBossRank> rankList = countryBossCache.getRankList();
			if (rankList!=null&&rankList.size()>0) {
				int size = rankList.size();
				countrylist=new Object[size];
				for (int i = 0; i < size; i++) {
					CountryBossRank countryBossRank = rankList.get(i);
					countrylist[i]=new Object[] {countryBossRank.getType(),countryBossRank.getDiebossnum()};
				}
			}
			CountryBossSender.sendCmd_3220(hero.getId(), countrylist);
		} catch (Exception e) {
			LogTool.error(e, CountryBossManager.class, hero.getId(), hero.getName(), "countryrank has wrong");
		}
		
	}
	
	
}
