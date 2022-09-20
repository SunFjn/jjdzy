package com.teamtop.system.battleGoods;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossSender;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.actHall.ActHallInterface;
import com.teamtop.system.battleGoods.cache.BattleGoodSyscache;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossPartCaChe;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossRoomCache;
import com.teamtop.system.battleGoods.cache.BattleGoodsLocalCache;
import com.teamtop.system.battleGoods.event.BattleGoodCrossSysEvent;
import com.teamtop.system.battleGoods.event.BattleGoodLocalSysEvent;
import com.teamtop.system.battleGoods.event.BattleGoodsSceneEvent;
import com.teamtop.system.battleGoods.model.BattleGoodRanker;
import com.teamtop.system.battleGoods.model.BattleGoodZoneid;
import com.teamtop.system.battleGoods.model.BattleGoods;
import com.teamtop.system.battleGoods.model.BattleGoodsBoss;
import com.teamtop.system.battleGoods.model.BattleGoodsBox;
import com.teamtop.system.battleGoods.model.BattleGoodsJoiner;
import com.teamtop.system.battleGoods.model.BattleGoodsNpc;
import com.teamtop.system.battleGoods.model.ExistBox;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.scene.RowCol;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneXData;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_map_200;
import excel.config.Config_rice_290;
import excel.config.Config_ricemb_290;
import excel.config.Config_ricenpc_290;
import excel.config.Config_ricerank2_290;
import excel.config.Config_ricerank_290;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_map_200;
import excel.struct.Struct_rice_290;
import excel.struct.Struct_ricemb_290;
import excel.struct.Struct_ricenpc_290;
import excel.struct.Struct_ricerank2_290;
import excel.struct.Struct_ricerank_290;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class BattleGoodsFunction implements ActHallInterface{
	
	private static BattleGoodsFunction ins;

	private BattleGoodsFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleGoodsFunction getIns() {
		if (ins == null) {
			ins = new BattleGoodsFunction();
		}
		return ins;
	}
	
	public void start() {
		Set<Integer> keySet = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().keySet();
		for(int partId : keySet) {				
			try {
				BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId);
				ConcurrentHashMap<Integer, BattleGoodsCrossRoomCache> roomCacheMap = battleGoodsCrossPartCaChe.getRoomCacheMap();
				for (BattleGoodsCrossRoomCache battleGoodsRoom:roomCacheMap.values()) {
					//初始化场景
					int sceneUnitId = SceneCache.getSceneUnitId();
					battleGoodsRoom.setSceneUnitId(sceneUnitId);
					//初始化boss 以及小怪
					ConcurrentHashMap<Long, BattleGoodsNpc> battleGoodsNpcMap = battleGoodsRoom.getBattleGoodsNpcMap();
					ConcurrentHashMap<Long, BattleGoodsNpc> battleGoodsBossMap = battleGoodsRoom.getBattleGoodsBossMap();
					battleGoodsNpcMap.clear();
					battleGoodsBossMap.clear();
					Set<RowCol> Nolist=new HashSet<>();
					
					
					for (Struct_ricenpc_290 ricenpc_290: Config_ricenpc_290.getIns().getSortList()) {
						for (int i = 0; i < ricenpc_290.getNum(); i++) {
							int npcSysId = ricenpc_290.getNpc();
							BattleGoodsNpc battleGoodsNpc=new BattleGoodsNpc();
							battleGoodsNpc.setSysId(npcSysId);
							battleGoodsNpc.setIsBoss(ricenpc_290.getBoss());
							int pox=0;
							int poy=0;
							if (ricenpc_290.getBoss()==1) {
								pox=ricenpc_290.getZb()[0][0];
							    poy=ricenpc_290.getZb()[0][1];
							}else {
								Struct_map_200 struct_map_200 = Config_map_200.getIns().get(SceneConst.SCENE_SYSID_BATTLEGOOD);
								int[] newPosByRandom = SceneEventFunction.getNewPosByRandomSpe(struct_map_200.getS(),Nolist);
								pox=newPosByRandom[0];
							    poy=newPosByRandom[1];
							}
							RowCol rowCol=new RowCol(pox, poy);
							Nolist.add(rowCol);
							NPC npc=SceneFunction.getIns().addNpcToScene(npcSysId, pox, poy, -1, sceneUnitId, SceneConst.SCENE_SYSID_BATTLEGOOD, true);
							battleGoodsNpc.setPox(pox);
							battleGoodsNpc.setPoy(poy);
							battleGoodsNpc.setUnitid(npc.getId());
							
							if (ricenpc_290.getBoss()==1) {
								//是boss
								if (!battleGoodsRoom.getBossInfosMap().containsKey(npcSysId)) {
									BattleGoodsBoss battleGoodsBoss=new BattleGoodsBoss();
									battleGoodsBoss.setSysId(npcSysId);
									battleGoodsBoss.setState(BattleGoodConst.JOINER_STATE_0);
									battleGoodsRoom.getBossInfosMap().put(npcSysId, battleGoodsBoss);
								}
								battleGoodsBossMap.put(battleGoodsNpc.getUnitid(), battleGoodsNpc);
							}else {
								battleGoodsNpcMap.put(battleGoodsNpc.getUnitid(), battleGoodsNpc);
							}
						}
					
					}
					
					
				}
				
			} catch (Exception e) {
				LogTool.error(e, BattleGoodCrossSysEvent.class, "BattleGoodSysEvent start partId=" + partId);
			}
		}
		BattleGoodSyscache.setState(BattleGoodConst.ACT_STATE_2);
	}
	/**
	 * 刷新小怪
	 */
	public void reshMapNpc() {
		Set<Integer> keySet = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().keySet();
		for(int partId : keySet) {
			try {
				BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId);
				ConcurrentHashMap<Integer, BattleGoodsCrossRoomCache> roomCacheMap = battleGoodsCrossPartCaChe.getRoomCacheMap();
				for (BattleGoodsCrossRoomCache battleGoodsRoom:roomCacheMap.values()) {
					int sceneUnitId = battleGoodsRoom.getSceneUnitId();
					//补齐小怪
					ConcurrentHashMap<Long, BattleGoodsNpc> battleGoodsNpcMap = battleGoodsRoom.getBattleGoodsNpcMap();
					ConcurrentHashMap<Long, BattleGoodsNpc> battleGoodsBossMap = battleGoodsRoom.getBattleGoodsBossMap();
					int leftNum=battleGoodsNpcMap.size();
					Set<RowCol> Nolist=battleGoodsRoom.getExitPosXy();;
					
					for (BattleGoodsNpc battleGoodsNpc:battleGoodsNpcMap.values()) {
						RowCol rowCol=new RowCol(battleGoodsNpc.getPox(), battleGoodsNpc.getPoy());
						Nolist.add(rowCol);
					}
					for (BattleGoodsNpc battleGoodsNpc:battleGoodsBossMap.values()) {
						RowCol rowCol=new RowCol(battleGoodsNpc.getPox(), battleGoodsNpc.getPoy());
						Nolist.add(rowCol);
					}
					for (Struct_ricenpc_290 ricenpc_290: Config_ricenpc_290.getIns().getSortList()) {
						if (ricenpc_290.getBoss()==0&&ricenpc_290.getNum()>leftNum) {
							//小怪
							int needFrshNum=ricenpc_290.getNum()-leftNum;
							for (int i = 0; i < needFrshNum; i++) {
								int npcSysId = ricenpc_290.getNpc();
								BattleGoodsNpc battleGoodsNpc=new BattleGoodsNpc();
								battleGoodsNpc.setSysId(npcSysId);
								battleGoodsNpc.setIsBoss(ricenpc_290.getBoss());
								Struct_map_200 struct_map_200 = Config_map_200.getIns().get(SceneConst.SCENE_SYSID_BATTLEGOOD);
								int[] newPosByRandom = SceneEventFunction.getNewPosByRandomSpe(struct_map_200.getS(),Nolist);
								RowCol rowCol=new RowCol(newPosByRandom[0], newPosByRandom[1]);
								Nolist.add(rowCol);
								NPC npc=SceneFunction.getIns().addNpcToScene(npcSysId, newPosByRandom[0], newPosByRandom[1], -1, sceneUnitId, SceneConst.SCENE_SYSID_BATTLEGOOD, true);
								battleGoodsNpc.setPox(newPosByRandom[0]);
								battleGoodsNpc.setPoy(newPosByRandom[1]);
								battleGoodsNpc.setUnitid(npc.getId());
								battleGoodsNpcMap.put(battleGoodsNpc.getUnitid(), battleGoodsNpc);
							}
						}
					}
					

				}
			} catch (Exception e) {
				LogTool.error(e, BattleGoodCrossSysEvent.class, "reshMapNpc start partId=" + partId);
			}
			
		}
		
	}
	
	/**
	 * 检测是否需要刷新怪物 已经 战斗/拾取超时问题
	 */
	public void schedule() {
		
		if (BattleGoodSyscache.getState()!=BattleGoodConst.ACT_STATE_2) {
			//关闭中
			return;
		}
		
		int currentTime = TimeDateUtil.getCurrentTime();
		int actcd=BattleGoodSyscache.getTimeCd()+1;
		int reshNpcCd=BattleGoodSyscache.getReshNpcCd()+1;
		
		BattleGoodSyscache.setTimeCd(actcd);
		BattleGoodSyscache.setReshNpcCd(reshNpcCd);
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(BattleGoodConst.FRESH_CD);
		if (reshNpcCd>=struct_xtcs_004.getNum()) {
			//补齐小怪 
			reshMapNpc();
			BattleGoodSyscache.setReshNpcCd(0);
		}
		
		Struct_xtcs_004 fuhuo = Config_xtcs_004.getIns().get(BattleGoodConst.FUHUO_CD);
		int fuhuocd=fuhuo.getNum();
		//战斗/拾取超时问题
		List<Object[]> changeSateMap = new ArrayList<Object[]>();
		Set<Integer> keySet = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().keySet();
		for(int partId : keySet) {
			try {
				BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId);
				ConcurrentHashMap<Integer, BattleGoodsCrossRoomCache> roomCacheMap = battleGoodsCrossPartCaChe.getRoomCacheMap();
				for (BattleGoodsCrossRoomCache battleGoodsRoom:roomCacheMap.values()) {
					int sceneUnitId = battleGoodsRoom.getSceneUnitId();
					//先补齐boss
					ConcurrentHashMap<Integer, BattleGoodsBoss> bossInfosMap = battleGoodsRoom.getBossInfosMap();
					ConcurrentHashMap<Long, BattleGoodsNpc> battleGoodsBossMap = battleGoodsRoom.getBattleGoodsBossMap();
					for (BattleGoodsBoss boss: bossInfosMap.values()) {
						if(boss.getState()==1&&currentTime>=boss.getDieTime()) {
							//boss已经死亡 且到了复活时间
							boss.setState(BattleGoodConst.JOINER_STATE_0);
							boss.setDieTime(0);
							//复活boss
							Set<RowCol> exitPosXy = battleGoodsRoom.getExitPosXy();
							int npcSysId = boss.getSysId();
							BattleGoodsNpc battleGoodsNpc=new BattleGoodsNpc();
							battleGoodsNpc.setSysId(npcSysId);
							battleGoodsNpc.setIsBoss(1);
							//Struct_map_200 struct_map_200 = Config_map_200.getIns().get(SceneConst.SCENE_SYSID_BATTLEGOOD);
							//int[] newPosByRandom = SceneEventFunction.getNewPosByRandomSpe(struct_map_200.getS(),exitPosXy);
							Struct_ricenpc_290  ricenpc_290= Config_ricenpc_290.getIns().getMap().get(boss.getSysId());
							int[][] zb = ricenpc_290.getZb();
							int pox=zb[0][0];
							int poy=zb[0][1];
							RowCol rowCol=new RowCol(pox, poy);
							exitPosXy.add(rowCol);
							NPC npc=SceneFunction.getIns().addNpcToScene(npcSysId, pox, poy, -1, sceneUnitId, SceneConst.SCENE_SYSID_BATTLEGOOD, true);
							battleGoodsNpc.setPox(pox);
							battleGoodsNpc.setPoy(poy);
							battleGoodsNpc.setUnitid(npc.getId());
							battleGoodsBossMap.put(battleGoodsNpc.getUnitid(), battleGoodsNpc);
						}
					}
					ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsRoom.getBattleGoodsJoinerjoinMap();
					ConcurrentHashMap<Long, BattleGoodsNpc> battleGoodsNpcMap = battleGoodsRoom.getBattleGoodsNpcMap();
					ConcurrentHashMap<Long, BattleGoodsBox> battleGoodsBoxMap = battleGoodsRoom.getBattleGoodsBoxMap();
					//遍历 战斗/拾取超时问题
					for (BattleGoodsJoiner battleGoodsJoiner:battleGoodsJoinerjoinMap.values()) {
						//状态时间
						int state = battleGoodsJoiner.getState();
						int passTime=TimeDateUtil.getCurrentTime()-battleGoodsJoiner.getStateTime();
						if (passTime>0) {
							switch (state) {
							case BattleGoodConst.JOINER_STATE_1:
								if (passTime>BattleGoodConst.BOX_GETTIME+3) {
									//超过30秒还在采集
									long boxId = battleGoodsJoiner.getBoxId();
									battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_0);
									battleGoodsJoiner.setBoxId(0);
									battleGoodsJoiner.setStateTime(0);
									changeSateMap.add(new Object[] {BattleGoodConst.Type_0,battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
									
									BattleGoodsBox battleGoodsBox = battleGoodsBoxMap.get(boxId);
									if (battleGoodsBox!=null) {
										battleGoodsBox.setState(0);
										changeSateMap.add(new Object[] {BattleGoodConst.Type_1,battleGoodsBox.getUnitid(),BattleGoodConst.JOINER_STATE_0,0});
									}
								}
								break;
							case BattleGoodConst.JOINER_STATE_2:
								if (passTime>60) {
									//超过60秒 还在 PVP
									long enemyId = battleGoodsJoiner.getEnemyId();
									battleGoodsJoiner.setEnemyId(0);
									battleGoodsJoiner.setStateTime(0);
									changeSateMap.add(new Object[] {BattleGoodConst.Type_0,battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
									
									BattleGoodsJoiner enemy = battleGoodsJoinerjoinMap.get(enemyId);
									if (enemy!=null) {
										enemy.setEnemyId(0);
										enemy.setState(BattleGoodConst.JOINER_STATE_0);
										enemy.setStateTime(0);
										changeSateMap.add(new Object[] {BattleGoodConst.Type_1,enemy.getHid(),BattleGoodConst.JOINER_STATE_0,0});
									}
								}
								break;
							case BattleGoodConst.JOINER_STATE_3:
								//超过60秒 还在 PVE
								if (passTime>60) {
									long monsterId = battleGoodsJoiner.getMonsterId();
									battleGoodsJoiner.setMonsterId(0);
									battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_0);
									battleGoodsJoiner.setStateTime(0);
									changeSateMap.add(new Object[] {BattleGoodConst.Type_0,battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
									
									BattleGoodsNpc battleGoodsNpc = battleGoodsNpcMap.get(monsterId);
									if (battleGoodsNpc!=null) {
										battleGoodsNpc.setState(0);
										battleGoodsNpc.setEnemyHid(0);
										changeSateMap.add(new Object[] {BattleGoodConst.Type_2,battleGoodsNpc.getUnitid(),BattleGoodConst.JOINER_STATE_0,0});
									}
								}
								break;
							case BattleGoodConst.JOINER_STATE_5:
								if (passTime>fuhuocd) {
									//超过30秒  还在保护罩状态
									Hero hero = HeroCache.getHero(battleGoodsJoiner.getHid());
									if (hero!=null) {
										battleGoodsJoiner.setHp(hero.getFinalFightAttr().getHpMax());
										battleGoodsJoiner.setHuDun(hero.getFinalFightAttr().getHudun());
										battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_0);
										battleGoodsJoiner.setBoxId(0);
										battleGoodsJoiner.setStateTime(0);
										
										Map<Object,Object> datas = new HashMap<Object, Object>(2);
										datas.put(SceneXData.nowHp, battleGoodsJoiner.getHp());//当前气血
										datas.put(SceneXData.battleGoods_index, battleGoodsJoiner.getIndex());//阵营
										SceneFunction.getIns().boardcastNewState(hero, datas, true);
										
										changeSateMap.add(new Object[] {BattleGoodConst.Type_0,battleGoodsJoiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
									}
								}
								break;					
							default:
								break;
							}
						}
					}
					
					if (changeSateMap.size()>0) {
						sendChangeSateAndSource(changeSateMap,battleGoodsRoom);
					}
					
				}
			} catch (Exception e) {
				LogTool.error(e, BattleGoodCrossSysEvent.class, "schedule  partId=" + partId);
			}
		}
	}
	

	
	
	
	
	
	/**
	 * 活动结束
	 */
	public void end() {
		try {
			endSendReward();
			BattleGoodSyscache.setTimeCd(0);
			BattleGoodSyscache.setReshNpcCd(0);
			BattleGoodSyscache.setState(BattleGoodConst.ACT_STATE_0);
		    BattleGoodIO.getIns().noticeState(BattleGoodSyscache.getState());
			BattleGoodSyscache.getFristzoneidToRoomId().clear();
			BattleGoodSyscache.getBattleGoodsCrossPartCaChes().clear();
		} catch (Exception e) {
			LogTool.error(e, BattleGoodCrossSysEvent.class, "BattleGoodSysEvent end has wrong");
		}
	}
	
	/**
	 * 
	 * @param hero
	 */
	public void joinBattleGood(Hero hero) {
		try {
			if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
				//关闭中
				return;
			}
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			if (roomId==null) {
				LogTool.warn("joinCrossZcboss has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodsFunction.class);
				BattleGoodsSender.sendCmd_10102(hero.getId(), 1, 0);
				return;
			}
			
			BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId);
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = battleGoodsCrossPartCaChe.getRoomCacheMap().get(roomId);
			BattleGoods battleGoods=battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(hero.getId());
			//所属阵营
			Integer index = battleGoodsCrossRoomCache.getFristZoneidToIndex().get(belongZoneid);
			
			if(battleGoods==null) {
				//第一次进入场景
				battleGoods = new BattleGoods();
				battleGoods=new BattleGoods();
				battleGoods.setHid(hero.getId());
				battleGoods.setName(hero.getNameZoneid());
				battleGoods.setPartId(partId);
				battleGoods.setRoomId(roomId);
				battleGoods.setReward(new HashSet<Integer>());
				battleGoods.setFristzoneid(belongZoneid);
				battleGoods.setIndex(index);
				battleGoodsCrossRoomCache.getBattleGoodsAllMembers().put(hero.getId(), battleGoods);
			}
			battleGoods.setIcon(hero.getIcon());
			battleGoods.setFrame(hero.getFrame());
			
			int currentTime = TimeDateUtil.getCurrentTime();
			if (currentTime<battleGoods.getOutTime()) {
				int leftime=battleGoods.getOutTime()-currentTime;
				if (leftime<0) {
					leftime=1;
				}
				BattleGoodsSender.sendCmd_10102(hero.getId(), 3, leftime);
				return;
			}
			
			if (battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap().containsKey(hero.getId())) {
				LogTool.warn("battleGoodsCrossRoomCache JoinerjoinMap containsKey(hero.getId())"+hero.getId(), BattleGoodsFunction.class);
				BattleGoodsSender.sendCmd_10102(hero.getId(), 1, 0);
				return;
			}
			
			BattleGoodsJoiner battleGoodsJoiner=new BattleGoodsJoiner();
			battleGoodsJoiner.setHid(hero.getId());
			battleGoodsJoiner.setFristzoneid(belongZoneid);
			battleGoodsJoiner.setHp(hero.getFinalFightAttr().getHpMax());
			battleGoodsJoiner.setHuDun(hero.getFinalFightAttr().getHudun());
			battleGoodsJoiner.setState(BattleGoodConst.JOINER_STATE_0);
			
			battleGoodsJoiner.setIndex(index);
			battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap().put(hero.getId(), battleGoodsJoiner);
			
			BattleGoodsSceneEvent.getIns().in(hero, SceneConst.SCENE_SYSID_BATTLEGOOD, battleGoodsCrossRoomCache.getSceneUnitId());
			
			
		} catch (Exception e) {
			LogTool.error(e, BattleGoodCrossSysEvent.class, "joinCrossZcboss has wrong hero:"+hero.getId());
		}
		
	}
	
	
	/**
	 * 场景中玩家 宝箱 怪物状态改变
	 * @param changeSateMap
	 */
	public void sendChangeSateAndSource(List<Object[]> changeSateMap,BattleGoodsCrossRoomCache battleGoodsCrossRoomCache) {
		for (BattleGoodsJoiner battleGoodsJoiner:battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap().values()) {
			BattleGoodsSender.sendCmd_10120(battleGoodsJoiner.getHid(), changeSateMap.toArray());
		}
	}
	/**
	 * 宝箱和pvp积分处理
	 * @param battleGoods
	 * @param jf
	 * @param battleGoodsCrossRoomCache
	 */
	public void addSourceBox(BattleGoods battleGoods,int jf,BattleGoodsCrossRoomCache battleGoodsCrossRoomCache) {
		//+积分
		battleGoods.setSource(battleGoods.getSource()+jf);
		battleGoods.setSourceTime(TimeDateUtil.getCurrentTime());
		BattleGoodsSender.sendCmd_10122(battleGoods.getHid(), battleGoods.getSource());
		
		BattleGoodRanker battleGoodRanker=new BattleGoodRanker(battleGoods.getHid(), battleGoods.getFristzoneid(), battleGoods.getName(), battleGoods.getSource(), battleGoods.getSourceTime());
		//个人积分排序
		sortBattleGoods(battleGoodsCrossRoomCache.getBattleGoodRankList(), battleGoodRanker, 20);
		for (Struct_ricemb_290 ricemb_290: Config_ricemb_290.getIns().getSortList()) {
			if (!battleGoods.getReward().contains(ricemb_290.getId())&&battleGoods.getSource()>=ricemb_290.getPoint()) {
				BattleGoodsSender.sendCmd_10126(battleGoods.getHid(), ricemb_290.getId(), GameConst.REWARD_1);
			}
		}
		//国家积分
		int index = battleGoods.getIndex();
		BattleGoodZoneid battleGoodZoneid = battleGoodsCrossRoomCache.getSourceByZoneid().get(index);
		if (battleGoodZoneid!=null) {
			int sum=battleGoodZoneid.getSource()+jf;
			battleGoodZoneid.setSource(sum);
			battleGoodZoneid.setSourceTime(TimeDateUtil.getCurrentTime());
			int fristzoneid = battleGoodZoneid.getFristzoneid();
			ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
			for (BattleGoodsJoiner battleGoodsJoiner:battleGoodsJoinerjoinMap.values()) {
				BattleGoodsSender.sendCmd_10136(battleGoodsJoiner.getHid(), index,fristzoneid , sum);
			}
		}
	}
	/**
	 * 杀boss以及小怪积分和boss状态改变
	 * @param battleGoods
	 * @param struct_ricenpc_290
	 * @param battleGoodsCrossRoomCache
	 */
	public void addSourceNpc(BattleGoods battleGoods,Struct_ricenpc_290 struct_ricenpc_290,BattleGoodsCrossRoomCache battleGoodsCrossRoomCache) {
		//+积分
		int jf = struct_ricenpc_290.getPoint();
		battleGoods.setSource(battleGoods.getSource()+struct_ricenpc_290.getPoint());
		battleGoods.setSourceTime(TimeDateUtil.getCurrentTime());
		BattleGoodsSender.sendCmd_10122(battleGoods.getHid(), battleGoods.getSource());
		
		BattleGoodRanker battleGoodRanker=new BattleGoodRanker(battleGoods.getHid(), battleGoods.getFristzoneid(), battleGoods.getName(), battleGoods.getSource(), battleGoods.getSourceTime());
		//个人积分排序
		sortBattleGoods(battleGoodsCrossRoomCache.getBattleGoodRankList(), battleGoodRanker, 20);
		for (Struct_ricemb_290 ricemb_290: Config_ricemb_290.getIns().getSortList()) {
			if (!battleGoods.getReward().contains(ricemb_290.getId())&&battleGoods.getSource()>=ricemb_290.getPoint()) {
				BattleGoodsSender.sendCmd_10126(battleGoods.getHid(), ricemb_290.getId(), GameConst.REWARD_1);
			}
		}
		//国家积分
		int index = battleGoods.getIndex();
		BattleGoodZoneid battleGoodZoneid = battleGoodsCrossRoomCache.getSourceByZoneid().get(index);
		if (battleGoodZoneid!=null) {
			int sum=battleGoodZoneid.getSource()+jf;
			battleGoodZoneid.setSource(sum);
			battleGoodZoneid.setSourceTime(TimeDateUtil.getCurrentTime());
			int fristzoneid = battleGoodZoneid.getFristzoneid();
			ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
			for (BattleGoodsJoiner battleGoodsJoiner:battleGoodsJoinerjoinMap.values()) {
				BattleGoodsSender.sendCmd_10136(battleGoodsJoiner.getHid(), index,fristzoneid , sum);
				if (struct_ricenpc_290.getBoss()>0) {
					BattleGoodsSender.sendCmd_10140(battleGoodsJoiner.getHid(), struct_ricenpc_290.getNpc(), index, struct_ricenpc_290.getTime());
				}
				
			}
		}
	}
	
	public void gm(int cmd) {
		switch (cmd) {
		case 0:
			//子服报名
			CrossData crossData = new CrossData();
			crossData.putObject(BattleGoodType.zoneId.name(), GameProperties.getFirstZoneId());
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.BATTLEGOOD_SG_APPLY, crossData);
			LogTool.info("BattleGoodLocalSysEvent apply", BattleGoodLocalSysEvent.class);
			break;
		case 1:
			//中央服处理报名 准备
			BattleGoodIO.getIns().gm(cmd);
			break;
		case 2:
			//中央服 开启
			BattleGoodIO.getIns().gm(cmd);
			break;
		case 3:
			//中央服 结束
			BattleGoodIO.getIns().gm(cmd);
			break;	
		default:
			break;
		}
		
	}
	/**
	 * 
	 * @param bossSysId
	 * @param battleGoodsJoiner
	 * @param battleGoodsCrossRoomCache
	 */
	public void killerBossReshBox(Integer bossSysId,BattleGoodsJoiner battleGoodsJoiner, BattleGoodsCrossRoomCache battleGoodsCrossRoomCache) {
		try {
			int sceneUnitId = battleGoodsCrossRoomCache.getSceneUnitId();
			int index = battleGoodsJoiner.getIndex();
			BattleGoodZoneid battleGoodZoneid = battleGoodsCrossRoomCache.getSourceByZoneid().get(index);
			Set<Integer> killBoosids = battleGoodZoneid.getKillBoosids();
			killBoosids.add(bossSysId);
			BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(battleGoodsJoiner.getHid());
			for (int zoneid:battleGoodsCrossRoomCache.getFristZoneidToIndex().keySet()) {
				BattleGoodIO.getIns().noticeKillBossBroad(zoneid, battleGoods.getName(), bossSysId);
			}
			if (killBoosids.size()==3) {
				killBoosids.clear();
				ConcurrentHashMap<Long, BattleGoodsBox> battleGoodsBoxMap = battleGoodsCrossRoomCache.getBattleGoodsBoxMap();
					//三只都被击杀过  查看本国家粮草是否被采集  采集完了就刷新 没采集完不刷新
					
					//宝箱id   剩余未被采集的数量,
					HashMap<Integer,ExistBox> existboxMap=new HashMap<Integer,ExistBox>();
					for (BattleGoodsBox battleGoodsBox: battleGoodsBoxMap.values()) {
						if (battleGoodsBox.getIndex()==index) {
							int id = battleGoodsBox.getId();
							if (existboxMap.containsKey(id)) {
								ExistBox existBox = existboxMap.get(id);
								existBox.setLeftNum(existBox.getLeftNum()+1);
								existBox.getExistPoxyIndexs().add(battleGoodsBox.getPoxyIndex());
							}else {
								ExistBox existBox=new ExistBox();
								existBox.setBoxid(id);
								existBox.setLeftNum(1);
								existBox.getExistPoxyIndexs().add(battleGoodsBox.getPoxyIndex());
								existboxMap.put(battleGoodsBox.getId(), existBox);
							}
							
						}
					}
					
					for (Struct_rice_290 rice_290: Config_rice_290.getIns().getSortList()) {
						if (rice_290.getZy()==index) {
							int needNum=rice_290.getNum();
							int id = rice_290.getId();
							int length = rice_290.getZb().length;
							Set<Integer> posXyIndexs=new HashSet<>();
							for (int i = 0; i < length; i++) {
								posXyIndexs.add(i);
							}
							
							if (existboxMap.containsKey(id)) {
								ExistBox existBox = existboxMap.get(id);
								needNum=needNum-existBox.getLeftNum();
								for (int ExistPoxyindex:existBox.getExistPoxyIndexs()) {
									posXyIndexs.remove(ExistPoxyindex);
								}
							}
							if (needNum<0) {
								needNum=0;
							}
							for (int i = 0; i < needNum; i++) {
								int npcSysId = rice_290.getNpc();
								BattleGoodsBox battleGoodsBox=new BattleGoodsBox();
								battleGoodsBox.setId(rice_290.getId());
								battleGoodsBox.setIndex(index);
								battleGoodsBox.setState(0);
								
								int posXyIndex=0;
								if (posXyIndexs.size()>1) {
									posXyIndex = RandomUtil.getRandomNumInAreas(0, posXyIndexs.size()-1);
									posXyIndexs.remove(posXyIndex);
								}
								int pox = rice_290.getZb()[posXyIndex][0];
								int poy = rice_290.getZb()[posXyIndex][1];
								battleGoodsBox.setPoxyIndex(posXyIndex);
								battleGoodsBox.setPox(pox);
								battleGoodsBox.setPoy(poy);
								NPC npc=SceneFunction.getIns().addNpcToScene(npcSysId,pox, poy, -1, sceneUnitId, SceneConst.SCENE_SYSID_BATTLEGOOD, true);
								battleGoodsBox.setUnitid(npc.getId());
								battleGoodsBoxMap.put(npc.getId(), battleGoodsBox);
								
							}
						}
					}
					for (int zoneid:battleGoodsCrossRoomCache.getFristZoneidToIndex().keySet()) {
						BattleGoodIO.getIns().noticeBroadById(zoneid, ChatConst.BATTLE_GOODS_KILLALLBOSS, battleGoodsJoiner.getFristzoneid());
					}
				}
		} catch (Exception e) {
			LogTool.error(e, BattleGoodsFunction.class, "killerBossReshBox has wrong");
		}
		
	}
	
	
	
	public void sortBattleGoods(List<BattleGoodRanker> battleGoodsList,BattleGoodRanker battleGoods,int maxRank) {
		try {
			if (battleGoods==null) {
				return;
			}
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					int index = 0;
					BattleGoodRanker tempBattleGoods = null;
					index = battleGoodsList.indexOf(battleGoods);
					if(index >= 0){
						//存在缓存则更新
						tempBattleGoods = battleGoodsList.get(index);
						if (battleGoods.getSource()!=tempBattleGoods.getSource()) {
							tempBattleGoods.setSourceTime(battleGoods.getSourceTime());
						}
						tempBattleGoods.setHid(battleGoods.getHid());
						tempBattleGoods.setSource(battleGoods.getSource());
					}else {
						//不存在缓存则添加
						battleGoodsList.add(battleGoods);
					}
					Collections.sort(battleGoodsList, new BattleGoodRankerComparator());
					int i = 1;
					Iterator<BattleGoodRanker> iterator = battleGoodsList.iterator();
					while(iterator.hasNext()){
						BattleGoodRanker next = iterator.next();
						if(i > maxRank){
							iterator.remove();
						}
						i++;
					}
				}
				@Override
				public Object getSession() {
					return OpTaskConst.BATTLEGOODS_RANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "sortBattleGoods  has wrong");
		}
		
	}
	
	public void endSendReward() {
		Set<Integer> keySet = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().keySet();
		for(int partId : keySet) {
			try {
				BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId);
				ConcurrentHashMap<Integer, BattleGoodsCrossRoomCache> roomCacheMap = battleGoodsCrossPartCaChe.getRoomCacheMap();
				for (BattleGoodsCrossRoomCache battleGoodsRoom:roomCacheMap.values()) {
					//区服排名邮件
					//阵营排名->阵营序号
					HashMap<Integer, Integer> zoneidRank=new HashMap<Integer, Integer>();
					Object[] zoneidJf=null;
					List<BattleGoodZoneid> RankList = new ArrayList<BattleGoodZoneid>(battleGoodsRoom.getSourceByZoneid().values());
					Collections.sort(RankList, new BattleGoodZoneidComparator());
					int size=RankList.size();
					if (size>0) {
						zoneidJf=new Object[size];
						for (int i = 0; i < size; i++) {
							BattleGoodZoneid battleGoodZoneid = RankList.get(i);
							int rank=i+1;
							zoneidRank.put(rank, battleGoodZoneid.getIndex());
							zoneidJf[i]=new Object[] {battleGoodZoneid.getFristzoneid(),battleGoodZoneid.getSource()};
						}
					}
					int fristIndex=0;
					int twoIndex=0;
					int threeIndex=0;
					long mvpHid=0;
					if (zoneidRank.size()>0) {
						Map<Integer, Struct_ricerank_290> map = Config_ricerank_290.getIns().getMap();
						//排行第一阵营
						if (zoneidRank.containsKey(1)) {
							fristIndex=zoneidRank.get(1);
						}
						if (zoneidRank.containsKey(2)) {
							twoIndex=zoneidRank.get(2);
						}
						if (zoneidRank.containsKey(3)) {
							threeIndex=zoneidRank.get(3);
						}
						List<BattleGoods> BattleGoodsList = new ArrayList<BattleGoods>(battleGoodsRoom.getBattleGoodsAllMembers().values());
						Collections.sort(BattleGoodsList, new BattleGoodsComparator());
						
						Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(BattleGoodConst.MVP_REWARD);
						int[][] MVPReward = struct_xtcs_004.getOther();
						
						for (int i = 0; i < BattleGoodsList.size(); i++) {
							BattleGoods battleGoods = BattleGoodsList.get(i);
							if (battleGoods.getSource()>0) {
								if (battleGoods.getIndex()==fristIndex) {
									if (mvpHid==0) {
										//此人就是mvp了
										mvpHid=battleGoods.getHid();
										battleGoodsRoom.setMvpName(battleGoods.getName());
										//发mvp奖励
										MailFunction.getIns().sendMailWithFujianData2(battleGoods.getHid(), MailConst.BATTLEGOODS_RANK_MVP,
												new Object[] { MailConst.BATTLEGOODS_RANK_MVP},MVPReward);
									}
									Struct_ricerank_290 struct_ricerank_290 =map.get(1);
									MailFunction.getIns().sendMailWithFujianData2(battleGoods.getHid(), MailConst.BATTLEGOODS_RANK_ZONIE,
											new Object[] { MailConst.BATTLEGOODS_RANK_ZONIE,1}, struct_ricerank_290.getReward());
									
								}else if(battleGoods.getIndex()==twoIndex) {
									
									Struct_ricerank_290 struct_ricerank_290 =map.get(2);
									MailFunction.getIns().sendMailWithFujianData2(battleGoods.getHid(), MailConst.BATTLEGOODS_RANK_ZONIE,
											new Object[] { MailConst.BATTLEGOODS_RANK_ZONIE,2}, struct_ricerank_290.getReward());
									
								}else if(battleGoods.getIndex()==threeIndex) {
									
									Struct_ricerank_290 struct_ricerank_290 =map.get(3);
									MailFunction.getIns().sendMailWithFujianData2(battleGoods.getHid(), MailConst.BATTLEGOODS_RANK_ZONIE,
											new Object[] { MailConst.BATTLEGOODS_RANK_ZONIE,3}, struct_ricerank_290.getReward());
								}
							}
							//没有领取的奖励补发
							for (Struct_ricemb_290 ricemb_290: Config_ricemb_290.getIns().getSortList()) {
								if (!battleGoods.getReward().contains(ricemb_290.getId())&&battleGoods.getSource()>=ricemb_290.getPoint()) {
									battleGoods.getReward().add(ricemb_290.getId());
									MailFunction.getIns().sendMailWithFujianData2(battleGoods.getHid(), MailConst.BATTLEGOODS_SOURCE,
											new Object[] { MailConst.BATTLEGOODS_SOURCE}, ricemb_290.getReward());
								}
							}
							
						}
						
						
					}
					
					//个人排行奖励
					List<BattleGoodRanker> battleGoodRankList = battleGoodsRoom.getBattleGoodRankList();
					for (int i = 0; i < battleGoodRankList.size(); i++) {
						int rank=i+1;
						BattleGoodRanker battleGoodRanker = battleGoodRankList.get(i);
						for (Struct_ricerank2_290 ricerank2_290: Config_ricerank2_290.getIns().getSortList()) {
							if (rank>=ricerank2_290.getRank()[0][0]&&rank<=ricerank2_290.getRank()[0][1]) {
								MailFunction.getIns().sendMailWithFujianData2(battleGoodRanker.getHid(), MailConst.BATTLEGOODS_RANK_PERSON,
										new Object[] { MailConst.BATTLEGOODS_RANK_PERSON,rank}, ricerank2_290.getReward());
								LogTool.info("person rank: "+rank+"hid:"+battleGoodRanker.getHid()+" name:"+battleGoodRanker.getName(), BattleGoodsFunction.class);
							}
						}
					}
					//发送mvp到相应的子服
					if (battleGoodsRoom.getMvpName()!=null) {
						String mvpName = battleGoodsRoom.getMvpName();
						for (int zoneid:battleGoodsRoom.getFristZoneidToIndex().keySet()) {
							BattleGoodIO.getIns().noticeMVP(zoneid, mvpName);
						}
					}
					//
					ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsRoom.getBattleGoodsJoinerjoinMap();
					String mvpname="";
					int icon=0;
					int frame=0;
					if (mvpHid>0) {
						BattleGoods battleGoods = battleGoodsRoom.getBattleGoodsAllMembers().get(mvpHid);
						if (battleGoods!=null) {
							mvpname=battleGoods.getName();
							icon=battleGoods.getIcon();
							frame=battleGoods.getFrame();
						}
						for (int zoneid:battleGoodsRoom.getFristZoneidToIndex().keySet()) {
							BattleGoodIO.getIns().noticeBroadById(zoneid, ChatConst.BATTLE_GOODS_WINZONEID, battleGoods.getFristzoneid());
						}
					}
					for (BattleGoodsJoiner battleGoodsJoiner:battleGoodsJoinerjoinMap.values()) {
						long hid = battleGoodsJoiner.getHid();
						BattleGoodsSender.sendCmd_10138(hid, zoneidJf, mvpname, icon, frame);
						CrossSender.sendCmd_1666(hid, SystemIdConst.CROSS_BTTLE_GOOD);
						Hero hero =HeroCache.getHero(hid);
						if (hero!=null) {
							BattleGoodsManager.getIns().outscene(hero);
						}
					}
					
					
				}
			}catch (Exception e) {
				LogTool.error(e, BattleGoodsFunction.class, "endSendReward  partId=" + partId);
			}
		}
	}

	@Override
	public void getActHallData(List<Object[]> list) {
		if (BattleGoodsLocalCache.getMvpName()!=null) {
			list.add(new Object[] {SystemIdConst.CROSS_BTTLE_GOOD, BattleGoodsLocalCache.getMvpName()});
		}
		
	}
	
	
	
	
	

}
