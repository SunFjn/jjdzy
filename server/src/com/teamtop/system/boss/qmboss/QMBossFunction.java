package com.teamtop.system.boss.qmboss;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuFunction;
import com.teamtop.system.activity.ativitys.doubleProduce.DoubleProduceFunction;
import com.teamtop.system.activity.ativitys.happyMonsterGod.HappyMonsterGodFunction;
import com.teamtop.system.activity.ativitys.happyQMboss.HappyQMbossFunction;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift.ActiveGetGiftFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.monsterGod.MonsterGodCache;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.openDaysSystem.monsterKingDailyActive.MonsterKingDailyActiveEnum;
import com.teamtop.system.openDaysSystem.monsterKingDailyActive.MonsterKingDailyActiveFunction;
import com.teamtop.system.openDaysSystem.runeGift.RuneGiftFunction;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.SaintMonsterDailyActiveEnum;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.SaintMonsterDailyActiveFunction;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigConst;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigFunction;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveEnum;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveFunction;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornFunction;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornTaskConst;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_all_221;
import excel.struct.Struct_all_221;

/**
 * 全民boss
 * @author Administrator
 *
 */
public class QMBossFunction {
	private static QMBossFunction ins = null;

	public static synchronized QMBossFunction getIns() {
		if (ins == null) {
			ins = new QMBossFunction();
		}
		return ins;
	}

	public void sortQMBossHurt(Hero hero,double hurt,QMBoss qmboss){
		QMBossDamgRankModel QMBossDamgRankModel = new QMBossDamgRankModel();
		QMBossDamgRankModel.setHid(hero.getId());
		List<QMBossDamgRankModel> rankList = qmboss.getRankList();
		int indexOf = rankList.indexOf(QMBossDamgRankModel);
		if(indexOf<0){
			QMBossDamgRankModel.setHid(hero.getId());
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
	
	/**
	 * 魔神吕布boss
	 * @param hero
	 * @param hurt
	 * @param qmboss
	 */
	public void sortLvBuBossHurt(Hero hero,double hurt,MonsterGodCache monsterGodCache){
		QMBossDamgRankModel QMBossDamgRankModel = new QMBossDamgRankModel();
		QMBossDamgRankModel.setHid(hero.getId());
		List<QMBossDamgRankModel> rankList = monsterGodCache.getRankList();
		int indexOf = rankList.indexOf(QMBossDamgRankModel);
		if(indexOf<0){
			QMBossDamgRankModel.setName(hero.getNameZoneid());
			if (QMBossDamgRankModel.getHurt()==0) {
				//刚刚有伤害
				//全民狂欢-魔神吕布狂欢
				HappyMonsterGodFunction.getIns().addNumByType(hero);
			}
			QMBossDamgRankModel.setHurt((long)hurt);
			rankList.add(QMBossDamgRankModel);
		}else{
			QMBossDamgRankModel = rankList.get(indexOf);
			if (QMBossDamgRankModel.getHurt()==0) {
				//刚刚有伤害
				//全民狂欢-魔神吕布狂欢
				HappyMonsterGodFunction.getIns().addNumByType(hero);
			}
			QMBossDamgRankModel.setName(hero.getNameZoneid());
			QMBossDamgRankModel.setHurt(QMBossDamgRankModel.getHurt()+(long)hurt);
			QMBossDamgRankModel.setHid(hero.getId());
		}
	}
	
	/**
	 * boss死亡
	 * @param qmboss
	 * @param now
	 * @param key
	 */
	public void bossDead(QMBoss qmboss,int now,int key){
		try {
			Struct_all_221 struct_all_221 = Config_all_221.getIns().get(key);
			qmboss.setState(0);
			qmboss.setNextReliveTime(now + struct_all_221.getTime());
			int i=1;
			Map<Long, Hero> inheroMap = qmboss.getInheroMap();
			for(QMBossDamgRankModel model:qmboss.getRankList()){
				Hero h = HeroCache.getHero(model.getHid());
				if(h!=null && h.isOnline() && inheroMap.containsKey(h.getId())){
					//boss掉落奖励
					List<Object[]> dropTips = new ArrayList<Object[]>();
					List<Object[]> dropTips2 = new ArrayList<Object[]>();
					ActiveGetGiftFunction.getIns().QMBossHandle(h, dropTips);
					RuneGiftFunction.getIns().QMBossHandle(h, dropTips);
					if (i==1) {
						for (int[] js:struct_all_221.getMvp()) {
							dropTips.add(new Object[] {js[0], js[1], js[2],0});
						}
						//mvp奖励
						if (UseAddUtil.canAdd(h, struct_all_221.getMvp(), false)) {
							UseAddUtil.add(h, struct_all_221.getMvp(), SourceGoodConst.QM_BOSS_MVP, null, false);
						}
						QMBossKillModel killer=new QMBossKillModel();
						killer.setHid(h.getId());
						killer.setName(h.getNameZoneid());
						killer.setKilltime(TimeDateUtil.getCurrentTime());
						killer.setStrength(h.getTotalStrength());
						qmboss.setKiller(killer);
						LogTool.info(h.getId(), h.getName(), "mvp qmBoss", "bossDead has wrong");
					}
					
					boolean isDoubel = DoubleProduceFunction.getIns().checkIsStart(h);
					List<ProbabilityEventModel> pelist = QMBossCache.getBossDropMap().get(qmboss.getBossId());
					int size = pelist.size();
					List<int[]> dropArr = new ArrayList<int[]>();
					for (int a = 0; a < size; a++) {
						ProbabilityEventModel pe = pelist.get(a);
						int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
						if (js != null) {
							int type = js[0];
							if (type == GameConst.GENDROP) {
								int num = js[2];
								ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
								for (int j = 1; j <= num; j++) {
									js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
									dropArr.add(js);
									dropTips.add(new Object[] { js[0], js[1], js[2],0 });
									if(isDoubel) {
										dropArr.add(js);
										dropTips2.add(new Object[] { js[0], js[1], js[2] ,4});
									}
								}
							} else {
								dropArr.add(js);
								dropTips.add(new Object[] { js[0], js[1], js[2],0 });
								if(isDoubel) {
									dropArr.add(js);
									dropTips2.add(new Object[] { js[0], js[1], js[2] ,4});
								}
							}
						}
					}
					if(!dropTips2.isEmpty()) {
						dropTips.addAll(0, dropTips2);
					}
					int[][] drops = new int[dropArr.size()][];
					dropArr.toArray(drops);
					if (UseAddUtil.canAdd(h, drops, false)) {
						UseAddUtil.add(h, drops, SourceGoodConst.QM_BOSS_DROP, null, false);
					}
					QMBossEvent.getIns().heroOutQMBoss(h);
					if (h.getQmBossHero().getQmbossRefreshTime()==0||h.getQmBossHero().getRewardnum()==QMBossConst.CHALLENGE_TIMES_EVERYDAY) {
						h.getQmBossHero().setQmbossRefreshTime(now);
					}				
					if(h.getQmBossHero().getRewardnum()>0){
						h.getQmBossHero().setRewardnum(h.getQmBossHero().getRewardnum()-1);
					}								
					i++;
					SaintMonsterDailyActiveFunction.getIns().updateTaskNum(h, SaintMonsterDailyActiveEnum.QM_BOSS, 1);
					// 万兽之王-每日活跃
					MonsterKingDailyActiveFunction.getIns().updateTaskNum(h, MonsterKingDailyActiveEnum.QM_BOSS, 1);
					QMBossHeroSender.sendCmd_1366(h.getId(), qmboss.getBossId(), dropTips.toArray());
					if (h.isOnline()) {
						//boss提示
						noticeBoss(h, key, 2);
						//红点
						sendBossData(h);
						//全民狂欢-全民boss
						HappyQMbossFunction.getIns().addNumByType(h);
						//任务
						TaskUserFunction.getIns().reshTaskUser(h, TaskUserConst.TASK_TYPE_23, 1);
						//每日任务
						DayTaskFunction.getIns().successDayTaskType(h, DayTaskConst.DATTASK_TYPE15);
						//八门金锁
						EightDoorFunction.getIns().reshEightDoor(h, EightDoorConst.EIGHTDOOR_TYPE_1, 1);
						// 少主活动-金猪送财
						ShaoZhuGoldPigFunction.getIns().checkTask(h, ShaoZhuGoldPigConst.TASK_TYPE_1, 1);
						// 限定武将
						WuJiangGoalFunction.getIns().updateTaskNum(h, WuJiangGoalEnum.TASK_1, 1);
						// 三国战令
						WarOrderActiveFunction.getIns().updateTaskNum(h, WarOrderActiveEnum.GOAL_2, 1);
						//桃园结义任务
						TaoyuanSwornFunction.getIns().reshSwornTask(h, TaoyuanSwornTaskConst.TASK_BOSS_2, 1);
						// 三国战令(活动)
						WarOrderActFunction.getIns().updateTaskNum(h, WarOrderActEnum.GOAL_2, 1);
						// 成就树
						AchievementTreeFunction.getIns().checkTask(h, AchievementTreeEnum.TASK_5, 1, 0);
						// 宝藏拼图
						BaoZangPinTuFunction.getIns().checkTask(h, BaoZangPinTuConst.TASK_TYPE_5, 1);
						// 犒赏三军(活动)
						WarOrderFunction.getIns().updateTaskNum(h, WarOrderEnum.GOAL_9, 1);
						// 犒赏三军(开服)
						WarOrderNewFunction.getIns().updateTaskNum(h, WarOrderNewEnum.GOAL_9, 1);
						//击杀boss
						if (!h.getQmBossHero().getIsKiller().containsKey(key)) {
							h.getQmBossHero().getIsKiller().put(key, 1);
						}
					}
				}
			}
			qmboss.getInheroMap().clear();
		} catch (Exception e) {
			LogTool.error(e, this, "boss dead err");
		}
	}
	
	
	public void noticeBoss(Hero hero,int index,int isdie) {
		try {
			Struct_all_221 all_221=Config_all_221.getIns().get(index);
			int reborn=hero.getRebornlv()/1000;
			if (hero.getRealLevel()<all_221.getCon()[0][0]||reborn<all_221.getCon()[0][1]) {
				return;
			}else if(hero.getRealLevel()==all_221.getCon()[0][0]||reborn==all_221.getCon()[0][1]){
				GlobalSender.sendCmd_264(hero.getId(),QMBossConst.SYS_ID, index, isdie);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "noticeBoss dead err");
		}
		
	}
	
	public void sendBossData(Hero hero) {
		QMBossHero qmBossHero = hero.getQmBossHero();
		if (qmBossHero==null) {
			LogTool.warn("sendBossData has wrong:qmBossHero==null"+hero.getId(), QMBossFunction.class);
			return;
		}
		List<Object[]> bossList = new ArrayList<Object[]>();
		List<Struct_all_221> sortList = Config_all_221.getIns().getSortList();
		Map<Integer, QMBoss> qmbossMap = QMBossCache.getQmbossMap();
		for(Struct_all_221 strboss:sortList){
			int id=strboss.getId();
			QMBoss qmboss = qmbossMap.get(id);
			bossList.add(new Object[]{id,qmboss.getState()});
		}
		int qmbossRewardnum = qmBossHero.getRewardnum();
		if(qmBossHero.getQmbossRefreshTime()>0&&qmbossRewardnum<QMBossConst.CHALLENGE_TIMES_EVERYDAY){
			//打开UI计算恢复了多少次
			int passtime = TimeDateUtil.getCurrentTime() - qmBossHero.getQmbossRefreshTime();
			int huifu = passtime / QMBossConst.ADD_CHALLENGE_TIME_NEED;
			if(huifu>0){
				qmbossRewardnum += huifu;
				if(qmbossRewardnum>=QMBossConst.CHALLENGE_TIMES_EVERYDAY){
					qmbossRewardnum= QMBossConst.CHALLENGE_TIMES_EVERYDAY;
				}
				qmBossHero.setRewardnum(qmbossRewardnum);
				qmBossHero.setQmbossRefreshTime(
						qmBossHero.getQmbossRefreshTime() + huifu * QMBossConst.ADD_CHALLENGE_TIME_NEED);
			}
		}
		int cdtime=0;
		if (qmBossHero.getRewardnum()<QMBossConst.CHALLENGE_TIMES_EVERYDAY) {
			cdtime=QMBossConst.ADD_CHALLENGE_TIME_NEED+qmBossHero.getQmbossRefreshTime()-TimeDateUtil.getCurrentTime();
		}
		QMBossHeroSender.sendCmd_1364(qmBossHero.getHid(), qmBossHero.getRewardnum(),cdtime, bossList.toArray());
		return;
	}
	
	
	
	/**
	 * 计算攻击boss伤害
	 * @param hero
	 * @param qmboss
	 * @return
	 */
	public boolean attBoss(QMBossDamgRankModel model,Hero hero,QMBoss qmboss){
		FinalFightAttr target = qmboss.getAttr();
		long hurt = 0;
		FinalFightAttr att = model.getAttrmap();
		double damg =Math.max(BattleFunction.calcDamg(att, target),1);
		hurt +=damg;
		LogTool.info("hero hit qmboss id:"+qmboss.getBossId()+" damg:"+damg+",hurt:"+hurt+",hid:"+hero.getId()+",name:"+hero.getName(),this);
		double curhp = qmboss.getCurhp();
		curhp = curhp - hurt;
		qmboss.setCurhp(curhp);
		LogTool.info("qmboss id:"+qmboss.getBossId()+" now currhp:"+curhp,this);
		boolean die = false;
		if(qmboss.getCurhp()<=0){
			LogTool.info("qmboss dead id:"+qmboss.getBossId(),this);
			qmboss.setCurhp(0);
			die = true;
		}
		if(hurt>0){
			QMBossFunction.getIns().sortQMBossHurt(hero, hurt, qmboss);
		}
		return die;
	}
	/**
	 * 检查状态
	 * @param now
	 * @param qmboss
	 * @param key
	 */
	public void checkState(int now,QMBoss qmboss,int key){
		try {
			int state = qmboss.getState();
			if(state==0){
				if(now > qmboss.getNextReliveTime()){
					//重生
					Struct_all_221 struct_qmboss_907 = Config_all_221.getIns().get(key);
					int bossid = struct_qmboss_907.getBoss()[0][1];
					FinalFightAttr battleFightAttr = BattleFunction.initNPC(bossid);
					long hp = battleFightAttr.getHp();
					qmboss.setBossId(key);
					qmboss.setHpmax(hp);
					qmboss.setCurhp(hp);
					qmboss.setRankList(Collections.synchronizedList(new ArrayList<QMBossDamgRankModel>()));
					qmboss.setState(1);
					qmboss.setAttr(battleFightAttr);
					for(Hero hero:HeroCache.getHeroMap().values()){
						if(hero.isOnline()){
							//boss提示
							noticeBoss(hero, key, 1);
							//红点
							sendBossData(hero);	
						}
					}
				}
			}else{
				if(qmboss.getCurhp()<=0){
					//补丁
					Struct_all_221 struct_qmboss_907 = Config_all_221.getIns().get(key);
					qmboss.setState(0);
					qmboss.setNextReliveTime(now + struct_qmboss_907.getTime());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "check state err");
		}
	}
	
	
	/**
	 * 计算攻击boss伤害
	 * @param hero
	 * @param qmboss
	 * @return
	 */
	public void skillQMBoss(double skillHurt,Hero hero){
		QMBossHero qmBossHero=hero.getQmBossHero();
		if (qmBossHero.getQmbossId()==0) {
			return;
		}
		QMBoss qmboss = QMBossCache.getQmbossMap().get(qmBossHero.getQmbossId());
		if(qmboss==null) return;
		if(qmboss.getState()==0) return;
		LogTool.info("hero skillQMBoss qmboss id: "+qmboss.getBossId()+" damg:"+skillHurt+",hid:"+hero.getId()+",name:"+hero.getName(),this);
		double curhp = qmboss.getCurhp();            
		curhp = curhp - skillHurt;
		qmboss.setCurhp(curhp);
		LogTool.info("skillQMBoss id: "+qmboss.getBossId()+" new currhp:"+curhp,this);
		if(qmboss.getCurhp()<=0){
			LogTool.info("skillQMBoss dead id"+qmboss.getBossId(),this);
			qmboss.setCurhp(0);
			bossDead(qmboss, TimeDateUtil.getCurrentTime(), qmboss.getBossId());
		}
		if(skillHurt>0){
			QMBossFunction.getIns().sortQMBossHurt(hero, skillHurt, qmboss);
		}
		return ;
	}
	/**
	 * 每秒全民boss的战斗状态监测
	 * @param qmboss 目标boss
	 * @param nowTime 当前时间
	 * @param key 目标boss key
	 * @param senddata 是否同步给前段
	 */
	public void scheduleAttQmBoss(QMBoss qmboss,int nowTime,int key,boolean senddata) {
		try {
			//检查状态
			QMBossFunction.getIns().checkState(nowTime, qmboss, key);
			//计算伤害
			if(qmboss.getCurhp()<=0) return;
			boolean bossDead = false;
			List<QMBossDamgRankModel> rankList = qmboss.getRankList();
			Map<Long, Hero> inheroMap = qmboss.getInheroMap();
			List<Object[]> hurtList = null;
			List<Object[]> removeList = null;
			if(rankList.size()>0){
				hurtList = new ArrayList<Object[]>();
				for(QMBossDamgRankModel model :rankList){
					if(!bossDead){
						//boss攻击的对象
						if(nowTime - model.getInTime()>=2){
							Hero hero = HeroCache.getHero(model.getHid());
							if(hero!=null && hero.isOnline() && inheroMap.containsKey(hero.getId())){
								double curhp = model.getCurhp();
								if(curhp>0){
									FinalFightAttr attr =  model.getAttrmap();
									long oneCurHp = attr.getHp();
									long hudun=attr.getHudun();
									double hurt = Math.max(BattleFunction.calcDamg(qmboss.getAttr(), attr),1);
									if (hudun>0) {
										//有护盾先扣护盾
										long hudunleft=(long) (hudun-hurt);
										if (hudunleft>0) {
											attr.setHudun(hudunleft);
										}else {
											//护盾不够 
											long minueBoole=(long) (hurt-hudun);
											attr.setHudun(0);
											long mpleft = (long) (oneCurHp - minueBoole);
											if(mpleft>0){
												attr.setHp((int)mpleft);
												hurt = 0;
											}else{
												attr.setHp(0);
												hurt = mpleft*-1;
											}
											if(attr.getHp()<=0){
												if(removeList==null) removeList = new ArrayList<Object[]>();
												removeList.add(new Object[] {model.getHid()});
											}
										}
									}else if(oneCurHp>0){
										double mpleft = oneCurHp - hurt;
										if(mpleft>0){
											attr.setHp((int)mpleft);
											hurt = 0;
										}else{
											attr.setHp(0);
											hurt = mpleft*-1;
										}
										if(attr.getHp()<=0){
											if(removeList==null) removeList = new ArrayList<Object[]>();
											removeList.add(new Object[] {model.getHid()});
										}

									}
									boolean die =QMBossFunction.getIns().attBoss(model,hero,qmboss);
									if(die){
										bossDead = true;
									}
								}
							}
						}
						hurtList.add(new Object[]{model.getName(),model.getHurt()});
					}
				}
			}
			Collections.sort(rankList, QMBossDamgComparator.getIns());
			//发送数据
			if(senddata || bossDead){
				long hpmax = (long) qmboss.getHpmax();
				long curhp = (long) qmboss.getCurhp();
				Object[] hurtArr = null;
				if(hurtList!=null && hurtList.size()>0){
					hurtArr = hurtList.toArray();
				}
				for(QMBossDamgRankModel bossAttModel :rankList){
					Hero h = HeroCache.getHero(bossAttModel.getHid());
					if(h!=null && h.isOnline() && inheroMap.containsKey(h.getId())){
						QMBossHeroSender.sendCmd_1356(bossAttModel.getHid(), bossAttModel.getCurhp(), hpmax, curhp, (long)(bossAttModel.getHurt()), hurtArr);
						if(removeList!=null){
							QMBossHeroSender.sendCmd_1358(bossAttModel.getHid(), removeList.toArray());
						}
						if(bossAttModel.getCurhp()<=0){
							QMBossEvent.getIns().heroOutQMBoss(h);
						}
					}
				}
			}
			//boss死亡
			if(bossDead){
				QMBossFunction.getIns().bossDead(qmboss, nowTime, key);
				//同步kill排行榜
				QMBossCache.syncKillRank();
			}
			
		} catch (Exception e) {
			LogTool.error(e, QMBossFunction.class, "scheduleAttQmBoss has wrong");
		}
		
	}

	/**
	 * 添加QMboss进入次数
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addQMBossNum(Hero hero, int id, int num) {
		if (hero.getQmBossHero()!=null) {
			hero.getQmBossHero().setRewardnum(hero.getQmBossHero().getRewardnum()+num);
			return true;
		}
		return false;
	}
	
}
