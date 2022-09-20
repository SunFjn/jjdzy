package com.teamtop.system.crossWenDingTianXia.cross;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaConst;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaSender;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaNPC;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaRoom;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.util.astar.RobbertFunction;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_wdtx_260;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_wdtx_260;
import excel.struct.Struct_xtcs_004;

public class CrossWenDingTianXiaCrossSchedule extends AbsScheduleExecutor{
	public CrossWenDingTianXiaCrossSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}
	
	@Override
	public void execute(int now) {
		int state = CrossWenDingTianXiaCrossCache.getState();
		if(state != CrossWenDingTianXiaConst.STATE_1)
			return;
		//发定时奖励
		sendTimeAwards();
		//刷新NPC
		initNPC();
	}
	
	/**
	 * 发放定时奖励
	 */
	public void sendTimeAwards() {
		//记录发放奖励的时间
		CrossWenDingTianXiaCrossCache.setTimeSendTimeAwards(TimeDateUtil.getCurrentTime());
		
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		Iterator<Entry<Long, Hero>> iterator = heroMap.entrySet().iterator();
		while(iterator.hasNext()) {
			try {
				Entry<Long, Hero> next = iterator.next();
				Long hid = next.getKey();
				Hero hero = next.getValue();
				int crossLoginType = hero.getTempVariables().getCrossLoginType();
				if( crossLoginType!=SystemIdConst.CROSS_WEN_DING_TIAN_XIA) {//不是问鼎天下玩家
					continue;
				}
				boolean online = HeroFunction.getIns().isOnline(hid);
				if(!online) {
					continue;
				}
				CrossWenDingTianXiaRoom roomData = CrossWenDingTianXiaCrossFunction.getIns().getRoomData(hid);
				if(roomData==null) {
					LogTool.warn("SendTimeAwards.roomData is null.hid:"+hero.getId(), this);
					continue;
				}
				CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
				if(wdtxData==null) {
					LogTool.warn("SendTimeAwards.wdtxData is null.hid:"+hero.getId(), this);
					continue;
				}
				int layer = wdtxData.getLayer();
				Struct_wdtx_260 excel = Config_wdtx_260.getIns().get(layer);
				if (excel == null) {
					continue;
				}
				int[][] reward = excel.getReward();
				UseAddUtil.add(hero, reward, SourceGoodConst.WDTD_EVERY_TIME_AWARDS, UseAddUtil.getDefaultMail(), true);
				int scoreAddExcel = excel.getPoint1();
				
				//有玉玺的玩家，有额外积分
				long hidYuXi = roomData.getHidYuXi();
				if(hidYuXi == hero.getId()) {
					Struct_xtcs_004 xtcsExcel = Config_xtcs_004.getIns().get(XTCS004Const.WDTX_YU_XI_SCORE_ADD);
					int numAdd = xtcsExcel.getNum()+scoreAddExcel;
					if(numAdd!=0) {
						CrossWenDingTianXiaCrossFunction.getIns().refreshHeroScoreRank(hero, numAdd);
						//刷新本人头上的积分
						CrossWenDingTianXiaCrossFunction.getIns().reflashHeroState(hid);
						//飘一飘
						CrossWenDingTianXiaSender.sendCmd_4210(hid, numAdd);
					}
				}else {
					CrossWenDingTianXiaCrossFunction.getIns().refreshHeroScoreRank(hero, scoreAddExcel);
					//刷新本人头上的积分
					CrossWenDingTianXiaCrossFunction.getIns().reflashHeroState(hid);
					//飘一飘
					CrossWenDingTianXiaSender.sendCmd_4210(hid, scoreAddExcel);
				}
				
				CrossWenDingTianXiaCrossFunction.getIns().sendTimeAndScore(hero);
			} catch (Exception e) {
				LogTool.error(e, CrossWenDingTianXiaCrossSchedule.class);
			}
		}
	}
	
	public static void initNPC() {
		int state = CrossWenDingTianXiaCrossCache.getState();
		if(state != CrossWenDingTianXiaConst.STATE_1)
			return;
		
		Map<Integer, ConcurrentHashMap<Integer, CrossWenDingTianXiaRoom>> pWdtxRoomMap = CrossWenDingTianXiaCrossCache.getpWdtxRoomMap();
		Iterator<Integer> pIterator = pWdtxRoomMap.keySet().iterator();
		for(;pIterator.hasNext();) {
			int partId = pIterator.next();
			try {
				Map<Integer, CrossWenDingTianXiaRoom> roomMap = pWdtxRoomMap.get(partId);
				Iterator<Entry<Integer, CrossWenDingTianXiaRoom>> iterator = roomMap.entrySet().iterator();
				while(iterator.hasNext()) {
					Entry<Integer, CrossWenDingTianXiaRoom> next = iterator.next();
					CrossWenDingTianXiaRoom roomData = next.getValue();
					synchronized (roomData) {
						try {
							Map<Integer, Map<Long, NPC>> npcLayerMap = roomData.getNpcMap();
							List<Struct_wdtx_260> sortList = Config_wdtx_260.getIns().getSortList();
							for(Struct_wdtx_260 excel: sortList) {
								int layer = excel.getId();
								Map<Long, NPC> npcMap = npcLayerMap.get(layer);
								if(npcMap == null) {
									npcMap = new ConcurrentHashMap<>();
									npcLayerMap.put(layer, npcMap);
								}
								
								int nextLayer = excel.getNext();
								if(nextLayer==0) {
									//顶层，如果有玩家持有玉玺，就不初始化玉玺怪物
									long hidYuXi = roomData.getHidYuXi();
									if(hidYuXi!=0)
										continue;
								}
								Map<Integer, Integer> sceneUnitIdMap = roomData.getSceneUnitIdMap();
								int sceneUnitID = sceneUnitIdMap.get( layer);
								
								int sceneIDExcel = excel.getMap();
								int[][] npcExcel = excel.getNpc();
								int npcIDExcel = npcExcel[0][0];
								int numNpcExcel = npcExcel[0][1];
								int numNpcNow = npcMap.size();
								for(int i=0; i<numNpcExcel-numNpcNow; i++) {
									int[] randomPosStart = SceneEventFunction.getRandomPosFromAll( sceneIDExcel);
									int[] randomPosEnd = SceneEventFunction.getRandomPosFromAll( sceneIDExcel);
									CrossWenDingTianXiaNPC npc = new CrossWenDingTianXiaNPC( randomPosStart[0], randomPosStart[1]);
									npc.setSpeed(CrossWenDingTianXiaConst.NPC_DEFAULT_SPEED);
									RobbertFunction.makeRobbert(npc, npcIDExcel, sceneUnitID, 0, excel.getMap(), randomPosEnd[0], randomPosEnd[1], true);
									npcMap.put( npc.getId(), npc);
//								System.out.println("楼层"+layer+"添加怪物"+npcIDExcel+" x:"+randomPosEnd[0]+" y:"+ randomPosEnd[1]);
									if(nextLayer==0)
										CrossWenDingTianXiaCrossFunction.getIns().broadToRoomHero( 0, ChatConst.CROSS_WDTX_YU_XI_NPC, new Object[] { npc.getSysId()}, roomData.getRoomID(), partId);
								}
//								System.out.println("楼层"+layer+"有"+npcMap.size()+"只怪");
//							Iterator<Entry<Long, NPC>> iteratorNPC = npcMap.entrySet().iterator();
//							while(iteratorNPC.hasNext()) {
//								Entry<Long, NPC> nextNPC = iteratorNPC.next();
//								Long key = nextNPC.getKey();
//								NPC value = nextNPC.getValue();
//								System.out.println("楼层"+layer+"的怪物"+key+" x:"+value.getPosX()+" y:"+value.getPosY());
//							}
							}
						} catch (Exception e) {
							LogTool.error(e, CrossWenDingTianXiaCrossSchedule.class, "");
						}
					}
				}
			} catch (Exception e) {
				LogTool.error(e, CrossWenDingTianXiaCrossSchedule.class, "CrossWenDingTianXiaCrossSchedule initNPC");
			}
		}
		
	}

}
