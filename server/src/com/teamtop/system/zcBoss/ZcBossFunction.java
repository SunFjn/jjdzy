package com.teamtop.system.zcBoss;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.NPC.NPC;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bosszc_010;
import excel.struct.Struct_bosszc_010;


public class ZcBossFunction {
	
	private static ZcBossFunction zcBossFunction;

	private ZcBossFunction() {
		
	}
	public static synchronized ZcBossFunction getIns() {
		if (zcBossFunction == null) {
			zcBossFunction = new ZcBossFunction();
		}
		return zcBossFunction;
	}
	// 是否刚开启服务器
	private boolean isStartServer = true;

	/**
	 * 初始化本地服夺宝
	 */
	public void initBoss() {
		for (Struct_bosszc_010 bosszc_010 : Config_bosszc_010.getIns().getSortList()) {
			if (bosszc_010.getLeixing()!=1) {
				continue;
			}
			ZcBoss trra = new ZcBoss(bosszc_010.getBianhao(), bosszc_010.getDitu(),ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH);
			trra.setFirst(true);
			ZcBossLocalCache.getIns().initCache(trra);
		}

	}
	
	public void newChangeBossStatus() {
		int currTime = TimeDateUtil.getCurrentTime();
		ConcurrentHashMap<Integer, ZcBoss> bossMap = ZcBossLocalCache.getIns().getBossMap();
		ArrayList<Integer> broadList=new ArrayList<>();
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
				for (int i = 0; i < size; i++) {
					if (i!=size-1&&currTime>=beginTimeMap.get(i)&&currTime<beginTimeMap.get(i+1)) {
						openDoorTime=beginTimeMap.get(i);
					}else if (i==size-1&&currTime>=beginTimeMap.get(i)) {
						openDoorTime=beginTimeMap.get(i);
					} 
					
				}
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
				//特殊处理
				
				if (currTime>=openDoorTime&&currTime<closeDoorTime) {
					//进入时间
					if (trra.getBossLastState() ==ZcBossConst.STATUS_INIT) {
						trra.setBossLastState(ZcBossConst.STATUS_PRE);
						trra.setSwitchStateTime(currTime);
						if (!broadList.contains(k)&&bosszc_010.getGuangbo()==1) {
							broadList.add(k);
						}
					}
					
				}else if (currTime>=closeDoorTime&&currTime<frushBossTime) {
					//关入口
					if (trra.getBossLastState() == ZcBossConst.STATUS_PRE) {
						trra.setBossLastState(ZcBossConst.STATUS_PLAYER_PK);
						trra.setSwitchStateTime(currTime);
					}
					
				}else if(currTime>=frushBossTime&&currTime<openDoorTimeTwo) {
					//刷出boss
					if (trra.getBossLastState() == ZcBossConst.STATUS_PLAYER_PK) {
						trra.setBossLastState(ZcBossConst.STATUS_KILL_BOSS);
						trra.setSwitchStateTime(currTime);
						trra.setSysBossId(bossId);
						final int sceneUnitId = ZcBossLocalCache.getIns().getBossSceneUnitId(k);
						NPC npc=SceneFunction.getIns().addNpcToScene(bossId, ZcBossConst.POS_X,ZcBossConst.POS_Y, -1, sceneUnitId, sceneSysId, true);
						trra.setUnitBossId(npc.getId());
						LogTool.info("bossId:"+bossId+" UnitBossId:"+npc.getId()+" sceneSysId:"+sceneSysId+" sceneUnitId:"+sceneUnitId, ZcBossFunction.class);
					}
				}else  if (currTime>=openDoorTimeTwo) {
					//大开入口
					if (trra.getBossLastState() == ZcBossConst.STATUS_KILL_BOSS) {
						trra.setBossLastState(ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH);
						trra.setSwitchStateTime(currTime);
					}
					
				}
				
				
			}else {
				if (isStartServer) {
					trra.setSysBossId(bossId);
					trra.setSwitchStateTime(currTime);
					final int sceneUnitId = ZcBossLocalCache.getIns().getBossSceneUnitId(k);
					//int[] coordinate=SceneEventFunction.getNewPosByRandom(sceneSysId);
					NPC npc=SceneFunction.getIns().addNpcToScene(bossId,ZcBossConst.POS_X,ZcBossConst.POS_Y, -1, sceneUnitId, sceneSysId, true);
					trra.setUnitBossId(npc.getId());
					LogTool.info("bossId:"+bossId+" UnitBossId:"+npc.getId()+" sceneSysId:"+sceneSysId+" sceneUnitId:"+sceneUnitId, ZcBossFunction.class);
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
				List<Long> roleIds = ZcBossLocalCache.getIns().getInnerRoles(trra.getIndex());
				for (Long r : roleIds) {
					ZcBossHeroSender.sendCmd_4456(r, trra.getIndex(), trra.getBossLastState(),(int)remainTime);
				}
			}

		}
		if (broadList.size()>0) {
			for (int i = 0; i < broadList.size(); i++) {
				int index = broadList.get(i);
				Struct_bosszc_010 struct_bosszc_010 = Config_bosszc_010.getIns().get(index);
				int[][] tiaojian = struct_bosszc_010.getTiaojian();
				//广播
				ChatManager.getIns().boardCastByReborn(ChatConst.ZCBOSS_BROAD1, new Object[] {index}, tiaojian[0][0], tiaojian[0][1]);
				//提示
				Map<Long, Hero> roleCache = HeroCache.getHeroMap();
				Iterator<Hero> it = roleCache.values().iterator();
				while(it.hasNext()){
					Hero role = it.next();
					int rebornlv = role.getRebornlv();
					if (rebornlv>=tiaojian[0][0]&&rebornlv<=tiaojian[0][1]) {
						GlobalSender.sendCmd_264(role.getId(),SystemIdConst.ZCBOSS, index, 1);
					}
				}
			}
		}
		if (isStartServer) {
			isStartServer = false;
		}

	}
	
	
    
	/**
	 * 检查修改副本状态
	 */
	public void changeBossStatus() {
		int currTime = TimeDateUtil.getCurrentTime();
		ConcurrentHashMap<Integer, ZcBoss> bossMap = ZcBossLocalCache.getIns().getBossMap();
		ArrayList<Integer> broadList=new ArrayList<>();
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
					}

				} else if (gapTime >= waiterTime&& gapTime < ZcBossConst.TIME_PK_GAP+waiterTime) {
					if (trra.getBossLastState() == ZcBossConst.STATUS_INIT) {
						trra.setBossLastState(ZcBossConst.STATUS_PRE);
						trra.setSwitchStateTime(currTime);
						if (!broadList.contains(k)&&bosszc_010.getGuangbo()==1) {
							broadList.add(k);
						}
					}

				} else if (gapTime >= ZcBossConst.TIME_PK_GAP+waiterTime&& gapTime < frushTime) {
					if (trra.getBossLastState() == ZcBossConst.STATUS_PRE) {
						trra.setBossLastState(ZcBossConst.STATUS_PLAYER_PK);
						trra.setSwitchStateTime(currTime);
					}

				} else if (gapTime >= frushTime&& gapTime <=frushTime+ ZcBossConst.TIME_OVER_GAP) {
					if (trra.getBossLastState() == ZcBossConst.STATUS_PLAYER_PK) {
						trra.setBossLastState(ZcBossConst.STATUS_KILL_BOSS);
						trra.setSwitchStateTime(currTime);
						trra.setSysBossId(bossId);
						
						final int sceneUnitId = ZcBossLocalCache.getIns().getBossSceneUnitId(k);
						//int[] coordinate=SceneEventFunction.getNewPosByRandom(sceneSysId);
						NPC npc=SceneFunction.getIns().addNpcToScene(bossId, ZcBossConst.POS_X,ZcBossConst.POS_Y, -1, sceneUnitId, sceneSysId, true);
						trra.setUnitBossId(npc.getId());
						LogTool.info("bossId:"+bossId+" UnitBossId:"+npc.getId()+" sceneSysId:"+sceneSysId+" sceneUnitId:"+sceneUnitId, ZcBossFunction.class);
					}

				} else if (gapTime >= frushTime+ ZcBossConst.TIME_OVER_GAP) {
					if (trra.getBossLastState() != ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH) {
						trra.setBossLastState(ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH);
						trra.setSwitchStateTime(currTime);
					}

				}
			} else {
				if (isStartServer) {
					trra.setSysBossId(bossId);
					trra.setSwitchStateTime(currTime);
					final int sceneUnitId = ZcBossLocalCache.getIns().getBossSceneUnitId(k);
					//int[] coordinate=SceneEventFunction.getNewPosByRandom(sceneSysId);
					NPC npc=SceneFunction.getIns().addNpcToScene(bossId,ZcBossConst.POS_X,ZcBossConst.POS_Y, -1, sceneUnitId, sceneSysId, true);
					trra.setUnitBossId(npc.getId());
					LogTool.info("bossId:"+bossId+" UnitBossId:"+npc.getId()+" sceneSysId:"+sceneSysId+" sceneUnitId:"+sceneUnitId, ZcBossFunction.class);
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
				List<Long> roleIds = ZcBossLocalCache.getIns().getInnerRoles(trra.getIndex());
				for (Long r : roleIds) {
					ZcBossHeroSender.sendCmd_4456(r, trra.getIndex(), trra.getBossLastState(),(int)remainTime);
				}
			}

		}
		if (broadList.size()>0) {
			for (int i = 0; i < broadList.size(); i++) {
				int index = broadList.get(i);
				Struct_bosszc_010 struct_bosszc_010 = Config_bosszc_010.getIns().get(index);
				int[][] tiaojian = struct_bosszc_010.getTiaojian();
				//广播
				ChatManager.getIns().boardCastByReborn(ChatConst.ZCBOSS_BROAD1, new Object[] {index}, tiaojian[0][0], tiaojian[0][1]);
				//提示
				Map<Long, Hero> roleCache = HeroCache.getHeroMap();
				Iterator<Hero> it = roleCache.values().iterator();
				while(it.hasNext()){
					Hero role = it.next();
					int rebornlv = role.getRebornlv();
					if (rebornlv>=tiaojian[0][0]&&rebornlv<=tiaojian[0][1]) {
						GlobalSender.sendCmd_264(role.getId(),SystemIdConst.ZCBOSS, index, 1);
					}
				}
			}
		}
		if (isStartServer) {
			isStartServer = false;
		}

	}
    
    /**
     * 重置生死夺宝所有副本到开服状态
     */
    public void resetAllTreasureRaidersBoss(){
         //移除boss副本中已经刷新出来的boss
         ConcurrentHashMap<Integer, ZcBoss> bossMap = ZcBossLocalCache.getIns().getBossMap();
         for(ZcBoss trra: bossMap.values()){
        	 int npcSysId= trra.getSysBossId();
        	 Long sceneUnitId = (long) ZcBossLocalCache.getIns().getBossSceneUnitId(trra.getMapId());
        	 Long npcUnitId=SceneCache.getBattleNpcUnitId(sceneUnitId, npcSysId);
        	 if(npcUnitId!=null&&npcUnitId!=0){
        		 SceneFunction.getIns().removeNpcFromScene( npcUnitId);
        	 }
        	 
         }
         initBoss();
    }
    /**
     * 广播其他玩家的状态 已经boss状态
     * @param inBossId
     * @param breadSate
     */
	public void broadSates(int inBossId, Object[] breadSate) {
		try {
			List<Long> roleIds = ZcBossLocalCache.getIns().getInnerRoles(inBossId);
			for (Long r : roleIds) {
				ZcBossJoiner zcBossJoiner = ZcBossLocalCache.getIns().getZcBossJoinersMap().get(r);
				if (zcBossJoiner!=null&&zcBossJoiner.getInBossId()==inBossId) {
					ZcBossHeroSender.sendCmd_4470(zcBossJoiner.getHid(), breadSate);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ZcBossFunction.class, "broadSates has wrong");
		}
		
	}

	
	public void isLocalReadPoint(Hero hero,boolean islogin) {
		try {
			for (Struct_bosszc_010 struct_bosszc_010:Config_bosszc_010.getIns().getSortList()) {
				if (struct_bosszc_010.getLeixing()!=1) {
					continue;
				}
				int rebornlv = hero.getRebornlv();
				int[][] tiaojian = struct_bosszc_010.getTiaojian();
				if (rebornlv<tiaojian[0][0]||rebornlv>tiaojian[0][1]) {
					continue;
				}
				ZcBoss zcBoss = ZcBossLocalCache.getIns().getTreasureRaider(struct_bosszc_010.getBianhao());
				if (zcBoss.getBossLastState()==ZcBossConst.STATUS_PRE||zcBoss.getBossLastState()==ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH) {
					if (islogin) {
						//红点
						RedPointFunction.getIns().addLoginRedPoint(hero,  SystemIdConst.ZCBOSS, ArchiveConst.RedPoint,
								RedPointConst.HAS_RED);
						return;
					}else {
						//红点
						RedPointFunction.getIns().updateRedPoint(hero,  SystemIdConst.ZCBOSS, ArchiveConst.RedPoint,
								RedPointConst.HAS_RED);
						return;
					}
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, ZcBossFunction.class, "isreadPoint has wrong");
		}
	}
	
	public void isCrossReadPoint(Hero hero,boolean islogin) {
		try {
			for (Struct_bosszc_010 struct_bosszc_010:Config_bosszc_010.getIns().getSortList()) {
				if (struct_bosszc_010.getLeixing()!=2) {
					continue;
				}
				int rebornlv = hero.getRebornlv();
				int[][] tiaojian = struct_bosszc_010.getTiaojian();
				if (rebornlv<tiaojian[0][0]||rebornlv>tiaojian[0][1]) {
					continue;
				}
				ZcBoss zcBoss = ZcBossLocalCache.getIns().getCrossZcBossMap().get(struct_bosszc_010.getBianhao());
				if (zcBoss.getBossLastState()==ZcBossConst.STATUS_PRE||zcBoss.getBossLastState()==ZcBossConst.STATUS_KILL_BOSS_NOT_FINISH) {
					if (islogin) {
						//红点
						RedPointFunction.getIns().addLoginRedPoint(hero,  SystemIdConst.CROSS_ZCBOSS, ArchiveConst.RedPoint,
								RedPointConst.HAS_RED);
						return;
					}else {
						//红点
						RedPointFunction.getIns().updateRedPoint(hero,  SystemIdConst.CROSS_ZCBOSS, ArchiveConst.RedPoint,
								RedPointConst.HAS_RED);
						return;
					}
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, ZcBossFunction.class, "isreadPoint has wrong");
		}
	}
    

}
