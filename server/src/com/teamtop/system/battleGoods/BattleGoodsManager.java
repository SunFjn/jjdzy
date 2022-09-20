package com.teamtop.system.battleGoods;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossSender;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleGoods.cache.BattleGoodSyscache;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossRoomCache;
import com.teamtop.system.battleGoods.cache.BattleGoodsLocalCache;
import com.teamtop.system.battleGoods.event.BattleGoodCrossSysEvent;
import com.teamtop.system.battleGoods.event.BattleGoodsSceneEvent;
import com.teamtop.system.battleGoods.model.BattleGoodRanker;
import com.teamtop.system.battleGoods.model.BattleGoodZoneid;
import com.teamtop.system.battleGoods.model.BattleGoods;
import com.teamtop.system.battleGoods.model.BattleGoodsBoss;
import com.teamtop.system.battleGoods.model.BattleGoodsBox;
import com.teamtop.system.battleGoods.model.BattleGoodsJoiner;
import com.teamtop.system.battleGoods.model.BattleGoodsNpc;
import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.battleNew.BattleNewSysCache;
import com.teamtop.system.battleNew.BttleTypeConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.scene.RowCol;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneXData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_rice_290;
import excel.config.Config_ricemb_290;
import excel.config.Config_ricenpc_290;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_rice_290;
import excel.struct.Struct_ricemb_290;
import excel.struct.Struct_ricenpc_290;
import excel.struct.Struct_xtcs_004;

public class BattleGoodsManager {
	
	private static BattleGoodsManager ins;

	private BattleGoodsManager() {
		
	}

	public static synchronized BattleGoodsManager getIns() {
		if (ins == null) {
			ins = new BattleGoodsManager();
		}
		return ins;
	}

	public void inscene(Hero hero) {
		try {
			if(CrossZone.isCrossServer()){
				return;
			}
			boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_BTTLE_GOOD);
			if(!checkSystemOpen) {
				//系统未开启
				BattleGoodsSender.sendCmd_10102(hero.getId(), 1, 0);
				return;
			}
			int state = BattleGoodsLocalCache.getState();
			if(state!=BattleGoodConst.ACT_STATE_2) {
				//活动未开启
				BattleGoodsSender.sendCmd_10102(hero.getId(), 2, 0);
				return;
			}
			if (BattleGoodsLocalCache.getOutTimeByHid().containsKey(hero.getId())) {
				Integer outTime = BattleGoodsLocalCache.getOutTimeByHid().get(hero.getId());
				int currentTime = TimeDateUtil.getCurrentTime();
				if (currentTime<outTime) {
					int leftime=outTime-currentTime;
					if (leftime<0) {
						leftime=1;
					}
					BattleGoodsSender.sendCmd_10102(hero.getId(), 3, leftime);
					return;
				}
			}
			CrossFunction.askCross(hero, SystemIdConst.CROSS_BTTLE_GOOD);
		} catch (Exception e) {
			LogTool.error(e, BattleGoodsManager.class, "inscene has wrong");
		}
		
	}

	public void battleMonster(Hero hero, long mid) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			
			BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(hero.getId());
			if (battleGoods==null) {
				LogTool.warn("battleGoods==null has wrong:"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodsManager.class);
				return;
			}
			
			
			BattleGoodsJoiner battleGoodsJoiner = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap().get(hero.getId());
			if (battleGoodsJoiner==null) {
				LogTool.warn("battleGoodsJoiner==null has wrong:"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodsManager.class);
				return;
			}
			
			if (battleGoodsJoiner.getState()!=BattleGoodConst.JOINER_STATE_0) {
				BattleGoodsSender.sendCmd_10106(hero.getId(), 1, mid);
				LogTool.warn("battleGoodsJoiner.getState()!=STATE_0:"+hero.getId()+" sate:"+battleGoodsJoiner.getState(), BattleGoodsManager.class);
				return;
			}
			BattleGoodsNpc battleGoodsNpc = battleGoodsCrossRoomCache.getBattleGoodsNpcMap().get(-mid);
			if (battleGoodsNpc==null) {
				battleGoodsNpc=battleGoodsCrossRoomCache.getBattleGoodsBossMap().get(-mid);
				if (battleGoodsNpc==null) {
					SceneFunction.getIns().removeNpcFromScene(-mid);
					BattleGoodsSender.sendCmd_10106(hero.getId(), 3, mid);
					LogTool.warn("battleGoodsNpc==null monsterId: "+mid+"Id:"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodsManager.class);
					return;
				}
			}
			
			
			if (battleGoodsNpc.getState()!=0) {
				long enemyHid = battleGoodsNpc.getEnemyHid();
				ConcurrentHashMap<Long, BattleGoodsJoiner> concurrentHashMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
				if (!concurrentHashMap.containsKey(enemyHid)) {
					//敌人不在线
					battleGoodsNpc.setState(0);
					battleGoodsNpc.setEnemyHid(0);
				}else {
					BattleGoodsJoiner battleGoodsJoiner2 = concurrentHashMap.get(enemyHid);
					int passTime=TimeDateUtil.getCurrentTime()-battleGoodsJoiner2.getStateTime();
					if (passTime>60) {
						battleGoodsNpc.setState(0);
						battleGoodsNpc.setEnemyHid(0);
					}
				}
				int state = battleGoodsNpc.getState();
				if (state!=0) {
					BattleGoodsSender.sendCmd_10106(hero.getId(), 2, mid);
					LogTool.warn("battleGoodsNpc.getState()!=STATE_0:"+hero.getId()+" battleGoodsNpc.getState():"+battleGoodsNpc.getState(), BattleGoodsManager.class);
				}
				return;
			}
			
			List<Object[]> changeSateMap = new ArrayList<Object[]>();
			//可以pve
			battleGoodsNpc.setEnemyHid(hero.getId());
			battleGoodsNpc.setState(BattleGoodConst.JOINER_STATE_3);
			changeSateMap.add(new Object[] {BattleGoodConst.Type_2, battleGoodsNpc.getUnitid(),BattleGoodConst.JOINER_STATE_3,0});
			
			battleGoodsJoiner.setMonsterId(-mid);
			battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_3);
			battleGoodsJoiner.setStateTime(TimeDateUtil.getCurrentTime());
			
			
			changeSateMap.add(new Object[] {BattleGoodConst.Type_0, battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_3,0});
			
			BattleGoodsSender.sendCmd_10106(hero.getId(), 0, mid);
			if (changeSateMap.size()>0) {
				BattleGoodsFunction.getIns().sendChangeSateAndSource(changeSateMap,battleGoodsCrossRoomCache);
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, BattleGoodsManager.class, "battleMonster has wrong");
		}
		
	}

	public void getBatMonReward(Hero hero, long monsterid, int rest) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			
			BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(hero.getId());
			if (battleGoods==null) {
				LogTool.warn("battleGoods==null has wrong:"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodsManager.class);
				return;
			}
			
			BattleGoodsJoiner battleGoodsJoiner = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap().get(hero.getId());
			if (battleGoodsJoiner==null) {
				LogTool.warn("battleGoodsJoiner==null has wrong:"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodsManager.class);
				return;
			}
			
			if (battleGoodsJoiner.getState()!=BattleGoodConst.JOINER_STATE_3) {
				LogTool.warn("battleGoodsJoiner.getState()!=BattleGoodConst.JOINER_STATE_3"+hero.getId()+" State:"+battleGoodsJoiner.getState(), BattleGoodsManager.class);
				return;
			}
			BattleGoodsNpc battleGoodsNpc = battleGoodsCrossRoomCache.getBattleGoodsNpcMap().get(battleGoodsJoiner.getMonsterId());
			if (battleGoodsNpc==null) {
				battleGoodsNpc=battleGoodsCrossRoomCache.getBattleGoodsBossMap().get(battleGoodsJoiner.getMonsterId());
				if (battleGoodsNpc==null) {
					LogTool.warn("battleGoodsNpc==null monsterId: "+battleGoodsJoiner.getMonsterId()+"Id:"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodsManager.class);
					return;
				}
			}
			int result = BattleFunction.checkWinGuanqiaBoss(hero, battleGoodsNpc.getSysId());// 0:失败，1：成功，
			
			List<Object[]> changeSateMap = new ArrayList<Object[]>();
			if (rest==1&&result!=0) {
				int isBoss = battleGoodsNpc.getIsBoss();
				//赢了 +积分
				Struct_ricenpc_290 struct_ricenpc_290 = Config_ricenpc_290.getIns().get(battleGoodsNpc.getSysId());
				BattleGoodsFunction.getIns().addSourceNpc(battleGoods, struct_ricenpc_290,battleGoodsCrossRoomCache);
				
				battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_0);
				battleGoodsJoiner.setStateTime(0);
				battleGoodsJoiner.setMonsterId(0);
				//判断是否是boss被击杀
				if (battleGoodsNpc.getIsBoss()>0) {
					//boss被击杀
					BattleGoodsBoss battleGoodsBoss = battleGoodsCrossRoomCache.getBossInfosMap().get(battleGoodsNpc.getSysId());
					battleGoodsBoss.setState(1);
					battleGoodsBoss.setDieTime(TimeDateUtil.getCurrentTime()+struct_ricenpc_290.getTime());
					//移除怪物以及怪物坐标
					battleGoodsCrossRoomCache.getExitPosXy().remove(new RowCol(battleGoodsNpc.getPox(), battleGoodsNpc.getPoy()));
					battleGoodsCrossRoomCache.getBattleGoodsBossMap().remove(battleGoodsNpc.getUnitid());
					//补齐粮草
					BattleGoodsFunction.getIns().killerBossReshBox(battleGoodsBoss.getSysId(),battleGoodsJoiner,battleGoodsCrossRoomCache);
				}else {
					//移除怪物以及怪物坐标
					battleGoodsCrossRoomCache.getExitPosXy().remove(new RowCol(battleGoodsNpc.getPox(), battleGoodsNpc.getPoy()));
					battleGoodsCrossRoomCache.getBattleGoodsNpcMap().remove(battleGoodsNpc.getUnitid());
				}
				SceneFunction.getIns().removeNpcFromScene(battleGoodsNpc.getUnitid());
				
				List<Object[]> dropTips = new ArrayList<Object[]>();
				List<int[]> dropArr = new ArrayList<int[]>();
				int[][] reward = struct_ricenpc_290.getReward();
				for (int i = 0; i < reward.length; i++) {
					int[] js = reward[i];
					dropArr.add(new int[] {js[0], js[1], js[2]});
					dropTips.add(new Object[] { js[0], js[1], js[2],1});
				}

				int[][] drops = new int[dropArr.size()][];
				dropArr.toArray(drops);
				if (UseAddUtil.canAdd(hero, drops, true)) {
					UseAddUtil.add(hero, drops, SourceGoodConst.BATTLEGOODS_PVE_DROP, UseAddUtil.getDefaultMail(), false);
				}
				BattleGoodsSender.sendCmd_10108(hero.getId(), monsterid, rest, battleGoods.getSource(),dropTips.toArray());
				//胜利者留在原处
				SceneFunction.getIns().changeScene(hero, SceneConst.SCENE_SYSID_BATTLEGOOD,hero.getScene().getEndX(),hero.getScene().getEndY(),battleGoodsCrossRoomCache.getSceneUnitId());
				changeSateMap.add(new Object[] {BattleGoodConst.Type_0, hero.getId(),BattleGoodConst.JOINER_STATE_0,0});
			}else {
				//输了 恢复状态 
				battleGoodsNpc.setState(0);
				battleGoodsNpc.setEnemyHid(0);
				changeSateMap.add(new Object[] {BattleGoodConst.Type_2, battleGoodsNpc.getUnitid(),BattleGoodConst.JOINER_STATE_0,0});
				//被打死
				BattleGoodsSender.sendCmd_10108(hero.getId(), monsterid, battleGoods.getSource(), rest, null);
				//失败者 重生
				battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_5);
				battleGoodsJoiner.setStateTime(TimeDateUtil.getCurrentTime());
				battleGoodsJoiner.setMonsterId(0);
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(BattleGoodConst.FUHUO_CD);
				int fuhuocd = struct_xtcs_004.getNum();
				changeSateMap.add(new Object[] {BattleGoodConst.Type_0, battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_5,fuhuocd});
				BattleGoodsSceneEvent.getIns().in(hero, SceneConst.SCENE_SYSID_BATTLEGOOD, battleGoodsCrossRoomCache.getSceneUnitId());
			}
			if (changeSateMap.size()>0) {
				BattleGoodsFunction.getIns().sendChangeSateAndSource(changeSateMap,battleGoodsCrossRoomCache);
			}
		} catch (Exception e) {
			LogTool.error(e, BattleGoodsManager.class, "getBatMonReward has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 */
	public void outscene(Hero hero) {
		try {
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			
			
			List<Object[]> changeSateMap = new ArrayList<Object[]>();
			ConcurrentHashMap<Long, BattleGoodsJoiner> concurrentHashMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
			if (concurrentHashMap.containsKey(hero.getId())) {
				BattleGoodsJoiner Joiner = concurrentHashMap.get(hero.getId());
				if (Joiner.getState()==BattleGoodConst.JOINER_STATE_1) {
					//独自采集中
					long boxId = Joiner.getBoxId();
					Joiner.setState(BattleGoodConst.JOINER_STATE_0);
					Joiner.setBoxId(0);
					Joiner.setStateTime(0);
					changeSateMap.add(new Object[] {BattleGoodConst.Type_0,Joiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
					
					BattleGoodsBox battleGoodsBox = battleGoodsCrossRoomCache.getBattleGoodsBoxMap().get(boxId);
					if (battleGoodsBox!=null) {
						battleGoodsBox.setState(0);
						battleGoodsBox.setHidA(0);
						battleGoodsBox.setHidB(0);
						changeSateMap.add(new Object[] {BattleGoodConst.Type_1,battleGoodsBox.getUnitid(),BattleGoodConst.JOINER_STATE_0,0});
					}
				}else if (Joiner.getState()==BattleGoodConst.JOINER_STATE_2) {
					//pvp
					long enemyId = Joiner.getEnemyId();
					Joiner.setEnemyId(0);
					Joiner.setState(BattleGoodConst.JOINER_STATE_0);
					Joiner.setStateTime(0);
					changeSateMap.add(new Object[] {BattleGoodConst.Type_0,Joiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
					
					BattleGoodsJoiner enemyJoiner = concurrentHashMap.get(enemyId);
					if (enemyJoiner!=null) {
						enemyJoiner.setEnemyId(0);
						enemyJoiner.setState(BattleGoodConst.JOINER_STATE_0);
						enemyJoiner.setStateTime(0);
						changeSateMap.add(new Object[] {BattleGoodConst.Type_0,enemyJoiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
					}
				}else if (Joiner.getState()==BattleGoodConst.JOINER_STATE_3) {
					//pve
					long monsterId = Joiner.getMonsterId();
					
					Joiner.setState(BattleGoodConst.JOINER_STATE_0);
					Joiner.setMonsterId(0);
					Joiner.setStateTime(0);
					changeSateMap.add(new Object[] {BattleGoodConst.Type_0,Joiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
					
					BattleGoodsNpc battleGoodsNpc = battleGoodsCrossRoomCache.getBattleGoodsNpcMap().get(monsterId);
					if (battleGoodsNpc!=null) {
						battleGoodsNpc.setState(0);
						battleGoodsNpc.setEnemyHid(0);
						changeSateMap.add(new Object[] {BattleGoodConst.Type_1,battleGoodsNpc.getUnitid(),BattleGoodConst.JOINER_STATE_0,0});
					}
					
				}
				concurrentHashMap.remove(hero.getId());
				if (changeSateMap.size()>0) {
					BattleGoodsFunction.getIns().sendChangeSateAndSource(changeSateMap,battleGoodsCrossRoomCache);
				}
				BattleGoodsSceneEvent.getIns().out(hero);
				BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(hero.getId());
				int outTime=TimeDateUtil.getCurrentTime()+BattleGoodConst.JOIN_CD;
				battleGoods.setOutTime(outTime);
				BattleGoodsSender.sendCmd_10128(hero.getId(), 0);
				CrossSender.sendCmd_1666(hero.getId(), SystemIdConst.CROSS_BTTLE_GOOD);
				BattleGoodIO.getIns().noticeQuit(hero,outTime);
			}
		} catch (Exception e) {
			LogTool.error(e, BattleGoodsManager.class, "outscene has wrong");
		}
		
	}
	/**
	 * 获取宝箱
	 * @param hero
	 * @param boxid
	 */
	public void getBox(Hero hero, long boxid) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			
			ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
			List<Object[]> changeSateMap = new ArrayList<Object[]>();
			
			if (battleGoodsJoinerjoinMap.containsKey(hero.getId())) {
				BattleGoodsJoiner battleGoodsJoiner = battleGoodsJoinerjoinMap.get(hero.getId());
				
				if (battleGoodsJoiner.getState()!=BattleGoodConst.JOINER_STATE_0) {
					BattleGoodsSender.sendCmd_10110(hero.getId(), battleGoodsJoiner.getState(), boxid);
					LogTool.warn("State()!=0 state:"+battleGoodsJoiner.getState()+" name:"+hero.getNameZoneid()+" Hid:"+hero.getId(), BattleGoodsManager.class);
				    return;
				}
				
				
				BattleGoodsBox battleGoodsBox = battleGoodsCrossRoomCache.getBattleGoodsBoxMap().get(-boxid);
				if (battleGoodsBox==null) {
					SceneFunction.getIns().removeNpcFromScene(boxid);
					BattleGoodsSender.sendCmd_10110(hero.getId(), 6, boxid);
					return;
				}
				if (battleGoodsBox.getState()==BattleGoodConst.JOINER_STATE_0) {
					//可以拾取
					//改变箱子状态
					
					battleGoodsBox.setState(BattleGoodConst.BOX_STATE_1);
					battleGoodsBox.setHidA(hero.getId());
					changeSateMap.add(new Object[] {BattleGoodConst.Type_1, battleGoodsBox.getUnitid(),BattleGoodConst.BOX_STATE_1,0});
					
					//改变参与者状态
					battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_1);
					battleGoodsJoiner.setBoxId(-boxid);
					battleGoodsJoiner.setStateTime(TimeDateUtil.getCurrentTime());
					BattleGoodsSender.sendCmd_10110(hero.getId(), 0, boxid);
					changeSateMap.add(new Object[] {BattleGoodConst.Type_0, battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_1,0});
					
				}else if(battleGoodsBox.getState()==BattleGoodConst.BOX_STATE_1) {
					//箱子正在被抢夺中
					BattleGoodsSender.sendCmd_10110(hero.getId(), 7, boxid);
					return;
				}
				if (changeSateMap.size()>0) {
					BattleGoodsFunction.getIns().sendChangeSateAndSource(changeSateMap,battleGoodsCrossRoomCache);
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, BattleGoodsManager.class, "getBox has wrong");
		}
		
	}
	/**
	 * 终止采集
	 * @param hero
	 * @param boxid
	 */
	public void stopgetbox(Hero hero, long boxid) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			
			ConcurrentHashMap<Long, BattleGoodsJoiner> concurrentHashMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
			
			List<Object[]> changeSateMap = new ArrayList<Object[]>();
			
			if (concurrentHashMap.containsKey(hero.getId())) {
				BattleGoodsJoiner battleGoodsJoiner = concurrentHashMap.get(hero.getId());
				if (battleGoodsJoiner.getState()==BattleGoodConst.JOINER_STATE_1) {
					
					long boxId2 = battleGoodsJoiner.getBoxId();
					
					BattleGoodsBox battleGoodsBox = battleGoodsCrossRoomCache.getBattleGoodsBoxMap().get(boxId2);
					if (battleGoodsBox!=null) {
						if (battleGoodsBox.getState()!=BattleGoodConst.BOX_STATE_1) {
							BattleGoodsSender.sendCmd_10112(hero.getId(), 1, -boxId2);
							LogTool.warn("State()!=BattleGoodConst.BOX_STATE_1 state:"+battleGoodsBox.getState(), BattleGoodsManager.class);
							return;
						}
						
						if (battleGoodsBox.getHidA()!=hero.getId()) {
							BattleGoodsSender.sendCmd_10112(hero.getId(), 1, -boxId2);
							LogTool.warn("battleGoodsBox.getHidA()!=hero.getId()"+hero.getId()+" battleGoodsBox.getHidA():"+battleGoodsBox.getHidA(), BattleGoodsManager.class);
							return;
						}
						
						int stateTime = battleGoodsJoiner.getStateTime();
						int currentTime = TimeDateUtil.getCurrentTime();
						if (currentTime-stateTime>BattleGoodConst.BOX_GETTIME) {
							//超过采集时间
							BattleGoodsSender.sendCmd_10112(hero.getId(), 1, -boxId2);
							return;
						}else {
							//在采集中 停止采集
							battleGoodsBox.setState(0);
							battleGoodsBox.setHidA(0);
							changeSateMap.add(new Object[] {BattleGoodConst.Type_1, battleGoodsBox.getUnitid(),BattleGoodConst.JOINER_STATE_0,0});
							
							battleGoodsJoiner.setBoxId(0);
							battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_0);
							battleGoodsJoiner.setStateTime(0);
							
							BattleGoodsSender.sendCmd_10112(hero.getId(), 0, -boxId2);
							changeSateMap.add(new Object[] {BattleGoodConst.Type_0, battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
							
							if (changeSateMap.size()>0) {
								BattleGoodsFunction.getIns().sendChangeSateAndSource(changeSateMap,battleGoodsCrossRoomCache);
							}
							return;
						}
					}else {
						BattleGoodsSender.sendCmd_10112(hero.getId(), 1, -boxId2);
						return;
					}
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, BattleGoodsManager.class, "stopgetbox has wrong");
		}
		
	}
	/**
	 * CG 采集成功获取奖励 10113
	 * @param boxid| 宝箱唯一id| long
	 */
	public void getBoxReward(Hero hero, long boxid) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			
			List<Object[]> changeSateMap = new ArrayList<Object[]>();
			ConcurrentHashMap<Long, BattleGoodsJoiner> concurrentHashMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
			
			if (!concurrentHashMap.containsKey(hero.getId())) {
				LogTool.warn("!concurrentHashMap.containsKey(hero.getId()):"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodCrossSysEvent.class);
				return;
			}
			BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(hero.getId());
			BattleGoodsJoiner battleGoodsJoiner = concurrentHashMap.get(hero.getId());
			if (battleGoodsJoiner.getState()!=BattleGoodConst.JOINER_STATE_1) {
				LogTool.warn("battleGoodsJoiner.getState()!=UnifyCountryConst.STATE_1:"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodCrossSysEvent.class);
				return;
			}
			long boxId1 = battleGoodsJoiner.getBoxId();
			if (boxId1!=-boxid) {
				LogTool.warn("boxId1!=boxid:"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodCrossSysEvent.class);
				BattleGoodsSender.sendCmd_10114(hero.getId(), 1, -boxId1);
				return;
			}
			if (TimeDateUtil.getCurrentTime()-battleGoodsJoiner.getStateTime()<BattleGoodConst.BOX_GETTIME) {
				BattleGoodsSender.sendCmd_10114(hero.getId(), 2, -boxId1);
				return;
			}
			BattleGoodsBox battleGoodsBox = battleGoodsCrossRoomCache.getBattleGoodsBoxMap().get(boxId1);
			
			if (battleGoodsBox==null) {
				LogTool.warn("unifyCountryBox==null:"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodCrossSysEvent.class);
				return;
			}
			//移除宝箱
			battleGoodsCrossRoomCache.getBattleGoodsBoxMap().remove(boxId1);
			SceneFunction.getIns().removeNpcFromScene(boxId1);
			Struct_rice_290 struct_rice_290 = Config_rice_290.getIns().get(battleGoodsBox.getId());
			//给采集者发奖励
			int[][] dj = struct_rice_290.getReward();
			UseAddUtil.add(hero, dj, SourceGoodConst.BATTLEGOODS_BOX, UseAddUtil.getDefaultMail(), true);
			
			BattleGoodsFunction.getIns().addSourceBox(battleGoods, struct_rice_290.getPoint(),battleGoodsCrossRoomCache);;
			//修改采集者状态
			battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_0);
			battleGoodsJoiner.setStateTime(0);
			battleGoodsJoiner.setBoxId(0);
			BattleGoodsSender.sendCmd_10114(hero.getId(), 0, boxId1);
			
			changeSateMap.add(new Object[] {BattleGoodConst.Type_0, battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
			
			if (changeSateMap.size()>0) {
				BattleGoodsFunction.getIns().sendChangeSateAndSource(changeSateMap,battleGoodsCrossRoomCache);
			}
		} catch (Exception e) {
			LogTool.error(e, BattleGoodsManager.class, "getBoxReward has wrong");
		}
		
	}
	/**
	 * 怼某个玩家 10115
	 * @param hero
	 * @param battlehid
	 */
	public void battlePvp(Hero hero, long battlehid) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			
			ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
			BattleGoodsJoiner battleGoodsJoiner = battleGoodsJoinerjoinMap.get(hero.getId());
			if (battleGoodsJoiner==null) {
				LogTool.warn("battleGoodsJoiner==null :"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodsManager.class);
				return;
			}
			BattleGoodsJoiner  enemy= battleGoodsJoinerjoinMap.get(battlehid);
			if (enemy==null) {
				LogTool.warn("enemy==null :"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodsManager.class);
				return;
			}
			Hero heroTarget = HeroCache.getHero(battlehid);
			if(heroTarget == null) {
				LogTool.warn("heroTarget == null "+battlehid,  BattleGoodsManager.class);
				return;
			}
			if (enemy.getHid()==battleGoodsJoiner.getHid()) {
				LogTool.warn("enemy.getHid()==battleGoodsJoiner.getHid() "+hero.getId(), BattleGoodsManager.class);
				return;
			}
			if (battleGoodsJoiner.getState()!=BattleGoodConst.JOINER_STATE_0) {
				BattleGoodsSender.sendCmd_10116(hero.getId(), 4);
				return;
			}
			if (battleGoodsJoiner.getIndex()==enemy.getIndex()) {
				BattleGoodsSender.sendCmd_10116(hero.getId(), 3);
				return;
			}
			
			if (enemy.getState()==BattleGoodConst.JOINER_STATE_5) {
				BattleGoodsSender.sendCmd_10116(hero.getId(), 2);
				return;
			}else if (enemy.getState()==BattleGoodConst.JOINER_STATE_3||enemy.getState()==BattleGoodConst.JOINER_STATE_2) {
				BattleGoodsSender.sendCmd_10116(hero.getId(), 1);
				return;
			}
			
			List<Object[]> changeSateMap = new ArrayList<Object[]>();
			if (enemy.getState()==BattleGoodConst.JOINER_STATE_1) {
				//对方采集中  中断对手采集
				BattleGoodsBox battleGoodsBox = battleGoodsCrossRoomCache.getBattleGoodsBoxMap().get(enemy.getBoxId());
				//改变箱子状态
				battleGoodsBox.setState(0);
				battleGoodsBox.setHidA(0);
				changeSateMap.add(new Object[] {BattleGoodConst.Type_1, battleGoodsBox.getUnitid(),BattleGoodConst.JOINER_STATE_0,0});
				BattleGoodsSender.sendCmd_10112(hero.getId(), 0, battleGoodsBox.getUnitid());
			}
			
			//改变对手状态 添加自己给对手
			enemy.setEnemyId(hero.getId());
			enemy.setState(BattleGoodConst.JOINER_STATE_3);
			enemy.setStateTime(TimeDateUtil.getCurrentTime());
			changeSateMap.add(new Object[] {BattleGoodConst.Type_0, enemy.getHid(),BattleGoodConst.JOINER_STATE_3,0});
			
			//改变自己状态 为自己添加对手
			battleGoodsJoiner.setEnemyId(battlehid);
			battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_3);
			battleGoodsJoiner.setStateTime(TimeDateUtil.getCurrentTime());
			changeSateMap.add(new Object[] {BattleGoodConst.Type_0, battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_3,0});
			//开始战斗pvp
			
			long hpMy = battleGoodsJoiner.getHp();
			long huDunMy = battleGoodsJoiner.getHuDun();
			
			long hpTarget = enemy.getHp();
			long huDunTarget = enemy.getHuDun();
			
			long battleId = BattleNewSysCache.getBattleUid();
			BattleNewFunction.getIns().startPVPBattle(hero, heroTarget, SystemIdConst.CROSS_BTTLE_GOOD, BttleTypeConst.BATTLEGOODS_PVP, hpMy, hpTarget, huDunMy, huDunTarget, battleId);
			
			BattleGoodsSender.sendCmd_10116(hero.getId(), 0);
			
			if (changeSateMap.size()>0) {
				BattleGoodsFunction.getIns().sendChangeSateAndSource(changeSateMap,battleGoodsCrossRoomCache);
			}
			
		} catch (Exception e) {
			LogTool.error(e, BattleGoodsManager.class, "battlePvp has wrong");
		}
		
	}

	public void openRewardUi(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			
			BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(hero.getId());
			
			Object[] rewardinfos=new Object[Config_ricemb_290.getIns().getMap().size()];
			int i=0;
			for (Struct_ricemb_290 ricemb_290: Config_ricemb_290.getIns().getSortList()) {
				int index = ricemb_290.getId();
				int state=GameConst.REWARD_0;
				if (!battleGoods.getReward().contains(ricemb_290.getId())&&battleGoods.getSource()>=ricemb_290.getPoint()) {
					state=GameConst.REWARD_1;
				}
				if (battleGoods.getReward().contains(ricemb_290.getId())) {
					state=GameConst.REWARD_2;
				}
				rewardinfos[i]=new Object[] {index,state};
				i++;
			}
			
			BattleGoodsSender.sendCmd_10124(hero.getId(), rewardinfos);
		} catch (Exception e) {
			LogTool.error(e,  BattleGoodsManager.class, "openRewardUi haswrong");
			
		}
	}
	/**
	 * 
	 * @param hero
	 * @param index
	 */
	public void getreward(Hero hero, int index) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(hero.getId());
			
			if (battleGoods.getReward().contains(index)) {
				return;
			}
			
			Struct_ricemb_290 struct_ricemb_290 = Config_ricemb_290.getIns().get(index);
			if (battleGoods.getSource()>=struct_ricemb_290.getPoint()) {
				battleGoods.getReward().add(index);
				UseAddUtil.add(hero, struct_ricemb_290.getReward(), SourceGoodConst.BATTLEGOODS_GOAL_REWARD, UseAddUtil.getDefaultMail(), true);
				BattleGoodsSender.sendCmd_10126(hero.getId(), index, GameConst.REWARD_2);
			}
		} catch (Exception e) {
			LogTool.error(e,  BattleGoodsManager.class, "openRewardUi haswrong");
		}
		
	}
	/**
	 * 打开排行榜
	 * @param hero
	 * @param type
	 */
	public void openRankUi(Hero hero, int type) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			ConcurrentHashMap<Long, BattleGoods> battleGoodsAllMembers = battleGoodsCrossRoomCache.getBattleGoodsAllMembers();
			BattleGoods battleGoods = battleGoodsAllMembers.get(hero.getId());
			if (type==0) {
				//个人积分排行
				List<BattleGoodRanker> RankList =battleGoodsCrossRoomCache.getBattleGoodRankList();
				int size=20;
				if (RankList.size()<20) {
					size=RankList.size();
				}
				int rankindex=0;
				Object[] ranks=new Object[size];
				for (int i = 0; i < size; i++) {
					BattleGoodRanker battleGoodser = RankList.get(i);
					if (battleGoodser.getHid()==hero.getId()) {
						rankindex=i+1;
					}
					ranks[i]=new Object[] {i+1,battleGoodser.getName(),battleGoodser.getSource()};
				}
				BattleGoodsSender.sendCmd_10130(hero.getId(), ranks, battleGoods.getSource(), rankindex);
				return;
			}
			
			if (type==1) {
				long mvpHid=0;
				String mvpname="";
				int icon=0;
				int frame=0;
				int mvpJF=0;
				//区服排名
				List<BattleGoodZoneid> RankList = new ArrayList<BattleGoodZoneid> (battleGoodsCrossRoomCache.getSourceByZoneid().values());
				Collections.sort(RankList, new BattleGoodZoneidComparator());
				List<BattleGoods> BattleGoodsList = new ArrayList<BattleGoods>(battleGoodsAllMembers.values());
				Collections.sort(BattleGoodsList, new BattleGoodsComparator());
				int size=RankList.size();
				if (size>0) {
					Object[] ranks=new Object[size];
					for (int i = 0; i < size; i++) {
						BattleGoodZoneid battleGoodZoneid = RankList.get(i);
						if (i==0) {
							//区服第一时 寻找mvp
							for (int j= 0; j < BattleGoodsList.size(); j++) {
								BattleGoods battleGoods2 = BattleGoodsList.get(j);
								if (battleGoods2.getSource()>0&&battleGoods2.getIndex()==battleGoodZoneid.getIndex()&&mvpHid==0) {
									mvpHid=battleGoods2.getHid();
									break;
								}
							}
						}
						ranks[i]=new Object[] {i+1,battleGoodZoneid.getIndex(),battleGoodZoneid.getFristzoneid(),battleGoodZoneid.getSource()};
					}
					if (battleGoodsAllMembers.containsKey(mvpHid)) {
						BattleGoods battleGoods2 = battleGoodsAllMembers.get(mvpHid);
						mvpname=battleGoods2.getName();
						icon=battleGoods2.getIcon();
						frame=battleGoods2.getFrame();
						mvpJF=battleGoods2.getSource();
					}
					//B:排名B:阵营（1 2 3）I:区服idI:积分
					BattleGoodsSender.sendCmd_10132(hero.getId(), ranks,mvpname,icon,frame,mvpJF);
					return;
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e,  BattleGoodsManager.class, "openRankUi haswrong");
		}
		
	}

	public void buyLive(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				//本服
				return;
			}
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			
			ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
			BattleGoodsJoiner battleGoodsJoiner = battleGoodsJoinerjoinMap.get(hero.getId());
			if (battleGoodsJoiner==null) {
				LogTool.warn("battleGoodsJoiner==null :"+hero.getId()+" name:"+hero.getNameZoneid(), BattleGoodsManager.class);
				return;
			}
			if (battleGoodsJoiner.getState()!=BattleGoodConst.JOINER_STATE_5) {
				BattleGoodsSender.sendCmd_10134(hero.getId(), 1);
				return;
			}
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(BattleGoodConst.FUHUO_COST);
			int fuhuoCost = struct_xtcs_004.getNum();
			if (UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)){
				UseAddUtil.use(hero, GameConst.YUANBAO, fuhuoCost, SourceGoodConst.BATTLEGOODS_BUY_LIVE, true);
				
				battleGoodsJoiner.setHp(hero.getFinalFightAttr().getHpMax());
				battleGoodsJoiner.setHuDun(hero.getFinalFightAttr().getHudun());
				
				battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_0);
				battleGoodsJoiner.setStateTime(0);
				
				Map<Object,Object> datas = new HashMap<Object, Object>(2);
				datas.put(SceneXData.nowHp, battleGoodsJoiner.getHp());//当前气血
				datas.put(SceneXData.maxHp, hero.getFinalFightAttr().getHpMax());//最大气血
				datas.put(SceneXData.battleGoods_index, battleGoodsJoiner.getIndex());//阵营
				SceneFunction.getIns().boardcastNewState(hero, datas, false);
				
				BattleGoodsSender.sendCmd_10134(hero.getId(), 0);
				
				List<Object[]> changeSateMap = new ArrayList<Object[]>();
				changeSateMap.add(new Object[] {BattleGoodConst.Type_0, battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
				BattleGoodsFunction.getIns().sendChangeSateAndSource(changeSateMap,battleGoodsCrossRoomCache);
			
				return;
			}else {
				BattleGoodsSender.sendCmd_10134(hero.getId(), 2);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e,  BattleGoodsManager.class, "buyLive haswrong");
		}
		
	}
	
	
	
	
	
	
	
	
	

}
