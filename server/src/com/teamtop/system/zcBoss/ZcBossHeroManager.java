package com.teamtop.system.zcBoss;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossSender;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.battleNew.BattleNewSysCache;
import com.teamtop.system.battleNew.BttleTypeConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveEnum;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveFunction;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.zcBoss.cross.ZcBossCrossCache;
import com.teamtop.system.zcBoss.cross.ZcBossCrossFunction;
import com.teamtop.system.zcBoss.cross.ZcBossCrossIO;
import com.teamtop.system.zcBoss.cross.ZcBossCrossScene;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bosszc_010;
import excel.struct.Struct_bosszc_010;

public class ZcBossHeroManager {
	
	private static ZcBossHeroManager zcBossHeroManager;

	private ZcBossHeroManager() {
		
	}
	public static synchronized ZcBossHeroManager getIns() {
		if (zcBossHeroManager == null) {
			zcBossHeroManager = new ZcBossHeroManager();
		}
		return zcBossHeroManager;
	}
	
	public void openUi(Hero hero, int type) {
		try {
			Object[] data = new Object[Config_bosszc_010.getIns().getSortList().size()];
			int idx = 0;
			ZcBossHero zcBossHero=hero.getZcBossHero();
			int curtime=TimeDateUtil.getCurrentTime();
			for (Struct_bosszc_010 bosszc_010 : Config_bosszc_010.getIns().getSortList()) {
				HashMap<Integer, Integer> beginTimeMap=new HashMap<Integer, Integer>();
				int zoreTime=TimeDateUtil.getTodayZeroTimeReturnInt();
				int[][] frushTime=bosszc_010.getShuaxin2();
				
				for (int i = 0; i < frushTime.length; i++) {
					int[] js = frushTime[i];
					int hour=js[0];
					int min=js[1];
					int time=zoreTime+hour*3600+min*60;
					beginTimeMap.put(i, time);
				}
				//???????????? ?????????boss????????????
				int NextopenDoorTime=0;
				int size=beginTimeMap.size();
				if (curtime>beginTimeMap.get(size-1)) {
					//???????????????
					NextopenDoorTime = beginTimeMap.get(0)+24*3600;
				}else {
					for (int i = 0; i < size; i++) {
						if (i==0&&curtime<beginTimeMap.get(i)) {
							NextopenDoorTime=beginTimeMap.get(i);
						}else if (i!=size-1&&curtime>=beginTimeMap.get(i)&&curtime<beginTimeMap.get(i+1)) {
							NextopenDoorTime=beginTimeMap.get(i+1);
						}
					}
				}
				
				if (bosszc_010.getLeixing()==type&&type==1) {
					if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZCBOSS)) return;
					//?????????
					int index = bosszc_010.getBianhao();
					ZcBoss tr = ZcBossLocalCache.getIns().getTreasureRaider(bosszc_010.getBianhao());
					byte state = tr.getBossLastState();
					int currTime = TimeDateUtil.getCurrentTime();
					int useTime = (int) (currTime - tr.getSwitchStateTime());
					int remainTime=0;
					if(state == ZcBossConst.STATUS_INIT){
						remainTime =NextopenDoorTime - currTime;
						//System.err.println(TimeDateUtil.printTime(NextopenDoorTime));
					}else if(tr.getBossLastState() == ZcBossConst.STATUS_PRE){
						remainTime = ZcBossConst.TIME_PK_GAP - useTime;
					}
					if (remainTime<0) {
						remainTime=0;
					}
					int leftTime=0;
					if (zcBossHero.getJoinTime()!=null&&zcBossHero.getJoinTime().containsKey(index)) {
						Integer outTime = zcBossHero.getJoinTime().get(index);
						leftTime=curtime-outTime;
						if (leftTime<9) {
							if (leftTime<0) {
								leftTime=-1;
							}
							leftTime=9-leftTime;
						}else {
							leftTime=0;
						}
					}
					int hasKillSate=0;
					Set<Integer> hasKill = zcBossHero.getHasKill();
					if (hasKill.contains(tr.getIndex())) {
						hasKillSate=1;
					}
					data[idx] = new Object[] { tr.getIndex(),remainTime, state,leftTime,tr.getRoleName(),hasKillSate};
				}else if(bosszc_010.getLeixing()==type&&type==2){
					if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_ZCBOSS)) return;
					//??????
					int index = bosszc_010.getBianhao();
					ZcBoss tr = ZcBossLocalCache.getIns().getCrossZcBossMap().get(index);
					if (tr==null) {
						LogTool.warn("tr==null:"+index, ZcBossHeroManager.class);
						continue;
					}
					byte state = tr.getBossLastState();
					int currTime = TimeDateUtil.getCurrentTime();
					int useTime = (int) (currTime - tr.getSwitchStateTime());
					int remainTime=0;
					if(state == ZcBossConst.STATUS_INIT){
						remainTime =NextopenDoorTime - currTime;
					}else if(tr.getBossLastState() == ZcBossConst.STATUS_PRE){
						remainTime = ZcBossConst.TIME_PK_GAP - useTime;
					}
					if (remainTime<0) {
						remainTime=0;
					}
					
					int leftTime=0;
					if (zcBossHero.getJoinTime()!=null&&zcBossHero.getJoinTime().containsKey(index)) {
						Integer outTime = zcBossHero.getJoinTime().get(index);
						leftTime=curtime-outTime;
						if (leftTime<9) {
							if (leftTime<0) {
								leftTime=-1;
							}
							leftTime=9-leftTime;
						}else {
							leftTime=0;
						}
					}
					int hasKillSate=0;
					Set<Integer> hasKill = zcBossHero.getHasKill();
					if (hasKill.contains(tr.getIndex())) {
						hasKillSate=1;
					}
					data[idx] = new Object[] { tr.getIndex(),remainTime, state,leftTime,tr.getRoleName(),hasKillSate};
				}
				idx++;

			}
			data=CommonUtil.removeNull(data);
			ZcBossHeroSender.sendCmd_4452(hero.getId(), type, data);
		} catch (Exception e) {
			LogTool.error(e, ZcBossHeroManager.class, "ZcBossHeroManager has wrong");
		}
		
	}
	/**
	 * CG ????????????boss 4453
	 * @param index| ????????????| int
	 */
	public void join(Hero hero, int index) {
		try {
			if(CrossZone.isCrossServer()){
				return;
			}
			Struct_bosszc_010 struct_bosszc_010 = Config_bosszc_010.getIns().get(index);
			if (struct_bosszc_010==null) {
				LogTool.warn("struct_bosszc_010==null has wrong", ZcBossHeroManager.class);
				return;
			}
			int curtime=TimeDateUtil.getCurrentTime();
			ZcBossHero zcBossHero=hero.getZcBossHero();
			if (zcBossHero.getJoinTime()!=null&&zcBossHero.getJoinTime().containsKey(index)) {
				Integer outTime = zcBossHero.getJoinTime().get(index);
				int leftTime=curtime-outTime;
				if (leftTime<9) {
					if (leftTime<0) {
						leftTime=-1;
					}
					leftTime=9-leftTime;
					ZcBossHeroSender.sendCmd_4454(hero.getId(), 4, index,leftTime);
					return;
				}
			}
			int rebornlv = hero.getRebornlv();
			int[][] tiaojian = struct_bosszc_010.getTiaojian();
			if (rebornlv<tiaojian[0][0]||rebornlv>tiaojian[0][1]) {
				LogTool.warn("rebornlv<tiaojian[0][0]||rebornlv>tiaojian[0][1]", ZcBossHeroManager.class);
				return;
			}
			if (ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(hero.getId())) {
				ZcBossHeroSender.sendCmd_4454(hero.getId(), 2, index,0);
				LogTool.warn("JoinersMap().containsKey(hero.getId()):"+hero.getNameZoneid(), ZcBossHeroManager.class);
				return;
			}
			if (struct_bosszc_010.getLeixing()==1) {
				if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZCBOSS)) return;
				//????????????boss
				ZcBoss zcBoss = ZcBossLocalCache.getIns().getTreasureRaider(index);
				if (zcBoss==null) {
					LogTool.warn("zcBoss==null has wrong", ZcBossHeroManager.class);
					return;
				}
				if (zcBoss.getBossLastState()==ZcBossConst.STATUS_INIT) {
					ZcBossHeroSender.sendCmd_4454(hero.getId(), 5, index,0);
					return;
				}
				if (zcBoss.getBossLastState()!=ZcBossConst.STATUS_PRE&&zcBoss.getBossLastState()!=ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH) {
					LogTool.warn("State has wrong:"+zcBoss.getBossLastState(), ZcBossHeroManager.class);
					return;
				}

				List<Long> innerRoles = ZcBossLocalCache.getIns().getInnerRoles(zcBoss.getIndex());
				if (innerRoles.size()>=ZcBossConst.MAX_ROLES) {
					ZcBossHeroSender.sendCmd_4454(hero.getId(), 3, index,0);
					return;
				}
				ZcBossJoiner zcBossJoiner=new ZcBossJoiner();
				zcBossJoiner.setHid(hero.getId());
				zcBossJoiner.setInBossId(zcBoss.getIndex());
				FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
				long hpMax = finalFightAttr.getHpMax();
				zcBossJoiner.setHp(hpMax);
				zcBossJoiner.setHuDun(finalFightAttr.getHudun());
				
				ZcBossLocalCache.getIns().getZcBossJoinersMap().put(hero.getId(), zcBossJoiner);
				//GC ????????????boss?????? B:0??????1??????2?????????????????????????????????3????????????I:????????????
				ZcBossHeroSender.sendCmd_4454(hero.getId(), 0, zcBossJoiner.getInBossId(),0);
				ZcBossLocalCache.getIns().addEnterRole(hero.getId(), zcBoss.getIndex());
				int sceneUnitId=ZcBossLocalCache.getIns().getBossSceneUnitId(zcBoss.getIndex());
				if (zcBoss.getMapId()>0&&sceneUnitId>0) {
					ZcBossScene.getIns().in(hero, zcBoss.getMapId(), (int)sceneUnitId);
					zcBossHero.setBossIndex(index);
				}
				//???????????????
				String usesys = hero.getTempData().getAccount().getUsesys();
				FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
						hero.getTotalStrength(), SystemIdConst.ZCBOSS, hero.getZoneid(), hero.getPf(), usesys,
						hero.getReincarnationLevel());
			}else {
				zcBossHero.setBossIndex(index);
				CrossFunction.askCross(hero, SystemIdConst.CROSS_ZCBOSS);
				//???????????????
				String usesys = hero.getTempData().getAccount().getUsesys();
				FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
						hero.getTotalStrength(), SystemIdConst.CROSS_ZCBOSS, hero.getZoneid(), hero.getPf(), usesys,
						hero.getReincarnationLevel());
			}
			
		} catch (Exception e) {
			LogTool.error(e, ZcBossHeroManager.class, "join has wrong");
		}
		
	}
	public void battlehero(Hero hero, long atthid) {
		try {
			
			if (atthid==hero.getId()) {
				return;
			}
			if(!CrossZone.isCrossServer()){
				//??????
				if(!ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(hero.getId())) {
					LogTool.warn("JoinersMap().containsKey(hero.getId()) hid:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				ZcBossJoiner zcBossJoiner = ZcBossLocalCache.getIns().getZcBossJoinersMap().get(hero.getId());
				int inBossId = zcBossJoiner.getInBossId();
				Struct_bosszc_010 struct_bosszc_010 = Config_bosszc_010.getIns().get(inBossId);
				//??????
				if (struct_bosszc_010.getLeixing()==1) {
					if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZCBOSS)) return;
					ZcBoss zcBoss = ZcBossLocalCache.getIns().getBossMap().get(inBossId);
					int bossLastState = zcBoss.getBossLastState();
					
					if (bossLastState!=ZcBossConst.STATUS_PLAYER_PK&&bossLastState!=ZcBossConst.STATUS_KILL_BOSS) {
						ZcBossHeroSender.sendCmd_4466(hero.getId(), 2);
						LogTool.warn("battlehero State has wrong:"+zcBoss.getBossLastState(), ZcBossHeroManager.class);
						return;
					}
					if(!ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(atthid)) {
						LogTool.warn("JoinersMap().containsKey(atthid) hid:"+atthid, ZcBossHeroManager.class);
						return;
					}
					ZcBossJoiner zcBossJoiner2 = ZcBossLocalCache.getIns().getZcBossJoinersMap().get(atthid);
					if (zcBossJoiner2.getInBossId()!=inBossId) {
						LogTool.warn("zcBossJoiner2.getInBossId()!=inBossId "+zcBossJoiner2.getInBossId()+" inBossId:"+inBossId,  ZcBossHeroManager.class);
						return;
					}
					boolean inBattleOthA = BattleNewFunction.getIns().checkIsBattle(hero.getId());
					if (inBattleOthA) {
						LogTool.warn("inBattleOthA "+hero.getId(),  ZcBossHeroManager.class);
						return;
					}
					int timeBattleBegin = zcBossJoiner2.getTimeBattleBegin();
					boolean inBattleOthB = BattleNewFunction.getIns().checkIsBattle(atthid);
					int timeNow = TimeDateUtil.getCurrentTime()+2;//??????1???
					
					if( timeBattleBegin!=0&& timeBattleBegin+BattleConst.ATT_END_TIME < timeNow) {
						//??????????????????
					}else if(inBattleOthB) {
						//?????????????????????
						LogTool.warn("inBattleOthB "+hero.getId(),  ZcBossHeroManager.class);
						ZcBossHeroSender.sendCmd_4466(hero.getId(), 1);
						return;
					}
					
					
					Hero heroTarget = HeroCache.getHero(atthid);
					if(heroTarget == null) {
						LogTool.warn("heroTarget == null "+atthid,  ZcBossHeroManager.class);
						return;
					}
					
					long hpMy = zcBossJoiner.getHp();
					long huDunMy = zcBossJoiner.getHuDun();
					long hpTarget = zcBossJoiner2.getHp();
					long huDunTarget = zcBossJoiner2.getHuDun();
					long battleId = BattleNewSysCache.getBattleUid();
					BattleNewFunction.getIns().startPVPBattle(hero, heroTarget, SystemIdConst.ZCBOSS, BttleTypeConst.ZCBOSS_PVP, hpMy, hpTarget, huDunMy, huDunTarget, battleId);
					zcBossJoiner.setTimeBattleBegin(timeNow);
					zcBossJoiner2.setTimeBattleBegin(timeNow);
					//[B:0????????? 1???boss B:1???????????? 0????????????L:??????id]
					Object[] breadSate=new Object[2];
					breadSate[0]=new Object[] {0,1,hero.getId()};
					breadSate[1]=new Object[] {0,1,atthid};
					ZcBossFunction.getIns().broadSates(inBossId,breadSate);
				}else {
					LogTool.warn("struct_bosszc_010.getLeixing()==1 :"+inBossId, ZcBossHeroManager.class);
					return;
				}
				
			}else {
				if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_ZCBOSS)) return;
				int zoneid = hero.getZoneid();
				int partId = CrossCache.getPartId(zoneid);
				//??????
				if (!ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).containsKey(hero.getId())) {
					LogTool.warn("JoinersMap().containsKey(hero.getId()) hid:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				ZcBossJoiner zcBossJoiner = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(hero.getId());
				int inBossId = zcBossJoiner.getInBossId();
				ZcBoss zcBoss = ZcBossCrossCache.getIns().getBossMap(partId).get(inBossId);
				int bossLastState = zcBoss.getBossLastState();
				
				if (bossLastState!=ZcBossConst.STATUS_PLAYER_PK&&bossLastState!=ZcBossConst.STATUS_KILL_BOSS) {
					ZcBossHeroSender.sendCmd_4466(hero.getId(), 2);
					LogTool.warn("battlehero State has wrong:"+zcBoss.getBossLastState(), ZcBossHeroManager.class);
					return;
				}
				if (!ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).containsKey(atthid)) {
					LogTool.warn("JoinersMap().containsKey(atthid) hid:"+atthid, ZcBossHeroManager.class);
					return;
				}
				ZcBossJoiner zcBossJoiner2 = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(atthid);
				if (zcBossJoiner2.getInBossId()!=inBossId) {
					LogTool.warn("zcBossJoiner2.getInBossId()!=inBossId "+zcBossJoiner2.getInBossId()+" inBossId:"+inBossId,  ZcBossHeroManager.class);
					return;
				}
				boolean inBattleOthA = BattleNewFunction.getIns().checkIsBattle(hero.getId());
				if (inBattleOthA) {
					LogTool.warn("inBattleOthA "+hero.getId(),  ZcBossHeroManager.class);
					return;
				}
				int timeBattleBegin = zcBossJoiner2.getTimeBattleBegin();
				boolean inBattleOthB = BattleNewFunction.getIns().checkIsBattle(atthid);
				int timeNow = TimeDateUtil.getCurrentTime()+2;//??????1???
				
				if( timeBattleBegin!=0&& timeBattleBegin+BattleConst.ATT_END_TIME < timeNow) {
					//??????????????????
				}else if(inBattleOthB) {
					//?????????????????????
					LogTool.warn("inBattleOthB "+hero.getId(),  ZcBossHeroManager.class);
					ZcBossHeroSender.sendCmd_4466(hero.getId(), 1);
					return;
				}
				
				Hero heroTarget = HeroCache.getHero(atthid);
				if(heroTarget == null) {
					LogTool.warn("heroTarget == null "+atthid,  ZcBossHeroManager.class);
					return;
				}
				
				long hpMy = zcBossJoiner.getHp();
				long huDunMy = zcBossJoiner.getHuDun();
				long hpTarget = zcBossJoiner2.getHp();
				long huDunTarget = zcBossJoiner2.getHuDun();
				long battleId = BattleNewSysCache.getBattleUid();
				BattleNewFunction.getIns().startPVPBattle(hero, heroTarget, SystemIdConst.CROSS_ZCBOSS, BttleTypeConst.ZCBOSS_PVP, hpMy, hpTarget, huDunMy, huDunTarget, battleId);
				zcBossJoiner.setTimeBattleBegin(timeNow);
				zcBossJoiner2.setTimeBattleBegin(timeNow);
				//[B:0????????? 1???boss B:1???????????? 0????????????L:??????id]
				Object[] breadSate=new Object[2];
				breadSate[0]=new Object[] {0,1,hero.getId()};
				breadSate[1]=new Object[] {0,1,atthid};
				ZcBossCrossFunction.getIns().broadSates(inBossId, breadSate, partId);
			}
			
			
		} catch (Exception e) {
			LogTool.error(e, ZcBossHeroManager.class, "join has wrong");
		}
		
	}
	/**
	 * ??????boss
	 * @param hero
	 */
	public void battleboss(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZCBOSS)) return;
				//??????
				if(!ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(hero.getId())) {
					LogTool.warn("JoinersMap().containsKey(hero.getId()) hid:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				ZcBossJoiner zcBossJoiner = ZcBossLocalCache.getIns().getZcBossJoinersMap().get(hero.getId());
				int inBossId = zcBossJoiner.getInBossId();
				Struct_bosszc_010 struct_bosszc_010 = Config_bosszc_010.getIns().get(inBossId);
				//??????
				if (struct_bosszc_010.getLeixing()==1) {
				if(!ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(hero.getId())) {
					LogTool.warn("JoinersMap().containsKey(hero.getId()) hid:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				ZcBoss zcBoss = ZcBossLocalCache.getIns().getBossMap().get(inBossId);
				int bossLastState = zcBoss.getBossLastState();
				
				if (bossLastState!=ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH&&bossLastState!=ZcBossConst.STATUS_KILL_BOSS) {
					ZcBossHeroSender.sendCmd_4466(hero.getId(), 2);
					LogTool.warn("battleboss State has wrong:"+zcBoss.getBossLastState(), ZcBossHeroManager.class);
					return;
				}
				//boss???????????????
				
				//boss??????????????????
				int timeBattleBegin = zcBoss.getTimeBattleBegin();
				int timeNow = TimeDateUtil.getCurrentTime();//??????1???
				if( timeBattleBegin!=0&& timeBattleBegin+BattleConst.ATT_END_TIME >=timeNow) {
					//boss?????????
					LogTool.warn("battleboss inbattle "+hero.getId()+" duifangid:"+zcBoss.getBattleId(),  ZcBossHeroManager.class);
					ZcBossHeroSender.sendCmd_4460(hero.getId(), 1,0);
					return;
				}
				zcBoss.setBattleId(hero.getId());
				zcBoss.setTimeBattleBegin(timeNow);
				
				int npcid = zcBoss.getSysBossId();
				int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);// 0:?????????1????????????2????????????????????????
				Object[] breadSate=new Object[2];
				breadSate[0]=new Object[] {0,1,hero.getId()};
				breadSate[1]=new Object[] {1,1,inBossId};
				ZcBossFunction.getIns().broadSates(inBossId,breadSate);
				ZcBossHeroSender.sendCmd_4460(hero.getId(), 0,result);
			}else {
				LogTool.warn("struct_bosszc_010.getLeixing()==1 :"+inBossId, ZcBossHeroManager.class);
				return;
			}
			}else{
				int zoneid = hero.getZoneid();
				int partId = CrossCache.getPartId(zoneid);
				if (!ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).containsKey(hero.getId())) {
					LogTool.warn("JoinersMap().containsKey(hero.getId()) hid:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				ZcBossJoiner zcBossJoiner = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(hero.getId());
				int inBossId = zcBossJoiner.getInBossId();
				ZcBoss zcBoss = ZcBossCrossCache.getIns().getBossMap(partId).get(inBossId);
				int bossLastState = zcBoss.getBossLastState();
				
				if (bossLastState!=ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH&&bossLastState!=ZcBossConst.STATUS_KILL_BOSS) {
					ZcBossHeroSender.sendCmd_4466(hero.getId(), 2);
					LogTool.warn("battleboss State has wrong:"+zcBoss.getBossLastState(), ZcBossHeroManager.class);
					return;
				}
				//boss??????????????????
				int timeBattleBegin = zcBoss.getTimeBattleBegin();
				int timeNow = TimeDateUtil.getCurrentTime();//??????1???
				if( timeBattleBegin!=0&& timeBattleBegin+BattleConst.ATT_END_TIME >=timeNow) {
					//boss?????????
					LogTool.warn("battleboss inbattle "+hero.getId()+" duifangid:"+zcBoss.getBattleId(),  ZcBossHeroManager.class);
					ZcBossHeroSender.sendCmd_4460(hero.getId(), 1,0);
					return;
				}
				zcBoss.setBattleId(hero.getId());
				zcBoss.setTimeBattleBegin(timeNow);
				int npcid = zcBoss.getSysBossId();
				int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);// 0:?????????1????????????2????????????????????????
				Object[] breadSate=new Object[2];
				breadSate[0]=new Object[] {0,1,hero.getId()};
				breadSate[1]=new Object[] {1,1,inBossId};
				ZcBossCrossFunction.getIns().broadSates(inBossId, breadSate, partId);
				ZcBossHeroSender.sendCmd_4460(hero.getId(), 0,result);
				LogTool.info("battleboss88888+4", this);
			}
		} catch (Exception e) {
			LogTool.error(e, ZcBossHeroManager.class, "battleboss has wrong");
		}
		
	}
	public void battlerest(Hero hero, int battlerest) {
		try {
			//??????
			if (!CrossZone.isCrossServer()) {
				if(!ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(hero.getId())) {
					LogTool.warn("JoinersMap().containsKey(hero.getId()) hid:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				ZcBossJoiner zcBossJoiner = ZcBossLocalCache.getIns().getZcBossJoinersMap().get(hero.getId());
				int inBossId = zcBossJoiner.getInBossId();
				ZcBoss zcBoss = ZcBossLocalCache.getIns().getBossMap().get(inBossId);
				int bossLastState = zcBoss.getBossLastState();
				ZcBossHero zcBossHero = hero.getZcBossHero();
				if (zcBossHero==null) {
					LogTool.warn("zcBossHero==null:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				if (bossLastState!=ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH&&bossLastState!=ZcBossConst.STATUS_KILL_BOSS) {
					LogTool.warn("battlerest State has wrong:"+zcBoss.getBossLastState(), ZcBossHeroManager.class);
					return;
				}
				long battleId = zcBoss.getBattleId();
				if (battleId!=hero.getId()) {
					LogTool.warn("battleId!=hero.getId():"+hero.getId()+" battleId:"+battleId, ZcBossHeroManager.class);
					return;
				}
				if (battlerest !=0) {
					//??????
					Struct_bosszc_010 bosszc_010 =Config_bosszc_010.getIns().get(inBossId);
					List<Object[]> dropTips = new ArrayList<Object[]>();
					List<ProbabilityEventModel> bossDropData =ExcelJsonUtils.getGeneralDropData(bosszc_010.getDiaoluo());
					
					int size = bossDropData.size();
					List<int[]> dropArr = new ArrayList<int[]>();
					if (!zcBossHero.getHasKill().contains(inBossId)) {
						//???????????????
						int[][] first = bosszc_010.getFirst();
						for (int i = 0; i < first.length; i++) {
							int[] js = first[i];
							dropArr.add(new int[] {js[0], js[1], js[2]});
							dropTips.add(new Object[] { js[0], js[1], js[2],1});
						}
					}
					for (int i = 0; i < size; i++) {
						ProbabilityEventModel pe = bossDropData.get(i);
						int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
						if (js != null) {
							int type = js[0];
							if (type == GameConst.GENDROP) {
								int num = js[2];
								ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
								for (int j = 1; j <= num; j++) {
									js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
									dropArr.add(js);
									dropTips.add(new Object[] { js[0], js[1], js[2],0});
								}
							} else {
								dropArr.add(js);
								dropTips.add(new Object[] { js[0], js[1], js[2],0});
							}
						}
					}
					int[][] drops = new int[dropArr.size()][];
					dropArr.toArray(drops);
					if (UseAddUtil.canAdd(hero, drops, true)) {
						UseAddUtil.add(hero, drops, SourceGoodConst.ZCBOSS_WIN_DROP, UseAddUtil.getDefaultMail(), false);
					}
					//????????????
					ZcBossHeroSender.sendCmd_4468(hero.getId(), 0, dropTips.toArray());
					// ????????????
					WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_3, 1);
					// ????????????(??????)
					WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_3, 1);
					int currTime=TimeDateUtil.getCurrentTime();
					int frushTime=bosszc_010.getShuaxin();
					zcBoss.setSwitchStateTime(currTime);
					zcBoss.setLastKillTime(currTime);
					zcBoss.setNextBosstime(currTime+frushTime);
					zcBoss.setBossLastState(ZcBossConst.STATUS_INIT);
					zcBoss.setSkillid(hero.getId());
					zcBoss.setRoleName(hero.getNameZoneid());
					if (!zcBossHero.getHasKill().contains(inBossId)) {
						zcBossHero.getHasKill().add(inBossId);
					}
					if(zcBoss.isFirst()){
						zcBoss.setFirst(false);
					}
					//????????????
					ZcBossHeroManager.getIns().quit(hero);
					//???????????????????????????
					ConcurrentHashMap<Long, ZcBossJoiner> zcBossJoinersMap = ZcBossLocalCache.getIns().getZcBossJoinersMap();
					for (ZcBossJoiner zcJoiner: zcBossJoinersMap.values()) {
						if (zcJoiner.getInBossId()==inBossId) {
							Hero h = HeroCache.getHero(zcJoiner.getHid());
							if (h!=null) {
								ZcBossHeroManager.getIns().quit(h);
								ZcBossHeroSender.sendCmd_4472(h.getId());
							}
						}
					}
					ZcBossLocalCache.getIns().getInnerRoles(inBossId).clear();
					//??????npc
					SceneFunction.getIns().removeNpcFromScene(zcBoss.getUnitBossId());
					
					ZcBossFunction.getIns().newChangeBossStatus();
					
				}else {
					//???????????? ????????????
					zcBoss.setBattleId(0);
					zcBoss.setTimeBattleBegin(0);
					ZcBossJoiner failZcBossJoiner = ZcBossLocalCache.getIns().getZcBossJoinersMap().get(hero.getId());
					if (failZcBossJoiner!=null) {
						//????????????????????????
						ZcBossHeroManager.getIns().quit(hero);
					}
					Object[] breadSate=new Object[2];
					breadSate[0]=new Object[] {0,0,hero.getId()};
					breadSate[1]=new Object[] {1,0,inBossId};
					ZcBossFunction.getIns().broadSates(inBossId,breadSate);
				}
				
			}else {
				int zoneid = hero.getZoneid();
				int partId = CrossCache.getPartId(zoneid);
				if (!ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).containsKey(hero.getId())) {
					LogTool.warn("JoinersMap().containsKey(hero.getId()) hid:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				ZcBossJoiner zcBossJoiner = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(hero.getId());
				int inBossId = zcBossJoiner.getInBossId();
				ZcBoss zcBoss = ZcBossCrossCache.getIns().getBossMap(partId).get(inBossId);
				int bossLastState = zcBoss.getBossLastState();
				
				if (bossLastState!=ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH&&bossLastState!=ZcBossConst.STATUS_KILL_BOSS) {
					LogTool.warn("battlerest State has wrong:"+zcBoss.getBossLastState(), ZcBossHeroManager.class);
					return;
				}
				long battleId = zcBoss.getBattleId();
				if (battleId!=hero.getId()) {
					LogTool.warn("battleId!=hero.getId():"+hero.getId()+" battleId:"+battleId, ZcBossHeroManager.class);
					return;
				}
				if (battlerest !=0) {
					//??????
					Struct_bosszc_010 bosszc_010 =Config_bosszc_010.getIns().get(inBossId);
					List<Object[]> dropTips = new ArrayList<Object[]>();
					List<ProbabilityEventModel> bossDropData =ExcelJsonUtils.getGeneralDropData(bosszc_010.getDiaoluo());
					
					int size = bossDropData.size();
					List<int[]> dropArr = new ArrayList<int[]>();
					ZcBossHero zcBossHero = hero.getZcBossHero();
					
					if (!zcBossHero.getHasKill().contains(inBossId)) {
						//???????????????
						int[][] first = bosszc_010.getFirst();
						for (int i = 0; i < first.length; i++) {
							int[] js = first[i];
							dropArr.add(new int[] {js[0], js[1], js[2]});
							dropTips.add(new Object[] { js[0], js[1], js[2],1});
						}
					}
					for (int i = 0; i < size; i++) {
						ProbabilityEventModel pe = bossDropData.get(i);
						int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
						if (js != null) {
							int type = js[0];
							if (type == GameConst.GENDROP) {
								int num = js[2];
								ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
								for (int j = 1; j <= num; j++) {
									js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
									dropArr.add(js);
									dropTips.add(new Object[] { js[0], js[1], js[2],0});
								}
							} else {
								dropArr.add(js);
								dropTips.add(new Object[] { js[0], js[1], js[2],0});
							}
						}
					}
					if (dropArr.size()==0) {
						LogTool.warn(" dropArr.size()==0 :"+hero.getId()+" name:"+hero.getNameZoneid(), ZcBossHeroManager.class);
					}
					int[][] drops = new int[dropArr.size()][];
					dropArr.toArray(drops);
					if (UseAddUtil.canAdd(hero, drops, true)) {
						UseAddUtil.add(hero, drops, SourceGoodConst.ZCBOSS_WIN_DROP, UseAddUtil.getDefaultMail(), false);
					}
					//????????????
					ZcBossHeroSender.sendCmd_4468(hero.getId(), 0, dropTips.toArray());
					
					int currTime=TimeDateUtil.getCurrentTime();
					int frushTime=bosszc_010.getShuaxin();
					zcBoss.setSwitchStateTime(currTime);
					zcBoss.setLastKillTime(currTime);
					zcBoss.setNextBosstime(currTime+frushTime);
					zcBoss.setBossLastState(ZcBossConst.STATUS_INIT);
					zcBoss.setSkillid(hero.getId());
					zcBoss.setRoleName(hero.getNameZoneid());
					
					if (!zcBossHero.getHasKill().contains(inBossId)) {
						zcBossHero.getHasKill().add(inBossId);
						//????????????
						ZcBossCrossIO.getIns().noticeAddFristKill(hero, inBossId);
					}
					ZcBossCrossIO.getIns().noticeAddKill(hero);
					if(zcBoss.isFirst()){
						zcBoss.setFirst(false);
					}
					//????????????
					ZcBossHeroManager.getIns().quit(hero);
					//???????????????????????????
					ConcurrentHashMap<Long, ZcBossJoiner> zcBossJoinersMap = ZcBossCrossCache.getIns()
							.getZcBossJoinersMap(partId);
					for (ZcBossJoiner zcJoiner: zcBossJoinersMap.values()) {
						if (zcJoiner.getInBossId()==inBossId) {
							Hero h = HeroCache.getHero(zcJoiner.getHid());
							if (h!=null) {
								ZcBossHeroManager.getIns().quit(h);
								ZcBossHeroSender.sendCmd_4472(h.getId());
							}
						}
					}
					ZcBossCrossCache.getIns().getInnerRoles(inBossId, partId).clear();
					//??????npc
					SceneFunction.getIns().removeNpcFromScene(zcBoss.getUnitBossId());
					
					ZcBossCrossFunction.getIns().newChangeCrossBossStatus(inBossId, partId);
					
				}else {
					//???????????? ????????????
					zcBoss.setBattleId(0);
					zcBoss.setTimeBattleBegin(0);
					ZcBossJoiner failZcBossJoiner = ZcBossLocalCache.getIns().getZcBossJoinersMap().get(hero.getId());
					if (failZcBossJoiner!=null) {
						//????????????????????????
						ZcBossHeroManager.getIns().quit(hero);
					}
					Object[] breadSate=new Object[2];
					breadSate[0]=new Object[] {0,0,hero.getId()};
					breadSate[1]=new Object[] {1,0,inBossId};
					ZcBossCrossFunction.getIns().broadSates(inBossId, breadSate, partId);
				}
			}
			
			
		} catch (Exception e) {
			LogTool.error(e, ZcBossHeroManager.class, "battlerest has wrong");
		}
		
	}
	
	
	public void quit(Hero hero) {
		try {
			ZcBossHero zcBossHero=hero.getZcBossHero();
			if (zcBossHero.getJoinTime()==null) {
				zcBossHero.setJoinTime(new HashMap<>());
			}
			//??????
			if (!CrossZone.isCrossServer()) {
				if(!ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(hero.getId())) {
					LogTool.warn("JoinersMap().containsKey(hero.getId()) hid:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				ZcBossJoiner zcBossJoiner = ZcBossLocalCache.getIns().getZcBossJoinersMap().get(hero.getId());
				int inBossId = zcBossJoiner.getInBossId();
				ZcBoss zcBoss = ZcBossLocalCache.getIns().getBossMap().get(inBossId);
				long battleId = zcBoss.getBattleId();
				if (battleId==hero.getId()) {
					//?????????boss ????????????
					zcBoss.setBattleId(0);
					zcBoss.setTimeBattleBegin(0);
					
					Object[] breadSate=new Object[2];
					breadSate[0]=new Object[] {0,0,hero.getId()};
					breadSate[1]=new Object[] {1,0,inBossId};
					ZcBossFunction.getIns().broadSates(inBossId,breadSate);
				}
				ZcBossLocalCache.getIns().getZcBossJoinersMap().remove(zcBossJoiner.getHid());
				ZcBossLocalCache.getIns().removeEnterRole(hero.getId(), zcBoss.getIndex());
				SceneFunction.getIns().exitScene(hero, true);
				zcBossHero.getJoinTime().put(zcBoss.getIndex(), TimeDateUtil.getCurrentTime());
			}else {
				int zoneid = hero.getZoneid();
				int partId = CrossCache.getPartId(zoneid);
				if (!ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).containsKey(hero.getId())) {
					LogTool.warn("JoinersMap().containsKey(hero.getId()) hid:"+hero.getId(), ZcBossHeroManager.class);
					return;
				}
				ZcBossJoiner zcBossJoiner = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(hero.getId());
				int inBossId = zcBossJoiner.getInBossId();
				ZcBoss zcBoss = ZcBossCrossCache.getIns().getBossMap(partId).get(inBossId);
				long battleId = zcBoss.getBattleId();
				if (battleId==hero.getId()) {
					//?????????boss ????????????
					zcBoss.setBattleId(0);
					zcBoss.setTimeBattleBegin(0);
					
					Object[] breadSate=new Object[2];
					breadSate[0]=new Object[] {0,0,hero.getId()};
					breadSate[1]=new Object[] {1,0,inBossId};
					ZcBossCrossFunction.getIns().broadSates(inBossId, breadSate, partId);
				}
				ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).remove(zcBossJoiner.getHid());
				ZcBossCrossCache.getIns().removeEnterRole(hero.getId(), zcBoss.getIndex(), partId);
				ZcBossCrossScene.getIns().out(hero);
				zcBossHero.getJoinTime().put(zcBoss.getIndex(), TimeDateUtil.getCurrentTime());
				//????????????????????????
				ZcBossCrossIO.getIns().noticeQuit(hero, zcBoss.getIndex());
				//??????????????????boss
				CrossSender.sendCmd_1666(hero.getId(), SystemIdConst.CROSS_ZCBOSS);
			}
		} catch (Exception e) {
			LogTool.error(e, ZcBossHeroManager.class, "quit has wrong");
		}
	}
	
	

}
