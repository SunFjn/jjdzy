package com.teamtop.system.activity.ativitys.caoCaoCome;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.qmboss.QMBossDamgComparator;
import com.teamtop.system.boss.qmboss.QMBossDamgRankModel;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossBoss.CrossBossConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_cclx_754;
import excel.config.Config_cclxpm_754;
import excel.config.Config_lbmh_307;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_cclx_754;
import excel.struct.Struct_cclxpm_754;
import excel.struct.Struct_lbmh_307;
import excel.struct.Struct_xtcs_004;



public class CaoCaoComeFunction {
	
	private static CaoCaoComeFunction ins = null;

	public static synchronized CaoCaoComeFunction getIns() {
		if (ins == null) {
			ins = new CaoCaoComeFunction();
		}
		return ins;
	}
	/**
	 * boss开启
	 */
	public void start() {
		CaoCaoComeCache caoCaoComeCache=CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
		
		if (caoCaoComeCache==null) {
			LogTool.warn("monsterGodCache==null",CaoCaoComeFunction.class);
			return;
		}
		//boss入口开启
		//设置bossid 战斗属性
		int nowTime=TimeDateUtil.getCurrentTime();
		int openTime = caoCaoComeCache.getOpenTime();
		if (nowTime<=openTime) {
			LogTool.warn("nowTime<=openTime "+nowTime,CaoCaoComeFunction.class);
			return;
		}
		int chaTime=nowTime-openTime;
		if (chaTime<=30) {
			LogTool.warn("chaTime<=30 "+nowTime,CaoCaoComeFunction.class);
			return;
		}
		caoCaoComeCache.setOpenTime(nowTime);
		caoCaoComeCache.setState(CaoCaoComeConst.STATE1);
		createBoss(caoCaoComeCache);
		//开启定时器
		//ScheduleUtil.addTask(ScheduleConst.MonsterGodCache, new MonsterGodSchedule(0, 1000, false));
		ChatManager.getIns().broadCast(ChatConst.CAOCAO_COME,new Object[] {}); // 全服广播
	}
	/**
	 * boss结束
	 */
	public void end() {
		//ScheduleUtil.cancelTask(ScheduleConst.MonsterGodCache);
		CaoCaoComeCache caoCaoComeCache=CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
		if (caoCaoComeCache==null) {
			LogTool.warn("monsterGodCache==null", CaoCaoComeFunction.class);
			return;
		}
		//活动关闭
		if (caoCaoComeCache.getState()!=CaoCaoComeConst.STATE0) {
			//boss没有被杀死
			overRankReward(caoCaoComeCache);
			//boss 没被打死
			CaoCaoComeHis caoCaoComeHis=CaoCaoComeSysCache.getIns().getCaoCaoComeHis();
			int xhp = caoCaoComeHis.getXhp();
			int maxNum = Config_xtcs_004.getIns().get(CaoCaoComeConst.ADD_MAX).getNum()/100;
			int minNum = 0;
			
			int addHp=Config_xtcs_004.getIns().get(CaoCaoComeConst.MUINE_MAX).getNum()/100;
			if (addHp>0&&xhp<maxNum) {
				xhp=xhp+addHp;
				if (xhp>maxNum) {
					xhp=maxNum;
				}
				caoCaoComeHis.setXhp(xhp);
			}else if(addHp<0&&xhp>minNum){
				xhp=xhp+addHp;
				if (xhp<minNum) {
					xhp=minNum;
				}
				caoCaoComeHis.setXhp(xhp);
			}
			//boss广播
			ChatManager.getIns().broadCast(ChatConst.CAOCAO_COME_END,new Object[] {}); // 全服广播
		}
		caoCaoComeCache.setState(CaoCaoComeConst.STATE0);
	}
	
	
	

	/**
	 * 计算攻击boss伤害
	 * @param hero
	 * @param qmboss
	 * @return
	 */
	public boolean attBoss(QMBossDamgRankModel model,Hero hero,CaoCaoComeCache caoCaoComeCache){
		long damg =model.getBossHurtInfoMap().get(caoCaoComeCache.getCaoCaoBoss().getBossId()).getOnehurtAB();
		int addProNum = addProNum();
		if (addProNum>0) {
			double pro=addProNum/100.00;
			damg=(long) (damg+pro*damg);
		}
		
		long curhp = caoCaoComeCache.getCaoCaoBoss().getCurhp();
		if (damg>curhp) {
			damg=curhp;
		}
		curhp = curhp - damg;
		caoCaoComeCache.getCaoCaoBoss().setCurhp(curhp);
		boolean die = false;
		if(curhp<=0){
			caoCaoComeCache.setSkillerId(hero.getId());
			int useTime=TimeDateUtil.getCurrentTime()-caoCaoComeCache.getOpenTime();
			if (useTime<0) {
				useTime=0;
			}
			caoCaoComeCache.setBossDieTime(useTime);
			caoCaoComeCache.getCaoCaoBoss().setCurhp(0);
			die = true;
		}
		if(damg>0){
			sortBossHurt(hero, damg, caoCaoComeCache);
		}
		return die;
	}
	
	public void sortBossHurt(Hero hero,double hurt,CaoCaoComeCache caoCaoComeCache){
		QMBossDamgRankModel QMBossDamgRankModel = new QMBossDamgRankModel();
		QMBossDamgRankModel.setHid(hero.getId());
		List<QMBossDamgRankModel> rankList = caoCaoComeCache.getRankList();
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


	public void createBoss(CaoCaoComeCache caoCaoComeCache) {
		if (CaoCaoComeSysCache.getIns().getCaoCaoComeHis()==null) {
			CaoCaoComeSysCache.getIns().setCaoCaoComeHis(new CaoCaoComeHis());
		}
		int num=CaoCaoComeSysCache.getIns().getCaoCaoComeHis().getXhp();
		CaoCaoBoss caoCaoBoss =new CaoCaoBoss();
		
		Struct_cclx_754 struct_cclx_754 = Config_cclx_754.getIns().get(1);
		int bossid = struct_cclx_754.getBoss()[0][1];
		caoCaoBoss.setBossId(bossid);
		
		FinalFightAttr battleFightAttr = BattleFunction.initNPC(bossid);
		long hp = battleFightAttr.getHp();
		if (num>0) {
			hp=hp+num*hp;
		}
		caoCaoBoss.setHpmax(hp);
		caoCaoBoss.setCurhp(hp);
		caoCaoBoss.setAttr(battleFightAttr);
		caoCaoComeCache.setCaoCaoBoss(caoCaoBoss);
		caoCaoComeCache.setOpenTime(TimeDateUtil.getCurrentTime());
		broadState(caoCaoComeCache);
		LogTool.info("createBoss:"+bossid, CaoCaoComeFunction.class);
	}
	
	
	/**
	 * 结束 发排名奖励
	 * @param monsterGodCache
	 */
	public void overRankReward(CaoCaoComeCache caoCaoComeCache) {
		CaoCaoComeHis caoCaoComeHis=CaoCaoComeSysCache.getIns().getCaoCaoComeHis();
		if (caoCaoComeHis.getRankHis()==null) {
			caoCaoComeHis.setRankHis(new HashMap<Integer, HurtBossRank>());
		}
		caoCaoComeHis.getRankHis().clear();
		int i=1;
		for(QMBossDamgRankModel model:caoCaoComeCache.getRankList()){
			for (int j = 1; j <=Config_cclxpm_754.getIns().size(); j++) {
				Struct_cclxpm_754 lvbuRank=Config_cclxpm_754.getIns().get(j);
				if (i>=lvbuRank.getMc()[0][0]&&i<=lvbuRank.getMc()[0][1]) {
					MailFunction.getIns().sendMailWithFujianData2(model.getHid(), MailConst.CAOCAOCOME_RANK_AWARD, new Object[]{MailConst.CAOCAOCOME_RANK_AWARD,i}, lvbuRank.getJl());
					caoCaoComeHis.getRankHis().put(i, new HurtBossRank(i,model.getHid(),model.getHurt()));
				}
			}
			i++;
			
		}
		CaoCaoComeSysCache.getIns().updateGloalData();
		caoCaoComeCache.getRankList().clear();
		caoCaoComeCache.getInheroMap().clear();
		caoCaoComeCache.getDiehero().clear();
		caoCaoComeCache.setState(CaoCaoComeConst.STATE0);
		broadState(caoCaoComeCache);
	}
	
	
	
	/**
	 * 退出曹操来袭
	 * @param hero
	 */
	public void quit(Hero hero) {
		try {
			CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
			if (caoCaoComeCache.getInheroMap().containsKey(hero.getId())) {
				QMBossDamgRankModel model = new QMBossDamgRankModel();
				model.setHid(hero.getId());
				if(caoCaoComeCache.getRankList().contains(model)){
					model = caoCaoComeCache.getRankList().get(caoCaoComeCache.getRankList().indexOf(model));
					model.setOutTime(TimeDateUtil.getCurrentTime());
					model.setAotufuhuo(0);
					caoCaoComeCache.getInheroMap().remove(hero.getId());
					//MonsterGodSender.sendCmd_1508(hero.getId(), 0);
					CaoCaoComeSender.sendCmd_8516(hero.getId(), 0);
				}
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, CaoCaoComeFunction.class, hero.getId(), hero.getName(), "quit has wrong");
		}
		
	}
	/**
	 * 提示玩家活动状态
	 */
	public void broadState(CaoCaoComeCache caoCaoComeCache) {
		CaoCaoBoss caoCaoBoss = caoCaoComeCache.getCaoCaoBoss();
		for (Hero hero:HeroCache.getHeroMap().values()) {
			if (hero.isOnline()) {
				if (caoCaoBoss!=null) {
					CaoCaoComeSender.sendCmd_8530(hero.getId(), (byte)caoCaoComeCache.getState());
					if (caoCaoComeCache.getState()==CaoCaoComeConst.STATE1) {
						GlobalSender.sendCmd_264(hero.getId(),ActivitySysId.CAOCAOCOME_SYSID, 0, 1);
					}else {
						GlobalSender.sendCmd_264(hero.getId(),ActivitySysId.CAOCAOCOME_SYSID, 0, 2);
					}
				}
			}
		}		
	}
	
	
	
	public void scheduleMonster(CaoCaoComeCache caoCaoComeCache,int now,boolean senddata) {
		try {
			int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
			int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
			if (caoCaoComeCache.getState()==CaoCaoComeConst.STATE1) {
				boolean bossDead = false;
				List<QMBossDamgRankModel> rankList = caoCaoComeCache.getRankList();
				Map<Long, Hero> inheroMap = caoCaoComeCache.getInheroMap();
				Map<Long, Integer> dieHero=caoCaoComeCache.getDiehero();
				List<Object[]> hurtList = null;
				List<Object[]> nowdieing=new ArrayList<>();
				List<Object[]> nowLiveing=new ArrayList<>();
				int num=0;
				if(rankList.size()>0){
					hurtList = new ArrayList<Object[]>();
					for (int i = 0; i < rankList.size(); i++) {
						QMBossDamgRankModel model=rankList.get(i);
						if(!bossDead&&caoCaoComeCache.getCaoCaoBoss().getCurhp()>0){
							//boss攻击的对象
							if(now - model.getInTime()>=1){
								Hero hero = HeroCache.getHero(model.getHid());
								if(hero!=null && hero.isOnline() && inheroMap.containsKey(hero.getId())&&!dieHero.containsKey(model.getHid())){
									FinalFightAttr attr =  model.getAttrmap();
									long oneCurHp = attr.getHp();
									int limitime=model.getBossHurtInfoMap().get(caoCaoComeCache.getCaoCaoBoss().getBossId()).getLimtLiveTime();
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
										boolean die = attBoss(model,hero,caoCaoComeCache);
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
					long hpmax = (long) caoCaoComeCache.getCaoCaoBoss().getHpmax();
					long curhp = (long) caoCaoComeCache.getCaoCaoBoss().getCurhp();
					Object[] hurtArr = null;
					if(hurtList!=null && hurtList.size()>0){
						hurtArr = hurtList.toArray();
					}
					//有boss被击杀
					Struct_cclx_754 lvboss= Config_cclx_754.getIns().get(1);
					int bossId=lvboss.getBoss()[0][1];
					if (bossDead) {
						//最后一击 击杀奖励
						MailFunction.getIns().sendMailWithFujianData2(caoCaoComeCache.getSkillerId(), MailConst.CAOCAOCOME_SKILL_AWARD, new Object[]{MailConst.CAOCAOCOME_SKILL_AWARD,bossId}, lvboss.getZhyj());
					}
					for (int i = 0; i < rankList.size(); i++) {
						QMBossDamgRankModel bossAttModel=rankList.get(i);
						Hero h = HeroCache.getHero(bossAttModel.getHid());
						if(h!=null && h.isOnline() && inheroMap.containsKey(h.getId())){
							if (bossDead) {
								//参与奖励
								if (UseAddUtil.canAdd(h, lvboss.getJlyl(), false)) {
									UseAddUtil.add(h, lvboss.getJlyl(), SourceGoodConst.CAOCAOCOME_REWARD, null, true);
									CaoCaoComeSender.sendCmd_8532(h.getId());
								}
							}
							
							CaoCaoComeSender.sendCmd_8520(bossAttModel.getHid(), bossAttModel.getCurhp(), bossAttModel.getHurt(), hpmax, curhp, hurtArr);
							if (dieHero.containsKey(bossAttModel.getHid())) {
								//已经死有段时间了
								if (TimeDateUtil.getCurrentTime()-dieHero.get(bossAttModel.getHid())>fuhuoCD) {
									//可以复活
									bossAttModel.fullHp();
									bossAttModel.setLiveTime(TimeDateUtil.getCurrentTime());
									dieHero.remove(bossAttModel.getHid());
									nowLiveing.add(new Object[]{bossAttModel.getHid()});
									CaoCaoComeSender.sendCmd_8524(h.getId(), 0);
								}
							}
							if (!nowdieing.isEmpty()&&nowdieing.size()>0) {
								CaoCaoComeSender.sendCmd_8518(h.getId(), nowdieing.toArray(), 1);
							}
							if (!nowLiveing.isEmpty()) {
								CaoCaoComeSender.sendCmd_8518(h.getId(), nowdieing.toArray(), 1);
								//MonsterGodSender.sendCmd_1510(h.getId(), nowLiveing.toArray(), 0);
							}
							
						}
					}
					
					if (bossDead) {
						//boss死亡 
						CaoCaoComeHis caoCaoComeHis = CaoCaoComeSysCache.getIns().getCaoCaoComeHis();
						int useTime=TimeDateUtil.getCurrentTime()-caoCaoComeCache.getOpenTime();
						int xhp = caoCaoComeHis.getXhp();
						int maxNum = Config_xtcs_004.getIns().get(CaoCaoComeConst.ADD_MAX).getNum()/100;
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
							caoCaoComeHis.setXhp(xhp);
						}else if(addHp<0&&xhp>minNum){
							xhp=xhp+addHp;
							if (xhp<minNum) {
								xhp=minNum;
							}
							caoCaoComeHis.setXhp(xhp);
						}
						//排行奖励 排行历史记录
						overRankReward(caoCaoComeCache);
					}
				}
				if (bossDead) {
					long skillerId = caoCaoComeCache.getSkillerId();
					Hero skillHero=HeroCache.getHero(skillerId);
					//boss广播
					ChatManager.getIns().broadCast(ChatConst.CAOCAO_COME_SKILL,new Object[] {skillHero.getName()}); // 全服广播
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, CaoCaoComeFunction.class, "scheduleMonster has wrong");
		}
	}
	
	/**
	 * 获取当前剩余气血百分比
	 * @return
	 */
	public double getBoolPro() {
		CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
		if (caoCaoComeCache.getState()==CaoCaoComeConst.STATE0) {
			return 0;
		}
		int num=CaoCaoComeSysCache.getIns().getCaoCaoComeHis().getXhp();
		CaoCaoBoss caoCaoBoss=caoCaoComeCache.getCaoCaoBoss();
		double sumNumBloor=0.00;
		double nowBoorNum=0.00;
		nowBoorNum=caoCaoBoss.getCurhp();
		sumNumBloor=caoCaoBoss.getHpmax()*num;
		double pro=nowBoorNum/sumNumBloor;
		//(val5.doubleValue() / val3.doubleValue()) * 100)
		return pro;
		
	}
	
	
	/**
	 * 5分钟后血量还有88%或以上获得伤害加成
	 * 10分钟后血量还有65%或以上获得伤害加成
     * 15分钟后血量还有35%或以上获得伤害加成
	 * @return
	 */
	public  int addProNum() {
		CaoCaoComeCache caoCaoComeCache = CaoCaoComeSysCache.getIns().getCaoCaoComeCache();
		if (caoCaoComeCache.getState()==CaoCaoComeConst.STATE0) {
			return 0;
		}
		int pro=0;
		int useTime=TimeDateUtil.getCurrentTime()-caoCaoComeCache.getOpenTime();
		double boolPro = getBoolPro();
		if (useTime>=5*60&&boolPro>=0.88) {
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(CaoCaoComeConst.addAttBuff1);
			pro= struct_xtcs_004.getNum();
		}
		if(useTime>=10*60&&boolPro>=0.65) {
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(CaoCaoComeConst.addAttBuff2);
			pro= struct_xtcs_004.getNum();
		}
		if(useTime>=15*60&&boolPro>=0.01) {
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(CaoCaoComeConst.addAttBuff3);
			pro= struct_xtcs_004.getNum();
		}
		return pro;
	}
	
	
}
