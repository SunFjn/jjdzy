package com.teamtop.system.crossWenDingTianXia.cross;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossWdtxOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaConst;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaManager;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaSender;
import com.teamtop.system.crossWenDingTianXia.comparator.CrossWenDingTianXiaScoreRankComparator;
import com.teamtop.system.crossWenDingTianXia.comparator.CrossWenDingTianXiaTop10StrengthComparator;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaRoom;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaScoreRank;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaTop10Strength;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_wdtx_260;
import excel.config.Config_wdtxlz_260;
import excel.config.Config_wdtxlzjl_260;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_wdtx_260;
import excel.struct.Struct_wdtxlz_260;
import excel.struct.Struct_wdtxlzjl_260;
import excel.struct.Struct_xtcs_004;

public class CrossWenDingTianXiaCrossFunction {
	private static CrossWenDingTianXiaCrossFunction ins = null;

	public static CrossWenDingTianXiaCrossFunction getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaCrossFunction();
		}
		return ins;
	}

    /**
	 * 开始匹配区服
	 * 4个服一个房间。剩2-3个服,则为一个房间。剩1个服，则并入上个小组
	 */
	public void initRoomByStrengthAndZID() {
		Map<Integer, ConcurrentHashMap<Integer, Integer>> pWdtxZidToRoomIDMap = CrossWenDingTianXiaCrossCache.getpWdtxZidToRoomIDMap();
		Iterator<Integer> iterator = CrossWenDingTianXiaCrossCache.getpRankListMap().keySet().iterator();
		// Iterator<Integer> iterator = pWdtxZidToRoomIDMap.keySet().iterator();
		Map<Integer, Integer> prMap = new HashMap<>();
		for(;iterator.hasNext();) {
			int partId = iterator.next();
			try {
				Map<Integer, Integer> zidToRoomIDMap = pWdtxZidToRoomIDMap.get(partId);
				if (zidToRoomIDMap == null) {
					zidToRoomIDMap = new ConcurrentHashMap<>();
					pWdtxZidToRoomIDMap.put(partId, (ConcurrentHashMap<Integer, Integer>) zidToRoomIDMap);
				}
				List<CrossWenDingTianXiaTop10Strength> rankList = CrossWenDingTianXiaCrossCache.getWdtxTop10StrengthRankList(partId);
				int sizeRank = rankList.size();
				LogTool.info("WDTX.InitRoom old server.room-zid: partId="+partId,this);
//				/** 按开服一个月前、一个月后分配 */
//				List<CrossWenDingTianXiaTop10Strength> monthList = new ArrayList<>();
//				List<CrossWenDingTianXiaTop10Strength> monthAfterList = new ArrayList<>();
//				int currentTime = TimeDateUtil.getCurrentTime();
//				int monthTimes = TimeDateUtil.ONE_DAY_INT * 30;
//				for(int i=0; i<sizeRank; i++) {
//					CrossWenDingTianXiaTop10Strength rankData = rankList.get(i);
//					int passTime = currentTime - rankData.getOpenServerTime();
//					if (passTime > monthTimes) {
//						monthAfterList.add(rankData);
//					} else {
//						monthList.add(rankData);
//					}
//				}
//				List<Integer> roomIdList = new ArrayList<>();
//				roomIdList.add(0);
//				monthHandle(roomIdList, monthList, zidToRoomIDMap, partId);
//				LogTool.info("WDTX.InitRoom monthAfterList", this);
//				monthHandle(roomIdList, monthAfterList, zidToRoomIDMap, partId);
				List<CrossWenDingTianXiaTop10Strength> tempList = new ArrayList<>(rankList);
				int roomId = 0;
				for (int i = 0; i < sizeRank; i++) {
					int randomSize = tempList.size() - 1;
					int randomIndex = RandomUtil.getRandomNumInAreas(0, randomSize);
					CrossWenDingTianXiaTop10Strength rankData = tempList.get(0);
					if (randomSize > 1) {
						rankData = tempList.remove(randomIndex);
					} else {
						rankData = tempList.remove(0);
					}
					int zid = rankData.getZid();

					if (i != sizeRank - 1) {// 最后一个区，默认加入上一个房间号，这就符合老刘要求啦
						roomId = i / CrossWenDingTianXiaConst.SERVER_NUM + 1;
					}
					if (sizeRank == 1) {
						roomId = i / CrossWenDingTianXiaConst.SERVER_NUM + 1;
					}
					if (roomId == 0) {
						roomId = 1;
					}
					zidToRoomIDMap.put(zid, roomId);
					initRoomMap(roomId, partId);
					LogTool.info("WDTX.roomID:" + roomId + " zid:" + zid+" partId:"+partId, this);
				}
				prMap.put(partId, roomId);
			} catch (Exception e) {
				LogTool.error(e, CrossWenDingTianXiaCrossFunction.class, "CrossWenDingTianXiaCrossFunction initRoomByStrengthAndZID, partId="+partId);
			}
		}
		int day = Config_xtcs_004.getIns().get(XTCS004Const.WDTX_XX_DAY_NEW_SERVER).getNum();
		LogTool.info("WDTX.InitRoom "+day+" day new server.room-zid:",this);
		List<Integer> newServerList = CrossWenDingTianXiaCrossCache.getWdtxNewServerList();
		for(int i=0; i<newServerList.size(); i++) {
			Integer zid = newServerList.get(i);
			int partId = CrossCache.getPartId(zid);
			Integer old = prMap.get(partId);
			if(old==null) {
				old = 0;
			}
			int roomID = old+1;
			Map<Integer, Integer> zidToRoomIDMap = pWdtxZidToRoomIDMap.get(partId);
			if (zidToRoomIDMap == null) {
				zidToRoomIDMap = new ConcurrentHashMap<>();
				pWdtxZidToRoomIDMap.put(partId, (ConcurrentHashMap<Integer, Integer>) zidToRoomIDMap);
			}
			zidToRoomIDMap.put(zid, roomID);
			initRoomMap(roomID, partId);
			prMap.put(partId, roomID);
			LogTool.info("WDTX.roomID:"+roomID+" zid:"+zid+" partId:"+partId, this);
		}
	}

	/**
	 * 月处理
	 * 
	 * @param roomId
	 * @param monthList
	 * @param zidToRoomIDMap
	 */
	private void monthHandle(List<Integer> roomIdList, List<CrossWenDingTianXiaTop10Strength> monthList,
			Map<Integer, Integer> zidToRoomIDMap, int partId) {
		int oldRoomId = roomIdList.get(0);
		int roomId = 0;
		int size = monthList.size();
		if (size < 10) {
			int randomSize = size - 1;
			for (int i = 0; i < size; i++) {
				int randomIndex = RandomUtil.getRandomNumInAreas(0, randomSize);
				CrossWenDingTianXiaTop10Strength rankData = monthList.get(0);
				if(randomSize>1) {					
					rankData = monthList.remove(randomIndex);
				}else {
					rankData = monthList.remove(0);
				}
				int zid = rankData.getZid();

				if (i != size - 1) {// 最后一个区，默认加入上一个房间号，这就符合老刘要求啦
					roomId = oldRoomId + i / CrossWenDingTianXiaConst.SERVER_NUM + 1;
				}
				if (size == 1) {
					roomId = oldRoomId + i / CrossWenDingTianXiaConst.SERVER_NUM + 1;
				}
				if(roomId==0) {
					roomId = 1;
				}
				zidToRoomIDMap.put(zid, roomId);
				initRoomMap(roomId, partId);
				randomSize = monthList.size()-1;
				LogTool.info("WDTX.roomID:" + roomId + " zid:" + zid, this);
			}
		} else {
			for (int i = 0; i < size; i++) {
				CrossWenDingTianXiaTop10Strength rankData = monthList.get(i);
				int zid = rankData.getZid();
				
				if (i != size - 1) {// 最后一个区，默认加入上一个房间号，这就符合老刘要求啦
					roomId = oldRoomId + i / CrossWenDingTianXiaConst.SERVER_NUM + 1;
				}
				zidToRoomIDMap.put(zid, roomId);
				initRoomMap(roomId, partId);
				LogTool.info("WDTX.roomID:" + roomId + " zid:" + zid, this);
			}
		}
		roomIdList.set(0, roomId);// 新房号
	}

	private void initRoomMap(int roomID, int partId) {
		Map<Integer, CrossWenDingTianXiaRoom> roomMap = CrossWenDingTianXiaCrossCache.getWdtxRoomMap(partId);
		if (roomMap == null) {
			roomMap = new ConcurrentHashMap<>();
			CrossWenDingTianXiaCrossCache.setWdtxRoomMap((ConcurrentHashMap<Integer, CrossWenDingTianXiaRoom>) roomMap, partId);
		}
		CrossWenDingTianXiaRoom roomData = roomMap.get( roomID);
		if( roomData==null) {
			roomData = new CrossWenDingTianXiaRoom();
			roomData.setRoomID(roomID);
			roomData.setRankList(Collections.synchronizedList(new ArrayList< CrossWenDingTianXiaScoreRank>()));
			roomData.setNpcMap(new HashMap<>());
			roomData.setSceneUnitIdMap(new HashMap<>());
			roomMap.put( roomID, roomData);
			
			Map<Integer, Integer> sceneUnitIdMap = roomData.getSceneUnitIdMap();
			List<Struct_wdtx_260> sortList = Config_wdtx_260.getIns().getSortList();
			for(Struct_wdtx_260 temp: sortList) {
				int layer = temp.getId();
				sceneUnitIdMap.put( layer, SceneCache.getSceneUnitId());
			}
		}
	}

	/**
	 * 初始化子服状态
	 */
	public void resetState() {
		//设置开启状态
		CrossWenDingTianXiaCrossCache.setState(CrossWenDingTianXiaConst.STATE_0);
		
		Map<Integer, ConcurrentHashMap<Integer, Integer>> pWdtxZidToRoomIDMap = CrossWenDingTianXiaCrossCache.getpWdtxZidToRoomIDMap();
		Iterator<Integer> pIterator = pWdtxZidToRoomIDMap.keySet().iterator();
		for(;pIterator.hasNext();) {
			int partId = pIterator.next();
			try {
				Map<Integer, Integer> roomIDMap = pWdtxZidToRoomIDMap.get(partId);
				Iterator<Entry<Integer, Integer>> iterator = roomIDMap.entrySet().iterator();
				while(iterator.hasNext()) {
					Entry<Integer, Integer> next = iterator.next();
					int zid = next.getKey();
					CrossWenDingTianXiaCrossToLocal.getIns().sendBeginTimeAndStarCL(zid, 0, CrossWenDingTianXiaConst.STATE_0, null);
				}
			} catch (Exception e) {
				LogTool.error(e, CrossWenDingTianXiaCrossFunction.class, "CrossWenDingTianXiaCrossFunction resetState, partId="+partId);
			}
		}
	}

	/**
	 * 开始活动
	 * 刷新子服活动时间，开放入口
	 */
	public void begin() {
		//设置活动时间
		int timeEnd = TimeDateUtil.getCurrentTime() + CrossWenDingTianXiaConst.TIME_GAME_PLAY;
		CrossWenDingTianXiaCrossCache.setEndTime(timeEnd);
		//设置开启状态
		CrossWenDingTianXiaCrossCache.setState(CrossWenDingTianXiaConst.STATE_1);
		
		Map<Integer, ConcurrentHashMap<Integer, Integer>> pWdtxZidToRoomIDMap = CrossWenDingTianXiaCrossCache.getpWdtxZidToRoomIDMap();
		Iterator<Integer> pIterator = pWdtxZidToRoomIDMap.keySet().iterator();
		for(;pIterator.hasNext();) {
			int partId = pIterator.next();
			try {
				Map<Integer, Integer> roomIDMap = pWdtxZidToRoomIDMap.get(partId);
				Iterator<Entry<Integer, Integer>> iterator = roomIDMap.entrySet().iterator();
				while(iterator.hasNext()) {
					Entry<Integer, Integer> next = iterator.next();
					int zid = next.getKey();
					CrossWenDingTianXiaCrossToLocal.getIns().sendBeginTimeAndStarCL(zid, timeEnd, CrossWenDingTianXiaConst.STATE_1, null);
					LogTool.info("WDTX.begin.zid:"+zid+" timeEnd:"+timeEnd, this);
				}
			} catch (Exception e) {
				LogTool.error(e, CrossWenDingTianXiaCrossFunction.class, "CrossWenDingTianXiaCrossFunction begin, partId="+partId);
			}
		}
	}

	/**
	 * 活动结束
	 */
	public void end() {
		//设置关闭状态
		CrossWenDingTianXiaCrossCache.setState(CrossWenDingTianXiaConst.STATE_2);
		
		Map<Integer, ConcurrentHashMap<Integer, CrossWenDingTianXiaRoom>> pWdtxRoomMap = CrossWenDingTianXiaCrossCache.getpWdtxRoomMap();
		Map<Integer, ConcurrentHashMap<Integer, Integer>> getpWdtxZidToRoomIDMap = CrossWenDingTianXiaCrossCache.getpWdtxZidToRoomIDMap();
		Iterator<Integer> iterator = pWdtxRoomMap.keySet().iterator();
		for(;iterator.hasNext();) {
			int partId = iterator.next();
			Map<Integer, CrossWenDingTianXiaRoom> wdtxRoomMap = pWdtxRoomMap.get(partId);
			//通知子服mvp
			Map<Integer, Integer> wdtxZidToRoomIDMap = getpWdtxZidToRoomIDMap.get(partId);
			Iterator<Entry<Integer, Integer>> iteratorZID = wdtxZidToRoomIDMap.entrySet().iterator();
			while(iteratorZID.hasNext()) {
				Entry<Integer, Integer> next = iteratorZID.next();
				Integer zid = next.getKey();
				Integer roomID = next.getValue();
				CrossWenDingTianXiaRoom roomData = wdtxRoomMap.get(roomID);
				if(roomData!=null){
					long hidYuXi = roomData.getHidYuXi();
					if(hidYuXi!=0) {
						CrossWenDingTianXiaCrossToLocal.getIns().saveMvpCL( zid, roomData.getNameYuXi());
						CrossWenDingTianXiaCrossToLocal.getIns().sendBeginTimeAndStarCL(zid, 0, CrossWenDingTianXiaConst.STATE_2, roomData.getNameYuXi());
					}else {
						CrossWenDingTianXiaCrossToLocal.getIns().sendBeginTimeAndStarCL(zid, 0, CrossWenDingTianXiaConst.STATE_2, null);
					}
				}
			}
			
//			//关闭子服入口
//			Map<Integer, Integer> roomIDMap = CrossWenDingTianXiaCrossCache.getWdtxZidToRoomIDMap();
//			Iterator<Entry<Integer, Integer>> iterator = roomIDMap.entrySet().iterator();
//			while(iterator.hasNext()) {
//				Entry<Integer, Integer> next = iterator.next();
//				int zid = next.getKey();
//				CrossWenDingTianXiaCrossToLocal.getIns().sendBeginTimeAndStarCL(zid, 0, CrossWenDingTianXiaConst.STATE_2, null);
//			}
			
			Set<Entry<Integer, CrossWenDingTianXiaRoom>> entrySet = wdtxRoomMap.entrySet();
			Iterator<Entry<Integer, CrossWenDingTianXiaRoom>> iterator1 = entrySet.iterator();
			//发放奖励
			while(iterator1.hasNext()) {
				try {
					Entry<Integer, CrossWenDingTianXiaRoom> next = iterator1.next();
					CrossWenDingTianXiaRoom room = next.getValue();
					long hidYuXi = room.getHidYuXi();
					int frameYuXi = room.getFrameYuXi();
					int iconYuXi = room.getIconYuXi();
					String nameYuXi = room.getNameYuXi();
					LogTool.info("WDTX.Send room awards.roomID:"+room.getRoomID(), this);
					List<CrossWenDingTianXiaScoreRank> rankList = room.getRankList();
					int size = rankList.size();
					LogTool.info("WDTX.RankAwards.rankList size:" + size, this);
					for (int i = 0; i < size; i++) {
						CrossWenDingTianXiaScoreRank temp = rankList.get(i);
						try {
							long hid = temp.getHid();
							int rank = temp.getRank();
							
							CrossWenDingTianXiaCrossToLocal.getIns().sendRankAwardsCL(hid, rank, CrossWenDingTianXiaConst.TYPE_AWARDS_0, 0);
							LogTool.info("WDTX.RankAwards.hid:"+hid+" rank:"+rank+" roomID:"+room.getRoomID()+" score:"+temp.getScore(), this);
							
							Map<Integer, Integer> killAwards = temp.getKillAwards();
							Iterator<Entry<Integer, Integer>> iteratorKill = killAwards.entrySet().iterator();
							while(iteratorKill.hasNext()) {
								Entry<Integer, Integer> nextKill = iteratorKill.next();
								Integer idAwards = nextKill.getKey();
								Integer stateAwards = nextKill.getValue();
								if(stateAwards == CrossWenDingTianXiaConst.STATE_AWARDS_1) {
									//发放斩杀奖励
									CrossWenDingTianXiaCrossToLocal.getIns().sendRankAwardsCL(hid, rank, CrossWenDingTianXiaConst.TYPE_AWARDS_1, idAwards);
									LogTool.info("WDTX.KillAwards.hid:"+hid+" id:"+idAwards, this);
								}
							}
							
							Map<Integer, Integer> layerAwards = temp.getLayerAwards();
							Iterator<Entry<Integer, Integer>> iteratorLayer = layerAwards.entrySet().iterator();
							while(iteratorLayer.hasNext()) {
								Entry<Integer, Integer> nextLayer = iteratorLayer.next();
								Integer idExcel = nextLayer.getKey();
								Integer stateExcel = nextLayer.getValue();
								if(stateExcel == CrossWenDingTianXiaConst.STATE_AWARDS_1) {
									//发放楼层奖励
									CrossWenDingTianXiaCrossToLocal.getIns().sendRankAwardsCL(hid, rank, CrossWenDingTianXiaConst.TYPE_AWARDS_2, idExcel);
									LogTool.info("WDTX.LayerAwards.hid:"+hid+" id:"+idExcel, this);
								}
							}

							Map<Integer, Integer> scoreAwards = temp.getScoreAwards();
							Iterator<Entry<Integer, Integer>> iteratorScore = scoreAwards.entrySet().iterator();
							while(iteratorScore.hasNext()) {
								Entry<Integer, Integer> nextLayer = iteratorScore.next();
								Integer idExcel = nextLayer.getKey();
								Integer stateExcel = nextLayer.getValue();
								if(stateExcel == CrossWenDingTianXiaConst.STATE_AWARDS_1) {
									//发放积分奖励
									CrossWenDingTianXiaCrossToLocal.getIns().sendRankAwardsCL(hid, rank, CrossWenDingTianXiaConst.TYPE_AWARDS_4, idExcel);
									LogTool.info("WDTX.ScoreAwards.hid:"+hid+" id:"+idExcel, this);
								}
							}
							
							if(hidYuXi == hid) {
								//发放玉玺天子奖励
								CrossWenDingTianXiaCrossToLocal.getIns().sendRankAwardsCL(hid, rank, CrossWenDingTianXiaConst.TYPE_AWARDS_3, 0);
								LogTool.info("WDTX.YuXiAwards.hid:"+hid+" roomID:"+room.getRoomID(), this);
							}
							//通知玩家退出房间
							CrossWenDingTianXiaSender.sendCmd_4212(hid, nameYuXi, iconYuXi, frameYuXi);
						} catch (Exception e) {
							LogTool.error(e, CrossWenDingTianXiaCrossFunction.class);
						}
					}
				} catch (Exception e) {
					LogTool.error(e, CrossWenDingTianXiaCrossFunction.class);
				}
			}
		}
		
		//清空缓存数据
		CrossWenDingTianXiaCrossCache.getpRankListMap().clear();
		CrossWenDingTianXiaCrossCache.getWdtxNewServerList().clear();
		CrossWenDingTianXiaCrossCache.getpWdtxRoomMap().clear();
		CrossWenDingTianXiaCrossCache.getpWdtxZidToRoomIDMap().clear();
	}

	public void refreshTop10StrengthZIDRank(long strengthTop10, int zID, int openServerTime) {
		OpTaskExecutorService.PublicOrderService.execute(new CrossWdtxOpTaskRunnable() {

			@Override
			public void run() {
				refreshTop10StrengthZIDRankHandle(strengthTop10, zID, openServerTime);
			}

			@Override
			public Object getSession() {
				return OpTaskConst.CROSS_WDTX;
			}
		});
	}

	/**
     * 排行榜刷新
     */
	public void refreshTop10StrengthZIDRankHandle(long strengthTop10, int zID, int openServerTime) {
        try {
        	int partId = CrossCache.getPartId(zID);
        	List<CrossWenDingTianXiaTop10Strength> rankList = CrossWenDingTianXiaCrossCache.getWdtxTop10StrengthRankList(partId);
			if (rankList == null) {
				rankList = new ArrayList<>();
				CrossWenDingTianXiaCrossCache.setWdtxTop10StrengthRankList(rankList, partId);
			}
        	CrossWenDingTianXiaTop10Strength model = new CrossWenDingTianXiaTop10Strength();
            model.setTop10StrengthAll(strengthTop10);
			model.setOpenServerTime(openServerTime);
            model.setZid(zID);
			// 判断排行榜缓存是否存在该数据
			int index = rankList.indexOf(model);
			if (index >= 0) {
				// 存在缓存则更新
				CrossWenDingTianXiaTop10Strength tempModel = rankList.get(index);
				tempModel.setTop10StrengthAll(strengthTop10);
				tempModel.setOpenServerTime(openServerTime);
				tempModel.setZid(zID);
			} else {
				// 不存在缓存则添加
				rankList.add(model);
            }
			// 重新排名
			sortTop10StrengthZIDRank(partId);
        } catch (Exception e) {
            LogTool.error(e, zID, "RefreshRank error!");
        }
    }

    /**
     * 排行榜重新排名
     */
    private void sortTop10StrengthZIDRank(int partId) {
    	List<CrossWenDingTianXiaTop10Strength> rankList = CrossWenDingTianXiaCrossCache.getWdtxTop10StrengthRankList(partId);
    	int i = 1;
    	Collections.sort(rankList, new CrossWenDingTianXiaTop10StrengthComparator());
    	Iterator<CrossWenDingTianXiaTop10Strength> iterator = rankList.iterator();
    	while (iterator.hasNext()) {
    		CrossWenDingTianXiaTop10Strength model = iterator.next();
    		model.setRank(i);
    		i++;
    	}
    }

    /**
     * 玩家排行榜刷新
     * @param	scoreChange	变动的积分
     */
    public void refreshHeroScoreRank(Hero hero, int scoreChange) {
        try {		
			int zid = hero.getBelongZoneid();
			int partId = CrossCache.getPartId(zid);
			Map<Integer, Integer> zidToRoomIDMap = CrossWenDingTianXiaCrossCache.getWdtxZidToRoomIDMap(partId);
        	Integer roomID = zidToRoomIDMap.get( zid);
			Map<Integer, CrossWenDingTianXiaRoom> roomMap = CrossWenDingTianXiaCrossCache.getWdtxRoomMap(partId);
        	CrossWenDingTianXiaRoom roomData = roomMap.get(roomID);
        	List<CrossWenDingTianXiaScoreRank> rankList = roomData.getRankList();
        	
        	CrossWenDingTianXiaScoreRank model = new CrossWenDingTianXiaScoreRank();
            model.setHid(hero.getId());
            synchronized (rankList) {
                //判断排行榜缓存是否存在该玩家数据
            	int index = rankList.indexOf(model);
                if (index >= 0) {
                    //存在缓存则更新
                	CrossWenDingTianXiaScoreRank tempModel = rankList.get(index);
                	
                	int scoreNew = Math.max(0, tempModel.getScore() + scoreChange);//积分不能小于0
                	tempModel.setScore( scoreNew);
                	
                	int scoreMax = Math.max( scoreNew, tempModel.getScoreMax());//设置最高分
                	tempModel.setScoreMax(scoreMax);
                	
                    tempModel.setTime(TimeDateUtil.getCurrentTime());
                } else {
                    //不存在缓存则添加
                	model.setName(hero.getNameZoneid());
                	model.setScore(scoreChange);
                	model.setTime(TimeDateUtil.getCurrentTime());
                	model.setKillAwards(new HashMap<>());
                	model.setLayerAwards(new HashMap<>());
                	model.setScoreAwards(new HashMap<>());
                    rankList.add(model);
                }
                //重新排名
				sortScoreRank(roomID, partId);
            }
        } catch (Exception e) {
            LogTool.error(e, hero.getId(), "refreshHeroScoreRank error!");
        }
    }

    /**
     * 排行榜重新排名
     */
	private void sortScoreRank(int roomID, int partId) {
		Map<Integer, CrossWenDingTianXiaRoom> roomMap = CrossWenDingTianXiaCrossCache.getWdtxRoomMap(partId);
    	CrossWenDingTianXiaRoom roomData = roomMap.get(roomID);
    	List<CrossWenDingTianXiaScoreRank> rankList = roomData.getRankList();
    	
    	int i = 1;
    	Collections.sort(rankList, new CrossWenDingTianXiaScoreRankComparator());
    	Iterator<CrossWenDingTianXiaScoreRank> iterator = rankList.iterator();
    	while (iterator.hasNext()) {
    		CrossWenDingTianXiaScoreRank model = iterator.next();
    		model.setRank(i);
    		i++;
    	}
    }
    
    /**
	 * 刷新活动时间、定时奖励时间、玩家积分、玩家排名、连斩数、buff层数
	 */
	public void sendTimeAndScore(Hero hero) {
		CrossWenDingTianXiaScoreRank rankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		int score = rankData.getScore();
		
		//活动倒计时
		int timeEnd = CrossWenDingTianXiaCrossCache.getEndTime();
		int timeNow = TimeDateUtil.getCurrentTime();
		int timeSurplus = Math.max( 0, timeEnd - timeNow);
		
		//定时奖励倒计时
		int timeAwards = CrossWenDingTianXiaCrossCache.getTimeSendTimeAwards();
		int timeAwardsSurplus = Math.max( 0, timeAwards+CrossWenDingTianXiaConst.TIME_AWARDS - timeNow);
		
		//排名
		CrossWenDingTianXiaScoreRank heroRankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		int rank = -1;
		if(heroRankData != null) {
			rank = heroRankData.getRank();
		}
		
		//buff层数
		int buffLayer = getBuffLayer(rankData.getNumDeath());
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		int killContinue = wdtxData.getNumKillContinue();
		int numKillThisLayer = wdtxData.getNumKillThisLayer();
		CrossWenDingTianXiaSender.sendCmd_4202(hero.getId(), timeSurplus, timeAwardsSurplus, rank, score, killContinue, buffLayer, numKillThisLayer);
	}

	/**
	 * 获取buf层数
	 * 连续死亡3次可获得复仇之魂BUFF, 之后每死亡1次,buff等级+1
	 */
	public int getBuffLayer(int deathNum) {
		int layerBuff = deathNum-CrossWenDingTianXiaConst.NUM_DEATH+1;
		if( 0 < layerBuff&& layerBuff < CrossWenDingTianXiaConst.NUM_DEATH_10) {
			return layerBuff;
		}else if(layerBuff > CrossWenDingTianXiaConst.NUM_DEATH_10){
			return CrossWenDingTianXiaConst.NUM_DEATH_10;
		}else {
			return 0;
		}
	}

	/**
	 * 获取玩家数据
	 */
	public CrossWenDingTianXiaScoreRank getHeroRankData(long hid) {
		if (hid == 0) {
			return null;
		}
		Hero hero = HeroCache.getHero(hid);
		int zIDHero = hero.getBelongZoneid();
		int partId = CrossCache.getPartId(zIDHero);
		Map<Integer, Integer> zidMap = CrossWenDingTianXiaCrossCache.getWdtxZidToRoomIDMap(partId);
		Integer roomID = zidMap.get(zIDHero);
		if(roomID == null) {
			//该区未分配房间
			System.out.println("getHeroRankData.roomID == null.hid:"+hid);
			return null;
		}
		Map<Integer, CrossWenDingTianXiaRoom> roomMap = CrossWenDingTianXiaCrossCache.getWdtxRoomMap(partId);
		CrossWenDingTianXiaRoom roomData = roomMap.get(roomID);
		if(roomData == null) {
			//该房间号找不到房间
			System.out.println("getHeroRankData.roomData == null.hid:"+hid);
			return null;
		}
		List<CrossWenDingTianXiaScoreRank> rankList = roomData.getRankList();
		CrossWenDingTianXiaScoreRank rankTemp = new CrossWenDingTianXiaScoreRank();
		rankTemp.setHid(hid);
		int indexOf = rankList.indexOf(rankTemp);
		if(indexOf < 0) {
			//未进入排名
			System.out.println("getHeroRankData.indexOf < 0.hid:"+hid);
			return null;
		}
		return rankTemp = rankList.get(indexOf);
    }
	/**
	 * 获取房间数据
	 */
	public CrossWenDingTianXiaRoom getRoomData(long hid) {
		Hero hero = HeroCache.getHero(hid);
		int zIDHero = hero.getBelongZoneid();
		int partId = CrossCache.getPartId(zIDHero);
		if (hid == 0) {
			return null;
		}
		Map<Integer, Integer> zidMap = CrossWenDingTianXiaCrossCache.getWdtxZidToRoomIDMap(partId);
		if(zidMap==null) {
			return null;
		}
		Integer roomID = zidMap.get(zIDHero);
		if(roomID == null) {
			//该区未分配房间
			System.out.println("getHeroRankData.roomID == null.hid:"+hid);
			return null;
		}
		Map<Integer, CrossWenDingTianXiaRoom> roomMap = CrossWenDingTianXiaCrossCache.getWdtxRoomMap(partId);
		CrossWenDingTianXiaRoom roomData = roomMap.get(roomID);
		if(roomData == null) {
			//该房间号找不到房间
			System.out.println("getHeroRankData.roomData == null.hid:"+hid);
			return null;
		}
		return roomData;
	}
	
    /**
	 * 刷新房间数据  层数、玉玺持有者、玉玺持有者名字、头像、头像框
	 */
	public void sendLayerAndYuXiHeroData(Hero hero) {
		CrossWenDingTianXiaRoom roomData = getRoomData(hero.getId());
		if(roomData==null) {
			System.out.println("sendLayerAndYuXiHeroData.room is null,hid:"+hero.getId());
			return;
		}
		long hidYuXi = roomData.getHidYuXi();
		Hero heroYuXi = HeroCache.getHero( hidYuXi);
		if(heroYuXi != null) {
			CrossWenDingTianXiaSender.sendCmd_4204( hero.getId(), heroYuXi.getId(), heroYuXi.getNameZoneid(), heroYuXi.getIcon(), heroYuXi.getFrame());
		}
	}
	
	/**
	 * 刷新房间所有人数据  层数、玉玺持有者、玉玺持有者名字、头像、头像框
	 */
	public void sendLayerAndYuXiHeroDataToAll( long hid) {
		try {
			CrossWenDingTianXiaRoom roomData = getRoomData(hid);
			if(roomData==null) {
				System.out.println("sendLayerAndYuXiHeroData.room is null,hid:"+hid);
				return;
			}
			long hidYuXi = roomData.getHidYuXi();
			Hero heroYuXi = HeroCache.getHero( hidYuXi);
			List<CrossWenDingTianXiaScoreRank> rankList = roomData.getRankList();
			int size = rankList.size();
			for (int i = 0; i < size; i++) {
				CrossWenDingTianXiaScoreRank temp = rankList.get(i);
				long hidTemp = temp.getHid();
				boolean online = HeroFunction.getIns().isOnline( hidTemp);
				if(!online)
					continue;
				Hero heroTemp = HeroCache.getHero( hidTemp);
				if(heroTemp==null) 
					continue;
				int crossSysid = HeroFunction.getIns().getCrossSysid(hidTemp);
				if(crossSysid!=SystemIdConst.CROSS_WEN_DING_TIAN_XIA)
					continue;
				
				if(heroYuXi == null) {
					CrossWenDingTianXiaSender.sendCmd_4204( hidTemp, 0, "", 0, 0);
				}else{
					CrossWenDingTianXiaSender.sendCmd_4204( hidTemp, heroYuXi.getId(), heroYuXi.getNameZoneid(), heroYuXi.getIcon(), heroYuXi.getFrame());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "");
		}
	}
	
	/**
	 * 战斗结束
	 */
	public void battleEnd(long hidWin, long hidFail) {
		Hero heroWin = HeroCache.getHero(hidWin);
		Hero heroFail = HeroCache.getHero(hidFail);
		CrossWenDingTianXiaScoreRank heroRankDataWin = getHeroRankData(hidWin);
		CrossWenDingTianXiaScoreRank heroRankDataFail = getHeroRankData(hidFail);
		if(heroWin!=null&& heroFail!=null&& heroRankDataWin!=null&& heroRankDataFail!=null) {
			//正常战斗结束
			battleEndPVP(heroWin, heroFail, heroRankDataWin, heroRankDataFail);
		}else if(heroWin==null&& heroFail!=null){
			//玩家退出副本强行退出战斗
			CrossWenDingTianXia wdtxDataFail = heroFail.getCrossWenDingTianXia();
			//清空连斩数
			wdtxDataFail.setNumKillContinue( 0);
			//扣分
			int layerFail = wdtxDataFail.getLayer();
			Struct_wdtx_260 excelLayerFail = Config_wdtx_260.getIns().get(layerFail);
			if(excelLayerFail==null)
				System.err.println("错误楼层："+layerFail);
			int scoreLoseExcel = excelLayerFail.getLose();
			if( scoreLoseExcel>0) {
				refreshHeroScoreRank(heroFail, scoreLoseExcel*-1);
				//积分冒泡显示
				CrossWenDingTianXiaSender.sendCmd_4210(heroFail.getId(), scoreLoseExcel*-1);
				//结算界面
				CrossWenDingTianXiaSender.sendCmd_4234(heroFail.getId(), 1, BattleConst.RESULT_ATT_LOSE, new Object[] {});
			}
		}
	}
	
	private void battleEndPVP(Hero heroWin, Hero heroFail, CrossWenDingTianXiaScoreRank heroRankDataWin, CrossWenDingTianXiaScoreRank heroRankDataFail) {
		//战斗胜利增加积分=防守方当前积分*X%+连斩积分(击杀主宰积分/击杀超神积分)
		CrossWenDingTianXia wdtxDataWin = heroWin.getCrossWenDingTianXia();
		CrossWenDingTianXia wdtxDataFail = heroFail.getCrossWenDingTianXia();
		CrossWenDingTianXiaRoom roomData = getRoomData(heroWin.getId());
		long hidYuXi = roomData.getHidYuXi();
		Struct_wdtx_260 excelLayer = Config_wdtx_260.getIns().get(wdtxDataWin.getLayer());
		
		int scoreWinChange = getWinScore( heroFail.getId());
		if(scoreWinChange>0) {
			//刷新排行榜
			refreshHeroScoreRank(heroWin, scoreWinChange);
			//积分冒泡显示
			CrossWenDingTianXiaSender.sendCmd_4210(heroWin.getId(), scoreWinChange);
			//结算界面的数据
			wdtxDataWin.setResultBattle(BattleConst.RESULT_ATT_WIN);
			if(hidYuXi==heroFail.getId()) {
				//获得一份玉玺抢夺奖励
				Struct_xtcs_004 excelXTCS = Config_xtcs_004.getIns().get( XTCS004Const.WDTX_YU_XI_WIN_AWARDS);
				int[][] other = excelXTCS.getOther();
				UseAddUtil.add(heroWin, other, SourceGoodConst.WDTD_YU_XI_AWARDS, UseAddUtil.getDefaultMail(), true);
				
				List<Object[]> sendData =new ArrayList<>();
				for( int[] temp:other) {
					sendData.add( new Object[] { temp[0], temp[1], temp[2]});
				}
				sendData.add( new Object[] {GameConst.TOOL, GameConst.SCORE, scoreWinChange});
				wdtxDataWin.setResultData(sendData.toArray());
			}else {
				wdtxDataWin.setResultData( new Object[] { new Object[] {GameConst.TOOL, GameConst.SCORE, scoreWinChange}});
			}

		}else {
			//结算界面的数据
			wdtxDataWin.setResultBattle(BattleConst.RESULT_ATT_WIN);
			wdtxDataWin.setResultData( new Object[] { });
		}
		//累积连斩数
		wdtxDataWin.setNumKillContinue( wdtxDataWin.getNumKillContinue() + 1);
		wdtxDataWin.setNumKillThisLayer( wdtxDataWin.getNumKillThisLayer() + 1);
		//判断是否跳层
		CrossWenDingTianXiaCrossFunction.getIns().goToNextLayer(heroWin);
//		if( wdtxDataWin.getnumki)
		//设置连斩奖励状态
		int numKillContinueFail = wdtxDataFail.getNumKillContinue();
		int killTypeFail = getKillType(numKillContinueFail);
		checkKillAwards(heroWin, killTypeFail, heroFail.getNameZoneid());
		//玉玺转移
		if(hidYuXi==heroFail.getId()) {
			roomData.setHidYuXi(heroWin.getId());
			roomData.setFrameYuXi(heroWin.getFrame());
			roomData.setIconYuXi(heroWin.getIcon());
			roomData.setNameYuXi(heroWin.getNameZoneid());
			//刷新所有人上方数据
			CrossWenDingTianXiaCrossFunction.getIns().sendLayerAndYuXiHeroDataToAll(heroWin.getId());
			//广播
			int zid = heroWin.getBelongZoneid();
			broadToRoomHero( zid, ChatConst.CROSS_WDTX_GET_YU_XI, new Object[] {heroWin.getNameZoneid(), heroFail.getNameZoneid()}, 0);
		}
		
		//战斗失败
		int layerFail = wdtxDataFail.getLayer();
		int scoreLoseExcel = excelLayer.getLose();
		if( scoreLoseExcel!=0) {
			refreshHeroScoreRank(heroFail, scoreLoseExcel*-1);
			//积分冒泡显示
			CrossWenDingTianXiaSender.sendCmd_4210(heroFail.getId(), scoreLoseExcel*-1);
		}
		//结算界面的数据
		wdtxDataFail.setResultBattle(BattleConst.RESULT_ATT_LOSE);
		wdtxDataFail.setResultData( new Object[] { });
		int layerNewFail = 0;//0代表没掉层  其他代表掉层
		int proUpperLayerExcel = excelLayer.getTj();
		int randomNumInAreas = RandomUtil.getRandomNumInAreas(0, CrossWenDingTianXiaConst.PRO_UPPER_LAYER);
		if( proUpperLayerExcel >= randomNumInAreas) {
			//掉层
			int nowLayer = layerFail - 1;
			if (nowLayer == 0) {
				nowLayer = 1;
			}
			wdtxDataFail.setLayer(nowLayer);
			layerNewFail = wdtxDataFail.getLayer();
			wdtxDataFail.setNumKillThisLayer( 0);//掉层也重置
			//刷新玩家掉层
			sendLayerAndYuXiHeroData(heroFail);
			//刷新玩家掉回上一层
			CrossWenDingTianXiaSender.sendCmd_4206(heroFail.getId(), 1, wdtxDataFail.getLayer());
		}
		//清空连斩数
		wdtxDataFail.setNumKillContinue( 0);
		//累积死亡次数
		heroRankDataFail.setNumDeath( heroRankDataFail.getNumDeath() + 1);
		//设置死亡时间
		wdtxDataFail.setTimeDeath( TimeDateUtil.getCurrentTime());
		//提示玩家死亡
		CrossWenDingTianXiaSender.sendCmd_4230(heroFail.getId(), heroWin.getNameZoneid(), layerNewFail);
		
		//广播
		broadKill(heroWin);
		wdtxDataWin.setChangeXY(1);
		wdtxDataFail.setChangeXY(0);
	}
	
	/**
	 * 查看玩家是1主宰还是2超神
	 * @return
	 */
	public int getKillType(int numKillContinue) {
		Struct_wdtxlz_260 excelKillZZ = Config_wdtxlz_260.getIns().get( CrossWenDingTianXiaConst.ID_ZZ);
		int numZZ = excelKillZZ.getReward();
		Struct_wdtxlz_260 excelKillCS = Config_wdtxlz_260.getIns().get( CrossWenDingTianXiaConst.ID_CS);
		int numCS = excelKillCS.getReward();
		if( numZZ<=  numKillContinue&&  numKillContinue< numCS) {
			return CrossWenDingTianXiaConst.ID_ZZ;
		}else if( numCS <= numKillContinue) {
			return CrossWenDingTianXiaConst.ID_CS;
		}else {
			return CrossWenDingTianXiaConst.ID_XX;
		}
	}
	
	/**
	 * 设置连斩奖励状态
	 * @param	typeKilledFail	被杀的人的类型
	 */
	private void checkKillAwards( Hero hero, int typeKilledFail, String heroNameFail) {
		CrossWenDingTianXiaScoreRank heroRankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData( hero.getId());
		Map<Integer, Integer> killAwards = heroRankData.getKillAwards();
		CrossWenDingTianXia wdtdData = hero.getCrossWenDingTianXia();
		int numKillContinue = wdtdData.getNumKillContinue();
		List<Struct_wdtxlzjl_260> sortList = Config_wdtxlzjl_260.getIns().getSortList();
		int zoneid = hero.getBelongZoneid();
		for(Struct_wdtxlzjl_260 temp: sortList) {
			int idExcel = temp.getId();
			Integer stateInt = killAwards.get( idExcel);
			if(stateInt!=null&& (stateInt== CrossWenDingTianXiaConst.STATE_AWARDS_2|| stateInt== CrossWenDingTianXiaConst.STATE_AWARDS_1))
				continue;
			if(idExcel == 1) {
				int killType = getKillType(numKillContinue);
				if(killType == CrossWenDingTianXiaConst.ID_ZZ) {//活动期间连斩x人
					killAwards.put( idExcel, CrossWenDingTianXiaConst.STATE_AWARDS_1);
					CrossWenDingTianXiaManager.getIns().openKillAwards(hero);
				}
			}else if( idExcel == 2) {
				int killType = getKillType(numKillContinue);
				if(killType == CrossWenDingTianXiaConst.ID_CS) {//活动期间连斩x人
					killAwards.put( idExcel, CrossWenDingTianXiaConst.STATE_AWARDS_1);
					CrossWenDingTianXiaManager.getIns().openKillAwards(hero);
				}
			}else if( idExcel == 3) {
				if(typeKilledFail == CrossWenDingTianXiaConst.ID_ZZ) {//活动期间终结1名主宰
					killAwards.put( idExcel, CrossWenDingTianXiaConst.STATE_AWARDS_1);
					broadToRoomHero( zoneid, ChatConst.CROSS_WDTX_KILL_ZHU_ZAI, new Object[] {hero.getNameZoneid(), heroNameFail}, 0);
					CrossWenDingTianXiaManager.getIns().openKillAwards(hero);
				}
			}else if( idExcel == 4) {
				if(typeKilledFail == CrossWenDingTianXiaConst.ID_CS) {//活动期间终结1名超神
					killAwards.put( idExcel, CrossWenDingTianXiaConst.STATE_AWARDS_1);
					broadToRoomHero( zoneid, ChatConst.CROSS_WDTX_KILL_OTH_ZHU_ZAI, new Object[] {hero.getNameZoneid(), heroNameFail}, 0);
					CrossWenDingTianXiaManager.getIns().openKillAwards(hero);
				}
			}
		}
	}
	
	private void broadKill(Hero heroWin) {
		CrossWenDingTianXia wdtxData = heroWin.getCrossWenDingTianXia();
		int numKillContinue = wdtxData.getNumKillContinue();
		
		Struct_wdtxlz_260 excelKillZZ = Config_wdtxlz_260.getIns().get( CrossWenDingTianXiaConst.ID_ZZ);
		int numZZ = excelKillZZ.getReward();
		Struct_wdtxlz_260 excelKillCS = Config_wdtxlz_260.getIns().get( CrossWenDingTianXiaConst.ID_CS);
		int numCS = excelKillCS.getReward();
		//广播给本房间所有人
		if(numKillContinue==numZZ) {
			broadToRoomHero(heroWin.getBelongZoneid(), ChatConst.CROSS_WDTX_KILL_5, new Object[] {heroWin.getNameZoneid()}, 0);
		}else if( numKillContinue==numCS) {
			broadToRoomHero(heroWin.getBelongZoneid(), ChatConst.CROSS_WDTX_KILL_10, new Object[] {heroWin.getNameZoneid()}, 0);
		}
		
		int voice = numKillContinue%5;
		if( numKillContinue>CrossWenDingTianXiaConst.KILL_10&& voice==0) {
			broadToRoomHero(heroWin.getBelongZoneid(), ChatConst.CROSS_WDTX_KILL_CHAO_SHEN, new Object[] {heroWin.getNameZoneid(), numKillContinue}, 0);
		}
	}
	
	/**
	 * 如果是玉玺玩家下线，就清空玉玺头衔，并广播
	 */
	public void removeYuXiHero( long hid) {
		CrossWenDingTianXiaRoom roomData = CrossWenDingTianXiaCrossFunction.getIns().getRoomData(hid);
		if(roomData==null) {
			return;
		}
		
		long hidYuXi = roomData.getHidYuXi();
		if(hidYuXi!=hid) {
			return;
		}
		roomData.setHidYuXi(0);
		roomData.setIconYuXi(0);
		roomData.setFrameYuXi(0);
		roomData.setNameYuXi("");
		
		//广播该房间所有人
		List<CrossWenDingTianXiaScoreRank> rankList = roomData.getRankList();
		int size = rankList.size();
		for (int i = 0; i < size; i++) {
			CrossWenDingTianXiaScoreRank temp = rankList.get(i);
			long hidTemp = temp.getHid();
			boolean online = HeroFunction.getIns().isOnline(hidTemp);
			if(!online) {
				continue;
			}
			int crossSysid = HeroFunction.getIns().getCrossSysid(hidTemp);
			if(crossSysid!=SystemIdConst.CROSS_WEN_DING_TIAN_XIA)
				continue;
			CrossWenDingTianXiaSender.sendCmd_4204(hidTemp, 0, "", 0, 0);
		}
		//刷新npc
		CrossWenDingTianXiaCrossSchedule.initNPC();
	}
	
	/**
	 * 刷新玩家状态
	 * @param	hid	要刷新的玩家ID
	 * @param	typeStr	
	 */
	public void reflaseHeroState( long hid) {
		Hero hero = HeroCache.getHero(hid);
		if(hero==null)
			return;
		CrossWenDingTianXiaScoreRank heroRankData = getHeroRankData(hid);
		if( heroRankData == null)
			return;
		CrossWenDingTianXiaRoom roomData = getRoomData(hid);
		if(roomData==null)
			return;
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData==null)
			return;
		
		Map<String,Integer> sendDataMap = new HashMap<>();
		int winScore = getWinScore(hid);
		if(winScore!=0)
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_JF, winScore);
		
		sendDataMap.put(CrossWenDingTianXiaConst.TYPE_NUM, wdtxData.getNumKillContinue());
		
		long hidYuXi = roomData.getHidYuXi();
		sendDataMap.put(CrossWenDingTianXiaConst.TYPE_YX, 0);
		if(hid==hidYuXi)
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_YX, 1);
		
		int timeExcel = Config_xtcs_004.getIns().get( XTCS004Const.CROSS_FHLY_FU_HUO_TIME).getNum();
		int timeDeath = wdtxData.getTimeDeath();
		int timeNow = TimeDateUtil.getCurrentTime()+1;//宽松1秒
		sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 0);
		if(timeDeath!=0&& timeNow-timeDeath<timeExcel) 
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 1);
		boolean inBattle = BattleNewFunction.getIns().checkIsBattle(hero.getId());
		if(inBattle) 
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 2);
		long npcID = wdtxData.getNpcID();
		if(npcID!=0)
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 2);
			
		long hp = wdtxData.getHp();
		FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
		long hpMax = finalFightAttr.getHpMax();
		sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJQX, (int)Math.ceil( hp*100f/(double)hpMax));
		
		String sendData = JsonUtils.toStr(sendDataMap);
		
		int layer = wdtxData.getLayer();
		List<CrossWenDingTianXiaScoreRank> rankList = roomData.getRankList();
		int size = rankList.size();
		for (int i = 0; i < size; i++) {
			CrossWenDingTianXiaScoreRank temp = rankList.get(i);
			long hidTemp = temp.getHid();
			boolean online = HeroFunction.getIns().isOnline(hidTemp);
			if(!online)
				continue;
			Hero heroTemp = HeroCache.getHero(hidTemp);
			if(heroTemp==null)
				continue;
			CrossWenDingTianXia wdtxTemp = heroTemp.getCrossWenDingTianXia();
			if(wdtxTemp==null)
				continue;
			int layerTemp = wdtxTemp.getLayer();
			if(layer!=layerTemp)
				continue;
			int crossSysid = HeroFunction.getIns().getCrossSysid(hidTemp);
			if(crossSysid!=SystemIdConst.CROSS_WEN_DING_TIAN_XIA)
				continue;
			
			CrossWenDingTianXiaSender.sendCmd_4226(hidTemp, hid, sendData);
//			System.out.println("给"+heroTemp.getNameZoneid()+" 刷"+hero.getNameZoneid()+"状态："+sendData);
		}
	}
	
	public void reflashHeroMeetHeroState( long hid, long hidOth) {
		try {
			Hero hero = HeroCache.getHero(hid);
			if(hero==null)
				return;
			CrossWenDingTianXiaScoreRank heroRankData = getHeroRankData(hid);
			if( heroRankData == null)
				return;
			CrossWenDingTianXiaRoom roomData = getRoomData(hid);
			if(roomData==null)
				return;
			CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
			if(wdtxData==null)
				return;
			
			Hero heroOth = HeroCache.getHero( hidOth);
			if(heroOth==null)
				return;
			CrossWenDingTianXiaScoreRank heroOthRankData = getHeroRankData(hidOth);
			if( heroOthRankData == null)
				return;
			CrossWenDingTianXia wdtxOthData = heroOth.getCrossWenDingTianXia();
			if(wdtxOthData==null)
				return;
			int layer = wdtxData.getLayer();
			int layerOth = wdtxOthData.getLayer();
			if(layer!=layerOth)
				return;
			long hidYuXi = roomData.getHidYuXi();
			int timeExcel = Config_xtcs_004.getIns().get( XTCS004Const.CROSS_FHLY_FU_HUO_TIME).getNum();
			int timeNow = TimeDateUtil.getCurrentTime()+1;//宽松1秒
			
			//本人的数据，发给对方用
			Map<String,Integer> sendDataMap = new HashMap<>();
			int winScore = getWinScore(hid);
			if(winScore!=0)
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_JF, winScore);
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_NUM, wdtxData.getNumKillContinue());
			if(hid==hidYuXi)
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_YX, 1);
			int timeDeath = wdtxData.getTimeDeath();
			if(timeDeath!=0&& timeNow-timeDeath<timeExcel) 
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 1);
			boolean inBattle = BattleNewFunction.getIns().checkIsBattle(hero.getId());
			if(inBattle) 
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 2);
			long npcID = wdtxData.getNpcID();
			if(npcID!=0)
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 2);
			long hp = wdtxData.getHp();
			FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
			long hpMax = finalFightAttr.getHpMax();
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJQX, (int)Math.ceil( hp*100f/(double)hpMax));
			String sendData = JsonUtils.toStr(sendDataMap);
			CrossWenDingTianXiaSender.sendCmd_4226(hidOth, hid, sendData);
			
			Map<String,Integer> sendOthDataMap = new HashMap<>();
			int winScoreOth = getWinScore(hidOth);
			if(winScoreOth!=0)
				sendOthDataMap.put(CrossWenDingTianXiaConst.TYPE_JF, winScoreOth);
			sendOthDataMap.put(CrossWenDingTianXiaConst.TYPE_NUM, wdtxOthData.getNumKillContinue());
			if(hidOth==hidYuXi)
				sendOthDataMap.put(CrossWenDingTianXiaConst.TYPE_YX, 1);
			int timeDeathOth = wdtxOthData.getTimeDeath();
			if(timeDeathOth!=0&& timeNow-timeDeathOth<timeExcel) 
				sendOthDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 1);
			boolean inBattleOth = BattleNewFunction.getIns().checkIsBattle(heroOth.getId());
			if(inBattleOth) 
				sendOthDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 2);
			long npcIDOth = wdtxOthData.getNpcID();
			if(npcIDOth!=0)
				sendOthDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 2);
			long hpOth = wdtxOthData.getHp();
			FinalFightAttr finalFightAttrOth = heroOth.getFinalFightAttr();
			long hpMaxOth = finalFightAttrOth.getHpMax();
			sendOthDataMap.put(CrossWenDingTianXiaConst.TYPE_WJQX, (int)Math.ceil( hpOth*100f/(double)hpMaxOth));
			
			String sendDataOth = JsonUtils.toStr(sendOthDataMap);
			CrossWenDingTianXiaSender.sendCmd_4226(hid, hidOth, sendDataOth);
//			System.out.println("2人互刷状态，给"+hero.getNameZoneid()+" 刷"+sendDataOth+" 给"+heroOth.getNameZoneid()+" 刷:"+sendData);
		} catch (Exception e) {
			LogTool.error(e, this, "hid:"+hid+" hidOth:"+hidOth);
		}
	}
	
	/**
	 * 刷新自己的数据
	 */
	public void reflashHeroState( long hid) {
		try {
			Hero hero = HeroCache.getHero(hid);
			if(hero==null)
				return;
			CrossWenDingTianXiaScoreRank heroRankData = getHeroRankData(hid);
			if( heroRankData == null)
				return;
			CrossWenDingTianXiaRoom roomData = getRoomData(hid);
			if(roomData==null)
				return;
			CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
			if(wdtxData==null)
				return;
			
			long hidYuXi = roomData.getHidYuXi();
			int timeExcel = Config_xtcs_004.getIns().get( XTCS004Const.CROSS_FHLY_FU_HUO_TIME).getNum();
			int timeNow = TimeDateUtil.getCurrentTime()+1;//宽松1秒
			
			//本人的数据，发给对方用
			Map<String,Integer> sendDataMap = new HashMap<>();
			int winScore = getWinScore(hid);
			if(winScore!=0)
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_JF, winScore);
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_NUM, wdtxData.getNumKillContinue());
			if(hid==hidYuXi)
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_YX, 1);
			int timeDeath = wdtxData.getTimeDeath();
			if(timeDeath!=0&& timeNow-timeDeath<timeExcel) 
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 1);
			boolean inBattle = BattleNewFunction.getIns().checkIsBattle(hero.getId());
			if(inBattle) 
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 2);
			long npcID = wdtxData.getNpcID();
			if(npcID!=0)
				sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 2);
			long hp = wdtxData.getHp();
			FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
			long hpMax = finalFightAttr.getHpMax();
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJQX, (int)Math.ceil( hp*100f/(double)hpMax));
			String sendData = JsonUtils.toStr(sendDataMap);
			CrossWenDingTianXiaSender.sendCmd_4226(hid, hid, sendData);
		} catch (Exception e) {
			LogTool.error(e, this, "hid:"+hid);
		}
	}
	
	public void reflashNPCState( CrossWenDingTianXiaRoom roomData, int layer, NPC npc) {
		List<CrossWenDingTianXiaScoreRank> rankList = roomData.getRankList();
		int sceneState = npc.getSceneState();
		Map<String,Integer> sendDataMap = new HashMap<>();
		sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 0);
		if(sceneState!=SceneConst.STATE_NORMAL) 
			sendDataMap.put(CrossWenDingTianXiaConst.TYPE_WJZT, 2);
		String sendData = JsonUtils.toStr(sendDataMap);
		
		int size = rankList.size();
		for (int i = 0; i < size; i++) {
			CrossWenDingTianXiaScoreRank temp = rankList.get(i);
			long hidTemp = temp.getHid();
			boolean online = HeroFunction.getIns().isOnline(hidTemp);
			if(!online)
				continue;
			Hero heroTemp = HeroCache.getHero(hidTemp);
			if(heroTemp==null)
				continue;
			CrossWenDingTianXia wdtxTemp = heroTemp.getCrossWenDingTianXia();
			if(wdtxTemp==null)
				continue;
			int layerTemp = wdtxTemp.getLayer();
			if(layer!=layerTemp)
				continue;
			
			CrossWenDingTianXiaSender.sendCmd_4226(hidTemp, npc.getId()*-1, sendData);
//			System.out.println("给"+heroTemp.getNameZoneid()+" 刷"+hero.getNameZoneid()+"状态："+sendData);
		}
	}
	
	private int getWinScore(long hid) {
		Hero hero = HeroCache.getHero(hid);
		if(hero==null)
			return 0;
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData==null)
			return 0;
		CrossWenDingTianXiaScoreRank rankData = getHeroRankData(hid);
		if(rankData==null)
			return 0;
		
		int numKillContinueFail = wdtxData.getNumKillContinue();
		int killTypeFail = getKillType(numKillContinueFail);
		Struct_wdtxlz_260 excelKillFail = Config_wdtxlz_260.getIns().get(killTypeFail);
		int scoreAddByKillType = 0;//连斩积分(击杀主宰积分/击杀超神积分)
		if(excelKillFail!=null) {
			scoreAddByKillType = excelKillFail.getPoint();
		}
		int scoreFail = rankData.getScore();
		int num = Config_xtcs_004.getIns().get(XTCS004Const.WDTX_SCORE_PRO).getNum();
		//挑战积分系数（十万分比，向上取整）
		int scoreWinChange = (int) Math.ceil( scoreFail*(num/100000f)+scoreAddByKillType);
		return scoreWinChange;
	}
	
	public void resetFuHuoTime( Hero hero) {
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		wdtxData.setTimeDeath(0);
		FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
		long hpMax = finalFightAttr.getHpMax();
		wdtxData.setHp( hpMax);
		wdtxData.setHuDun( finalFightAttr.getHudun());
		
		//广播给该层所有人
		CrossWenDingTianXiaCrossFunction.getIns().reflaseHeroState(hero.getId());
		CrossWenDingTianXiaSender.sendCmd_4232(hero.getId(), 1);
	}
	
	public void broadToRoomHero( int zid, int chatID, Object[] sendData, int roomID, int ...nowParId) {
		int partId = CrossCache.getPartId(zid);
		if(nowParId!=null&&nowParId.length>0) {
			partId = nowParId[0];
		}
		if (partId == 0) {
			return;
		}
		Map<Integer, Integer> zidMap = CrossWenDingTianXiaCrossCache.getWdtxZidToRoomIDMap(partId);
		Integer roomIDFind = zidMap.get(zid);
		if(roomIDFind == null) {
			roomIDFind = roomID;
		}
		if( roomIDFind == 0)
			return ;
		
		Map<Integer, CrossWenDingTianXiaRoom> roomMap = CrossWenDingTianXiaCrossCache.getWdtxRoomMap(partId);
		CrossWenDingTianXiaRoom roomData = roomMap.get(roomIDFind);
		if(roomData == null) {
			return ;
		}
		List<CrossWenDingTianXiaScoreRank> rankList = roomData.getRankList();
		int size = rankList.size();
		for (int i = 0; i < size; i++) {
			CrossWenDingTianXiaScoreRank temp = rankList.get(i);
			long hidTemp = temp.getHid();
			boolean online = HeroFunction.getIns().isOnline( hidTemp);
			if(!online)
				continue;
			Hero heroTemp = HeroCache.getHero( hidTemp);
			if(heroTemp==null) 
				continue;
			int crossSysid = HeroFunction.getIns().getCrossSysid(hidTemp);
			if(crossSysid!=SystemIdConst.CROSS_WEN_DING_TIAN_XIA)
				continue;

			ChatManager.getIns().broadCast(heroTemp, chatID, sendData);
		}
	}
	
	/**
	 * 挑层处理
	 */
	public void goToNextLayer(Hero hero) {
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		CrossWenDingTianXiaScoreRank rankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		int layerOld = wdtxData.getLayer();
		if(layerOld==0) {
			//首次进入副本
			ProbabilityEventModel pm = CrossWenDingTianXiaCrossCache.getPm();
			int layer = (int) ProbabilityEventUtil.getEventByProbability(pm);//概率抽取楼层
			wdtxData.setLayer(layer);
			LogTool.info("Go to wdtd first.hid:"+hero.getId()+" layer:"+layer, this);
		}else {
			//跳到下一层
			Struct_wdtx_260 excel = Config_wdtx_260.getIns().get(layerOld);
			Struct_wdtx_260 excelNext = Config_wdtx_260.getIns().get(layerOld+1);
			if(excelNext==null) {
				//已经是最高层
//				CrossWenDingTianXiaSender.sendCmd_4206(hero.getId(), 2, layerOld);
				return ;
			}
			int numKillNeed = excel.getNext();
			int numKillLayerHero = wdtxData.getNumKillThisLayer();
			if(numKillNeed> numKillLayerHero) {
				//本层杀敌数不足                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
//				CrossWenDingTianXiaSender.sendCmd_4206(hero.getId(), 3, layerOld);
				return ;
			}
			wdtxData.setLayer(layerOld + 1);
			wdtxData.setNumKillThisLayer( 0);
			LogTool.info("Go to wdtd next layer.hid:"+hero.getId()+" layer:"+wdtxData.getLayer(), this);
		}

		int layerMax = rankData.getLayerMax();
		int layerNow = wdtxData.getLayer();
		if(layerMax < layerNow) {
			rankData.setLayerMax(layerNow);
			CrossWenDingTianXiaManager.getIns().openLayerAwards(hero);
		}

		//设置奖励状态
		Map<Integer, Integer> layerAwards = rankData.getLayerAwards();
		Integer getState = layerAwards.get(layerNow);
		if(getState==null|| getState==CrossWenDingTianXiaConst.STATE_AWARDS_0) {
			layerAwards.put( layerNow, CrossWenDingTianXiaConst.STATE_AWARDS_1);
		}
		CrossWenDingTianXiaSender.sendCmd_4206(hero.getId(), 1, wdtxData.getLayer());
	}

}





