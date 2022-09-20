package com.teamtop.system.boss.qmboss;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuFunction;
import com.teamtop.system.activity.ativitys.doubleProduce.DoubleProduceFunction;
import com.teamtop.system.activity.ativitys.happyQMboss.HappyQMbossFunction;
import com.teamtop.system.activity.ativitys.hefuRechargeBack.HeFuRechargeBackConst;
import com.teamtop.system.activity.ativitys.hefuRechargeBack.HeFuRechargeBackFunction;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift.ActiveGetGiftFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
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
import excel.config.Config_xtcs_004;
import excel.struct.Struct_all_221;
import excel.struct.Struct_xtcs_004;


public class QMBossHeroManager {
	
	private static QMBossHeroManager ins = null;

	public static QMBossHeroManager getIns() {
		if (ins == null) {
			ins = new QMBossHeroManager();
		}
		return ins;
	}

	public void openUi(Hero hero) {
		try {
			QMBossHero qmBossHero=hero.getQmBossHero();
			List<Object[]> bossList = new ArrayList<Object[]>();
			List<Struct_all_221> sortList = Config_all_221.getIns().getSortList();
			Map<Integer, QMBoss> qmbossMap = QMBossCache.getQmbossMap();
			for(Struct_all_221 strboss:sortList){
				int id=strboss.getId();
				String  name="";
				if (strboss.getSingle()==1) {
					if (qmBossHero.getIsKiller().containsKey(id)) {
						bossList.add(new Object[]{id,0,hero.getName(),100});
					}else {
						bossList.add(new Object[]{id,0,name,100});
					}
				}else {
					QMBoss qmboss = qmbossMap.get(id);
					
					if(qmboss.getKiller()!=null) {
						name = qmboss.getKiller().getName();
					}
					int per = (int) Math.ceil(qmboss.getCurhp() / qmboss.getHpmax()*100);
					bossList.add(new Object[]{id,qmboss.getNextReliveTime(),name,per});
				}
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
			QMBossHeroSender.sendCmd_1352(qmBossHero.getHid(), qmBossHero.getRewardnum(),cdtime, bossList.toArray());
			return;
		} catch (Exception e) {
			LogTool.error(e, QMBossHeroManager.class, hero.getId(), hero.getName(), "open has wrong");
		}
		
	}
	/**
	 * 进入全名boss
	 * @param hero
	 * @param fbid
	 */
	public void inatt(Hero hero, int fbid) {
		try {
			Struct_all_221 all_221=Config_all_221.getIns().get(fbid);
			if (all_221.getSingle()==1) {
				return;
			}
			QMBossHero qmBossHero=hero.getQmBossHero();
			/*if (qmBossHero.getQmbossId()!=0) {
				QMBossHeroSender.sendCmd_1354(hero.getId(), 4, fbid);
				return;
			}*/
			if (Config_all_221.getIns().get(fbid)==null) {
				QMBossHeroSender.sendCmd_1354(hero.getId(), 1, fbid);
				return;
			}
			
			if (hero.getRealLevel()<all_221.getCon()[0][0]||hero.getRebornlv()<all_221.getCon()[0][1]) {
				QMBossHeroSender.sendCmd_1354(hero.getId(), 2, fbid);
				return;
			}
			QMBoss qmboss = QMBossCache.getQmbossMap().get(fbid);
			// if(qmboss==null) return;
			if (qmboss.getState() == 0) {
				QMBossHeroSender.sendCmd_1354(hero.getId(), 5, fbid);
				return;
			}
			int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), QMBossConst.PROP_ID);			
			if (qmBossHero.getRewardnum()<=0) {
				if(goodsNumBySysId<=0){
					//没有挑战令					
					QMBossHeroSender.sendCmd_1354(hero.getId(), 3, fbid);
					return;
				}else{
					if(!UseAddUtil.canUse(hero, GameConst.TOOL, 1, QMBossConst.PROP_ID)) {
						return;
					}
					UseAddUtil.use(hero, GameConst.TOOL, 1, QMBossConst.PROP_ID, SourceGoodConst.QMBOSS_REDUCE, true);
				}
			}
			List<QMBossDamgRankModel> rankList = qmboss.getRankList();
			QMBossDamgRankModel model = new QMBossDamgRankModel();
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
			model.setLiveTime(TimeDateUtil.getCurrentTime());
			qmBossHero.setQmbossId(fbid);
			
			QMBossHeroSender.sendCmd_1354(hero.getId(), 0, fbid);
			int i =0;
			for(Hero h:qmboss.getInheroMap().values()){
				if(i++>15) break;
				if (h!=null) {
					HeroFunction.getIns().sendBattleHeroAttr(h, hero.getId());
					HeroFunction.getIns().sendBattleHeroAttr(hero, h.getId());
				}
			}
			qmboss.getInheroMap().put(hero.getId(), hero);
			String usesys = hero.getTempData().getAccount().getUsesys();
			FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
					hero.getTotalStrength(), SystemIdConst.FUN_QM_BOSS, hero.getZoneid(), hero.getPf(), usesys,
					hero.getReincarnationLevel());
			//合服充值返利-全民boss
			HeFuRechargeBackFunction.getIns().numCharge(hero, HeFuRechargeBackConst.QMBOSS_TYPE, 1);
		} catch (Exception e) {
			LogTool.error(e, QMBossHeroManager.class, hero.getId(), hero.getName(), "inatt has wrong");
		}
		
	}
	/**
	 * 退出全名boss关卡
	 * @param hero
	 */
	public void quitQMboss(Hero hero) {
		try {
			QMBossHero qmBossHero=hero.getQmBossHero();
			if (qmBossHero.getQmbossId()==0) {
				QMBossHeroSender.sendCmd_1360(hero.getId(), 1, qmBossHero.getQmbossId());
				return;
			}
			QMBossEvent.getIns().heroOutQMBoss(hero);
			QMBossHeroSender.sendCmd_1360(hero.getId(), 0, qmBossHero.getQmbossId());
			return;
		} catch (Exception e) {
			LogTool.error(e, QMBossHeroManager.class, hero.getId(), hero.getName(), "quitQMboss has wrong");
		}
	}
	/**
	 * 打开排行榜
	 * @param hero
	 */
	public void openRank(Hero hero) {
		try {
			QMBossHero qmBossHero=hero.getQmBossHero();
			if (qmBossHero.getQmbossId()==0) {
				QMBossHeroSender.sendCmd_1362(hero.getId(), 2, null);
				return;
			}
			
			QMBoss qmboss = QMBossCache.getQmbossMap().get(qmBossHero.getQmbossId());
			if(qmboss==null) {
				QMBossHeroSender.sendCmd_1362(hero.getId(), 1, null);
				LogTool.warn("qmboss==null QmbossId:"+qmBossHero.getQmbossId()+"+hid"+hero.getId(), QMBossHeroManager.class);
				return;
			}
			List<QMBossDamgRankModel> rankList = qmboss.getRankList();
			if(rankList==null) return;
			int max = QMBossConst.RANK_MAX_NUM;
			int size = rankList.size();
			if(size>max){
				size = max;
			}
			Object[] data = new Object[size];
			for(int i=0;i<size;i++){
				QMBossDamgRankModel qmBossDamgRankModel = rankList.get(i);
				data[i] = new Object[]{qmBossDamgRankModel.getName(),(int)qmBossDamgRankModel.getHurt()};
			}
			QMBossHeroSender.sendCmd_1362(hero.getId(), 0, data);
		} catch (Exception e) {
			LogTool.error(e, QMBossHeroManager.class, hero.getId(), hero.getName(), "openRank has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 * @param fubId
	 */
	public void getDanJiRes(Hero hero, int fubId) {
		Struct_all_221 struct_all_221 = Config_all_221.getIns().get(fubId);
		if (hero.getRealLevel()<struct_all_221.getCon()[0][0]||hero.getRebornlv()<struct_all_221.getCon()[0][1]) {
			QMBossHeroSender.sendCmd_1354(hero.getId(), 2, fubId);
			return;
		}
		int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), QMBossConst.PROP_ID);			
		if (hero.getQmBossHero().getRewardnum()<=0) {
			if(goodsNumBySysId<=0){
				//没有挑战令					
				QMBossHeroSender.sendCmd_1354(hero.getId(), 3, fubId);
				return;
			}else{
				if(!UseAddUtil.canUse(hero, GameConst.TOOL, 1, QMBossConst.PROP_ID)) {
					return;
				}
				UseAddUtil.use(hero, GameConst.TOOL, 1, QMBossConst.PROP_ID, SourceGoodConst.QMBOSS_REDUCE, true);
			}
		}
		if (struct_all_221.getSingle()==1) {
			if (hero.getQmBossHero().getQmbossRefreshTime() == 0
					|| hero.getQmBossHero().getRewardnum() == QMBossConst.CHALLENGE_TIMES_EVERYDAY) {
				hero.getQmBossHero().setQmbossRefreshTime(TimeDateUtil.getCurrentTime());
			}	
			//如果是打全民单机
			//boss掉落奖励
			List<Object[]> dropTips = new ArrayList<Object[]>();
			List<Object[]> dropTips2 = new ArrayList<Object[]>();
			ActiveGetGiftFunction.getIns().QMBossHandle(hero, dropTips);
			RuneGiftFunction.getIns().QMBossHandle(hero, dropTips);

			for (int[] js:struct_all_221.getMvp()) {
				dropTips.add(new Object[] {js[0], js[1], js[2],0});
			}
			//mvp奖励
			if (UseAddUtil.canAdd(hero, struct_all_221.getMvp(), false)) {
				UseAddUtil.add(hero, struct_all_221.getMvp(), SourceGoodConst.QM_BOSS_MVP, null, false);
			}
			//怪物掉落
			boolean isDoubel = DoubleProduceFunction.getIns().checkIsStart(hero);
			List<ProbabilityEventModel> pelist = QMBossCache.getBossDropMap().get(struct_all_221.getId());
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
			if (UseAddUtil.canAdd(hero, drops, false)) {
				UseAddUtil.add(hero, drops, SourceGoodConst.QM_BOSS_DROP, null, false);
			}
			
			HappyQMbossFunction.getIns().addNumByType(hero);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_23, 1);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE15);
			//八门金锁
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_1, 1);
			// 少主活动-金猪送财
			ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_1, 1);
			//神兽活跃
			SaintMonsterDailyActiveFunction.getIns().updateTaskNum(hero, SaintMonsterDailyActiveEnum.QM_BOSS, 1);
			// 万兽之王-每日活跃
			MonsterKingDailyActiveFunction.getIns().updateTaskNum(hero, MonsterKingDailyActiveEnum.QM_BOSS, 1);
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_1, 1);
			// 三国战令
			WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_2, 1);
			//桃园结义任务
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_BOSS_2, 1);
			// 三国战令(活动)
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_2, 1);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_5, 1, 0);
			// 宝藏拼图
			BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_5, 1);
			if(hero.getQmBossHero().getRewardnum()>0){
				hero.getQmBossHero().setRewardnum(hero.getQmBossHero().getRewardnum()-1);
			}
			//合服充值返利-全民boss
			HeFuRechargeBackFunction.getIns().numCharge(hero, HeFuRechargeBackConst.QMBOSS_TYPE, 1);
			QMBossHeroSender.sendCmd_1368(hero.getId(), 1, fubId, dropTips.toArray());
			
			hero.getQmBossHero().getIsKiller().put(fubId, 1);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_9, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_9, 1);
		}
	}
	/**
	 * 扫荡
	 * @param hero
	 * @param fbid
	 */
	public void mopup(Hero hero, int fbid) {
		try {
			Struct_xtcs_004 vipLimit = Config_xtcs_004.getIns().get(QMBossConst.MOPUP_1);
			Struct_xtcs_004 levelLimit = Config_xtcs_004.getIns().get(QMBossConst.MOPUP_2);
			
			int vipNum = vipLimit.getNum();
			int levelnum = levelLimit.getNum();
			if (hero.getGuanqia().getCurGuanqia()<levelnum||hero.getVipLv()<vipNum) {
				QMBossHeroSender.sendCmd_1370(hero.getId(), 1, fbid,null);
				return;
			}
			
			QMBossHero qmBossHero=hero.getQmBossHero();
			if (!qmBossHero.getIsKiller().containsKey(fbid)) {
				QMBossHeroSender.sendCmd_1370(hero.getId(), 2, fbid,null);
				return;
			}
			
			if (Config_all_221.getIns().get(fbid)==null) {
				QMBossHeroSender.sendCmd_1354(hero.getId(), 1, fbid);
				return;
			}
			Struct_all_221 all_221 = Config_all_221.getIns().get(fbid);
			if (hero.getRealLevel()<all_221.getCon()[0][0]||hero.getRebornlv()<all_221.getCon()[0][1]) {
				return;
			}
			QMBoss qmboss = QMBossCache.getQmbossMap().get(fbid);
			// if(qmboss==null) return;
			if (qmboss.getState() == 0) {
				QMBossHeroSender.sendCmd_1354(hero.getId(), 5, fbid);
				return;
			}
			
			if(qmboss.getInheroMap().size()>0) {
				QMBossHeroSender.sendCmd_1370(hero.getId(), 3, fbid,null);
				return;
			}
			
			int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), QMBossConst.PROP_ID);			
			if (qmBossHero.getRewardnum()<=0) {
				if(goodsNumBySysId<=0){
					//没有挑战令					
					QMBossHeroSender.sendCmd_1354(hero.getId(), 3, fbid);
					return;
				}else{
					if(!UseAddUtil.canUse(hero, GameConst.TOOL, 1, QMBossConst.PROP_ID)) {
						return;
					}
					UseAddUtil.use(hero, GameConst.TOOL, 1, QMBossConst.PROP_ID, SourceGoodConst.QMBOSS_REDUCE, true);
				}
			}
			
			int nowTime = TimeDateUtil.getCurrentTime();
			//boss掉落奖励
			List<Object[]> dropTips = new ArrayList<Object[]>();
			List<Object[]> dropTips2 = new ArrayList<Object[]>();
			ActiveGetGiftFunction.getIns().QMBossHandle(hero, dropTips);
			RuneGiftFunction.getIns().QMBossHandle(hero, dropTips);
			
			for (int[] js:all_221.getMvp()) {
				dropTips.add(new Object[] {js[0], js[1], js[2],0});
			}
			//mvp奖励
			if (UseAddUtil.canAdd(hero, all_221.getMvp(), false)) {
				UseAddUtil.add(hero, all_221.getMvp(), SourceGoodConst.QM_BOSS_MVP, null, false);
			}
			QMBossKillModel killer=new QMBossKillModel();
			killer.setHid(hero.getId());
			killer.setName(hero.getNameZoneid());
			killer.setKilltime(TimeDateUtil.getCurrentTime());
			killer.setStrength(hero.getTotalStrength());
			qmboss.setKiller(killer);
			LogTool.info(hero.getId(), hero.getName(), "mop up mvp qmBoss", "bossDead has wrong");
			
			boolean isDoubel = DoubleProduceFunction.getIns().checkIsStart(hero);
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
			if (UseAddUtil.canAdd(hero, drops, false)) {
				UseAddUtil.add(hero, drops, SourceGoodConst.QM_BOSS_DROP, null, false);
			}
			QMBossEvent.getIns().heroOutQMBoss(hero);
			if (hero.getQmBossHero().getQmbossRefreshTime()==0||hero.getQmBossHero().getRewardnum()==QMBossConst.CHALLENGE_TIMES_EVERYDAY) {
				hero.getQmBossHero().setQmbossRefreshTime(nowTime);
			}				
			if(hero.getQmBossHero().getRewardnum()>0){
				hero.getQmBossHero().setRewardnum(hero.getQmBossHero().getRewardnum()-1);
			}								
			SaintMonsterDailyActiveFunction.getIns().updateTaskNum(hero, SaintMonsterDailyActiveEnum.QM_BOSS, 1);
			// 万兽之王-每日活跃
			MonsterKingDailyActiveFunction.getIns().updateTaskNum(hero, MonsterKingDailyActiveEnum.QM_BOSS, 1);
			
			qmboss.setState(0);
			qmboss.setNextReliveTime(nowTime + all_221.getTime());
			
			qmboss.getInheroMap().clear();
			
			QMBossHeroSender.sendCmd_1370(hero.getId(), 0, fbid,dropTips.toArray());
			//全民狂欢-全民boss
			HappyQMbossFunction.getIns().addNumByType(hero);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_23, 1);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE15);
			//八门金锁
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_1, 1);
			// 少主活动-金猪送财
			ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_1, 1);
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_1, 1);
			// 三国战令
			WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_2, 1);
			//桃园结义任务
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_BOSS_2, 1);
			// 三国战令(活动)
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_2, 1);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_5, 1, 0);
			// 宝藏拼图
			BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_5, 1);
			// 合服充值返利-全民boss
			HeFuRechargeBackFunction.getIns().numCharge(hero, HeFuRechargeBackConst.QMBOSS_TYPE, 1);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_9, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_9, 1);
		
			
		} catch (Exception e) {
			LogTool.error(e, QMBossHeroManager.class, "mopup has wrong");
		}
		
	}

}
