package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

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
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hfkhzfzj_286;
import excel.config.Config_hfkhzfzjjiu_286;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_hfkhzfzj_286;
import excel.struct.Struct_hfkhzfzjjiu_286;

public class HeFuZhangFeiBossManager extends AbstractActivityManager{
	
	private static HeFuZhangFeiBossManager ins;

	private HeFuZhangFeiBossManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeFuZhangFeiBossManager getIns() {
		if (ins == null) {
			ins = new HeFuZhangFeiBossManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		HeFuZhangFeiBossSysCache.setHeFuZhangFeiBossCahce(new HeFuZhangFeiBossCahce());
		HeFuZhangFeiBossFunction.getIns().openAct();
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		
		
	}

	@Override
	public void actEnd() {
		HeFuZhangFeiBossCahce heFuZhangFeiBossCahce=HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
		if (heFuZhangFeiBossCahce.getBossid()==Config_hfkhzfzj_286.getIns().getSortList().size()
				&&heFuZhangFeiBossCahce.getBossType()==HeFuZhangFeiBossConst.BOSS_TYPE2) {
			//已经发过了
		}else {
			HeFuZhangFeiBossFunction.getIns().sendRankReward();
		}
		
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		
		HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
		HeFuZhangFeiBoss heFuZhangFeiBoss = (HeFuZhangFeiBoss) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_ZHANGFEIBOSS);
		
		int bossid = heFuZhangFeiBossCahce.getBossid();
		
		for (Struct_hfkhzfzj_286 struct_hfkhczfljl_286:Config_hfkhzfzj_286.getIns().getSortList()) {
			int bossindex=struct_hfkhczfljl_286.getId();
			int state=GameConst.REWARD_0;
			if (heFuZhangFeiBoss.getReward().contains(bossindex)) {
				state=GameConst.REWARD_2;
			}else {
				if (bossid>bossindex) {
					state=GameConst.REWARD_1;
				}else if(bossid==bossindex&&heFuZhangFeiBossCahce.getBossType()==HeFuZhangFeiBossConst.BOSS_TYPE2) {
					state=GameConst.REWARD_1;
				}
			}
			if (state==GameConst.REWARD_1) {
				heFuZhangFeiBoss.getReward().add(bossindex);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.HEFU_ZHANGFEI, new Object[]{MailConst.HEFU_ZHANGFEI},struct_hfkhczfljl_286.getReward());
			}
			
		}
		
		
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HeFuZhangFeiBoss heFuZhangFeiBoss = new HeFuZhangFeiBoss(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		Set<Integer> reward = new HashSet<>();
		HashMap<Integer, Integer> buyNumMap=new HashMap<>();
		heFuZhangFeiBoss.setReward(reward);
		heFuZhangFeiBoss.setZuiyiNum(0);
		heFuZhangFeiBoss.setBuyNumMap(buyNumMap);
		for (Struct_hfkhzfzjjiu_286 hfkhzfzjjiu_286:Config_hfkhzfzjjiu_286.getIns().getSortList()) {
			buyNumMap.put(hfkhzfzjjiu_286.getId(), 0);
		}
		return heFuZhangFeiBoss;
	}

	@Override
	public Class<?> getActivityData() {
		return HeFuZhangFeiBoss.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return HeFuZhangFeiBossEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
				return;
			}
			HeFuZhangFeiBoss heFuZhangFeiBoss = (HeFuZhangFeiBoss) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_ZHANGFEIBOSS);
			
	        HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
	        List<QMBossDamgRankModel> rankList = HeFuZhangFeiBossSysCache.getRankList();
	        
			QMBossDamgRankModel model = new QMBossDamgRankModel();
			model.setHid(hero.getId());
			int time=0;
			if(rankList.contains(model)){
				model = rankList.get(rankList.indexOf(model));
				int outTime=model.getOutTime();
				if (outTime>TimeDateUtil.getCurrentTime()) {
					outTime=0;
				}
				if (TimeDateUtil.getCurrentTime()-outTime<=HeFuZhangFeiBossConst.CHENGFATIME&&TimeDateUtil.getCurrentTime()-outTime>=0) {
					time=HeFuZhangFeiBossConst.CHENGFATIME+outTime-TimeDateUtil.getCurrentTime();
				}
			}
			
			
			int i=0;
			Object[] reward=new Object[Config_hfkhzfzj_286.getIns().size()];
			int bossid = heFuZhangFeiBossCahce.getBossid();
			
			for (Struct_hfkhzfzj_286 struct_hfkhczfljl_286:Config_hfkhzfzj_286.getIns().getSortList()) {
				int bossindex=struct_hfkhczfljl_286.getId();
				
				int state=GameConst.REWARD_0;
				if (heFuZhangFeiBoss.getReward().contains(bossindex)) {
					state=GameConst.REWARD_2;
				}else {
					if (bossid>bossindex) {
						state=GameConst.REWARD_1;
					}else if(bossid==bossindex&&heFuZhangFeiBossCahce.getBossType()==HeFuZhangFeiBossConst.BOSS_TYPE2) {
						state=GameConst.REWARD_1;
					}
				}
				reward[i]=new Object[] {bossindex,state};
				i++;
			}
			if (heFuZhangFeiBossCahce.getBossid()==0) {
				bossid=bossid+1;
			}
			HashMap<Integer, Integer> buyNumMap = heFuZhangFeiBoss.getBuyNumMap();
			Object[] addjiuNums=new Object[buyNumMap.size()];
			i=0;
			for (Integer key: buyNumMap.keySet()) {
				int buyNum=buyNumMap.get(key);
				addjiuNums[i]=new Object[] {key,buyNum};
				i++;
			}
			
			
			HeFuZhangFeiBossSender.sendCmd_9640(hero.getId(), heFuZhangFeiBossCahce.getBossType(), bossid, heFuZhangFeiBossCahce.getCurhp(), heFuZhangFeiBossCahce.getHpmax(), time, heFuZhangFeiBossCahce.getZuiyiNum(),reward,addjiuNums);
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossManager.class, "openUI has wrong");
		}
		
		
	}
	public void join(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
				HeFuZhangFeiBossSender.sendCmd_9646(hero.getId(), 2, 0);
				return;
			}
		    HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
		    ConcurrentHashMap<Long, Hero> inheroMap = HeFuZhangFeiBossSysCache.getInheroMap();
		    
			if (heFuZhangFeiBossCahce.getBossType()!=HeFuZhangFeiBossConst.BOSS_TYPE1) {
				LogTool.info("!=HeFuZhangFeiBossConst.STATE1", HeFuZhangFeiBossManager.class);
				HeFuZhangFeiBossSender.sendCmd_9646(hero.getId(), 2, 0);
				return;
			}
			if (inheroMap.containsKey(hero.getId())) {
				HeFuZhangFeiBossSender.sendCmd_9646(hero.getId(), 5,0);
				return;
			}
			 
	        List<QMBossDamgRankModel> rankList = HeFuZhangFeiBossSysCache.getRankList();
			QMBossDamgRankModel model = new QMBossDamgRankModel();
			
			model.setHid(hero.getId());
			if(!rankList.contains(model)){
				model.setName(hero.getNameZoneid());
				rankList.add(model);
			}else {
				model = rankList.get(rankList.indexOf(model));
				int outTime=model.getOutTime();
				if (TimeDateUtil.getCurrentTime()-outTime<HeFuZhangFeiBossConst.CHENGFATIME&&TimeDateUtil.getCurrentTime()-outTime>0) {
					HeFuZhangFeiBossSender.sendCmd_9646(hero.getId(), 4, 0);
					return;
				}
				
			}
			if (inheroMap.containsKey(hero.getId())) {
				inheroMap.remove(hero.getId());
			}
			FinalFightAttr fightAttr = BattleFunction.initHero(hero);
			model.setAttrmap(fightAttr);
			model.fullHp();
			model.setInTime(TimeDateUtil.getCurrentTime());
			model.setLiveTime(TimeDateUtil.getCurrentTime());
			model.setBossHurtInfoMap(new HashMap<>());
			//boss对我伤害 以及 我的存活时间
			
			Struct_hfkhzfzj_286 boss_286 = Config_hfkhzfzj_286.getIns().get(heFuZhangFeiBossCahce.getBossid());
			int bossindex=boss_286.getId();
			int bossId=boss_286.getBoss();
			double ap=boss_286.getAp();
			int p=boss_286.getP();
			double x=(ap/100l);
			long hurt = (long) (fightAttr.getHpMax()*x+p);
			
			FinalFightAttr target = BattleFunction.initNPC(bossId);
			long damg =(long) Math.max(BattleFunction.calcDamg(fightAttr, target),1);
			BossHurtInfo bossHurtInfo=new BossHurtInfo();
			bossHurtInfo.setBossId(heFuZhangFeiBossCahce.getBossid());
			bossHurtInfo.setOnehurtAB(damg);
			bossHurtInfo.setOnehurtBA(hurt);
			bossHurtInfo.setLimtLiveTime(boss_286.getTime());
			model.getBossHurtInfoMap().put(bossindex, bossHurtInfo);
			
			
			int i =0;
			inheroMap.put(hero.getId(), hero);
			
			HeFuZhangFeiBossSender.sendCmd_9646(hero.getId(), 0,model.getAotufuhuo());
			
		   
			List<Object[]> hurtList = new ArrayList<Object[]>();
			Object[] hurtArr = null;
			int num=0;
			int size=rankList.size();
			for (int j = 0; j < size; j++) {
				QMBossDamgRankModel Damgmodel = rankList.get(j);
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
			for(Hero h:inheroMap.values()){
				if(i++>5) break;
				if (h.getId()!=hero.getId()) {
					HeroFunction.getIns().sendBattleHeroAttr(h, hero.getId());
					HeroFunction.getIns().sendBattleHeroAttr(hero, h.getId());
				}
			}
			HeFuZhangFeiBossSender.sendCmd_9652(model.getHid(), model.getCurhp(), model.getHurt(), heFuZhangFeiBossCahce.getHpmax(), heFuZhangFeiBossCahce.getCurhp(), hurtArr);
			return;
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossManager.class, "join has wrong");
		}
		
	}

	public void quit(Hero hero) {
		try {
			HeFuZhangFeiBossFunction.getIns().quit(hero);
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossManager.class, "quit has wrong");
		}
		
	}
	/**
	 *  CG 通知后端 我本人死亡了 
	 * @param hero
	 */
	public void cgherodie(Hero hero) {
			try {
				if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
					return;
				}
				HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
				ConcurrentHashMap<Long, Hero> inheroMap = HeFuZhangFeiBossSysCache.getInheroMap();
				ConcurrentHashMap<Long, Integer> diehero = HeFuZhangFeiBossSysCache.getDiehero();
				List<QMBossDamgRankModel> rankList = HeFuZhangFeiBossSysCache.getRankList();
				if (heFuZhangFeiBossCahce.getBossType()!=HeFuZhangFeiBossConst.BOSS_TYPE1) {
					LogTool.info("!=HeFuZhangFeiBossConst.STATE1", HeFuZhangFeiBossManager.class);
					return;
				}
				
				int fuhuoCost=Config_xtcs_004.getIns().get(HeFuZhangFeiBossConst.FUHUO_YB).getNum();
				
				if (!inheroMap.containsKey(hero.getId())) {
					LogTool.warn("cgherodie ! containsKey(hero.getId()) hid"+hero.getId(), HeFuZhangFeiBossManager.class);
					return;
				}
				
				if (diehero.containsKey(hero.getId())) {
					LogTool.warn("cgherodie getDiehero containsKey(hero.getId()) hid"+hero.getId(), HeFuZhangFeiBossManager.class);
					return;
				}
				List<Object[]> nowdieing=new ArrayList<>();
				int size=rankList.size();
				for (int i = 0; i < size; i++) {
					QMBossDamgRankModel model = rankList.get(i);
					if (model!=null&&model.getHid()==hero.getId()) {
						if (model.getAotufuhuo()==0) {
							FinalFightAttr attr =  model.getAttrmap();
							attr.setHp(0);
							diehero.put(model.getHid(), TimeDateUtil.getCurrentTime());
							nowdieing.add(new Object[]{hero.getId()});
							break;
						}else {
							//是否设置了自动复活
							if (UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
								UseAddUtil.use(hero, GameConst.YUANBAO,  fuhuoCost, SourceGoodConst.MONSTER_GOD_BUYLIVE, true);
								model.fullHp();
								model.setLiveTime(TimeDateUtil.getCurrentTime());
								HeFuZhangFeiBossSender.sendCmd_9656(hero.getId(), 0);
								size=rankList.size();
								for (int a = 0; a < size; a++) {
									QMBossDamgRankModel othermodel = rankList.get(a);
									if (othermodel!=null) {
										Hero modelhero = HeroCache.getHero(othermodel.getHid());
										if(modelhero!=null && modelhero.isOnline() && inheroMap.containsKey(modelhero.getId())){
											HeFuZhangFeiBossSender.sendCmd_9650(modelhero.getId(), new Object[]{new Object[]{hero.getId()}}, 0);
										}
									}
								}
								//HeFuZhangFeiBossSender.sendCmd_9658(hero.getId(), 0);
								return;
							}else {
								HeFuZhangFeiBossSender.sendCmd_9656(hero.getId(), 1);
								FinalFightAttr attr =  model.getAttrmap();
								attr.setHp(0);
								diehero.put(model.getHid(), TimeDateUtil.getCurrentTime());
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
						if(modelhero!=null && modelhero.isOnline() && inheroMap.containsKey(modelhero.getId())){
							if (!nowdieing.isEmpty()&&nowdieing.size()>0) {
								HeFuZhangFeiBossSender.sendCmd_9650(modelhero.getId(), nowdieing.toArray(), 1);
							}
						}
					}
				}
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossManager.class, "cgherodie has wrong");
		}
		
	}

	public void buyLive(Hero hero, int type) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
				return;
			}
			HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
			ConcurrentHashMap<Long, Hero> inheroMap = HeFuZhangFeiBossSysCache.getInheroMap();
			ConcurrentHashMap<Long, Integer> diehero = HeFuZhangFeiBossSysCache.getDiehero();
			List<QMBossDamgRankModel> rankList = HeFuZhangFeiBossSysCache.getRankList();
			
			if (heFuZhangFeiBossCahce.getBossType()!=HeFuZhangFeiBossConst.BOSS_TYPE1) {
				LogTool.info("!=HeFuZhangFeiBossConst.STATE1", HeFuZhangFeiBossManager.class);
				return;
			}
			
			int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
			int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
			
			if (diehero.containsKey(hero.getId())) {
				if (type==0) {
					if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
						HeFuZhangFeiBossSender.sendCmd_9656(hero.getId(), 1);
						return;
					}
					UseAddUtil.use(hero, GameConst.YUANBAO,  fuhuoCost, SourceGoodConst.HEFU_ZHANGFEI_BUYLIVE, true);
					diehero.remove(hero.getId());
					QMBossDamgRankModel model = new QMBossDamgRankModel();
					model.setHid(hero.getId());
					model = rankList.get(rankList.indexOf(model));
					model.fullHp();
					model.setLiveTime(TimeDateUtil.getCurrentTime());
					HeFuZhangFeiBossSender.sendCmd_9656(hero.getId(), 0);
					int size=rankList.size();
					for (int i = 0; i < size; i++) {
						QMBossDamgRankModel othermodel = rankList.get(i);
						if (othermodel!=null) {
							Hero modelhero = HeroCache.getHero(othermodel.getHid());
							if(modelhero!=null && modelhero.isOnline() && inheroMap.containsKey(modelhero.getId())){
								HeFuZhangFeiBossSender.sendCmd_9650(modelhero.getId(), new Object[]{new Object[]{hero.getId()}}, 0);
							}
						}
					}
					return;
				}else if (type==1) {
					//已经死有段时间了
					if (TimeDateUtil.getCurrentTime()-diehero.get(hero.getId())>=fuhuoCD) {
						diehero.remove(hero.getId());
						//可以复活
						QMBossDamgRankModel model = new QMBossDamgRankModel();
						model.setHid(hero.getId());
						model = rankList.get(rankList.indexOf(model));
						model.fullHp();
						model.setLiveTime(TimeDateUtil.getCurrentTime());
						HeFuZhangFeiBossSender.sendCmd_9656(hero.getId(), 0);
						int size=rankList.size();
						for (int i = 0; i < size; i++) {
							QMBossDamgRankModel othermodel = rankList.get(i);
							if (othermodel!=null) {
								Hero modelhero = HeroCache.getHero(othermodel.getHid());
								if(modelhero!=null && modelhero.isOnline() && inheroMap.containsKey(modelhero.getId())){
									HeFuZhangFeiBossSender.sendCmd_9650(modelhero.getId(), new Object[]{new Object[]{hero.getId()}}, 0);
								}
							}
						}
						return;
					}
					
				}
				
			}
			HeFuZhangFeiBossSender.sendCmd_9656(hero.getId(), 0);
			return;
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossManager.class, "buyLive has wrong");
		}
		
		
		
		
	}

	public void isaotufuhuo(Hero hero, int state) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
				return;
			}
			HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
			ConcurrentHashMap<Long, Hero> inheroMap = HeFuZhangFeiBossSysCache.getInheroMap();
			ConcurrentHashMap<Long, Integer> diehero = HeFuZhangFeiBossSysCache.getDiehero();
			List<QMBossDamgRankModel> rankList = HeFuZhangFeiBossSysCache.getRankList();
			
			if (heFuZhangFeiBossCahce.getBossType()!=HeFuZhangFeiBossConst.BOSS_TYPE1) {
				LogTool.info("!=HeFuZhangFeiBossConst.STATE1", HeFuZhangFeiBossManager.class);
				return;
			}
			
			if (state!=0&&state!=1) {
				return;
			}
		
			if (!inheroMap.containsKey(hero.getId())) {
				return;
			}
			QMBossDamgRankModel model = new QMBossDamgRankModel();
			model.setHid(hero.getId());
			if(!rankList.contains(model)){
				return;
			}else {
				model = rankList.get(rankList.indexOf(model));
				model.setAotufuhuo(state);
				HeFuZhangFeiBossSender.sendCmd_9658(model.getHid(), state);
				if (state==1&&diehero.containsKey(hero.getId())) {
					buyLive(hero, 0);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossManager.class, "isaotufuhuo has wrong");
		}
		
	}
	/**
	 * 敬酒
	 * @param hero
	 * @param type
	 */
	public void addjiu(Hero hero, int type) {
		try {
			
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
				return;
			}
			HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
			
			HeFuZhangFeiBoss heFuZhangFeiBoss = (HeFuZhangFeiBoss) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_ZHANGFEIBOSS);
			
			if (heFuZhangFeiBossCahce.getBossType()!=HeFuZhangFeiBossConst.BOSS_TYPE1) {
				//不在开启中
				Struct_hfkhzfzjjiu_286 struct_hfkhzfzjjiu_286 = Config_hfkhzfzjjiu_286.getIns().get(type);
				Integer buyNum = heFuZhangFeiBoss.getBuyNumMap().get(struct_hfkhzfzjjiu_286.getId());
				if (struct_hfkhzfzjjiu_286!=null) {
					if (UseAddUtil.canUse(hero, struct_hfkhzfzjjiu_286.getConmuse1())) {
						UseAddUtil.use(hero, struct_hfkhzfzjjiu_286.getConmuse1(), SourceGoodConst.HEFU_ZHANGFEI_ADDJIU, true, null);
						int zui=heFuZhangFeiBoss.getZuiyiNum()+struct_hfkhzfzjjiu_286.getZui();
						heFuZhangFeiBoss.setZuiyiNum(zui);
						HeFuZhangFeiBossFunction.getIns().addZuiYI(hero, heFuZhangFeiBoss, struct_hfkhzfzjjiu_286.getZui(),type);
						UseAddUtil.add(hero, struct_hfkhzfzjjiu_286.getReward(), SourceGoodConst.HEFU_ZHANGFEI_ADDJIU, UseAddUtil.getDefaultMail(), true);
						HeFuZhangFeiBossSender.sendCmd_9642(hero.getId(), 0, type, heFuZhangFeiBossCahce.getZuiyiNum(), heFuZhangFeiBossCahce.getBossType(),buyNum);
						return;
					}else if(UseAddUtil.canUse(hero, struct_hfkhzfzjjiu_286.getConmuse())){
						if (buyNum<struct_hfkhzfzjjiu_286.getTime()) {
							UseAddUtil.use(hero, struct_hfkhzfzjjiu_286.getConmuse(), SourceGoodConst.HEFU_ZHANGFEI_ADDJIU, true, null);
							int zui=heFuZhangFeiBoss.getZuiyiNum()+struct_hfkhzfzjjiu_286.getZui();
							heFuZhangFeiBoss.setZuiyiNum(zui);
							HeFuZhangFeiBossFunction.getIns().addZuiYI(hero, heFuZhangFeiBoss, struct_hfkhzfzjjiu_286.getZui(),type);
							heFuZhangFeiBoss.getBuyNumMap().put(struct_hfkhzfzjjiu_286.getId(), buyNum+1);
							UseAddUtil.add(hero, struct_hfkhzfzjjiu_286.getReward(), SourceGoodConst.HEFU_ZHANGFEI_ADDJIU, UseAddUtil.getDefaultMail(), true);
							HeFuZhangFeiBossSender.sendCmd_9642(hero.getId(), 0, type, heFuZhangFeiBossCahce.getZuiyiNum(), heFuZhangFeiBossCahce.getBossType(),buyNum+1);
							return;
						}
						
					}else {
						HeFuZhangFeiBossSender.sendCmd_9642(hero.getId(), 1, type, heFuZhangFeiBossCahce.getZuiyiNum(), heFuZhangFeiBossCahce.getBossType(),buyNum);
						return;
					}
					
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossManager.class, "addjiu");
			
		}
		
	}
	/**
	 * 打开醉意排行榜
	 * @param hero
	 */
	public void openRank(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
				return;
			}
			HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
			
			HeFuZhangFeiBoss heFuZhangFeiBoss = (HeFuZhangFeiBoss) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_ZHANGFEIBOSS);
			
			Object[] rankinfos=new Object[heFuZhangFeiBossCahce.getJoiners().size()];
			int myRank=0;
			int myWine=heFuZhangFeiBoss.getZuiyiNum();
			for (int i = 0; i < rankinfos.length; i++) {
				HeFuZhangFeiJoiner heFuZhangFeiJoiner = heFuZhangFeiBossCahce.getJoiners().get(i);
				long hid = heFuZhangFeiJoiner.getHid();
				if (hid==hero.getId()) {
					myRank=i+1;
					rankinfos[i]=new Object[] {i+1,heFuZhangFeiJoiner.getHid(),hero.getNameZoneid(),heFuZhangFeiJoiner.getZuiyiNum()};
				}else {
					Hero ranker=HeroCache.getHero(heFuZhangFeiJoiner.getHid(), HeroConst.FIND_TYPE_BASIC);
					rankinfos[i]=new Object[] {i+1,heFuZhangFeiJoiner.getHid(),ranker.getNameZoneid(),heFuZhangFeiJoiner.getZuiyiNum()};
				}
			}
			HeFuZhangFeiBossSender.sendCmd_9664(hero.getId(), rankinfos, myRank, myWine);
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossManager.class, "openRank");
		}
		
	}
	/**
	 * 
	 * @param hero
	 * @param index
	 */
	public void getBossReward(Hero hero, int index) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
				return;
			}
	        HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
			
			HeFuZhangFeiBoss heFuZhangFeiBoss = (HeFuZhangFeiBoss) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_ZHANGFEIBOSS);
			Struct_hfkhzfzj_286 struct_hfkhzfzj_286 = Config_hfkhzfzj_286.getIns().get(index);
			if (struct_hfkhzfzj_286==null) {
				
				LogTool.warn("getBossReward has wrong", HeFuZhangFeiBossManager.class);
				return;
			}
			
			int bossid = heFuZhangFeiBossCahce.getBossid();
			
			int state=GameConst.REWARD_0;
			if (heFuZhangFeiBoss.getReward().contains(index)) {
				state=GameConst.REWARD_2;
			}else {
				if (bossid>index) {
					state=GameConst.REWARD_1;
				}else if(bossid==index&&heFuZhangFeiBossCahce.getBossType()==HeFuZhangFeiBossConst.BOSS_TYPE2) {
					state=GameConst.REWARD_1;
				}
			}
			if (state==GameConst.REWARD_1) {
				state=GameConst.REWARD_2;
				heFuZhangFeiBoss.getReward().add(index);
				UseAddUtil.add(hero, struct_hfkhzfzj_286.getReward(),SourceGoodConst.HEFU_RECHARGE_GIFT, UseAddUtil.getDefaultMail(), true);
				HeFuZhangFeiBossSender.sendCmd_9666(hero.getId(), index, state);
				return;
			}
			HeFuZhangFeiBossSender.sendCmd_9666(hero.getId(), index, state);
			return;
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossManager.class, "getBossReward");
		}
		
	}

}
