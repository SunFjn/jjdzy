package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.qmboss.QMBossDamgComparator;
import com.teamtop.system.boss.qmboss.QMBossDamgRankModel;
import com.teamtop.system.crossBoss.CrossBossConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hfkhzfzj_286;
import excel.config.Config_hfkhzfzjrank_286;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_hfkhzfzj_286;
import excel.struct.Struct_hfkhzfzjrank_286;



public class HeFuZhangFeiBossFunction {
	
	private static HeFuZhangFeiBossFunction ins;

	private HeFuZhangFeiBossFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeFuZhangFeiBossFunction getIns() {
		if (ins == null) {
			ins = new HeFuZhangFeiBossFunction();
		}
		return ins;
	}
	
	public void openAct() {
		HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
		heFuZhangFeiBossCahce.setBossType(HeFuZhangFeiBossConst.BOSS_TYPE0);
		heFuZhangFeiBossCahce.setBossid(0);
		heFuZhangFeiBossCahce.setZuiyiNum(0);
		heFuZhangFeiBossCahce.setJoiners(new ArrayList<HeFuZhangFeiJoiner>());
		
	}
	
	public void addZuiYI(Hero hero,HeFuZhangFeiBoss heFuZhangFeiBoss,int addnum,int type) {
		HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
		
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
			
				int oldNum=heFuZhangFeiBossCahce.getZuiyiNum();
				int nowNum=oldNum+addnum;
				heFuZhangFeiBossCahce.setZuiyiNum(nowNum);
				List<HeFuZhangFeiJoiner> joiners = heFuZhangFeiBossCahce.getJoiners();
				HeFuZhangFeiJoiner heFuZhangFeiJoiner=new HeFuZhangFeiJoiner();
				heFuZhangFeiJoiner.setHid(hero.getId());
				heFuZhangFeiJoiner.setZuiyiNum(heFuZhangFeiBoss.getZuiyiNum());
				heFuZhangFeiJoiner.setTime(TimeDateUtil.getCurrentTime());
				int indexOf = joiners.indexOf(heFuZhangFeiJoiner);
				if(indexOf<0){
					//不存在
					joiners.add(heFuZhangFeiJoiner);
				}else{
					//存在
					HeFuZhangFeiJoiner heFuZhangFeiJoiner2 = joiners.get(indexOf);
					heFuZhangFeiJoiner2.setHid(hero.getId());
					heFuZhangFeiJoiner2.setZuiyiNum(heFuZhangFeiBoss.getZuiyiNum());
					heFuZhangFeiJoiner2.setTime(TimeDateUtil.getCurrentTime());
				}
				//排序 保留10名
				Collections.sort(joiners, new HeFuZFeiJoinerComparator());
				
				if (joiners.size()>HeFuZhangFeiBossConst.RANK_SIZE) {
					int i = 1;
					Iterator<HeFuZhangFeiJoiner> iterator = joiners.iterator();
					while(iterator.hasNext()){
						HeFuZhangFeiJoiner model = iterator.next();
						if(i > HeFuZhangFeiBossConst.RANK_SIZE){
							iterator.remove();
						}else {
							model.setRank(i);
						}
						i++;
					}
				}
				
				boolean isChangeSate=false;
				for (Struct_hfkhzfzj_286 hfkhzfzj_286: Config_hfkhzfzj_286.getIns().getSortList()) {
					if (oldNum<hfkhzfzj_286.getZui()&&nowNum>=hfkhzfzj_286.getZui()) {
						int bossType = heFuZhangFeiBossCahce.getBossType();
						if (bossType==HeFuZhangFeiBossConst.BOSS_TYPE0||bossType==HeFuZhangFeiBossConst.BOSS_TYPE2) {
							start(hfkhzfzj_286.getId());
							heFuZhangFeiBossCahce.setBossType(HeFuZhangFeiBossConst.BOSS_TYPE1);
							
							isChangeSate=true;
							HeFuZhangFeiBossSysCache.getDiehero().clear();
							HeFuZhangFeiBossSysCache.getInheroMap().clear();
							HeFuZhangFeiBossSysCache.getRankList().clear();
							break;
						}
					}
				}
				if (isChangeSate) {
					for (Hero hero1:HeroCache.getHeroMap().values()) {
						if (hero1.isOnline()) {
							HeFuZhangFeiBossSender.sendCmd_9644(hero1.getId(), heFuZhangFeiBossCahce.getBossid(), heFuZhangFeiBossCahce.getBossType(), heFuZhangFeiBossCahce.getZuiyiNum(), heFuZhangFeiBossCahce.getCurhp(), heFuZhangFeiBossCahce.getHpmax());
						}
					}
				}
				
			}
			@Override
			public Object getSession() {
				return OpTaskConst.HEFU_ADDJIU;
			}
		});
		
		
		
	}
	
	public void bossDie() {
		HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
		heFuZhangFeiBossCahce.setBossType(HeFuZhangFeiBossConst.BOSS_TYPE2);
		for (Hero hero:HeroCache.getHeroMap().values()) {
			if (hero.isOnline()) {
				HeFuZhangFeiBossSender.sendCmd_9644(hero.getId(), heFuZhangFeiBossCahce.getBossid(), heFuZhangFeiBossCahce.getBossType(), heFuZhangFeiBossCahce.getZuiyiNum(), heFuZhangFeiBossCahce.getCurhp(), heFuZhangFeiBossCahce.getHpmax());
			}
		}
		if (heFuZhangFeiBossCahce.getBossid()==Config_hfkhzfzj_286.getIns().getSortList().size()) {
			sendRankReward();
		}

	}
	
	
	/**
	 * 开启相应 boss
	 */
	public void start(int bossid) {
		HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
		Struct_hfkhzfzj_286 struct_hfkhzfzj_286 = Config_hfkhzfzj_286.getIns().get(bossid);
		FinalFightAttr battleFightAttr = BattleFunction.initNPC(struct_hfkhzfzj_286.getBoss());
		long hp = battleFightAttr.getHp();
		heFuZhangFeiBossCahce.setBossid(bossid);
		heFuZhangFeiBossCahce.setCurhp(hp);
		heFuZhangFeiBossCahce.setHpmax(hp);
	}
	
	/**
	 * 退出张飞来袭
	 * @param hero
	 */
	public void quit(Hero hero) {
		try {
			ConcurrentHashMap<Long, Hero> inheroMap = HeFuZhangFeiBossSysCache.getInheroMap();
			List<QMBossDamgRankModel> rankList = HeFuZhangFeiBossSysCache.getRankList();
			if (inheroMap.containsKey(hero.getId())) {
				QMBossDamgRankModel model = new QMBossDamgRankModel();
				model.setHid(hero.getId());
				if(rankList.contains(model)){
					model = rankList.get(rankList.indexOf(model));
					model.setOutTime(TimeDateUtil.getCurrentTime());
					model.setAotufuhuo(0);
					inheroMap.remove(hero.getId());
					//MonsterGodSender.sendCmd_1508(hero.getId(), 0);
					HeFuZhangFeiBossSender.sendCmd_9648(hero.getId(), 0);
				}
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossFunction.class, hero.getId(), hero.getName(), "quit has wrong");
		}
		
	}
	
	
	/**
	 * 计算攻击boss伤害
	 * @param hero
	 * @param qmboss
	 * @return
	 */
	public boolean attBoss(QMBossDamgRankModel model,Hero hero){
		HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
		long damg =model.getBossHurtInfoMap().get(heFuZhangFeiBossCahce.getBossid()).getOnehurtAB();
		
		long curhp = heFuZhangFeiBossCahce.getCurhp();
		if (damg>curhp) {
			damg=curhp;
		}
		curhp = curhp - damg;
		heFuZhangFeiBossCahce.setCurhp(curhp);
		
		boolean die = false;
		if(curhp<=0){
			heFuZhangFeiBossCahce.setSkillid(hero.getId());
			die = true;
		}
		if(damg>0){
			sortBossHurt(hero, damg);
		}
		return die;
	}
	
	
	public void sortBossHurt(Hero hero,double hurt){
		QMBossDamgRankModel QMBossDamgRankModel = new QMBossDamgRankModel();
		QMBossDamgRankModel.setHid(hero.getId());
		List<QMBossDamgRankModel> rankList = HeFuZhangFeiBossSysCache.getRankList();
		int indexOf = rankList.indexOf(QMBossDamgRankModel);
		if(indexOf<0){
			QMBossDamgRankModel.setName(hero.getNameZoneid());
			QMBossDamgRankModel.setHurt((long)hurt);
			rankList.add(QMBossDamgRankModel);
		}else{
			QMBossDamgRankModel = rankList.get(indexOf);
			QMBossDamgRankModel.setName(hero.getNameZoneid());
			QMBossDamgRankModel.setHurt(QMBossDamgRankModel.getHurt()+(long)hurt);
			QMBossDamgRankModel.setHid(hero.getId());
		}
	}
	
	
	
	public void scheduleMonster(boolean senddata) {
		try {
			int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
			int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
			int now=TimeDateUtil.getCurrentTime();
			HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
			if (heFuZhangFeiBossCahce.getBossType()==HeFuZhangFeiBossConst.BOSS_TYPE1) {
				boolean bossDead = false;
				List<QMBossDamgRankModel> rankList = HeFuZhangFeiBossSysCache.getRankList();
				Map<Long, Hero> inheroMap = HeFuZhangFeiBossSysCache.getInheroMap();
				Map<Long, Integer> dieHero=HeFuZhangFeiBossSysCache.getDiehero();
				List<Object[]> hurtList = null;
				List<Object[]> nowdieing=new ArrayList<>();
				List<Object[]> nowLiveing=new ArrayList<>();
				int num=0;
				if(rankList.size()>0){
					hurtList = new ArrayList<Object[]>();
					for (int i = 0; i < rankList.size(); i++) {
						QMBossDamgRankModel model=rankList.get(i);
						if(!bossDead&&heFuZhangFeiBossCahce.getCurhp()>0){
							//boss攻击的对象
							if(now - model.getInTime()>=1){
								Hero hero = HeroCache.getHero(model.getHid());
								if(hero!=null && hero.isOnline() && inheroMap.containsKey(hero.getId())&&!dieHero.containsKey(model.getHid())){
									FinalFightAttr attr =  model.getAttrmap();
									long oneCurHp = attr.getHp();
									int limitime=model.getBossHurtInfoMap().get(heFuZhangFeiBossCahce.getBossid()).getLimtLiveTime();
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
										boolean die = attBoss(model,hero);
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
					long hpmax = heFuZhangFeiBossCahce.getHpmax();
					long curhp = heFuZhangFeiBossCahce.getCurhp();
					Object[] hurtArr = null;
					if(hurtList!=null && hurtList.size()>0){
						hurtArr = hurtList.toArray();
					}
					//有boss被击杀
					Struct_hfkhzfzj_286 struct_hfkhzfzj_286 = Config_hfkhzfzj_286.getIns().get(heFuZhangFeiBossCahce.getBossid());
					int bossId=struct_hfkhzfzj_286.getBoss();
					if (bossDead) {
						//最后一击 击杀奖励
						long skillerId = heFuZhangFeiBossCahce.getSkillid();
						MailFunction.getIns().sendMailWithFujianData2(skillerId, MailConst.HEFU_ZHANGFEI_SKILL, new Object[]{MailConst.HEFU_ZHANGFEI_SKILL,bossId}, struct_hfkhzfzj_286.getReward2());
						
						//Hero skillHero=HeroCache.getHero(skillerId);
						//boss广播
						//ChatManager.getIns().broadCast(ChatConst.,new Object[] {skillHero.getName()}); // 全服广播
						
						
					}
					for (int i = 0; i < rankList.size(); i++) {
						QMBossDamgRankModel bossAttModel=rankList.get(i);
						Hero h = HeroCache.getHero(bossAttModel.getHid());
						if(h!=null && h.isOnline() && inheroMap.containsKey(h.getId())){
							if (bossDead) {
								//参与奖励
								if (UseAddUtil.canAdd(h, struct_hfkhzfzj_286.getReward1(), false)) {
									UseAddUtil.add(h, struct_hfkhzfzj_286.getReward1(), SourceGoodConst.HEFU_ZHANGFEI_REWARD, null, true);
									HeFuZhangFeiBossSender.sendCmd_9662(h.getId());
								}
							}
							
							HeFuZhangFeiBossSender.sendCmd_9652(bossAttModel.getHid(), bossAttModel.getCurhp(), bossAttModel.getHurt(), hpmax, curhp, hurtArr);
							if (dieHero.containsKey(bossAttModel.getHid())) {
								//已经死有段时间了
								if (TimeDateUtil.getCurrentTime()-dieHero.get(bossAttModel.getHid())>fuhuoCD) {
									//可以复活
									bossAttModel.fullHp();
									bossAttModel.setLiveTime(TimeDateUtil.getCurrentTime());
									dieHero.remove(bossAttModel.getHid());
									nowLiveing.add(new Object[]{bossAttModel.getHid()});
									HeFuZhangFeiBossSender.sendCmd_9656(h.getId(), 0);
								}
							}
							if (!nowdieing.isEmpty()&&nowdieing.size()>0) {
								HeFuZhangFeiBossSender.sendCmd_9650(h.getId(), nowdieing.toArray(), 1);
							}
							if (!nowLiveing.isEmpty()) {
								HeFuZhangFeiBossSender.sendCmd_9650(h.getId(), nowdieing.toArray(), 1);
							}
							
						}
					}
				}
				if (bossDead) {
					bossDie();
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossFunction.class, "scheduleMonster has wrong");
		}
	}
	/**
	 * 排名奖励邮件
	 */
	public void sendRankReward() {
		try {
			HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
			List<HeFuZhangFeiJoiner> joiners = heFuZhangFeiBossCahce.getJoiners();
			Collections.sort(joiners, new HeFuZFeiJoinerComparator());
			for (int i = 0; i < joiners.size(); i++) {
				HeFuZhangFeiJoiner heFuZhangFeiJoiner = joiners.get(i);
				for (Struct_hfkhzfzjrank_286 hfkhzfzjrank_286:Config_hfkhzfzjrank_286.getIns().getSortList()) {
					int rank = i+1;
					if (rank>=hfkhzfzjrank_286.getRank()[0][0]&&rank<=hfkhzfzjrank_286.getRank()[0][1]) {
						MailFunction.getIns().sendMailWithFujianData2(heFuZhangFeiJoiner.getHid(), MailConst.HEFU_ZHANGFEI_JIURANK, new Object[]{MailConst.HEFU_ZHANGFEI_JIURANK,rank}, hfkhzfzjrank_286.getReward());
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeFuZhangFeiBossFunction.class, "addRankReward has wrong");
		}
	}

}
