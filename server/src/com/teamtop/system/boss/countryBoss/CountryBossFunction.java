package com.teamtop.system.boss.countryBoss;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.country.CountrySysCache;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_gjboss_738;
import excel.config.Config_gjbsgr_738;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_gjboss_738;
import excel.struct.Struct_gjbsgr_738;

public class CountryBossFunction {
	
	private static CountryBossFunction ins = null;

	public static synchronized CountryBossFunction getIns() {
		if (ins == null) {
			ins = new CountryBossFunction();
		}
		return ins;
	}
	
	public void initCountryBoss() {
		try {
			Struct_gjboss_738 struct_gjboss_738 = Config_gjboss_738.getIns().get(CountryBossConst.BOSSINDEX_1);
			int bossid = struct_gjboss_738.getBoss()[0][1];
			FinalFightAttr battleFightAttr = BattleFunction.initNPC(bossid);
			long hp = battleFightAttr.getHp();
			CountryBossCache countryBossCache1 = CountryBossSysCache.getCountryBossCache();
			if (countryBossCache1==null) {
				countryBossCache1=new CountryBossCache(); 
			}
			countryBossCache1.getCountryBossMap().clear();
			countryBossCache1.getKillersByCountry().clear();
			countryBossCache1.getJoinerByCountry().clear();
			countryBossCache1.getRankList().clear();
			for (int i = 1; i <= 3; i++) {
				//初始化当前boss
				CountryBossModel countryBossModel=new CountryBossModel();
				countryBossModel.setBossId(CountryBossConst.BOSSINDEX_1);
				countryBossModel.setCountryType(i);
				countryBossModel.setCurhp(hp);
				countryBossModel.setHpmax(hp);
				countryBossCache1.getCountryBossMap().put(i, countryBossModel);
				//初始化玩家最后一击以及伤害排行
				countryBossCache1.getNewkillersByCountry().put(i, new ConcurrentHashMap<Integer,CountryRankJioner>());
				countryBossCache1.getJoinerByCountry().put(i, new ArrayList<Long>());
				
			}
			//国家boss公共缓存
			CountryBossSysCache.setCountryBossCache(countryBossCache1);
			
		} catch (Exception e) {
			LogTool.error(e, CountryBossFunction.class, "initCountryBoss has wrong");
		}
	}
	/**
	 * boss死亡 重新初始化下一个boss
	 * @param countryType
	 */
	public void creatNewBoss(int countryType,int nowBossid) {
		int nextid=nowBossid+1;
		Struct_gjboss_738 struct_gjboss_738 = Config_gjboss_738.getIns().get(nextid);
		if (struct_gjboss_738!=null) {
			CountryBossModel countryBossModel = CountryBossSysCache.getCountryBossCache().getCountryBossMap().get(countryType);
			int bossid = struct_gjboss_738.getBoss()[0][1];
			FinalFightAttr battleFightAttr = BattleFunction.initNPC(bossid);
			long hp = battleFightAttr.getHp();
			countryBossModel.setBossId(nextid);
			countryBossModel.setCurhp(hp);
			countryBossModel.setHpmax(hp);
			countryBossModel.getRankList().clear();
			countryBossModel.getInHeros().clear();
		}
	}
	
	
	/**
	 * 每秒coutryboss 国家boss的战斗状态监测
	 * @param boss 目标boss
	 * @param nowTime 当前时间
	 * @param key 目标boss key
	 * @param senddata 是否同步给前段
	 */
	public void scheduleAttCoutryBoss(CountryBossModel boss,boolean senddata) {
		try {
			//计算伤害
			Struct_gjboss_738 struct_gjboss_738 = Config_gjboss_738.getIns().get(boss.getBossId());
			boolean bossDead = false;
			List<CountryBossDamgModel> rankList = boss.getRankList();
			List<Long> inheroList = boss.getInHeros();
			List<Object[]> hurtList = null;
			List<CountryHurter> hurtListandid = null;
			List<Object[]> removeList = null;
			int nowTime=TimeDateUtil.getCurrentTime();
			if(rankList.size()>0){
				hurtList = new ArrayList<Object[]>();
				hurtListandid=new ArrayList<CountryHurter>();
				for(CountryBossDamgModel model :rankList){
					if(!bossDead){
						//boss攻击的对象
						if(nowTime - model.getInTime()>=1){
							Hero hero = HeroCache.getHero(model.getHid());
							if(hero!=null && hero.isOnline() && inheroList.contains(hero.getId())){
								FinalFightAttr attr = model.getAttrmap();
								int limitime=struct_gjboss_738.getTime();
								int awayLiveTime = TimeDateUtil.getCurrentTime() - model.getInTime();
								if(awayLiveTime>=limitime){
									attr.setHp(0);
								}
								if(attr.getHp()<=0){
									if(removeList==null) removeList = new ArrayList<Object[]>();
									removeList.add(new Object[] {model.getHid()});
									continue;
								}
								boolean die =CountryBossFunction.getIns().attBoss(model,boss);
								if(die){
									bossDead = true;
								}
							}
						}
					}
				}
			}
			Collections.sort(rankList, CountryBossDamgComparator.getIns());
			int size=rankList.size();
			if (rankList.size()>10) {
				size=10;
			}
			for (int i = 0; i < size; i++) {
				CountryBossDamgModel model = rankList.get(i);
				hurtList.add(new Object[]{model.getName(),model.getHurt()});
				hurtListandid.add(new CountryHurter(model.getHid(),model.getHurt(),model.getName()));
			}
			//发送数据
			if(senddata || bossDead){
				long hpmax = (long) boss.getHpmax();
				long curhp = (long) boss.getCurhp();
				Object[] hurtArr = null;
				if(hurtList!=null && hurtList.size()>0){
					hurtArr = hurtList.toArray();
					//记录伤害
					ConcurrentHashMap<Integer, CountryRankJioner> concurrentHashMap = CountryBossSysCache.getCountryBossCache().getNewkillersByCountry().get(boss.getCountryType());
					if (concurrentHashMap!=null) {
						CountryRankJioner countryRankJioner = concurrentHashMap.get(boss.getBossId());
						if (countryRankJioner==null) {
							countryRankJioner=new CountryRankJioner();
							countryRankJioner.setHurtRankArr(hurtListandid);
							concurrentHashMap.put(boss.getBossId(), countryRankJioner);
						}else {
							countryRankJioner.setHurtRankArr(hurtListandid);
						}
					}
					
				}
				for (int i = 0; i < rankList.size(); i++) {
					CountryBossDamgModel bossAttModel = rankList.get(i);
					Hero h = HeroCache.getHero(bossAttModel.getHid());
					//个人排行奖励
					if(h!=null && h.isOnline() && inheroList.contains(h.getId())){
						if(nowTime - bossAttModel.getInTime()>=2){
							CountryBossSender.sendCmd_3206(bossAttModel.getHid(), bossAttModel.getCurhp(), hpmax, curhp, (long)(bossAttModel.getHurt()), hurtArr);
						}
						if(removeList!=null){
							CountryBossSender.sendCmd_3210(bossAttModel.getHid(), removeList.toArray());
						}
						if(bossDead){
							//boss被打死扣次数 发奖励 退出
							h.getCountryBoss().setDayTimes(h.getCountryBoss().getDayTimes()-1);
							h.getCountryBoss().setBattleBossId(0);
							int[][] reward=Config_xtcs_004.getIns().get(CountryBossConst.BATTLE_REWARD).getOther();
							UseAddUtil.add(h, reward, SourceGoodConst.BOSS_JOINREWARD, null, true);
							CountryBossSender.sendCmd_3208(h.getId(), 0);
							CountryBossSender.sendCmd_3212(bossAttModel.getHid());
							boss.getInHeros().remove(h.getId());
						}
					}
					//个人伤害排行奖励
					int index=i+1;
					if (index<=10&&bossDead) {
						for (Struct_gjbsgr_738 gjbsgr_738:Config_gjbsgr_738.getIns().getSortList()) {
							if (index>=gjbsgr_738.getRank()[0][0]&&index<=gjbsgr_738.getRank()[0][1]) {
								MailFunction.getIns().sendMailWithFujianData2(bossAttModel.getHid(), MailConst.COUNTRY_PERSON_AWARD,
										new Object[] { MailConst.COUNTRY_PERSON_AWARD,boss.getBossId(),index}, gjbsgr_738.getReward1());
							}
						}
					}
				}
			}
			//boss死亡
			if(bossDead){
				//
				creatNewBoss(boss.getCountryType(), boss.getBossId());
				//通知在线国家有奖励可以领取
				Country country = CountrySysCache.getCountryCache().getCountryMap().get(boss.getCountryType());
				for (int i = 0; i < country.getHidList().size(); i++) {
					Long long1 = country.getHidList().get(i);
					Hero h = HeroCache.getHero(long1);
					if(h!=null && h.isOnline()) {
						RedPointFunction.getIns().addLoginRedPoint(h, CountryBossConst.SYS_ID, 1, RedPointConst.HAS_RED);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CountryBossFunction.class, "scheduleAttCoutryBoss has wrong");
		}
		
	}
	
	/**
	 * 计算攻击boss伤害
	 * @param hero
	 * @param qmboss
	 * @return
	 */
	public boolean attBoss(CountryBossDamgModel model,CountryBossModel boss){
		long hurt = 0;
		double damg =model.getBossHurtInfo().getOnehurtAB();
		hurt +=damg;
		//LogTool.info("hero hit CountryBossModel id:"+boss.getBossId()+" damg:"+damg+",hurt:"+hurt+",hid:"+model.getHid()+",name:"+model.getName(),this);
		double curhp = boss.getCurhp();
		curhp = curhp - hurt;
		boss.setCurhp(curhp);
		boolean die = false;
		CountryBossCache countryBossCache = CountryBossSysCache.getCountryBossCache();
		if(boss.getCurhp()<=0){
			LogTool.info("CountryBossModel dead id:"+boss.getBossId(),this);
			die = true;
			boss.setCurhp(0);
			//击杀者
			ConcurrentHashMap<Integer, CountryRankJioner> concurrentHashMap = countryBossCache.getNewkillersByCountry().get(boss.getCountryType());
			if (concurrentHashMap!=null) {
				CountryRankJioner countryRankJioner = concurrentHashMap.get(boss.getBossId());
				if (countryRankJioner==null) {
					countryRankJioner=new CountryRankJioner();
					countryRankJioner.setKillerid(model.getHid());
					concurrentHashMap.put(boss.getBossId(), countryRankJioner);
				}else {
					countryRankJioner.setKillerid(model.getHid());
				}
			}
			//国家击杀排行榜
			CountryBossRank countryBossRank=new CountryBossRank();
			countryBossRank.setType(boss.getCountryType());
			countryBossRank.setDiebossnum(boss.getBossId());
			List<CountryBossRank> rankList = countryBossCache.getRankList();
			int indexOf = rankList.indexOf(countryBossRank);
			if(indexOf<0){
				rankList.add(countryBossRank);
			}else{
				countryBossRank = rankList.get(indexOf);
				countryBossRank.setDiebossnum(boss.getBossId());
				countryBossRank.setKilltime(TimeDateUtil.getCurrentTime());
			}
			Collections.sort(rankList, CountryBossRankComparator.getIns());
			
			Struct_gjboss_738 struct_gjboss_738 = Config_gjboss_738.getIns().get(boss.getBossId());
			int[][] reward=struct_gjboss_738.getJisha();
			//击杀邮件
			MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.COUNTRYBOSSKILL_AWARD,
					new Object[] { MailConst.COUNTRYBOSSKILL_AWARD,boss.getBossId()}, reward);
			
		}
		if(hurt>0){
			CountryBossFunction.getIns().sortCountryBossHurt(model, hurt, boss);
		}
		return die;
	}
	
	
	public void sortCountryBossHurt(CountryBossDamgModel model,double hurt,CountryBossModel boss){
		CountryBossDamgModel countryBossDamgModel = new CountryBossDamgModel();
		countryBossDamgModel.setHid(model.getHid());
		List<CountryBossDamgModel> rankList = boss.getRankList();
		int indexOf = rankList.indexOf(countryBossDamgModel);
		if(indexOf<0){
			countryBossDamgModel.setHid(model.getHid());
			countryBossDamgModel.setName(model.getName());
			countryBossDamgModel.setHurt((long)hurt);
			rankList.add(countryBossDamgModel);
		}else{
			countryBossDamgModel = rankList.get(indexOf);
			countryBossDamgModel.setName(model.getName());
			countryBossDamgModel.setHurt(countryBossDamgModel.getHurt()+(long)hurt);
			countryBossDamgModel.setHid(model.getHid());
		}
		Hero hero=HeroCache.getHero(model.getHid());
		if (hero!=null) {
			HashMap<Integer, Long> hurtByBossid = hero.getCountryBoss().getHurtByBossid();
			if (hurtByBossid==null) {
				hurtByBossid=new HashMap<Integer, Long>();
				hero.getCountryBoss().setHurtByBossid(hurtByBossid);
			}
			hurtByBossid.put(boss.getBossId(), countryBossDamgModel.getHurt());
		}
		List<Long> joinerByCountry = CountryBossSysCache.getCountryBossCache().getJoinerByCountry().get(boss.getCountryType());
		if (joinerByCountry!=null&&!joinerByCountry.contains(model.getHid())) {
			joinerByCountry.add(model.getHid());
		}
		
	}
	/**
	 * 下线 扣次数 发邮件
	 * @param hero
	 */
	public void heroOutCountryBoss(Hero hero){
		if (hero.getCountryType()==0) {
			return;
		}
		int countryType=hero.getCountryType();
		CountryBoss countryBoss = hero.getCountryBoss();
		if (CountryBossSysCache.getCountryBossCache()!=null) {
			CountryBossCache countryBossCache = CountryBossSysCache.getCountryBossCache();
			CountryBossModel countryBossModel = countryBossCache.getCountryBossMap().get(countryType);
			if (countryBossModel!=null&&countryBossModel.getInHeros().contains(hero.getId())) {
				if (countryBoss.getDayTimes()>0) {
					countryBoss.setDayTimes(countryBoss.getDayTimes()-1);
					int[][] reward=Config_xtcs_004.getIns().get(CountryBossConst.BATTLE_REWARD).getOther();
					UseAddUtil.add(hero, reward, SourceGoodConst.BOSS_JOINREWARD, null, true);
				}
				countryBossModel.getInHeros().remove(hero.getId());
				countryBoss.setBattleBossId(0);
			}
		}
	
	}
	
	/**
	 * 添加国家boss挑战次数
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addChaNum(Hero hero, int id, int num) {
		try {
			if (hero.getCountryType() == 0) {
				return false;
			}
			CountryBoss countryBoss = hero.getCountryBoss();
			countryBoss.setDayTimes(countryBoss.getDayTimes() + num);
			return true;
		} catch (Exception e) {
			LogTool.error(e, CountryBossFunction.class, hero.getId(), hero.getName(),
					"CountryBossFunction addChaNum num=" + num);
			return false;
		}
	}
	
	/**
	 * Gm调关卡方便测试
	 * 
	 * @param hero
	 * @param param
	 */
	public void gm(Hero hero, String[] param) {
		int num = Integer.parseInt(param[0]);
		ConcurrentHashMap<Integer, CountryBossModel> countryBossMap = CountryBossSysCache.getCountryBossCache()
				.getCountryBossMap();
		CountryBossModel countryBossModel = countryBossMap.get(hero.getCountryType());
		if (countryBossModel == null) {
			return;
		}
		countryBossModel.setBossId(num);
		CountryBossManager.getIns().openUi(hero);
		return;
	}

}
