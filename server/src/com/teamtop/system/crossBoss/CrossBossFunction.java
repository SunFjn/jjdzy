package com.teamtop.system.crossBoss;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift.ActiveGetGiftFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.crossBoss.cross.CrossBossSchedule;
import com.teamtop.system.crossBoss.cross.ZSBoss;
import com.teamtop.system.crossBoss.cross.ZSBossComparator;
import com.teamtop.system.crossBoss.model.CrossBoss;
import com.teamtop.system.crossBoss.model.CrossBossAllGlobalData;
import com.teamtop.system.crossBoss.model.CrossBossLocalGlobalData;
import com.teamtop.system.crossBoss.model.CrossBossRankModel;
import com.teamtop.system.crossBoss.model.ZSBossHis;
import com.teamtop.system.crossBoss.model.ZSBossHisModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.runeGift.RuneGiftFunction;
import com.teamtop.util.exector.schedule.ScheduleConst;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lbmh_307;
import excel.config.Config_seven_223;
import excel.config.Config_sevenmb_223;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lbmh_307;
import excel.struct.Struct_seven_223;
import excel.struct.Struct_sevenmb_223;
import io.netty.channel.Channel;

/**
 * 跨服boss function
 * @author Administrator
 *
 */
public class CrossBossFunction {
	
	private static CrossBossFunction ins = null;

	public static synchronized CrossBossFunction getIns() {
		if (ins == null) {
			ins = new CrossBossFunction();
		}
		return ins;
	}
	
	public void GM(Hero hero, int cmdId) {
		if(cmdId<0||cmdId>2){
			return;
		}
		CrossBossIO.getIns().LTC_GM(cmdId);
		LogTool.info("CrossBossFunction.GM cmdId:"+cmdId, this);
	}
	
	
	public void noticeBossSate(Hero hero,int bossid,int isdie) {
		try {
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				return;
			}
			int bossId=0;
			for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
				if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
					bossId=seven.getBoss();
					break;
				}
			}
			if (bossId==0) {
				return;
			}
			if (isdie==1) {
				//开启
				GlobalSender.sendCmd_264(hero.getId(),SystemIdConst.FUN_CROSS_BOSS_MH, bossId, isdie);
				return;
			}else  {
				//死亡
				if (bossid==bossId) {
					GlobalSender.sendCmd_264(hero.getId(),SystemIdConst.FUN_CROSS_BOSS_MH, bossId, isdie);
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossBossFunction.class, "noticeBossSate has wrong");
		}
		
	}

	/**
	 * 是否有红点
	 * @param hero
	 * @return
	 */
	public boolean isReadPoint(Hero hero) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CROSS_BOSS_MH)) return false;
		CrossBoss crossBoss = hero.getCrossBoss();
		if (crossBoss==null) {
			return false;
		}
		int bossid=0;
		for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
			if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
				bossid=seven.getBoss();
				break;
			}
		}
		if (CrossBossLocalCache.dieBoss.contains(bossid)) {
			return false;
		}
		if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
			return false;
		}
		if (hero.getCrossBoss().getNum()==0) {
			return false;
		}
		return true;
	}
	
	
	
	/**
	 * 准备
	 */
	public void ready(){
		for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
			Map<Integer, ConcurrentHashMap<Integer, ZSBoss>> zsbossMap = CrossBossCache.getZsbossMap(partId);
			zsbossMap.clear();  
			Map<Integer, Integer> minzoneidMap = CrossBossCache.getMinZoneidMap(partId);
			List<Integer> zoneids = new ArrayList<Integer>(minzoneidMap.values());
			Collections.sort(zoneids);
			CrossBossAllGlobalData crossBossAllGlobalData  = CrossBossCache.getCrossBossAllGlobalData();
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossBossLocalGlobalData>> nowGlobalData = crossBossAllGlobalData.getNowGlobalData();
			ZSBoss zsBoss=null;
			ConcurrentHashMap<Integer, ZSBoss> ZSBossMap=null;
			for(Integer minZoneid:zoneids){
				int roomId=minZoneid/CrossBossConst.ZONEIDSIZE;
				if (!zsbossMap.containsKey(roomId)) {
					ZSBossMap=new ConcurrentHashMap<Integer, ZSBoss>();
					long MaxHp=0;
					long tempMaxHp = 0;
					ConcurrentHashMap<Integer, CrossBossLocalGlobalData> pMap = nowGlobalData.get(partId);
					if(pMap==null) {
						pMap = new ConcurrentHashMap<>();
						nowGlobalData.put(partId, pMap);
					}
					for (Struct_seven_223 seven_223:Config_seven_223.getIns().getSortList()) {
						tempMaxHp = 0;
						CrossBossLocalGlobalData bossGlobalData = pMap.get(roomId);
						if (bossGlobalData!=null) {
							ZSBossHis zsBossHis=bossGlobalData.getBossHisMapByBossid().get(seven_223.getBoss());
							FinalFightAttr battleFightAttr = BattleFunction.initNPC(seven_223.getBoss());
							if (zsBossHis != null && zsBossHis.getAddDoubleNum() != 0) {
								tempMaxHp=battleFightAttr.getHpMax()*zsBossHis.getAddDoubleNum();
							}
							MaxHp=battleFightAttr.getHpMax()+tempMaxHp;
							LogTool.info("转生"+seven_223.getCon()[0][0]+"——"+seven_223.getCon()[0][1]+" bossid:"+seven_223.getBoss()+" maxhp"+battleFightAttr.getHpMax()+" 倍数："+zsBossHis.getAddDoubleNum()+"总血量："+MaxHp, CrossBossFunction.class);
							zsBoss=new ZSBoss();
							zsBoss.setRoomId(roomId);
							zsBoss.setIndex(seven_223.getId());
							zsBoss.setBossid(seven_223.getBoss());
							zsBoss.setAttr(battleFightAttr);
							zsBoss.setHpmax(MaxHp);
							zsBoss.setCurhp(MaxHp);
							zsBoss.getZoneids().add(minZoneid);
							zsBoss.setPartid(partId);
							LogTool.info("ready new CrossBoss :"+minZoneid+" zsBossid:"+seven_223.getBoss()+" tempMaxHp:"+tempMaxHp, this);
							ZSBossMap.put(zsBoss.getBossid(), zsBoss);
						}else {
							LogTool.warn("ready bossGlobalData==null:"+minZoneid+" zsBossid:"+seven_223.getBoss()+" roomId:"+roomId, this);
						}

					}
					zsbossMap.put(roomId, ZSBossMap);
				} else {
					ZSBossMap = zsbossMap.get(roomId);
					for (ZSBoss zBoss : ZSBossMap.values()) {
						zBoss.getZoneids().add(minZoneid);
					}
				}
			}
		}
	}
	
	/**
	 * 开始
	 */
	public void start(){
		CrossBossCache.startTime = TimeDateUtil.getCurrentTime();
		ScheduleUtil.addTask(ScheduleConst.ZSBOSS, new CrossBossSchedule(0, 1000, false));
	}
	/**
	 * 结束
	 */
    public void end(){
    	ScheduleUtil.cancelTask(ScheduleConst.ZSBOSS);
    	ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossBossLocalGlobalData>> nowGlobalData = CrossBossCache.getCrossBossAllGlobalData().getNowGlobalData();
		for (int partId : CrossCache.getZoneidToChannelMap().keySet()) {
			Map<Integer, ConcurrentHashMap<Integer, ZSBoss>> zsbossMap = CrossBossCache.getZsbossMap(partId);
			CrossBossLocalGlobalData crossBossGlobalData = null;
			ConcurrentHashMap<Integer, CrossBossLocalGlobalData> pMap = nowGlobalData.get(partId);
			if(pMap==null) {
				pMap = new ConcurrentHashMap<>();
				nowGlobalData.put(partId, pMap);
			}
			ZSBossHis zsBossHis;
			for (Entry<Integer, ConcurrentHashMap<Integer, ZSBoss>> entry : zsbossMap.entrySet()) {
				ConcurrentHashMap<Integer, ZSBoss> bossMap = entry.getValue();
				for (ZSBoss zsBoss : bossMap.values()) {
					if (zsBoss.getBeatBossDeadTime() == 0) {
						// boss没死
						sendBossReward(zsBoss);
					}
					crossBossGlobalData = pMap.get(zsBoss.getRoomId());
					zsBossHis = crossBossGlobalData.getBossHisMapByBossid().get(zsBoss.getBossid());
					if (zsBossHis == null) {
						zsBossHis = new ZSBossHis();
						crossBossGlobalData.getBossHisMapByBossid().put(zsBoss.getBossid(), zsBossHis);
					}
					zsBossHis.setBossId(zsBoss.getBossid());
					if (zsBoss.getLastHitName() != null) {
						zsBossHis.setSkillName(zsBoss.getLastHitName());
					} else {
						zsBossHis.setSkillName("");
					}
					int useTime = zsBoss.getBeatBossDeadTime();
					if (useTime == 0) {
						useTime = 9999;
					} else {
						LogTool.info("useTime :" + useTime, CrossBossFunction.class);
					}
					int xhp = zsBossHis.getAddDoubleNum();
					int maxNum = Config_xtcs_004.getIns().get(CrossBossConst.ADD_MAX).getNum() / 100;
					int minNum = 0;

					int addHp = 0;
					for (Struct_lbmh_307 struct_lbmh_307 : Config_lbmh_307.getIns().getMap().values()) {
						if (struct_lbmh_307.getId() / 1000 == 2) {
							if (useTime >= struct_lbmh_307.getTime()[0][0]
									&& useTime <= struct_lbmh_307.getTime()[0][1]) {
								addHp = struct_lbmh_307.getHp() / 100;
								break;
							}
						}
					}
					LogTool.info("crossBoss addHp=" + addHp + ", xhp=" + xhp + ", maxNum=" + maxNum + ", minNum="
							+ minNum + ", useTime=" + useTime, this);
					if (addHp > 0 && xhp < maxNum) {
						xhp = xhp + addHp;
						if (xhp > maxNum) {
							xhp = maxNum;
						}
						zsBossHis.setAddDoubleNum(xhp);
					} else if (addHp < 0 && xhp > minNum) {
						xhp = xhp + addHp;
						if (xhp < minNum) {
							xhp = minNum;
						}
						zsBossHis.setAddDoubleNum(xhp);
					}
					LogTool.info(
							"crossBoss addHp=" + addHp + ", xhp=" + xhp + ", maxNum=" + maxNum + ", minNum=" + minNum,
							this);
					// 个人排行
					List<ZSBossHisModel> heroRankList = new ArrayList<>();
					if (zsBoss.getHeroRankList() != null && zsBoss.getHeroRankList().size() > 0) {
						int size = 10;
						if (zsBoss.getHeroRankList().size() < 10) {
							size = zsBoss.getHeroRankList().size();
						}
						for (int i = 0; i < size; i++) {
							CrossBossRankModel crossBossRankModel = zsBoss.getHeroRankList().get(i);
							ZSBossHisModel zsBossHisModel = new ZSBossHisModel(crossBossRankModel.getId(),
									crossBossRankModel.getName(), crossBossRankModel.getHurt(),
									crossBossRankModel.getCountry());
							heroRankList.add(i, zsBossHisModel);
						}
					}
					// 国家排行
					List<ZSBossHisModel> CountryRankList = new ArrayList<>();
					zsBossHis.setHeroRankList(heroRankList);
					if (zsBoss.getCountryRankList() != null) {
						for (int i = 0; i < zsBoss.getCountryRankList().size(); i++) {
							CrossBossRankModel crossBossRankModel = zsBoss.getCountryRankList().get(i);
							ZSBossHisModel zsBossHisModel = new ZSBossHisModel(crossBossRankModel.getId(),
									crossBossRankModel.getName(), crossBossRankModel.getHurt(),
									crossBossRankModel.getCountry());
							CountryRankList.add(i, zsBossHisModel);
						}
					}
					zsBossHis.setCountryRankList(CountryRankList);
				}
			}
			if (crossBossGlobalData != null && crossBossGlobalData.getZoneids().size() > 0) {
				for (int zoneid : crossBossGlobalData.getZoneids()) {
					Channel channel = CrossCache.getChannel(zoneid);
					CrossData crossData = new CrossData();
					crossData.putObject(CrossBossEnum.crossBossGlobalData.name(), crossBossGlobalData);
					// 检查合服战区
					NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_UPLOAD_CROSS_DATA, crossData, new Callback() {
						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							LogTool.info("tell CTT CrossBossFunction end(),matchServer:" + channel, this);
						}
					});
				}
			}
			// 处理完逻辑清空缓存
			CrossBossCache.getZsbossMap(partId).clear();
		}
	}
	/**
	 * 进入挑战
	 */
	public void onIn(ZSBoss zsBoss,Hero hero){
		long hid = hero.getId();
		int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
		if (zsBoss.getHeros().containsKey(hid)) {
			LogTool.warn("onIn zsBoss.getHeros().containsKey(hid) ", this);
			return;
		}
		zsBoss.getHeros().put(hid, hero);
		CrossBossRankModel heroRankModel= zsBoss.getHeroRankMap().get(hid);
		if(heroRankModel==null){
			if (hero.getCrossBoss().getNum()>0) {
				//进入成功 通知子服扣次数
				Channel channel = CrossCache.getChannel(hero.getZoneid());
				CrossBossIO.getIns().CTLminueNum(channel, hid);
			}else {
				CrossBossSender.sendCmd_1710(hero.getId(), 4, null, 0, 0, 0, 0, 0, 0);
				return;
			}
			heroRankModel = new CrossBossRankModel();
			heroRankModel.setId(hid);
			int rewardSize=Config_sevenmb_223.getIns().getSortList().size();
			heroRankModel.setRewardState(new int[rewardSize]);
			zsBoss.getHeroRankMap().put(hero.getId(), heroRankModel);
			FinalFightAttr attrMap = BattleFunction.initHero(hero);
			heroRankModel.setAttr(attrMap);
			heroRankModel.setInTime(TimeDateUtil.getCurrentTime());
			heroRankModel.fullHp();
			heroRankModel.setActids(hero.getActIds());
		}
		//通知子服登陆成功
		Channel channel = CrossCache.getChannel(hero.getZoneid());
		CrossBossIO.getIns().CTLloginSuccess(channel, hid);
		
		heroRankModel.setName(hero.getNameZoneid());
		heroRankModel.setActids(hero.getActIds());
		heroRankModel.setLiveTime(TimeDateUtil.getCurrentTime());
		long oldHp=heroRankModel.getCurhp();
		FinalFightAttr attrMap = BattleFunction.initHero(hero);
		heroRankModel.setAttr(attrMap);
		attrMap.setHp(oldHp);
		heroRankModel.setInTime(TimeDateUtil.getCurrentTime());
		//我打boss的伤害
		double hurt = 0;
		hurt = (long) BattleFunction.calcDamg(heroRankModel.getAttr(), zsBoss.getAttr());
		hurt=hurt+heroRankModel.getBuyAttNum()/10.0*hurt;
		heroRankModel.setMeHurtBoss((long)hurt);
		//boss打我的伤害 被打的每秒伤害
		Struct_seven_223 seven_223=Config_seven_223.getIns().get(zsBoss.getBossid());
		double ap=seven_223.getAp();
		int p=seven_223.getP();
		double x=(ap/100l);
		long ishurt = (long)(heroRankModel.getAttr().getHpMax()*x+p);
		int countryType = hero.getCountryType();
		heroRankModel.setBossHurtMe(ishurt);
		heroRankModel.setCountry(countryType);
		if (countryType>0) {
			CrossBossRankModel countryRankModel = zsBoss.getCountryRankMap().get(countryType);
			if(countryRankModel==null){
				countryRankModel = new CrossBossRankModel();
				countryRankModel.setId(hero.getCountryType());
				countryRankModel.setCountry(hero.getCountryType());
				zsBoss.getCountryRankMap().put(countryType, countryRankModel);
			}
		}
		LogTool.info(hero.getName()+"onIn,getCountry:"+countryType+" MeHurtBoss:"+heroRankModel.getMeHurtBoss()+" bossHurtMe:"+heroRankModel.getBossHurtMe(), this);
		Object[] rewardSate=new Object[heroRankModel.getRewardState().length];
		for (int i = 0; i < heroRankModel.getRewardState().length; i++) {
			rewardSate[i]=new Object[] {heroRankModel.getRewardState()[i]};
		}
		int livetime=0;
		if(TimeDateUtil.getCurrentTime() - heroRankModel.getDeadTime() >= fuhuoCD){
			//玩家复活
			heroRankModel.fullHp();
		}else {
			livetime=fuhuoCD-(TimeDateUtil.getCurrentTime() - heroRankModel.getDeadTime());
		}
		long bosshp=zsBoss.getCurhp();
		long bossmaxHp=zsBoss.getHpmax();
		CrossBossSender.sendCmd_1710(hero.getId(), 0, rewardSate, heroRankModel.getBuyAttNum(), livetime, attrMap.getHp(),attrMap.getHpMax(), bosshp, bossmaxHp);
		//小于的话
		if(zsBoss.getHeros().size()<CrossBossConst.BROADCAST_COUNT){
			for(Hero h:zsBoss.getHeros().values()){
				if(h.getId()==hid){
					continue;
				}
				if(h.isOnline()){
					HeroFunction.getIns().sendBattleHeroAttr(h, hero.getId());
					HeroFunction.getIns().sendBattleHeroAttr(hero, h.getId());
				}
			}
		}else{
			int i=0;
			for(Hero h:zsBoss.getHeros().values()){
				if(i>=CrossBossConst.BROADCAST_COUNT){
					break;
				}
				if(h.getId()==hid||!h.isOnline()){
					continue;
				}
				HeroFunction.getIns().sendBattleHeroAttr(h, hero.getId());
				HeroFunction.getIns().sendBattleHeroAttr(hero, h.getId());
				i++;
			}
		}
	}
	
	
	/**攻击boss */
	public void onAtt(ZSBoss zsBoss,int now, boolean senddata){
		int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
		int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
		if(zsBoss.getCurhp()<=0) return;
		zsBoss.setSecHurt(0);
		Map<Long, Hero> heros = zsBoss.getHeros();
		boolean bossDead = false;
		List<CrossBossRankModel> rankList = zsBoss.getHeroRankList();
		if(rankList.isEmpty()){
			if(heros.size()>0){
				this.sortRank(zsBoss);
			}
			return;
		}
		ArrayList<Object[]> dieId=new ArrayList<>();
		ArrayList<Object[]> restLive=new ArrayList<>();
		for(CrossBossRankModel model :rankList){
			Hero hero = HeroCache.getHero(model.getId());
			if(hero==null||!hero.isOnline()||!heros.containsKey(hero.getId())){
				continue;
			}
			if(zsBoss.getCurhp()<=0) {
				bossDead=true;
				break;
			}
			if(bossDead){
				break;
			}
			long curhp = model.getCurhp();
			if(curhp<=0 && now - model.getDeadTime() >= fuhuoCD){
				//玩家复活
				model.fullHp();
				model.setDeadTime(0);
				curhp = model.getCurhp();
				restLive.add(new Object[] {model.getId()});
				model.setLiveTime(TimeDateUtil.getCurrentTime());
				continue;
			}else if(curhp<=0 &&model.getAotufuhuo()==1) {
				if(UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
					UseAddUtil.use(hero, GameConst.YUANBAO, fuhuoCost, SourceGoodConst.CROSS_BUY_LIVE, true);
					model.setDeadTime(0);
					model.fullHp();
					model.setLiveTime(TimeDateUtil.getCurrentTime());
					curhp= model.getCurhp();
					CrossBossSender.sendCmd_1732(hero.getId(), 0);
				}else {
					CrossBossSender.sendCmd_1732(hero.getId(), 1);
				}
			}
			//已死
			if(curhp<=0){
				continue;
			}
			zsBoss.setAttHid(model.getId());
			int awayLiveTime = TimeDateUtil.getCurrentTime() - model.getLiveTime();
			Struct_seven_223 boss = Config_seven_223.getIns().get(zsBoss.getBossid());
			int limitime=boss.getTime();
			if(awayLiveTime>=limitime){
				LogTool.info("awayLiveTime>=limitime hid:"+hero.getId()+",name:"+hero.getName(),this);
				//判断是否强制死亡
				model.getAttr().setHp(0);
				model.setDeadTime(now);
				dieId.add(new Object[] {model.getId()});
			}
			
			//每个人都能打boss
			boolean die = attBoss(model,hero,zsBoss);
			if(die){
				bossDead = true;
			}
		}
		sortRank(zsBoss);
		if(senddata||bossDead){
			//发送数据
			long hpmax = (long)zsBoss.getHpmax();
			long curhp = (long)zsBoss.getCurhp();
			//国家伤害
			List<Object[]> hurtList = new ArrayList<Object[]>();
			for(CrossBossRankModel countryModel :zsBoss.getCountryRankList()){
				hurtList.add(new Object[]{(byte)countryModel.getCountry(),countryModel.getHurt()});
			}
			Object[] hurtArr = null;
			if(hurtList!=null && hurtList.size()>0){
				hurtArr = hurtList.toArray();
			}
			long myHurt;
			CrossBossRankModel heroModel;
			String fristname="";
			long fristhurt=0;
			if (rankList.size()>0) {
				fristname=rankList.get(0).getName();
				fristhurt=rankList.get(0).getHurt();
			}
			for(CrossBossRankModel bossAttModel :rankList){
				Hero h = heros.get(bossAttModel.getId());
				if(h!=null && h.isOnline()){
					heroModel = zsBoss.getHeroRankMap().get(h.getId());
					if(heroModel!=null){
						myHurt = (long) heroModel.getHurt();
					}else{
						myHurt = 0;
					}
					CrossBossSender.sendCmd_1712(h.getId(), zsBoss.getBossid(), curhp, hpmax, heroModel.getCurhp(), myHurt, fristname, fristhurt, hurtArr);
				}
			}
		}
		if (dieId.size()>0) {
			broaddieHero(zsBoss,dieId);
		}
		if (restLive.size()>0) {
			broadliveHero(zsBoss, restLive);
		}
		if(bossDead){
			attOnEnd(zsBoss);
		}
		
	}
	
	/**
	 * 攻击boss
	 * @param model
	 * @param hero
	 * @return
	 */
	private boolean attBoss(CrossBossRankModel model,Hero hero,ZSBoss zsBoss){
		long curhp = zsBoss.getCurhp();
        long hurt=model.getMeHurtBoss();
		if(hurt>curhp){
			hurt = curhp;
		}
		curhp = curhp -hurt;
		zsBoss.setCurhp(curhp);
		if (hero.getCountryType()>0) {
			CrossBossRankModel countryRankModel = zsBoss.getCountryRankMap().get(hero.getCountryType());
			if (countryRankModel!=null) {
				countryRankModel.setHurt((long) (countryRankModel.getHurt()+hurt));
			}
		}
		if (zsBoss.getHeroRankMap().get(hero.getId())!=null) {
			//伤害累计
			CrossBossRankModel crossBossRankModel = zsBoss.getHeroRankMap().get(hero.getId());
			crossBossRankModel.setHurt((long) (crossBossRankModel.getHurt()+hurt));
			//伤害奖励
			for (int i = 0; i < Config_sevenmb_223.getIns().getMap().size(); i++) {
				Struct_sevenmb_223 sevenmb_223=Config_sevenmb_223.getIns().get(i+1);
				if(crossBossRankModel.getRewardState()[i]==GameConst.REWARD_0) {
					long hurtGoal=0;
					switch (zsBoss.getIndex()) {
					case 1:
						hurtGoal=sevenmb_223.getDamage1();
						break;
					case 2:
						hurtGoal=sevenmb_223.getDamage2();
						break;
					case 3:
						hurtGoal=sevenmb_223.getDamage3();
						break;
					case 4:
						hurtGoal=sevenmb_223.getDamage4();
						break;
					case 5:
						hurtGoal=sevenmb_223.getDamage5();
						break;
					default:
						break;
					}
					if (crossBossRankModel.getHurt()>=hurtGoal) {
						crossBossRankModel.getRewardState()[i]=GameConst.REWARD_1;
					}
				}
			}
		}
		boolean die = false;
		if(curhp<=0){
			//boss dead
			zsBoss.setLastHitId(hero.getId());
			zsBoss.setLastHitName(hero.getNameZoneid());
			zsBoss.setBeatBossDeadTime(TimeDateUtil.getCurrentTime() - CrossBossCache.startTime);
			die = true;
		}
		return die;
	}
	
	/**伤害排序*/
	public void sortRank(ZSBoss zsBoss){
		//未初始化或者数据改变了才从新赋值
		if(zsBoss.getHeroRankList()==null||zsBoss.getHeroRankMap().size()!=zsBoss.getHeroRankList().size()){
			zsBoss.setHeroRankList(new ArrayList<CrossBossRankModel>(zsBoss.getHeroRankMap().values()));
		}
		if(zsBoss.getCountryRankList()==null||zsBoss.getCountryRankMap().size()!=zsBoss.getCountryRankList().size()){
			zsBoss.setCountryRankList(new ArrayList<CrossBossRankModel>(zsBoss.getCountryRankMap().values()));
		}
		Collections.sort(zsBoss.getHeroRankList(),	ZSBossComparator.getIns());
		Collections.sort(zsBoss.getCountryRankList(), ZSBossComparator.getIns());
	}
	/**
	 * boss被击杀
	 * @param zsBoss
	 */
	public void attOnEnd(ZSBoss zsBoss) {
		try {
			Struct_seven_223 seven = Config_seven_223.getIns().get(zsBoss.getBossid());
			//击杀奖励
			MailFunction.getIns().sendMailWithFujianData2(zsBoss.getLastHitId(), MailConst.MAIL_ID_CROSSBOSS_KILL,  new Object[]{MailConst.MAIL_ID_CROSSBOSS_KILL}, seven.getKillreward());
			sendBossReward(zsBoss);
			//通知子服 boss 被击杀
			CrossBossIO.getIns().CTLocalBossKill(zsBoss.getZoneids(), zsBoss.getLastHitName(), zsBoss.getBossid(),
					zsBoss.getHeroRankList());
			//结算排行榜到子服
			CrossBossLocalGlobalData crossBossLocalGlobalData=null;
			ZSBossHis zsBossHis;
			crossBossLocalGlobalData = CrossBossCache.getCrossBossAllGlobalData().getNowGlobalData().get(zsBoss.getPartid()).get(zsBoss.getRoomId());
			zsBossHis=crossBossLocalGlobalData.getBossHisMapByBossid().get(zsBoss.getBossid());
			if (zsBossHis==null) {
				zsBossHis=new ZSBossHis();
				crossBossLocalGlobalData.getBossHisMapByBossid().put(zsBoss.getBossid(), zsBossHis);
			}
			if (zsBoss.getLastHitName()!=null) {
				zsBossHis.setSkillName(zsBoss.getLastHitName());
			}else {
				zsBossHis.setSkillName("");
			}
			zsBossHis.setBossId(zsBoss.getBossid());
			
			//个人排行
			List<ZSBossHisModel> heroRankList=new ArrayList<>();
			if (zsBoss.getHeroRankList()!=null&&zsBoss.getHeroRankList().size()>0) {
				int size=10;
				if (zsBoss.getHeroRankList().size()<10) {
					size=zsBoss.getHeroRankList().size();
				}
				for (int i = 0; i < size; i++) {
					CrossBossRankModel crossBossRankModel = zsBoss.getHeroRankList().get(i);
					ZSBossHisModel zsBossHisModel = new ZSBossHisModel(crossBossRankModel.getId(), crossBossRankModel.getName(), crossBossRankModel.getHurt(), crossBossRankModel.getCountry());
					heroRankList.add(i, zsBossHisModel);
				}
			}
			//国家排行
			List<ZSBossHisModel> CountryRankList=new ArrayList<>();
			zsBossHis.setHeroRankList(heroRankList);
			if (zsBoss.getCountryRankList()!=null) {
				for (int i = 0; i < zsBoss.getCountryRankList().size(); i++) {
					CrossBossRankModel crossBossRankModel = zsBoss.getCountryRankList().get(i);
					ZSBossHisModel zsBossHisModel = new ZSBossHisModel(crossBossRankModel.getId(), crossBossRankModel.getName(), crossBossRankModel.getHurt(), crossBossRankModel.getCountry());
					CountryRankList.add(i, zsBossHisModel);
				}
			}
			zsBossHis.setCountryRankList(CountryRankList);
			
			if (crossBossLocalGlobalData!=null&&crossBossLocalGlobalData.getZoneids().size()>0) {
				for (int zoneid:crossBossLocalGlobalData.getZoneids()) {
		    		Channel channel = CrossCache.getChannel(zoneid);
		    		if (channel==null) {
						LogTool.warn("channel==null when zoneid= "+zoneid, CrossBossFunction.class);
						continue;
					}
		    		CrossData crossData = new CrossData();
		    		crossData.putObject(CrossBossEnum.crossBossGlobalData.name(), crossBossLocalGlobalData);
		    		//检查合服战区
		    		NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_UPLOAD_CROSS_DATA, crossData, new Callback() {
		    			@Override
		    			public void dataReci(Channel channel, CrossData crossData) {
		    				LogTool.info("tell CTT CrossBossFunction end(),matchServer:"+channel, this);
		    			}
		    		});
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "attonEnd has wrong");
		}
	}
	/**
	 * 发奖励
	 * @param state
	 */
	public void sendBossReward(ZSBoss zsBoss){
		//按国家排名发奖励
		int countryrank = 1;
		Map<Integer, Integer> countryRankMap = new HashMap<Integer, Integer>();
		Map<Integer, int[][]> countryRewardMap = new HashMap<Integer, int[][]>();
		
		Struct_seven_223 seven_223=Config_seven_223.getIns().get(zsBoss.getBossid());
		List<CrossBossRankModel> countryRankList = zsBoss.getCountryRankList();
		List<CrossBossRankModel> heroRankList = zsBoss.getHeroRankList();
		if (countryRankList==null) {
			LogTool.warn("countryRankList==null", CrossBossFunction.class);
		}
		if (heroRankList==null) {
			LogTool.warn("heroRankList==null", CrossBossFunction.class);
		}
		if (countryRankList!=null) {
			for(CrossBossRankModel model:countryRankList){
				if (countryrank==1) {
					countryRewardMap.put(model.getCountry(),seven_223.getReward1());
					countryRankMap.put(model.getCountry(), countryrank);
				}
				if (countryrank==2) {
					countryRewardMap.put(model.getCountry(),seven_223.getReward2());
					countryRankMap.put(model.getCountry(), countryrank);
				}
				if (countryrank==3) {
					countryRewardMap.put(model.getCountry(),seven_223.getReward3());
					countryRankMap.put(model.getCountry(), countryrank);
				}
				countryrank++;
			}
		}
		
		int modelrank = 1;
		//参与奖励+国家奖励+个人排名奖励+达标未领取奖励+boss死亡掉落额外奖励
		for(CrossBossRankModel model:heroRankList){
			//参与奖励
			MailFunction.getIns().sendMailWithFujianData2(model.getId(), MailConst.MAIL_ID_CROSSBOSS_JOIN,  new Object[]{MailConst.MAIL_ID_CROSSBOSS_JOIN}, seven_223.getJoinreward());
			//三国庆典-活跃有礼 额外奖励
			List<Object[]> dropTips = new ArrayList<>();
			if (model.getActids()!=null&&model.getActids().containsKey(ActivitySysId.ACT_ACTIVEGETGIFT)) {
				Integer qs = model.getActids().get(ActivitySysId.ACT_ACTIVEGETGIFT);
				ActiveGetGiftFunction.getIns().CrossBossTip(model.getId(), qs, dropTips);
				//int[][] sendCrossBossReward = ActiveGetGiftFunction.getIns().sendCrossBossReward(qs);
			}
			if(model.getActids()!=null&&model.getActids().containsKey(SystemIdConst.RUNE_GIFT)) {
				Integer qs = model.getActids().get(SystemIdConst.RUNE_GIFT);
				RuneGiftFunction.getIns().CrossBossTip(model.getId(), qs, dropTips);
			}
			if(dropTips.size()>0) {
				CrossBossSender.sendCmd_1728(model.getId(), SystemIdConst.RUNE_GIFT, dropTips.toArray());
			}
			
			//国家奖励
			if (countryRewardMap.containsKey(model.getCountry())) {
				int[][] countryReward=countryRewardMap.get(model.getCountry());
				int countryRank=countryRankMap.get(model.getCountry());
				MailFunction.getIns().sendMailWithFujianData2(model.getId(), MailConst.MAIL_ID_CROSSBOSS_COUNTRY,  new Object[]{MailConst.MAIL_ID_CROSSBOSS_COUNTRY, countryRank}, countryReward);
				LogTool.info("CountryReward rank:"+countryRank+" heroid:"+model.getId(), this);
			}
			int[][] heroReward=null;
			if (modelrank==1) {
				heroReward=seven_223.getReward4();
				MailFunction.getIns().sendMailWithFujianData2(model.getId(), MailConst.MAIL_ID_CROSSBOSS_HERO,  new Object[]{MailConst.MAIL_ID_CROSSBOSS_HERO, modelrank}, heroReward);
			}
			if (modelrank==2) {
				heroReward=seven_223.getReward5();
				MailFunction.getIns().sendMailWithFujianData2(model.getId(), MailConst.MAIL_ID_CROSSBOSS_HERO,  new Object[]{MailConst.MAIL_ID_CROSSBOSS_HERO, modelrank}, heroReward);
			}
			if (modelrank==3) {
				heroReward=seven_223.getReward6();
				MailFunction.getIns().sendMailWithFujianData2(model.getId(), MailConst.MAIL_ID_CROSSBOSS_HERO,  new Object[]{MailConst.MAIL_ID_CROSSBOSS_HERO, modelrank}, heroReward);
			}
			if (modelrank>=4&&modelrank<=10) {
				heroReward=seven_223.getReward7();
				MailFunction.getIns().sendMailWithFujianData2(model.getId(), MailConst.MAIL_ID_CROSSBOSS_HERO,  new Object[]{MailConst.MAIL_ID_CROSSBOSS_HERO, modelrank}, heroReward);
			}
			modelrank++;
			for (int i = 1; i <=Config_sevenmb_223.getIns().size(); i++) {
				Struct_sevenmb_223 sevenmb_223=Config_sevenmb_223.getIns().get(i);
				int[][] reward=null;
				if(model.getRewardState()[i-1]==GameConst.REWARD_1) {
					switch (zsBoss.getIndex()) {
					case 1:
						reward=sevenmb_223.getReward1();
						break;
					case 2:
						reward=sevenmb_223.getReward2();
						break;
					case 3:
						reward=sevenmb_223.getReward3();
						break;
					case 4:
						reward=sevenmb_223.getReward4();
						break;
					case 5:
						reward=sevenmb_223.getReward5();
						break;
					default:
						break;
					}
					//奖励没有领取邮件
					MailFunction.getIns().sendMailWithFujianData2(model.getId(), MailConst.MAIL_ID_CROSSBOSS_HURTNUM,  new Object[]{MailConst.MAIL_ID_CROSSBOSS_HURTNUM}, reward);
					LogTool.info("hid"+model.getId()+"name:"+model.getName(), CrossBossFunction.class);
					model.getRewardState()[i-1]=GameConst.REWARD_2;
				}
			}
			
			
		}
		//弹结算界面断掉玩家和中央服连接
		//hero.getChannel().close();
	}
	/**
	 * 广播玩家被击杀
	 */
	public void broaddieHero(ZSBoss zsBoss,ArrayList<Object[]> ids) {
		for(Hero hero:zsBoss.getHeros().values()) {
			if(hero.isOnline()){
				CrossBossSender.sendCmd_1722(hero.getId(), ids.toArray());
			}
		}
	}
	
	/**
	 * 广播玩家复活
	 */
	public void broadliveHero(ZSBoss zsBoss,ArrayList<Object[]> lives) {
		for(Hero hero:zsBoss.getHeros().values()) {
			if(hero.isOnline()){
				CrossBossSender.sendCmd_1724(hero.getId(), lives.toArray());
			}
		}
	}
	
	/**
	 * 手动释放技能 打孟获
	 * @param damg
	 * @param hero
	 */
	public void skillAttBoss(double damg,Hero hero){
		if(!CrossZone.isCrossServer()){
			return;
		}
		if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
			return;
		}
		
		ZSBoss zsBoss=null;
		for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
			if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
				zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
				break;
			}
		}
		if (zsBoss==null) {
			return;
		}
		long curhp = zsBoss.getCurhp();
        long hurt=(long)damg;
		if(hurt>curhp){
			hurt = curhp;
		}
		curhp = curhp -hurt;
		zsBoss.setCurhp(curhp);
		if (hero.getCountryType()>0) {
			CrossBossRankModel countryRankModel = zsBoss.getCountryRankMap().get(hero.getCountryType());
			if (countryRankModel!=null) {
				countryRankModel.setHurt((long) (countryRankModel.getHurt()+hurt));
			}
		}
		if (zsBoss.getHeroRankMap().get(hero.getId())!=null) {
			zsBoss.getHeroRankMap().get(hero.getId()).setHurt((long) (zsBoss.getHeroRankMap().get(hero.getId()).getHurt()+hurt));
		}
		sortRank(zsBoss);
		boolean die = false;
		if(curhp<=0){
			//boss dead
			zsBoss.setLastHitId(hero.getId());
			zsBoss.setLastHitName(hero.getNameZoneid());
			zsBoss.setBeatBossDeadTime(TimeDateUtil.getCurrentTime() - CrossBossCache.startTime);
			die = true;
		}
		LogTool.info("hero skillAttBoss skillAttCrossBoss,damg:"+damg+",hid:"+hero.getId()+",name:"+hero.getName()+" CrossBoss currhp:"+curhp, CrossBossFunction.class);
		if(die){
			LogTool.info("skillAttCrossBoss CrossBoss dead bossid:"+zsBoss.getBossid()+" hero id:"+hero.getId(), CrossBossFunction.class);
			attOnEnd(zsBoss);
		}
		return ;
	}
	
	/**
	 * 增加孟获挑战次数
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addChaNum(Hero hero, int id, int num) {
		try {
			CrossBoss crossBoss = hero.getCrossBoss();
			if (crossBoss == null) {
				return false;
			}
			crossBoss.setNum(crossBoss.getNum() + num);
			return true;
		} catch (Exception e) {
			LogTool.error(e, CrossBossFunction.class, hero.getId(), hero.getName(),
					"CrossBossFunction addChaNum=" + num);
			return false;
		}
	}
	
}
