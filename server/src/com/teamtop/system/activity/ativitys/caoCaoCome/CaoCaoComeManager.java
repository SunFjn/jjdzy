package com.teamtop.system.activity.ativitys.caoCaoCome;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.qmboss.BossHurtInfo;
import com.teamtop.system.boss.qmboss.QMBossDamgRankModel;
import com.teamtop.system.crossBoss.CrossBossConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_cclx_754;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_cclx_754;

public class CaoCaoComeManager extends AbstractActivityManager{
	
	private static CaoCaoComeManager ins = null;

	public static synchronized CaoCaoComeManager getIns() {
		if (ins == null) {
			ins = new CaoCaoComeManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		CaoCaoComeSysCache.getIns().getCaoCaoComeHis().getRankHis().clear();
		CaoCaoComeSysCache.getIns().getCaoCaoComeHis().setXhp(0);
		
		CaoCaoBoss caoCaoBoss =new CaoCaoBoss();
		Struct_cclx_754 struct_cclx_754 = Config_cclx_754.getIns().get(1);
		int bossid = struct_cclx_754.getBoss()[0][1];
		caoCaoBoss.setBossId(bossid);
		FinalFightAttr battleFightAttr = BattleFunction.initNPC(bossid);
		long hp = battleFightAttr.getHp();
		caoCaoBoss.setHpmax(hp);
		caoCaoBoss.setCurhp(hp);
		caoCaoBoss.setAttr(battleFightAttr);
		CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
		caoCaoComeCache.setCaoCaoBoss(caoCaoBoss);
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		CaoCaoCome caoCaoCome = new CaoCaoCome(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		return caoCaoCome;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return CaoCaoCome.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return CaoCaoComeEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CAOCAOCOME_SYSID)) {
				return;
			}
	        CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
	        CaoCaoBoss caoCaoBoss = caoCaoComeCache.getCaoCaoBoss();
	        CaoCaoComeHis caoCaoComeHis = CaoCaoComeSysCache.getIns().getCaoCaoComeHis();
	        
	        List<QMBossDamgRankModel> rankList = caoCaoComeCache.getRankList();
			QMBossDamgRankModel model = new QMBossDamgRankModel();
			model.setHid(hero.getId());
			int time=0;
			if(rankList.contains(model)){
				model = rankList.get(rankList.indexOf(model));
				int outTime=model.getOutTime();
				if (outTime>TimeDateUtil.getCurrentTime()) {
					outTime=0;
				}
				if (TimeDateUtil.getCurrentTime()-outTime<=CaoCaoComeConst.CHENGFATIME&&TimeDateUtil.getCurrentTime()-outTime>=0) {
					time=CaoCaoComeConst.CHENGFATIME+outTime-TimeDateUtil.getCurrentTime();
				}
			}
			CaoCaoComeSender.sendCmd_8510(hero.getId(), caoCaoComeCache.getState(), caoCaoBoss.getCurhp(), caoCaoBoss.getHpmax(), caoCaoComeHis.getXhp(), time);
		} catch (Exception e) {
			LogTool.error(e, CaoCaoComeManager.class, "openUI has wrong");
		}
		
		
	}
	public void join(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CAOCAOCOME_SYSID)) {
				CaoCaoComeSender.sendCmd_8514(hero.getId(), 2, 0);
				return;
			}
			CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
			
			if (CaoCaoComeSysCache.getIns().getCaoCaoComeCache().getState()!=CaoCaoComeConst.STATE1) {
				LogTool.info("!=CaoCaoComeConst.STATE1", CaoCaoComeManager.class);
				CaoCaoComeSender.sendCmd_8514(hero.getId(), 2, 0);
				return;
			}
			
			if (caoCaoComeCache.getInheroMap().containsKey(hero.getId())) {
				CaoCaoComeSender.sendCmd_8514(hero.getId(), 5,0);
				return;
			}
			 
	        List<QMBossDamgRankModel> rankList = caoCaoComeCache.getRankList();
			QMBossDamgRankModel model = new QMBossDamgRankModel();
			
			model.setHid(hero.getId());
			if(!rankList.contains(model)){
				model.setName(hero.getNameZoneid());
				rankList.add(model);
			}else {
				model = rankList.get(rankList.indexOf(model));
				int outTime=model.getOutTime();
				if (TimeDateUtil.getCurrentTime()-outTime<CaoCaoComeConst.CHENGFATIME&&TimeDateUtil.getCurrentTime()-outTime>0) {
					CaoCaoComeSender.sendCmd_8514(hero.getId(), 4, 0);
					return;
				}
				
			}
			if (caoCaoComeCache.getDiehero().containsKey(hero.getId())) {
				caoCaoComeCache.getDiehero().remove(hero.getId());
			}
			FinalFightAttr fightAttr = BattleFunction.initHero(hero);
			model.setAttrmap(fightAttr);
			model.fullHp();
			model.setInTime(TimeDateUtil.getCurrentTime());
			model.setLiveTime(TimeDateUtil.getCurrentTime());
			model.setBossHurtInfoMap(new HashMap<>());
			//boss对我伤害 以及 我的存活时间
			Struct_cclx_754 boss_224 = Config_cclx_754.getIns().get(1);
			int bossId=boss_224.getBoss()[0][1];
			double ap=boss_224.getMsbfb();
			int p=boss_224.getMsgdz();
			double x=(ap/100l);
			long hurt = (long) (fightAttr.getHpMax()*x+p);
			
			FinalFightAttr target = BattleFunction.initNPC(bossId);
			long damg =(long) Math.max(BattleFunction.calcDamg(fightAttr, target),1);
			BossHurtInfo bossHurtInfo=new BossHurtInfo();
			bossHurtInfo.setBossId(bossId);
			bossHurtInfo.setOnehurtAB(damg);
			bossHurtInfo.setOnehurtBA(hurt);
			bossHurtInfo.setLimtLiveTime(boss_224.getSj());
			model.getBossHurtInfoMap().put(bossId, bossHurtInfo);
			
			
			int i =0;
			caoCaoComeCache.getInheroMap().put(hero.getId(), hero);
			CaoCaoComeSender.sendCmd_8514(hero.getId(), 0,model.getAotufuhuo());
			
		   
			List<Object[]> hurtList = new ArrayList<Object[]>();
			Object[] hurtArr = null;
			int num=0;
			int size=caoCaoComeCache.getRankList().size();
			for (int j = 0; j < size; j++) {
				QMBossDamgRankModel Damgmodel = caoCaoComeCache.getRankList().get(j);
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
			for(Hero h:caoCaoComeCache.getInheroMap().values()){
				if(i++>5) break;
				if (h.getId()!=hero.getId()) {
					HeroFunction.getIns().sendBattleHeroAttr(h, hero.getId());
					HeroFunction.getIns().sendBattleHeroAttr(hero, h.getId());
				}
			}
			CaoCaoBoss caoCaoBoss = caoCaoComeCache.getCaoCaoBoss();
			CaoCaoComeSender.sendCmd_8520(model.getHid(), model.getCurhp(), model.getHurt(), caoCaoBoss.getHpmax(), caoCaoBoss.getCurhp(), hurtArr);
			/*String usesys = hero.getTempData().getAccount().getUsesys();
			FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
					hero.getTotalStrength(), SystemIdConst.FUN_MONSTER_GOD, hero.getZoneid(), hero.getPf(), usesys);*/
			return;
		} catch (Exception e) {
			LogTool.error(e, CaoCaoComeManager.class, "join has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 */
	public void openRank(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CAOCAOCOME_SYSID)) {
				return;
			}
			CaoCaoComeHis caoCaoComeHis = CaoCaoComeSysCache.getIns().getCaoCaoComeHis();
			Object[] ranks=null;
			if (caoCaoComeHis.getRankHis()!=null&&caoCaoComeHis.getRankHis().size()>0) {
				int size=caoCaoComeHis.getRankHis().size();
				if (size>=10) {
					size=10;
				}
				ranks=new Object[size];
				for (int i = 0; i < size; i++) {
					HurtBossRank hurtBossRank = caoCaoComeHis.getRankHis().get(i+1);
					Hero h=HeroCache.getHero(hurtBossRank.getHid(), HeroConst.FIND_TYPE_BASIC);
					ranks[i]=new Object[] {hurtBossRank.getRankid(),h.getNameZoneid(),hurtBossRank.getSumhurt()};
				}
			}
			CaoCaoComeSender.sendCmd_8512(hero.getId(), ranks);
		} catch (Exception e) {
			LogTool.error(e, CaoCaoComeManager.class, "join has wrong");
		}
		
	}

	public void quit(Hero hero) {
		try {
			CaoCaoComeFunction.getIns().quit(hero);
		} catch (Exception e) {
			LogTool.error(e, CaoCaoComeManager.class, "quit has wrong");
		}
		
	}
	/**
	 *  CG 通知后端 我本人死亡了 
	 * @param hero
	 */
	public void cgherodie(Hero hero) {
			try {
				if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CAOCAOCOME_SYSID)) {
					return;
				}
				CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
				if (CaoCaoComeSysCache.getIns().getCaoCaoComeCache().getState()!=CaoCaoComeConst.STATE1) {
					LogTool.info("!=CaoCaoComeConst.STATE1", CaoCaoComeManager.class);
					return;
				}
				
				int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
				
				if (!caoCaoComeCache.getInheroMap().containsKey(hero.getId())) {
					LogTool.warn("cgherodie ! containsKey(hero.getId()) hid"+hero.getId(), CaoCaoComeManager.class);
					return;
				}
				
				if (caoCaoComeCache.getDiehero().containsKey(hero.getId())) {
					LogTool.warn("cgherodie getDiehero containsKey(hero.getId()) hid"+hero.getId(), CaoCaoComeManager.class);
					return;
				}
				List<Object[]> nowdieing=new ArrayList<>();
				List<QMBossDamgRankModel> rankList = caoCaoComeCache.getRankList();
				int size=rankList.size();
				for (int i = 0; i < size; i++) {
					QMBossDamgRankModel model = rankList.get(i);
					if (model!=null&&model.getHid()==hero.getId()) {
						if (model.getAotufuhuo()==0) {
							FinalFightAttr attr =  model.getAttrmap();
							attr.setHp(0);
							caoCaoComeCache.getDiehero().put(model.getHid(), TimeDateUtil.getCurrentTime());
							nowdieing.add(new Object[]{hero.getId()});
							break;
						}else {
							//是否设置了自动复活
							if (UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
								UseAddUtil.use(hero, GameConst.YUANBAO,  fuhuoCost, SourceGoodConst.MONSTER_GOD_BUYLIVE, true);
								model.fullHp();
								model.setLiveTime(TimeDateUtil.getCurrentTime());
								CaoCaoComeSender.sendCmd_8524(hero.getId(), 0);
								size=caoCaoComeCache.getRankList().size();
								for (int a = 0; a < size; a++) {
									QMBossDamgRankModel othermodel = caoCaoComeCache.getRankList().get(a);
									if (othermodel!=null) {
										Hero modelhero = HeroCache.getHero(othermodel.getHid());
										if(modelhero!=null && modelhero.isOnline() && caoCaoComeCache.getInheroMap().containsKey(modelhero.getId())){
											CaoCaoComeSender.sendCmd_8518(modelhero.getId(), new Object[]{new Object[]{hero.getId()}}, 0);
										}
									}
								}
								CaoCaoComeSender.sendCmd_8528(hero.getId(), 0);
								return;
							}else {
								CaoCaoComeSender.sendCmd_8524(hero.getId(), 1);
								FinalFightAttr attr =  model.getAttrmap();
								attr.setHp(0);
								caoCaoComeCache.getDiehero().put(model.getHid(), TimeDateUtil.getCurrentTime());
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
						if(modelhero!=null && modelhero.isOnline() && caoCaoComeCache.getInheroMap().containsKey(modelhero.getId())){
							if (!nowdieing.isEmpty()&&nowdieing.size()>0) {
								CaoCaoComeSender.sendCmd_8518(modelhero.getId(), nowdieing.toArray(), 1);
							}
						}
					}
				}
		} catch (Exception e) {
			LogTool.error(e, CaoCaoComeManager.class, "cgherodie has wrong");
		}
		
	}

	public void buyLive(Hero hero, int type) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CAOCAOCOME_SYSID)) {
				return;
			}
			if (CaoCaoComeSysCache.getIns().getCaoCaoComeCache().getState()!=CaoCaoComeConst.STATE1) {
				LogTool.info("!=CaoCaoComeConst.STATE1", CaoCaoComeManager.class);
				return;
			}
			CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
			int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
			int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
			if (caoCaoComeCache.getDiehero().containsKey(hero.getId())) {
				if (type==0) {
					if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
						CaoCaoComeSender.sendCmd_8524(hero.getId(), 1);
						return;
					}
					UseAddUtil.use(hero, GameConst.YUANBAO,  fuhuoCost, SourceGoodConst.MONSTER_GOD_BUYLIVE, true);
					caoCaoComeCache.getDiehero().remove(hero.getId());
					QMBossDamgRankModel model = new QMBossDamgRankModel();
					model.setHid(hero.getId());
					model = caoCaoComeCache.getRankList().get(caoCaoComeCache.getRankList().indexOf(model));
					model.fullHp();
					model.setLiveTime(TimeDateUtil.getCurrentTime());
					CaoCaoComeSender.sendCmd_8524(hero.getId(), 0);
					int size=caoCaoComeCache.getRankList().size();
					for (int i = 0; i < size; i++) {
						QMBossDamgRankModel othermodel = caoCaoComeCache.getRankList().get(i);
						if (othermodel!=null) {
							Hero modelhero = HeroCache.getHero(othermodel.getHid());
							if(modelhero!=null && modelhero.isOnline() && caoCaoComeCache.getInheroMap().containsKey(modelhero.getId())){
								CaoCaoComeSender.sendCmd_8518(modelhero.getId(), new Object[]{new Object[]{hero.getId()}}, 0);
							}
						}
					}
					return;
				}else if (type==1) {
					//已经死有段时间了
					if (TimeDateUtil.getCurrentTime()-caoCaoComeCache.getDiehero().get(hero.getId())>=fuhuoCD) {
						caoCaoComeCache.getDiehero().remove(hero.getId());
						//可以复活
						QMBossDamgRankModel model = new QMBossDamgRankModel();
						model.setHid(hero.getId());
						model = caoCaoComeCache.getRankList().get(caoCaoComeCache.getRankList().indexOf(model));
						model.fullHp();
						model.setLiveTime(TimeDateUtil.getCurrentTime());
						CaoCaoComeSender.sendCmd_8524(hero.getId(), 0);
						int size=caoCaoComeCache.getRankList().size();
						for (int i = 0; i < size; i++) {
							QMBossDamgRankModel othermodel = caoCaoComeCache.getRankList().get(i);
							if (othermodel!=null) {
								Hero modelhero = HeroCache.getHero(othermodel.getHid());
								if(modelhero!=null && modelhero.isOnline() && caoCaoComeCache.getInheroMap().containsKey(modelhero.getId())){
									CaoCaoComeSender.sendCmd_8518(modelhero.getId(), new Object[]{new Object[]{hero.getId()}}, 0);
								}
							}
						}
						return;
					}
					
				}
				
			}
			CaoCaoComeSender.sendCmd_8524(hero.getId(), 0);
			return;
		} catch (Exception e) {
			LogTool.error(e, CaoCaoComeManager.class, "buyLive has wrong");
		}
		
		
		
		
	}

	public void isaotufuhuo(Hero hero, int state) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CAOCAOCOME_SYSID)) {
				return;
			}
			if (CaoCaoComeSysCache.getIns().getCaoCaoComeCache().getState()!=CaoCaoComeConst.STATE1) {
				LogTool.info("!=CaoCaoComeConst.STATE1", CaoCaoComeManager.class);
				return;
			}
			CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
			
			if (state!=0&&state!=1) {
				return;
			}
		
			if (!caoCaoComeCache.getInheroMap().containsKey(hero.getId())) {
				return;
			}
			List<QMBossDamgRankModel> rankList = caoCaoComeCache.getRankList();
			QMBossDamgRankModel model = new QMBossDamgRankModel();
			model.setHid(hero.getId());
			if(!rankList.contains(model)){
				return;
			}else {
				model = rankList.get(rankList.indexOf(model));
				model.setAotufuhuo(state);
				CaoCaoComeSender.sendCmd_8526(model.getHid(), state);
				if (state==1&&caoCaoComeCache.getDiehero().containsKey(hero.getId())) {
					buyLive(hero, 0);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CaoCaoComeManager.class, "isaotufuhuo has wrong");
		}
		
	}
	
	
	
	

}
