package com.teamtop.system.zcBoss.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.zcBoss.ZcBoss;
import com.teamtop.system.zcBoss.ZcBossConst;
import com.teamtop.system.zcBoss.ZcBossFunction;
import com.teamtop.system.zcBoss.ZcBossHero;
import com.teamtop.system.zcBoss.ZcBossHeroSender;
import com.teamtop.system.zcBoss.ZcBossJoiner;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bosszc_010;
import excel.struct.Struct_bosszc_010;

public class ZcBossCrossFunction {
	
	private static ZcBossCrossFunction zcBossCrossFunction;

	private ZcBossCrossFunction() {
		
	}
	public static synchronized ZcBossCrossFunction getIns() {
		if (zcBossCrossFunction == null) {
			zcBossCrossFunction = new ZcBossCrossFunction();
		}
		return zcBossCrossFunction;
	}
	// 是否刚开启服务器
	private boolean isStartServer = true;
	
	public boolean isStartServer() {
		return isStartServer;
	}

	public void setStartServer(boolean isStartServer) {
		this.isStartServer = isStartServer;
	}
	/**
	 * 初始化跨服战场boss
	 */
	public void initCrossZcBoss() {
		try {
			for (Struct_bosszc_010 bosszc_010 : Config_bosszc_010.getIns().getSortList()) {
				if (bosszc_010.getLeixing()!=2) {
					continue;
				}
				Iterator<Integer> iterator = CrossPartCache.getPartMap().keySet().iterator();
				for(;iterator.hasNext();) {
					int partId = iterator.next();
					ZcBoss trra = new ZcBoss(bosszc_010.getBianhao(), bosszc_010.getDitu(),ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH);
					trra.setFirst(true);
					ZcBossCrossCache.getIns().initCache(trra, partId);
				}
			}
			Iterator<Integer> iterator = CrossPartCache.getPartMap().keySet().iterator();
			for (; iterator.hasNext();) {
				int partId = iterator.next();
				ConcurrentHashMap<Long, ZcBossJoiner> zcBossJoinersMap = new ConcurrentHashMap<>();
				ZcBossCrossCache.getIns().setZcBossJoinersMap(zcBossJoinersMap, partId);
			}
		} catch (Exception e) {
			LogTool.error(e, ZcBossCrossFunction.class, "initCrossZcBoss has wrong");
		}
		
	}
	public void newChangeCrossBossStatus(int killIndex, int partId) {
		int currTime = TimeDateUtil.getCurrentTime();
		ConcurrentHashMap<Integer, ZcBoss> bossMap = ZcBossCrossCache.getIns().getBossMap(partId);
		ArrayList<Integer> changeState=new ArrayList<>();
		for (Integer k : bossMap.keySet()) {
			Struct_bosszc_010 bosszc_010 =Config_bosszc_010.getIns().get(k);
			ZcBoss trra = bossMap.get(k);
			
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
			//当前时间所处那个时间段的刷新boss
			int openDoorTime=0;
			int size=beginTimeMap.size();
			if (currTime<beginTimeMap.get(0)) {
				//昨晚开启的
				Integer lastTime = beginTimeMap.get(size-1)-24*3600;
				openDoorTime=lastTime;
			}else {
				/*if (2009==k) {
					System.err.println("中央服时间："+TimeDateUtil.printTime(currTime)+" 秒 "+currTime);
				}*/
				for (int i = 0; i < size; i++) {
					if (i!=size-1&&currTime>=beginTimeMap.get(i)&&currTime<beginTimeMap.get(i+1)) {
						openDoorTime=beginTimeMap.get(i);
					}else if (i==size-1&&currTime>=beginTimeMap.get(i)) {
						openDoorTime=beginTimeMap.get(i);
					} 
					
				}
				/*if (2009==k) {
					System.err.println("中央服时间："+TimeDateUtil.printTime(currTime)+" 秒 "+currTime +"openDoorTime:"+openDoorTime);
				}*/
			}
			if (openDoorTime==0) {
				LogTool.warn("warn warn openDoorTine==0 index:"+k, ZcBossFunction.class);
				continue;
			}
			int closeDoorTime=openDoorTime+ZcBossConst.TIME_PK_GAP;
			
			int frushBossTime=openDoorTime+ZcBossConst.TIME_PK_GAP+ZcBossConst.TIME_FRESH_GAP;
			
			int openDoorTimeTwo=openDoorTime+ZcBossConst.TIME_PK_GAP+ZcBossConst.TIME_FRESH_GAP+ZcBossConst.TIME_OVER_GAP;
			
			int sceneSysId=bosszc_010.getDitu();
			int bossId = bosszc_010.getId(); 
			if (!trra.isFirst()) {
				if (currTime>=openDoorTime&&currTime<closeDoorTime) {
					//进入时间
					if (trra.getBossLastState() ==ZcBossConst.STATUS_INIT) {
						trra.setBossLastState(ZcBossConst.STATUS_PRE);
						trra.setSwitchStateTime(currTime);
						if (!changeState.contains(k)&&bosszc_010.getGuangbo()==1) {
							changeState.add(k);
						}
						LogTool.info("zcCrossbossId:"+ trra.getIndex()+" state:"+trra.getBossLastState()+" changeTime:"+TimeDateUtil.printTime(trra.getSwitchStateTime()), ZcBossCrossFunction.class);
					}
					
				}else if (currTime>=closeDoorTime&&currTime<frushBossTime) {
					//关入口
					if (trra.getBossLastState() == ZcBossConst.STATUS_PRE) {
						trra.setBossLastState(ZcBossConst.STATUS_PLAYER_PK);
						trra.setSwitchStateTime(currTime);
						if (!changeState.contains(k)&&bosszc_010.getGuangbo()==1) {
							changeState.add(k);
						}
						LogTool.info("zcCrossbossId:"+ trra.getIndex()+" state:"+trra.getBossLastState()+" changeTime:"+TimeDateUtil.printTime(trra.getSwitchStateTime()), ZcBossCrossFunction.class);
					}
					
				}else if(currTime>=frushBossTime&&currTime<openDoorTimeTwo) {
					//刷出boss
					if (trra.getBossLastState() == ZcBossConst.STATUS_PLAYER_PK) {
						trra.setBossLastState(ZcBossConst.STATUS_KILL_BOSS);
						trra.setSwitchStateTime(currTime);
						trra.setSysBossId(bossId);
						if (!changeState.contains(k)&&bosszc_010.getGuangbo()==1) {
							changeState.add(k);
						}
						final int sceneUnitId = ZcBossCrossCache.getIns().getBossSceneUnitId(k, partId);
						NPC npc=SceneFunction.getIns().addNpcToScene(bossId, ZcBossConst.POS_X,ZcBossConst.POS_Y, -1, sceneUnitId, sceneSysId, true);
						trra.setUnitBossId(npc.getId());
						LogTool.info("zcCrossbossId:"+ trra.getIndex()+" state:"+trra.getBossLastState()+" changeTime:"+TimeDateUtil.printTime(trra.getSwitchStateTime()), ZcBossCrossFunction.class);
					}
				}else  if (currTime>=openDoorTimeTwo) {
					//大开入口
					if (trra.getBossLastState() == ZcBossConst.STATUS_KILL_BOSS) {
						trra.setBossLastState(ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH);
						trra.setSwitchStateTime(currTime);
						if (!changeState.contains(k)&&bosszc_010.getGuangbo()==1) {
							changeState.add(k);
						}
						LogTool.info("zcCrossbossId:"+ trra.getIndex()+" state:"+trra.getBossLastState()+" changeTime:"+TimeDateUtil.printTime(trra.getSwitchStateTime()), ZcBossCrossFunction.class);
					}
					
				}
				
				
			}else {
				if (isStartServer) {
					trra.setSysBossId(bossId);
					trra.setSwitchStateTime(currTime);
					final int sceneUnitId = ZcBossCrossCache.getIns().getBossSceneUnitId(k, partId);
					//int[] coordinate=SceneEventFunction.getNewPosByRandom(sceneSysId);
					NPC npc=SceneFunction.getIns().addNpcToScene(bossId,ZcBossConst.POS_X,ZcBossConst.POS_Y, -1, sceneUnitId, sceneSysId, true);
					trra.setUnitBossId(npc.getId());
//					LogTool.info("bossId:"+bossId+" UnitBossId:"+npc.getId()+" sceneSysId:"+sceneSysId+" sceneUnitId:"+sceneUnitId, ZcBossCrossFunction.class);
				}
			}
			
			

		}
		// 向boss副本里面的玩家发送副本的状态及该状态倒计时
		for (ZcBoss trra : bossMap.values()) {
			/*Struct_bosszc_010 bosszc_010 =Config_bosszc_010.getIns().get(trra.getIndex());
			int frushTime=bosszc_010.getShuaxin();
			int waiterTime=frushTime-ZcBossConst.TIME_PK_GAP-ZcBossConst.TIME_FRESH_GAP;*/
			if (!trra.isFirst()) {
				int useTime = (int) (currTime - trra.getSwitchStateTime());
				int remainTime=0;
				if(trra.getBossLastState() == ZcBossConst.STATUS_PRE){
					remainTime = ZcBossConst.TIME_PK_GAP - useTime;
				}else if (trra.getBossLastState() == ZcBossConst.STATUS_PLAYER_PK) {
					remainTime = ZcBossConst.TIME_FRESH_GAP - useTime;
				}else if (trra.getBossLastState() == ZcBossConst.STATUS_KILL_BOSS) {
					remainTime = ZcBossConst.TIME_OVER_GAP - useTime;
				}
				if (remainTime<0) {
					remainTime=0;
				}
				List<Long> roleIds = ZcBossCrossCache.getIns().getInnerRoles(trra.getIndex(), partId);
				for (Long r : roleIds) {
					ZcBossHeroSender.sendCmd_4456(r, trra.getIndex(), trra.getBossLastState(),(int)remainTime);
				}
			}

		}
		ConcurrentHashMap<Integer, ZcBoss> 	changeBossStateMap=new ConcurrentHashMap<Integer, ZcBoss>();
		if (changeState.size()>0||killIndex>0) {
			for (int i = 0; i < changeState.size(); i++) {
				int index = changeState.get(i);
				ZcBoss zcBoss = ZcBossCrossCache.getIns().getBossMap(partId).get(index);
				changeBossStateMap.put(index, zcBoss);
			}
			if (!changeBossStateMap.containsKey(killIndex)&&killIndex>0) {
				ZcBoss zcBoss = ZcBossCrossCache.getIns().getBossMap(partId).get(killIndex);
				changeBossStateMap.put(killIndex, zcBoss);
			}
			ZcBossCrossIO.getIns().noticeState(changeBossStateMap, partId);
		}
		// if (isStartServer) {
		// isStartServer = false;
		// }

	}
	
	/**
	 *  检查修改跨服副本状态
	 */
	public void changeCrossBossStatus(int killIndex, int partId) {
		int currTime = TimeDateUtil.getCurrentTime();
		ConcurrentHashMap<Integer, ZcBoss> bossMap = ZcBossCrossCache.getIns().getBossMap(partId);
		ArrayList<Integer> changeState=new ArrayList<>();
		for (Integer k : bossMap.keySet()) {
			Struct_bosszc_010 bosszc_010 =Config_bosszc_010.getIns().get(k);
			ZcBoss trra = bossMap.get(k);
			int frushTime=bosszc_010.getShuaxin();
			int sceneSysId=bosszc_010.getDitu();
			int bossId = bosszc_010.getId();
			int waiterTime=frushTime-ZcBossConst.TIME_PK_GAP-ZcBossConst.TIME_FRESH_GAP;
			if (!trra.isFirst()) {
				int gapTime = currTime - trra.getLastKillTime();
				//System.err.println(currTime);
				if (gapTime < waiterTime) {
					if (trra.getBossLastState() != ZcBossConst.STATUS_INIT) {
						trra.setBossLastState(ZcBossConst.STATUS_INIT);
						trra.setSwitchStateTime(currTime);
						if (!changeState.contains(k)&&bosszc_010.getGuangbo()==1) {
							changeState.add(k);
						}
					}

				} else if (gapTime >= waiterTime&& gapTime < ZcBossConst.TIME_PK_GAP+waiterTime) {
					if (trra.getBossLastState() == ZcBossConst.STATUS_INIT) {
						trra.setBossLastState(ZcBossConst.STATUS_PRE);
						trra.setSwitchStateTime(currTime);
						if (!changeState.contains(k)&&bosszc_010.getGuangbo()==1) {
							changeState.add(k);
						}
					}

				} else if (gapTime >= ZcBossConst.TIME_PK_GAP+waiterTime&& gapTime < frushTime) {
					if (trra.getBossLastState() == ZcBossConst.STATUS_PRE) {
						trra.setBossLastState(ZcBossConst.STATUS_PLAYER_PK);
						trra.setSwitchStateTime(currTime);
						if (!changeState.contains(k)&&bosszc_010.getGuangbo()==1) {
							changeState.add(k);
						}
					}

				} else if (gapTime >= frushTime&& gapTime <=frushTime+ ZcBossConst.TIME_OVER_GAP) {
					if (trra.getBossLastState() == ZcBossConst.STATUS_PLAYER_PK) {
						trra.setBossLastState(ZcBossConst.STATUS_KILL_BOSS);
						trra.setSwitchStateTime(currTime);
						trra.setSysBossId(bossId);
						if (!changeState.contains(k)&&bosszc_010.getGuangbo()==1) {
							changeState.add(k);
						}
						final int sceneUnitId = ZcBossCrossCache.getIns().getBossSceneUnitId(k, partId);
						//int[] coordinate=SceneEventFunction.getNewPosByRandom(sceneSysId);
						NPC npc=SceneFunction.getIns().addNpcToScene(bossId, ZcBossConst.POS_X,ZcBossConst.POS_Y, -1, sceneUnitId, sceneSysId, true);
						trra.setUnitBossId(npc.getId());
						LogTool.info("bossId:"+bossId+" UnitBossId:"+npc.getId()+" sceneSysId:"+sceneSysId+" sceneUnitId:"+sceneUnitId, ZcBossCrossFunction.class);
					}

				} else if (gapTime >= frushTime+ ZcBossConst.TIME_OVER_GAP) {
					if (trra.getBossLastState() != ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH) {
						if (!changeState.contains(k)&&bosszc_010.getGuangbo()==1) {
							changeState.add(k);
						}
						trra.setBossLastState(ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH);
						trra.setSwitchStateTime(currTime);
					}

				}
			} else {
				if (isStartServer) {
					trra.setSysBossId(bossId);
					trra.setSwitchStateTime(currTime);
					final int sceneUnitId = ZcBossCrossCache.getIns().getBossSceneUnitId(k, partId);
					//int[] coordinate=SceneEventFunction.getNewPosByRandom(sceneSysId);
					NPC npc=SceneFunction.getIns().addNpcToScene(bossId,ZcBossConst.POS_X,ZcBossConst.POS_Y, -1, sceneUnitId, sceneSysId, true);
					trra.setUnitBossId(npc.getId());
					LogTool.info("bossId:"+bossId+" UnitBossId:"+npc.getId()+" sceneSysId:"+sceneSysId+" sceneUnitId:"+sceneUnitId, ZcBossCrossFunction.class);
				}
			}

		}
		// 向boss副本里面的玩家发送副本的状态及该状态倒计时
		for (ZcBoss trra : bossMap.values()) {
			/*Struct_bosszc_010 bosszc_010 =Config_bosszc_010.getIns().get(trra.getIndex());
			int frushTime=bosszc_010.getShuaxin();
			int waiterTime=frushTime-ZcBossConst.TIME_PK_GAP-ZcBossConst.TIME_FRESH_GAP;*/
			if (!trra.isFirst()) {
				int useTime = (int) (currTime - trra.getSwitchStateTime());
				int remainTime=0;
				if(trra.getBossLastState() == ZcBossConst.STATUS_PRE){
					remainTime = ZcBossConst.TIME_PK_GAP - useTime;
				}else if (trra.getBossLastState() == ZcBossConst.STATUS_PLAYER_PK) {
					remainTime = ZcBossConst.TIME_FRESH_GAP - useTime;
				}else if (trra.getBossLastState() == ZcBossConst.STATUS_KILL_BOSS) {
					remainTime = ZcBossConst.TIME_OVER_GAP - useTime;
				}
				if (remainTime<0) {
					remainTime=0;
				}
				List<Long> roleIds = ZcBossCrossCache.getIns().getInnerRoles(trra.getIndex(), partId);
				for (Long r : roleIds) {
					ZcBossHeroSender.sendCmd_4456(r, trra.getIndex(), trra.getBossLastState(),(int)remainTime);
				}
			}

		}
		ConcurrentHashMap<Integer, ZcBoss> 	changeBossStateMap=new ConcurrentHashMap<Integer, ZcBoss>();
		if (changeState.size()>0||killIndex>0) {
			for (int i = 0; i < changeState.size(); i++) {
				int index = changeState.get(i);
				ZcBoss zcBoss = ZcBossCrossCache.getIns().getBossMap(partId).get(index);
				changeBossStateMap.put(index, zcBoss);
			}
			if (!changeBossStateMap.containsKey(killIndex)&&killIndex>0) {
				ZcBoss zcBoss = ZcBossCrossCache.getIns().getBossMap(partId).get(killIndex);
				changeBossStateMap.put(killIndex, zcBoss);
			}
			ZcBossCrossIO.getIns().noticeState(changeBossStateMap, partId);
		}
		if (isStartServer) {
			isStartServer = false;
		}
	}
	/**
	 * 进入跨服boss战场
	 * @param hero
	 * @param goalIndex
	 */
	public void joinCrossZcboss(Hero hero,int goalIndex) {
		try {
			Struct_bosszc_010 struct_bosszc_010 = Config_bosszc_010.getIns().get(goalIndex);
			if (struct_bosszc_010==null) {
				LogTool.warn("struct_bosszc_010==null has wrong", ZcBossCrossFunction.class);
				ZcBossHeroSender.sendCmd_4454(hero.getId(), 1, goalIndex,0);
				return ;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int curtime=TimeDateUtil.getCurrentTime();
			ZcBossHero zcBossHero=hero.getZcBossHero();
			if (zcBossHero.getJoinTime()!=null&&zcBossHero.getJoinTime().containsKey(goalIndex)) {
				Integer outTime = zcBossHero.getJoinTime().get(goalIndex);
				int leftTime=curtime-outTime;
				if (leftTime<9) {
					if (leftTime<0) {
						leftTime=-1;
					}
					leftTime=9-leftTime;
					ZcBossHeroSender.sendCmd_4454(hero.getId(), 4, goalIndex,leftTime);
					return ;
				}
			}
		
			if (ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).containsKey(hero.getId())) {
				ZcBossHeroSender.sendCmd_4454(hero.getId(), 2, goalIndex,0);
				LogTool.warn("JoinersMap().containsKey(hero.getId()):"+hero.getNameZoneid(), ZcBossCrossFunction.class);
				return;
			}
			if (struct_bosszc_010.getLeixing()==2) {
				//本服战场boss
				ZcBoss zcBoss = ZcBossCrossCache.getIns().getZcBossByIndex(goalIndex, partId);
				if (zcBoss==null) {
					LogTool.warn("zcBoss==null has wrong", ZcBossCrossFunction.class);
					return;
				}
				if (zcBoss.getBossLastState()==ZcBossConst.STATUS_INIT) {
					ZcBossHeroSender.sendCmd_4454(hero.getId(), 5, goalIndex,0);
					return;
				}
				if (zcBoss.getBossLastState()!=ZcBossConst.STATUS_PRE&&zcBoss.getBossLastState()!=ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH) {
					LogTool.warn("State has wrong:"+zcBoss.getBossLastState(), ZcBossCrossFunction.class);
					return;
				}

				List<Long> innerRoles = ZcBossCrossCache.getIns().getInnerRoles(zcBoss.getIndex(), partId);
				if (innerRoles.size()>=ZcBossConst.MAX_ROLES) {
					ZcBossHeroSender.sendCmd_4454(hero.getId(), 3, goalIndex,0);
					return;
				}
				ZcBossJoiner zcBossJoiner=new ZcBossJoiner();
				zcBossJoiner.setHid(hero.getId());
				zcBossJoiner.setInBossId(zcBoss.getIndex());
				FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
				long hpMax = finalFightAttr.getHpMax();
				zcBossJoiner.setHp(hpMax);
				zcBossJoiner.setHuDun(finalFightAttr.getHudun());
				
				ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).put(hero.getId(), zcBossJoiner);
				//GC 进入战场boss返回 B:0成功1失败2您已存在其他战场副本中3人数已满I:副本序号
				ZcBossHeroSender.sendCmd_4454(hero.getId(), 0, zcBossJoiner.getInBossId(),0);
				ZcBossCrossCache.getIns().addEnterRole(hero.getId(), zcBoss.getIndex(), partId);
				int sceneUnitId = ZcBossCrossCache.getIns().getBossSceneUnitId(zcBoss.getIndex(), partId);
				if (zcBoss.getMapId()>0&&sceneUnitId>0) {
					ZcBossCrossScene.getIns().in(hero, zcBoss.getMapId(), (int)sceneUnitId);
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, ZcBossCrossFunction.class, "joinCrossZcboss has wrong");
		}
	}
	
	
	  /**
     * 广播其他玩家的状态 已经boss状态
     * @param inBossId
     * @param breadSate
     */
	public void broadSates(int inBossId, Object[] breadSate, int partId) {
		try {
			List<Long> roleIds = ZcBossCrossCache.getIns().getInnerRoles(inBossId, partId);
			for (Long r : roleIds) {
				ZcBossJoiner zcBossJoiner = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(r);
				if (zcBossJoiner!=null&&zcBossJoiner.getInBossId()==inBossId) {
					ZcBossHeroSender.sendCmd_4470(zcBossJoiner.getHid(), breadSate);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ZcBossCrossFunction.class, "broadSates has wrong");
		}
		
	}
	
	
    

}
