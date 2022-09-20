package com.teamtop.system.boss.monsterGod;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.qmboss.BossHurtInfo;
import com.teamtop.system.boss.qmboss.QMBossDamgRankModel;
import com.teamtop.system.crossBoss.CrossBossConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lvbuboss_224;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lvbuboss_224;

public class MonsterGodManager {
	
	private static MonsterGodManager ins = null;

	public static synchronized MonsterGodManager getIns() {
		if (ins == null) {
			ins = new MonsterGodManager();
		}
		return ins;
	}

	public void openRank(Hero hero) {
		try {
			MonsterGodHis monsterGodHis=	MonsterGodSysCache.getIns().getMonsterGodHis();
			//MonsterGodSender.sendCmd_1500(hero.getId(), MonsterGodSysCache.getIns().getMonsterGodCache().getState());
			Object[] ranks=null;
			if (monsterGodHis.getRankHis()!=null&&monsterGodHis.getRankHis().size()>0) {
				int size=monsterGodHis.getRankHis().size();
				if (size>=10) {
					size=10;
				}
				ranks=new Object[size];
				for (int i = 0; i < size; i++) {
					MonsterGodRank monsterGodRank=monsterGodHis.getRankHis().get(i+1);
					Hero h=HeroCache.getHero(monsterGodRank.getHid(), HeroConst.FIND_TYPE_BASIC);
					ranks[i]=new Object[] {monsterGodRank.getRankid(),h.getNameZoneid(),monsterGodRank.getSumhurt()};
				}
			}
			MonsterGodSender.sendCmd_1502(hero.getId(), ranks);
		} catch (Exception e) {
			LogTool.error(e, MonsterGodManager.class, hero.getId(), hero.getName(), "openUi has wrong");
		}
		
	}
	/**
	 * 打开魔神吕布活动
	 * @param hero
	 */
	public void openUi(Hero hero) {
		try {
			MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
			int num=MonsterGodSysCache.getIns().getMonsterGodHis().getXhp();
			MonsterGodSender.sendCmd_1522(hero.getId(), num);
			if (monsterGodCache.getState()==MonsterGodConst.STATE0) {
				MonsterGodSender.sendCmd_1504(hero.getId(), 0, 0, 0, 0, 0);
				return;
			}
			if(monsterGodCache.getState()==MonsterGodConst.STATE4) {
				MonsterGodSender.sendCmd_1504(hero.getId(), 0, 0, 0, 0, 0);
				return;
			}
			int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
			List<QMBossDamgRankModel> rankList = monsterGodCache.getRankList();
			QMBossDamgRankModel model = new QMBossDamgRankModel();
			model.setHid(hero.getId());
			GodBoss godBoss=monsterGodCache.getGogBoss();
			if(rankList.contains(model)){
				model = rankList.get(rankList.indexOf(model));
				int time=0;
				int outTime=model.getOutTime();
				if (TimeDateUtil.getCurrentTime()-outTime<=MonsterGodConst.CHENGFATIME&&TimeDateUtil.getCurrentTime()-outTime>=0) {
					time=fuhuoCD-(TimeDateUtil.getCurrentTime()-outTime);
					MonsterGodSender.sendCmd_1504(hero.getId(),  godBoss.getBossId(), monsterGodCache.getInheroMap().size(),godBoss.getCurhp(),godBoss.getHpmax(),time);
					return;
				}
			}
			MonsterGodSender.sendCmd_1504(hero.getId(),  godBoss.getBossId(), monsterGodCache.getInheroMap().size(),godBoss.getCurhp(),godBoss.getHpmax(),0);
		    return;
		} catch (Exception e) {
			LogTool.error(e, MonsterGodManager.class, hero.getId(), hero.getName(), "inLvbu has wrong");
		}
		
	}
	/**
	 * 离开副本
	 * @param hero
	 */
	public void quitLvBuBoss(Hero hero) {
		try {
			MonsterGodFunction.getIns().quitGodBoss(hero);
		} catch (Exception e) {
			LogTool.error(e, MonsterGodManager.class, hero.getId(), hero.getName(), "quitLvBuBoss has wrong");
		}
		
	}
	/**
	 * 买活
	 * @param hero
	 */
	public void buyLive(Hero hero,int type) {
		try {
			MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
			int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
			int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
			if (monsterGodCache.getDiehero().containsKey(hero.getId())) {
				if (type==0) {
					if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
						MonsterGodSender.sendCmd_1516(hero.getId(), 1);
						return;
					}
					UseAddUtil.use(hero, GameConst.YUANBAO,  fuhuoCost, SourceGoodConst.MONSTER_GOD_BUYLIVE, true);
					monsterGodCache.getDiehero().remove(hero.getId());
					QMBossDamgRankModel model = new QMBossDamgRankModel();
					model.setHid(hero.getId());
					model = monsterGodCache.getRankList().get(monsterGodCache.getRankList().indexOf(model));
					model.fullHp();
					model.setLiveTime(TimeDateUtil.getCurrentTime());
					MonsterGodSender.sendCmd_1516(hero.getId(), 0);
					int size=monsterGodCache.getRankList().size();
					for (int i = 0; i < size; i++) {
						QMBossDamgRankModel othermodel = monsterGodCache.getRankList().get(i);
						if (othermodel!=null) {
							Hero modelhero = HeroCache.getHero(othermodel.getHid());
							if(modelhero!=null && modelhero.isOnline() && monsterGodCache.getInheroMap().containsKey(modelhero.getId())){
								MonsterGodSender.sendCmd_1510(modelhero.getId(), new Object[]{new Object[]{hero.getId()}}, 0);
							}
						}
					}
					return;
				}else if (type==1) {
					//已经死有段时间了
					if (TimeDateUtil.getCurrentTime()-monsterGodCache.getDiehero().get(hero.getId())>=fuhuoCD) {
						monsterGodCache.getDiehero().remove(hero.getId());
						//可以复活
						QMBossDamgRankModel model = new QMBossDamgRankModel();
						model.setHid(hero.getId());
						model = monsterGodCache.getRankList().get(monsterGodCache.getRankList().indexOf(model));
						model.fullHp();
						model.setLiveTime(TimeDateUtil.getCurrentTime());
						MonsterGodSender.sendCmd_1516(hero.getId(), 0);
						
						int size=monsterGodCache.getRankList().size();
						for (int i = 0; i < size; i++) {
							QMBossDamgRankModel othermodel = monsterGodCache.getRankList().get(i);
							if (othermodel!=null) {
								Hero modelhero = HeroCache.getHero(othermodel.getHid());
								if(modelhero!=null && modelhero.isOnline() && monsterGodCache.getInheroMap().containsKey(modelhero.getId())){
									MonsterGodSender.sendCmd_1510(modelhero.getId(), new Object[]{new Object[]{hero.getId()}}, 0);
								}
							}
						}
						return;
					}
					
				}
				
			}
			MonsterGodSender.sendCmd_1516(hero.getId(), 1);
			return;
		} catch (Exception e) {
			LogTool.error(e, MonsterGodManager.class,hero.getId(), hero.getName(), "buyLive has wrong");
		}
	}
	/**
	 * 进入魔王吕布
	 * @param hero
	 */
	public void join(Hero hero) {
		try {
			MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
			if (monsterGodCache.getState()==MonsterGodConst.STATE0) {
				MonsterGodSender.sendCmd_1518(hero.getId(), 2);
				return;
			}
			if(monsterGodCache.getState()==MonsterGodConst.STATE4) {
				MonsterGodSender.sendCmd_1518(hero.getId(), 3);
				return;
			}
			if (monsterGodCache.getInheroMap().containsKey(hero.getId())) {
				MonsterGodSender.sendCmd_1518(hero.getId(), 1);
				return;
			}
			List<QMBossDamgRankModel> rankList = monsterGodCache.getRankList();
			
			QMBossDamgRankModel model = new QMBossDamgRankModel();
			model.setHid(hero.getId());
			if(!rankList.contains(model)){
				model.setName(hero.getNameZoneid());
				rankList.add(model);
			}else {
				model = rankList.get(rankList.indexOf(model));
				int outTime=model.getOutTime();
				if (TimeDateUtil.getCurrentTime()-outTime<MonsterGodConst.CHENGFATIME&&TimeDateUtil.getCurrentTime()-outTime>0) {
					MonsterGodSender.sendCmd_1518(hero.getId(), 4);
					return;
				}
				
			}
			if (monsterGodCache.getDiehero().containsKey(hero.getId())) {
				monsterGodCache.getDiehero().remove(hero.getId());
			}
			FinalFightAttr fightAttr = BattleFunction.initHero(hero);
			model.setAttrmap(fightAttr);
			model.fullHp();
			model.setInTime(TimeDateUtil.getCurrentTime());
			model.setLiveTime(TimeDateUtil.getCurrentTime());
			model.setBossHurtInfoMap(new HashMap<>());
			
			
			for (int i = MonsterGodConst.BOSS1; i <=MonsterGodConst.BOSS3; i++) {
				Struct_lvbuboss_224 lvbuboss_224 = Config_lvbuboss_224.getIns().get(i);
				double ap=lvbuboss_224.getAp();
				int p=lvbuboss_224.getP();
				double x=(ap/100l);
				long hurt = (long) (fightAttr.getHpMax()*x+p);
				
				FinalFightAttr target = BattleFunction.initNPC(i);
				long damg =(long) Math.max(BattleFunction.calcDamg(fightAttr, target),1);
				
				BossHurtInfo bossHurtInfo=new BossHurtInfo();
				bossHurtInfo.setBossId(i);
				bossHurtInfo.setOnehurtAB(damg);
				bossHurtInfo.setOnehurtBA(hurt);
				bossHurtInfo.setLimtLiveTime(lvbuboss_224.getTime());
				model.getBossHurtInfoMap().put(i, bossHurtInfo);
			}
			int i =0;

			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_9, 1);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_14, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_14, 1);

			monsterGodCache.getInheroMap().put(hero.getId(), hero);
			MonsterGodSender.sendCmd_1518(hero.getId(), 0);
		    GodBoss	godBoss=monsterGodCache.getGogBoss();
			List<Object[]> hurtList = new ArrayList<Object[]>();
			Object[] hurtArr = null;
			int num=0;
			int size=monsterGodCache.getRankList().size();
			for (int j = 0; j < size; j++) {
				QMBossDamgRankModel Damgmodel = monsterGodCache.getRankList().get(j);
				if (Damgmodel!=null) {
					if (num<10) {
						hurtList.add(new Object[]{Damgmodel.getName(),Damgmodel.getHurt()});
						num++;
					}else {
						break;
					}
				}
			}
			
			if(hurtList!=null && hurtList.size()>0){
				hurtArr = hurtList.toArray();
			}
			for(Hero h:monsterGodCache.getInheroMap().values()){
				if(i++>5) break;
				if (h.getId()!=hero.getId()) {
					HeroFunction.getIns().sendBattleHeroAttr(h, hero.getId());
					HeroFunction.getIns().sendBattleHeroAttr(hero, h.getId());
				}
			}
			// HappyMonsterGodFunction.getIns().addNumByType(hero);
			MonsterGodSender.sendCmd_1506(model.getHid(), model.getCurhp(), godBoss.getBossId(), godBoss.getHpmax(), godBoss.getCurhp(), model.getHurt(), hurtArr);
			String usesys = hero.getTempData().getAccount().getUsesys();
			FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
					hero.getTotalStrength(), SystemIdConst.FUN_MONSTER_GOD, hero.getZoneid(), hero.getPf(), usesys,
					hero.getReincarnationLevel());
			return;
		} catch (Exception e) {
			LogTool.error(e, MonsterGodManager.class, hero.getId(), hero.getName(), "inLvbu has wrong");
		}
		
		
	}

	public void cgherodie(Hero hero) {
		try {
			int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
			MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
			if (monsterGodCache.getState()==MonsterGodConst.STATE0) {
				MonsterGodSender.sendCmd_1518(hero.getId(), 2);
				return;
			}
			if(monsterGodCache.getState()==MonsterGodConst.STATE4) {
				MonsterGodSender.sendCmd_1518(hero.getId(), 3);
				return;
			}
			if (!monsterGodCache.getInheroMap().containsKey(hero.getId())) {
				LogTool.warn("cgherodie ! containsKey(hero.getId()) hid"+hero.getId(), MonsterGodManager.class);
				return;
			}
			
			if (monsterGodCache.getDiehero().containsKey(hero.getId())) {
				LogTool.warn("cgherodie getDiehero containsKey(hero.getId()) hid"+hero.getId(), MonsterGodManager.class);
				return;
			}
			List<Object[]> nowdieing=new ArrayList<>();
			List<QMBossDamgRankModel> rankList = monsterGodCache.getRankList();
			int size=rankList.size();
			for (int i = 0; i < size; i++) {
				QMBossDamgRankModel model = rankList.get(i);
				if (model!=null&&model.getHid()==hero.getId()) {
					if (model.getAotufuhuo()==0) {
						FinalFightAttr attr =  model.getAttrmap();
						attr.setHp(0);
						monsterGodCache.getDiehero().put(model.getHid(), TimeDateUtil.getCurrentTime());
						nowdieing.add(new Object[]{hero.getId()});
						break;
					}else {
						//是否设置了自动复活
						if (UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
							UseAddUtil.use(hero, GameConst.YUANBAO,  fuhuoCost, SourceGoodConst.MONSTER_GOD_BUYLIVE, true);
							model.fullHp();
							model.setLiveTime(TimeDateUtil.getCurrentTime());
							MonsterGodSender.sendCmd_1516(hero.getId(), 0);
							size=monsterGodCache.getRankList().size();
							for (int a = 0; a < size; a++) {
								QMBossDamgRankModel othermodel = monsterGodCache.getRankList().get(a);
								if (othermodel!=null) {
									Hero modelhero = HeroCache.getHero(othermodel.getHid());
									if(modelhero!=null && modelhero.isOnline() && monsterGodCache.getInheroMap().containsKey(modelhero.getId())){
										MonsterGodSender.sendCmd_1510(modelhero.getId(), new Object[]{new Object[]{hero.getId()}}, 0);
									}
								}
							}
							MonsterGodSender.sendCmd_1526(hero.getId(), 0);
							return;
						}else {
							MonsterGodSender.sendCmd_1526(hero.getId(), 1);
							FinalFightAttr attr =  model.getAttrmap();
							attr.setHp(0);
							monsterGodCache.getDiehero().put(model.getHid(), TimeDateUtil.getCurrentTime());
							nowdieing.add(new Object[]{hero.getId()});
							break;
						}
					}
				}
			}
			for (int i = 0; i < size; i++) {
				QMBossDamgRankModel model = rankList.get(i);
				if (model!=null) {
					Hero modelhero = HeroCache.getHero(model.getHid());
					if(modelhero!=null && modelhero.isOnline() && monsterGodCache.getInheroMap().containsKey(modelhero.getId())){
						if (!nowdieing.isEmpty()&&nowdieing.size()>0) {
							MonsterGodSender.sendCmd_1510(modelhero.getId(), nowdieing.toArray(), 1);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterGodManager.class, hero.getId(), hero.getName(), "cgherodie has wrong");
		}
		
	}

	public void isaotufuhuo(Hero hero, int state) {
		try {
			if (state!=0&&state!=1) {
				return;
			}
			MonsterGodCache monsterGodCache=MonsterGodSysCache.getIns().getMonsterGodCache();
			if (monsterGodCache.getState()==MonsterGodConst.STATE0) {
				return;
			}
			if(monsterGodCache.getState()==MonsterGodConst.STATE4) {
				return;
			}
			if (!monsterGodCache.getInheroMap().containsKey(hero.getId())) {
				return;
			}
			List<QMBossDamgRankModel> rankList = monsterGodCache.getRankList();
			QMBossDamgRankModel model = new QMBossDamgRankModel();
			model.setHid(hero.getId());
			if(!rankList.contains(model)){
				return;
			}else {
				model = rankList.get(rankList.indexOf(model));
				model.setAotufuhuo(state);
				MonsterGodSender.sendCmd_1524(model.getHid(), state);
				if (state==1&&monsterGodCache.getDiehero().containsKey(hero.getId())) {
					buyLive(hero, 0);
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, MonsterGodManager.class, "isaotufuhuo");
		}
		
	}
	
}
