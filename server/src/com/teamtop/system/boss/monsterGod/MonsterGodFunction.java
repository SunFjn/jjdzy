package com.teamtop.system.boss.monsterGod;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementConst;
import com.teamtop.system.achievement.AchievementDao;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.actHall.ActHallInterface;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift.ActiveGetGiftFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.qmboss.QMBossDamgComparator;
import com.teamtop.system.boss.qmboss.QMBossDamgRankModel;
import com.teamtop.system.boss.qmboss.QMBossFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossBoss.CrossBossConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.runeGift.RuneGiftFunction;
import com.teamtop.util.exector.schedule.ScheduleConst;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lbmh_307;
import excel.config.Config_lvbu_224;
import excel.config.Config_lvbuboss_224;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lbmh_307;
import excel.struct.Struct_lvbu_224;
import excel.struct.Struct_lvbuboss_224;
import excel.struct.Struct_xtcs_004;

public class MonsterGodFunction implements ActHallInterface{
	
	private static MonsterGodFunction ins = null;

	public static synchronized MonsterGodFunction getIns() {
		if (ins == null) {
			ins = new MonsterGodFunction();
		}
		return ins;
	}
	public void GM(Hero hero, int cmdId) {
		if(cmdId<0||cmdId>1){
			return;
		}
		if(cmdId==MonsterGodConst.STATE1){
			//活动开启
			MonsterGodFunction.getIns().start();
			ChatManager.getIns().broadCast(ChatConst.START_MONSTER,
					new Object[] {}); // 全服广播
		}else if(cmdId==MonsterGodConst.STATE0){
			//开始
			MonsterGodFunction.getIns().end();
			ChatManager.getIns().broadCast(ChatConst.END_MONSTER,
					new Object[] {}); // 全服广播
		}
		LogTool.info("GM MonsterGodFunction cmdId:"+cmdId, this);
	}
	/**
	 * 活动开启
	 */
	public void start() {
		MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
		if (monsterGodCache==null) {
			LogTool.warn("monsterGodCache==null", MonsterGodFunction.class);
			return;
		}
		//活动开启
		monsterGodCache.setState(MonsterGodConst.STATE1);
		monsterGodCache.setOpenTime(TimeDateUtil.getCurrentTime());
		//设置bossid 战斗属性
		MonsterGodFunction.getIns().createBoss(monsterGodCache);
		//开启定时器
		ScheduleUtil.addTask(ScheduleConst.MonsterGodCache, new MonsterGodSchedule(0, 1000, false));
		
	}
	/**
	 * 活动结束
	 */
	public void end() {
		ScheduleUtil.cancelTask(ScheduleConst.MonsterGodCache);
		MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
		if (monsterGodCache==null) {
			LogTool.warn("monsterGodCache==null", MonsterGodFunction.class);
			return;
		}
		//活动关闭
		if (monsterGodCache.getState()!=MonsterGodConst.STATE4) {
			//boss没有被杀死
			MonsterGodFunction.getIns().timeOverRankReward(monsterGodCache);
		}
		monsterGodCache.setState(MonsterGodConst.STATE0);
	}
	/**
	 * 是否活动开启
	 * @return
	 */
	public boolean isBeginTime() {
		int nowTime=TimeDateUtil.getCurrentTime();
		int zeroTime=TimeDateUtil.getTodayZeroTimeReturnInt();
		if (nowTime==zeroTime+MonsterGodConst.BEGINTIME1) {
			return true;
		}
		if (nowTime==zeroTime+MonsterGodConst.BEGINTIME2) {
			return true;
		}
		if (nowTime==zeroTime+MonsterGodConst.BEGINTIME3) {
			return true;
		}
		return false;
	}
	/**
	 * 是否活动结束
	 * @return
	 */	
	public boolean isOverTime() {
		int nowTime=TimeDateUtil.getCurrentTime();
		int zeroTime=TimeDateUtil.getTodayZeroTimeReturnInt();
		if (nowTime==zeroTime+MonsterGodConst.OVERTIME1) {
			return true;
		}
		if (nowTime==zeroTime+MonsterGodConst.OVERTIME2) {
			return true;
		}
		if (nowTime==zeroTime+MonsterGodConst.OVERTIME3) {
			return true;
		}
		return false;
	}
	
	

	/**
	 * 计算攻击boss伤害
	 * @param hero
	 * @param qmboss
	 * @return
	 */
	public boolean attBoss(QMBossDamgRankModel model,Hero hero,MonsterGodCache monsterGodCache){
		long damg =model.getBossHurtInfoMap().get(monsterGodCache.getGogBoss().getBossId()).getOnehurtAB();
		int addProNum = MonsterGodFunction.getIns().addProNum();
		if (addProNum>0) {
			double pro=addProNum/100.00;
			damg=(long) (damg+pro*damg);
		}
		long curhp = monsterGodCache.getGogBoss().getCurhp();
		if (damg>curhp) {
			damg=curhp;
		}
		curhp = curhp - damg;
		monsterGodCache.getGogBoss().setCurhp(curhp);
		monsterGodCache.setSkillerId(hero.getId());
		boolean die = false;
		if(curhp<=0){
			monsterGodCache.setBossCDTime(MonsterGodConst.BOSS_RESTLIVE_CD);
			ChatManager.getIns().broadCast(ChatConst.KILL_MONSTER,
					new Object[] { hero.getName(), monsterGodCache.getGogBoss().getBossId()}); // 全服广播
			die = true;
		}
		if(damg>0){
			QMBossFunction.getIns().sortLvBuBossHurt(hero, damg, monsterGodCache);
		}
		return die;
	}


	public void createBoss(MonsterGodCache monsterGodCache) {
		int num=MonsterGodSysCache.getIns().getMonsterGodHis().getXhp();
		GodBoss godBoss =new GodBoss();
		switch (monsterGodCache.getState()) {
		case 1:
			godBoss.setBossId(MonsterGodConst.BOSS1);
			break;
		case 2:
			godBoss.setBossId(MonsterGodConst.BOSS2);
			break;
		case 3:
			godBoss.setBossId(MonsterGodConst.BOSS3);
			break;	
		default:
			break;
		}
		
		FinalFightAttr battleFightAttr = BattleFunction.initNPC(godBoss.getBossId());
		long hp = battleFightAttr.getHp();
		if (num>0) {
			hp=hp+num*hp;
		}
		godBoss.setHpmax(hp);
		godBoss.setCurhp(hp);
		godBoss.setAttr(battleFightAttr);
		monsterGodCache.setGogBoss(godBoss);
		broadState(monsterGodCache);
		LogTool.info("create lvbuboss id:"+godBoss.getBossId(), MonsterGodFunction.class);
	}
	
	/**
	 * boss死亡 1个boss被技能击杀 发击杀奖励 和 参与奖励
	 * @param state 
	 * 
	 */
	public void skillbossDead(MonsterGodCache monsterGodCache,Hero skiller){
		try {
			monsterGodCache.setBossCDTime(MonsterGodConst.BOSS_RESTLIVE_CD);
			monsterGodCache.setSkillerId(skiller.getId());
			Struct_lvbuboss_224 lvboss= Config_lvbuboss_224.getIns().get(monsterGodCache.getGogBoss().getBossId());
			//击杀奖励
			MailFunction.getIns().sendMailWithFujianData2(skiller.getId(), MailConst.MAIL_ID_MONSTER, new Object[]{MailConst.MAIL_ID_MONSTER,monsterGodCache.getGogBoss().getBossId()}, lvboss.getKillreward());
			//参与奖励
			for (Hero h:monsterGodCache.getInheroMap().values()) {
				if(h!=null && h.isOnline()){
					if (UseAddUtil.canAdd(h, lvboss.getJoinreward(), false)) {
						UseAddUtil.add(h, lvboss.getJoinreward(), SourceGoodConst.MONSTER_GOD_REWARD, null, true);
					}
					List<Object[]> monsterBossTip = new ArrayList<>();
					List<Object[]> getMonsterBossTip = ActiveGetGiftFunction.getIns().MonsterBossTip(h);
					List<Object[]> monsterBossTipRune = RuneGiftFunction.getIns().MonsterBossTip(h);
					if (getMonsterBossTip != null) {
						monsterBossTip.addAll(getMonsterBossTip);
					}
					if (monsterBossTipRune != null) {
						monsterBossTip.addAll(monsterBossTipRune);
					}
					if (monsterBossTip.size()>0&&monsterGodCache.getGogBoss().getBossId()==MonsterGodConst.BOSS3) {
						MonsterGodSender.sendCmd_1520(h.getId(), ActivitySysId.ACT_ACTIVEGETGIFT, monsterBossTip.toArray());
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "boss dead err");
		}
	}
	/**
	 * boss被杀死发排名奖励
	 * @param monsterGodCache
	 */
	public void killoverRankReward(MonsterGodCache monsterGodCache) {
		MonsterGodHis monsterGodHis=MonsterGodSysCache.getIns().getMonsterGodHis();
		if (monsterGodHis.getRankHis()==null) {
			monsterGodHis.setRankHis(new HashMap<Integer, MonsterGodRank>());
		}
		monsterGodHis.getRankHis().clear();
		Struct_lvbu_224 lvbuRank=Config_lvbu_224.getIns().get(361001);
		int i=1;
		for(QMBossDamgRankModel model:monsterGodCache.getRankList()){
			if (i==1) {
				MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.MAIL_ID_MONSTER_RANK, new Object[]{MailConst.MAIL_ID_MONSTER_RANK,i}, lvbuRank.getReward1());
				monsterGodHis.getRankHis().put(i, new MonsterGodRank(i,model.getHid(),model.getHurt()));
			}
			if (i==2) {
				MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.MAIL_ID_MONSTER_RANK, new Object[]{MailConst.MAIL_ID_MONSTER_RANK,i}, lvbuRank.getReward2());
				monsterGodHis.getRankHis().put(i, new MonsterGodRank(i,model.getHid(),model.getHurt()));
			}
			if (i==3) {
				MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.MAIL_ID_MONSTER_RANK, new Object[]{MailConst.MAIL_ID_MONSTER_RANK,i}, lvbuRank.getReward3());
				monsterGodHis.getRankHis().put(i, new MonsterGodRank(i,model.getHid(),model.getHurt()));
			}
			if (i>3&&i<=10) {
				MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.MAIL_ID_MONSTER_RANK, new Object[]{MailConst.MAIL_ID_MONSTER_RANK,i}, lvbuRank.getReward4());
				monsterGodHis.getRankHis().put(i, new MonsterGodRank(i,model.getHid(),model.getHurt()));
			}
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Hero hero = heroMap.get(model.getHid());
			if (hero != null) {
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_41, i);
			} else {
				// 不在线也需要累加次数
				AchievementDao.getIns().checkTask(model.getHid(), AchievementConst.count_2, i);
			}
			i++;
		}
		
		int useTime=TimeDateUtil.getCurrentTime()-monsterGodCache.getOpenTime();
		int xhp = monsterGodHis.getXhp();
		
		int maxNum = Config_xtcs_004.getIns().get(MonsterGodConst.ADD_MAX).getNum()/100;
		int minNum = 0;
		
		int addHp=0;
		for (Struct_lbmh_307 struct_lbmh_307:Config_lbmh_307.getIns().getMap().values()) {
			if(struct_lbmh_307.getId()/1000==1) {
				if (useTime>=struct_lbmh_307.getTime()[0][0]&&useTime<=struct_lbmh_307.getTime()[0][1]) {
					addHp = struct_lbmh_307.getHp()/100;
				}
			}
		}
		
		if (addHp>0&&xhp<maxNum) {
			xhp=xhp+addHp;
			if (xhp>maxNum) {
				xhp=maxNum;
			}
			monsterGodHis.setXhp(xhp);
		}else if(addHp<0&&xhp>minNum){
			xhp=xhp+addHp;
			if (xhp<minNum) {
				xhp=minNum;
			}
			monsterGodHis.setXhp(xhp);
		}
		MonsterGodSysCache.getIns().updateGloalData();
		monsterGodCache.getRankList().clear();
		monsterGodCache.getInheroMap().clear();
		monsterGodCache.getDiehero().clear();
		monsterGodCache.setState(MonsterGodConst.STATE4);
		broadState(monsterGodCache);
		//
		
	}
	
	
	/**
	 * boss未被杀死 时间到了发排名奖励
	 * @param monsterGodCache
	 */
	public void timeOverRankReward(MonsterGodCache monsterGodCache) {
		MonsterGodHis monsterGodHis=MonsterGodSysCache.getIns().getMonsterGodHis();
		if (monsterGodHis.getRankHis()==null) {
			monsterGodHis.setRankHis(new HashMap<Integer, MonsterGodRank>());
		}
		monsterGodHis.getRankHis().clear();
		Struct_lvbu_224 lvbuRank=Config_lvbu_224.getIns().get(361001);
		int i=1;
		for(QMBossDamgRankModel model:monsterGodCache.getRankList()){
			if (i==1) {
				MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.MAIL_ID_MONSTER_RANK, new Object[]{MailConst.MAIL_ID_MONSTER_RANK,i}, lvbuRank.getReward1());
				monsterGodHis.getRankHis().put(i, new MonsterGodRank(i,model.getHid(),model.getHurt()));
			}
			if (i==2) {
				MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.MAIL_ID_MONSTER_RANK, new Object[]{MailConst.MAIL_ID_MONSTER_RANK,i}, lvbuRank.getReward2());
				monsterGodHis.getRankHis().put(i, new MonsterGodRank(i,model.getHid(),model.getHurt()));
			}
			if (i==3) {
				MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.MAIL_ID_MONSTER_RANK, new Object[]{MailConst.MAIL_ID_MONSTER_RANK,i}, lvbuRank.getReward3());
				monsterGodHis.getRankHis().put(i, new MonsterGodRank(i,model.getHid(),model.getHurt()));
			}
			if (i>3&&i<=10) {
				MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.MAIL_ID_MONSTER_RANK, new Object[]{MailConst.MAIL_ID_MONSTER_RANK,i}, lvbuRank.getReward4());
				monsterGodHis.getRankHis().put(i, new MonsterGodRank(i,model.getHid(),model.getHurt()));
			}
			// 成就
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Hero hero = heroMap.get(model.getHid());
			if (hero != null) {
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_41, i);
			} else {
				// 不在线也需要累加次数
				AchievementDao.getIns().checkTask(model.getHid(), AchievementConst.count_2, i);
			}
			i++;
			/*//全民狂欢-魔神吕布狂欢
			if (HeroFunction.getIns().isOnline(model.getHid())) {
				Hero hero=HeroCache.getHero(model.getHid());
				HappyMonsterGodFunction.getIns().addNumByType(hero);
			}*/
		}
		int xhp = monsterGodHis.getXhp();
		int maxNum = Config_xtcs_004.getIns().get(MonsterGodConst.ADD_MAX).getNum()/100;
		int minNum = 0;
		
		int addHp=Config_xtcs_004.getIns().get(MonsterGodConst.MUINE_MAX).getNum()/100;
		if (addHp>0&&xhp<maxNum) {
			xhp=xhp+addHp;
			if (xhp>maxNum) {
				xhp=maxNum;
			}
			monsterGodHis.setXhp(xhp);
		}else if(addHp<0&&xhp>minNum){
			xhp=xhp+addHp;
			if (xhp<minNum) {
				xhp=minNum;
			}
			monsterGodHis.setXhp(xhp);
		}
		MonsterGodSysCache.getIns().updateGloalData();
		monsterGodCache.getRankList().clear();
		monsterGodCache.getInheroMap().clear();
		monsterGodCache.getDiehero().clear();
		monsterGodCache.setState(MonsterGodConst.STATE0);
		broadState(monsterGodCache);
	}
	
	
	
	/**
	 * 退出魔神吕布
	 * @param hero
	 */
	public void quitGodBoss(Hero hero) {
		try {
			MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
			if (monsterGodCache.getInheroMap().containsKey(hero.getId())) {
				QMBossDamgRankModel model = new QMBossDamgRankModel();
				model.setHid(hero.getId());
				if(monsterGodCache.getRankList().contains(model)){
					model = monsterGodCache.getRankList().get(monsterGodCache.getRankList().indexOf(model));
					model.setOutTime(TimeDateUtil.getCurrentTime());
					model.setAotufuhuo(0);
					monsterGodCache.getInheroMap().remove(hero.getId());
					MonsterGodSender.sendCmd_1508(hero.getId(), 0);
				}
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterGodFunction.class, hero.getId(), hero.getName(), "quitGodBoss has wrong");
		}
		
	}
	/**
	 * 提示玩家活动状态
	 */
	public void broadState(MonsterGodCache monsterGodCache) {
		GodBoss gogBoss = monsterGodCache.getGogBoss();
		for (Hero hero:HeroCache.getHeroMap().values()) {
			if (hero.isOnline()) {
				if (gogBoss!=null) {
					MonsterGodSender.sendCmd_1514(hero.getId(), (byte)monsterGodCache.getState(),gogBoss.getBossId(),gogBoss.getHpmax());
				}
			}
		}		
	}
	/**
	 * 手动释放技能打魔神boss
	 * @param damg
	 * @param hero
	 */
	public void skillAttBoss(double damg,Hero hero){
		MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
		if(!monsterGodCache.getInheroMap().containsKey(hero.getId())) {
			LogTool.warn("getInheroMap().containsKey(hero.getId())", this);
			return;
		}
		if (monsterGodCache.getDiehero().containsKey(hero.getId())) {
			LogTool.warn("containsKey(hero.getId())", this);
			return;
		}
		if (monsterGodCache.getBossCDTime()>0) {
			return;
		}
		long curhp = monsterGodCache.getGogBoss().getCurhp();
		if (damg>curhp) {
			damg=curhp;
		}
		curhp = (long) (curhp - damg);
		monsterGodCache.getGogBoss().setCurhp(curhp);
		if(damg>0){
			QMBossFunction.getIns().sortLvBuBossHurt(hero, damg, monsterGodCache);
		}
		LogTool.info("hero skillAttBoss lvbuboss,damg:"+damg+",hid:"+hero.getId()+",name:"+hero.getName()+" lvbuboss currhp:"+curhp, MonsterGodFunction.class);
		if(curhp<=0){
			LogTool.info("skillAttBoss lvbuboss dead bossid:"+monsterGodCache.getGogBoss().getBossId()+" hero id:"+hero.getId(), MonsterGodFunction.class);
			if (monsterGodCache.getState()>=MonsterGodConst.STATE3) {
				//技能终结
				skillbossDead(monsterGodCache, hero);
				killoverRankReward(monsterGodCache);
			}else {
				//一个boss被击杀
				skillbossDead(monsterGodCache, hero);
			}
		}
		return ;
	}
	
	
	public void scheduleMonster(MonsterGodCache monsterGodCache,int now,boolean senddata) {
		try {
			int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
			int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
			if (monsterGodCache.getState()>=MonsterGodConst.STATE1&&monsterGodCache.getState()!=MonsterGodConst.STATE4) {
				if (monsterGodCache.getBossCDTime()>0) {
					monsterGodCache.setBossCDTime(monsterGodCache.getBossCDTime()-1);
				}else {
					if (monsterGodCache.getGogBoss().getCurhp()<=0) {
						//转阶段初始化boss
						monsterGodCache.setState(monsterGodCache.getState()+1);
						MonsterGodFunction.getIns().createBoss(monsterGodCache);
					}
				}
				//判断当前3个boss是否死亡
				boolean bossDead = false;
				List<QMBossDamgRankModel> rankList = monsterGodCache.getRankList();
				Map<Long, Hero> inheroMap = monsterGodCache.getInheroMap();
				Map<Long, Integer> dieHero=monsterGodCache.getDiehero();
				List<Object[]> hurtList = null;
				List<Object[]> nowdieing=new ArrayList<>();
				List<Object[]> nowLiveing=new ArrayList<>();
				int num=0;
				if(rankList.size()>0){
					hurtList = new ArrayList<Object[]>();
					for (int i = 0; i < rankList.size(); i++) {
						QMBossDamgRankModel model=rankList.get(i);
						if(!bossDead&&monsterGodCache.getGogBoss().getCurhp()>0){
							//boss攻击的对象
							if(now - model.getInTime()>=1){
								Hero hero = HeroCache.getHero(model.getHid());
								if(hero!=null && hero.isOnline() && inheroMap.containsKey(hero.getId())&&!dieHero.containsKey(model.getHid())){
									FinalFightAttr attr =  model.getAttrmap();
									long oneCurHp = attr.getHp();
									int limitime=model.getBossHurtInfoMap().get(monsterGodCache.getGogBoss().getBossId()).getLimtLiveTime();
									if(oneCurHp>0){
										int awayLiveTime = TimeDateUtil.getCurrentTime() - model.getLiveTime();
										if(awayLiveTime>=limitime){
											//是否设置了自动复活
											if (model.getAotufuhuo()==1&&UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
												UseAddUtil.use(hero, GameConst.YUANBAO,  fuhuoCost, SourceGoodConst.MONSTER_GOD_BUYLIVE, true);
												model.fullHp();
												model.setLiveTime(TimeDateUtil.getCurrentTime());
											}else {
												attr.setHp(0);
												dieHero.put(model.getHid(), TimeDateUtil.getCurrentTime());
												nowdieing.add(new Object[]{model.getHid()});
											}
										}
										boolean die = MonsterGodFunction.getIns().attBoss(model,hero,monsterGodCache);
										if(die){
											bossDead = true;
										}
									}
									
								}
							}
						}
						if (num<10) {
							hurtList.add(new Object[]{model.getName(),model.getHurt()});
							num++;
						}
					}
				}
				Collections.sort(rankList, QMBossDamgComparator.getIns());
				//发送数据
				if(senddata||bossDead){
					int bossid=monsterGodCache.getGogBoss().getBossId();
					long hpmax = (long) monsterGodCache.getGogBoss().getHpmax();
					long curhp = (long) monsterGodCache.getGogBoss().getCurhp();
					Object[] hurtArr = null;
					if(hurtList!=null && hurtList.size()>0){
						hurtArr = hurtList.toArray();
					}
					//有boss被击杀
					Struct_lvbuboss_224 lvboss= Config_lvbuboss_224.getIns().get(monsterGodCache.getGogBoss().getBossId());
					if (bossDead) {
						//最后一击 击杀奖励
						MailFunction.getIns().sendMailWithFujianData2(monsterGodCache.getSkillerId(), MailConst.MAIL_ID_MONSTER, new Object[]{MailConst.MAIL_ID_MONSTER,monsterGodCache.getGogBoss().getBossId()}, lvboss.getKillreward());
					}
					for (int i = 0; i < rankList.size(); i++) {
						QMBossDamgRankModel bossAttModel=rankList.get(i);
						Hero h = HeroCache.getHero(bossAttModel.getHid());
						if (bossDead) {
							if (h!=null && h.isOnline()&& inheroMap.containsKey(h.getId())) {
								//参与奖励
								if (UseAddUtil.canAdd(h, lvboss.getJoinreward(), false)) {
									UseAddUtil.add(h, lvboss.getJoinreward(), SourceGoodConst.MONSTER_GOD_REWARD, null, true);
								}
								List<Object[]> monsterBossTip = new ArrayList<>();
								List<Object[]> getMonsterBossTip = ActiveGetGiftFunction.getIns().MonsterBossTip(h);
								List<Object[]> monsterBossTipRune = RuneGiftFunction.getIns().MonsterBossTip(h);
								if (getMonsterBossTip != null) {
									monsterBossTip.addAll(getMonsterBossTip);
								}
								if (monsterBossTipRune != null) {
									monsterBossTip.addAll(monsterBossTipRune);
								}
								if (monsterBossTip.size() > 0 && monsterGodCache.getState() == MonsterGodConst.STATE3) {
									MonsterGodSender.sendCmd_1520(h.getId(), ActivitySysId.ACT_ACTIVEGETGIFT,
											monsterBossTip.toArray());
								}
							}
							if (h!=null && h.isOnline()) {
								GlobalSender.sendCmd_264(h.getId(),MonsterGodConst.SYSID, 0, 2);
							}
						}
						
						if(h!=null && h.isOnline() && inheroMap.containsKey(h.getId())){
							MonsterGodSender.sendCmd_1506(bossAttModel.getHid(), bossAttModel.getCurhp(), bossid, hpmax, curhp, bossAttModel.getHurt(), hurtArr);
							if (dieHero.containsKey(bossAttModel.getHid())) {
								//已经死有段时间了
								if (TimeDateUtil.getCurrentTime()-dieHero.get(bossAttModel.getHid())>fuhuoCD) {
									//可以复活
									bossAttModel.fullHp();
									bossAttModel.setLiveTime(TimeDateUtil.getCurrentTime());
									dieHero.remove(bossAttModel.getHid());
									nowLiveing.add(new Object[]{bossAttModel.getHid()});
								}
							}
							if (!nowdieing.isEmpty()&&nowdieing.size()>0) {
								MonsterGodSender.sendCmd_1510(h.getId(), nowdieing.toArray(), 1);
							}
							if (!nowLiveing.isEmpty()) {
								MonsterGodSender.sendCmd_1510(h.getId(), nowLiveing.toArray(), 0);
							}
							
						}
						
						
					}
				}			
				if (bossDead&&monsterGodCache.getState()==MonsterGodConst.STATE3) {
					MonsterGodFunction.getIns().killoverRankReward(monsterGodCache);
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterGodFunction.class, "scheduleMonster has wrong");
		}
	}
	@Override
	public void getActHallData(List<Object[]> list) {
		MonsterGodHis monsterGodHis=	MonsterGodSysCache.getIns().getMonsterGodHis();
		String mvp = "";
		if (monsterGodHis.getRankHis()!=null&&monsterGodHis.getRankHis().size()>0) {
			int size=monsterGodHis.getRankHis().size();
			if (size>=10) {
				size=10;
			}
			MonsterGodRank monsterGodRank=monsterGodHis.getRankHis().get(1);
			Hero h=HeroCache.getHero(monsterGodRank.getHid(), HeroConst.FIND_TYPE_BASIC);
			mvp=h.getNameZoneid();
		}
		list.add(new Object[] {SystemIdConst.FUN_MONSTER_GOD, mvp });
	}
	
	/**
	 * 获取当前剩余3个吕布的气血百分比
	 * @return
	 */
	public double getBoolPro() {
		MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
		if (monsterGodCache.getState()==MonsterGodConst.STATE0||monsterGodCache.getState()==MonsterGodConst.STATE4) {
			return 0;
		}
		int num=MonsterGodSysCache.getIns().getMonsterGodHis().getXhp();
		double sumNumBloor=0.00;
		double nowBoorNum=0.00;
		for (int i = MonsterGodConst.BOSS1; i <=MonsterGodConst.BOSS3; i++) {
			FinalFightAttr battleFightAttr = BattleFunction.initNPC(i);
			long hp = battleFightAttr.getHp();
			if (num>0) {
				hp=hp+num*hp;
			}
			sumNumBloor=hp+sumNumBloor;
		}
		//魔神第一阶段1 魔神第二阶段2 魔神第三阶段3
		int index=MonsterGodConst.BOSS1;
		if (monsterGodCache.getState()==MonsterGodConst.STATE1) {
			index=MonsterGodConst.BOSS1;
		}else if(monsterGodCache.getState()==MonsterGodConst.STATE2) {
			index=MonsterGodConst.BOSS2;
		}else if(monsterGodCache.getState()==MonsterGodConst.STATE3) {
			index=MonsterGodConst.BOSS3;
		}
		GodBoss gogBoss = monsterGodCache.getGogBoss();
		long curhp = gogBoss.getCurhp();
		nowBoorNum=curhp;
		if (index!=MonsterGodConst.BOSS3) {
			for (int i = index+1; i <=MonsterGodConst.BOSS3; i++) {
				FinalFightAttr battleFightAttr = BattleFunction.initNPC(i);
				long hp = battleFightAttr.getHp();
				if (num>0) {
					hp=hp+num*hp;
				}
				nowBoorNum=hp+nowBoorNum;
			}
		}
		
		double pro=nowBoorNum/sumNumBloor;
		//(val5.doubleValue() / val3.doubleValue()) * 100)
		return pro;
		
	}
	
	/**
	 * 魔神吕布在5分钟后血量还有88%或以上获得伤害加成
	 * 魔神吕布在10分钟后血量还有65%或以上获得伤害加成
     * 魔神吕布在15分钟后血量还有35%或以上获得伤害加成
	 * @return
	 */
	public  int addProNum() {
		MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
		if (monsterGodCache.getState()==MonsterGodConst.STATE0||monsterGodCache.getState()==MonsterGodConst.STATE4) {
			return 0;
		}
		int pro=0;
		int useTime=TimeDateUtil.getCurrentTime()-monsterGodCache.getOpenTime();
		double boolPro = getBoolPro();
		if (useTime>=5*60&&boolPro>=0.88) {
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(MonsterGodConst.addAttBuff1);
			pro= struct_xtcs_004.getNum();
		}
		if(useTime>=10*60&&boolPro>=0.65) {
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(MonsterGodConst.addAttBuff2);
			pro= struct_xtcs_004.getNum();
		}
		if(useTime>=15*60&&boolPro>=0.01) {
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(MonsterGodConst.addAttBuff3);
			pro= struct_xtcs_004.getNum();
		}
		return pro;
	}
	


}
