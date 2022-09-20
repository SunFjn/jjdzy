package com.teamtop.system.battleGoods.event;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.system.battleGoods.BattleGoodConst;
import com.teamtop.system.battleGoods.BattleGoodIO;
import com.teamtop.system.battleGoods.BattleGoodsFunction;
import com.teamtop.system.battleGoods.cache.BattleGoodSyscache;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossPartCaChe;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossRoomCache;
import com.teamtop.system.battleGoods.model.BattleGoodZoneid;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class BattleGoodCrossSysEvent extends AbsSystemEvent {

	private static BattleGoodCrossSysEvent ins;

	private BattleGoodCrossSysEvent() {
		
	}

	public static BattleGoodCrossSysEvent getIns() {
		if (ins == null) {
			ins = new BattleGoodCrossSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {

	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		int week = TimeDateUtil.getWeek();
		if (!BattleGoodSyscache.openDays.contains(week)) {
			return;
		}
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.CROSS_BTTLE_GOOD)) {
			return;
		}
		//每周三,周六 19:28 19:30-19:50
		if (cmdId == 1) {
			// 活动准备期
			LogTool.info("BattleGood readyHandel start", BattleGoodCrossSysEvent.class);
			BattleGoodSyscache.setState(BattleGoodConst.ACT_STATE_1);
			Set<Integer> keySet = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().keySet();
			for(int partId : keySet) {				
				try {
					BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId);
					// 完全随机匹配
					TreeSet<Integer> zoneIdSet = battleGoodsCrossPartCaChe.getZoneIds();
					LogTool.info("BattleGood match start, zoneIdSet size = " + zoneIdSet.size()+", partId="+partId, this);
					MatchByCrossPart(partId,battleGoodsCrossPartCaChe);
					LogTool.info("BattleGood match start Finish, partId="+partId, this);
				} catch (Exception e) {
					LogTool.error(e, BattleGoodCrossSysEvent.class, "BattleGoodSysEvent ready partId=" + partId);
				}
			}
		} else if (cmdId == 2) {
			// 活动开启
			LogTool.info("BattleGood act start", BattleGoodCrossSysEvent.class);
		    BattleGoodsFunction.getIns().start();
		    BattleGoodIO.getIns().noticeState(BattleGoodSyscache.getState());
			LogTool.info("BattleGood act start finish", BattleGoodCrossSysEvent.class);
		} else if (cmdId == 3) {
			// 活动结束
			LogTool.info("BattleGood act end", BattleGoodCrossSysEvent.class);
			BattleGoodsFunction.getIns().end();
		    //BattleGoodIO.getIns().noticeState(BattleGoodSyscache.getState());
			LogTool.info("BattleGood act end finish", BattleGoodCrossSysEvent.class);
		}
	}
	/**
	 * 匹配
	 * @param partId
	 * @param battleGoodsCrossPartCaChe
	 */
	public void MatchByCrossPart(int partId,BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe) {
		ConcurrentHashMap<Integer, BattleGoodsCrossRoomCache> roomCacheMap = battleGoodsCrossPartCaChe.getRoomCacheMap();
		int roomId = BattleGoodSyscache.roomIdCreator.getAndIncrement();
		List<Integer> groupList = new ArrayList<>(battleGoodsCrossPartCaChe.getZoneIds());
		int totalSize = groupList.size();
		
		for (int i = 0; i < totalSize; i++) {
			int randomSize = groupList.size();
			int random = RandomUtil.getRandomNumInAreas(0, randomSize - 1);
			int chooseZoneId = groupList.remove(random);
			
			LogTool.info("chooseZoneId==" + chooseZoneId+", randomSize="+randomSize + ", randomIndex=" + random+", roomId="+roomId, BattleGoodCrossSysEvent.class);

			if(!BattleGoodSyscache.getFristzoneidToRoomId().containsKey(chooseZoneId)) {
				BattleGoodSyscache.getFristzoneidToRoomId().put(chooseZoneId, roomId);
				LogTool.info("首服id chooseZoneId==" + chooseZoneId+ "房间id roomId="+roomId, BattleGoodCrossSysEvent.class);
			}
			
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = roomCacheMap.get(roomId);
			if (battleGoodsCrossRoomCache == null) {
				battleGoodsCrossRoomCache = new BattleGoodsCrossRoomCache();
				battleGoodsCrossRoomCache.setRoomId(roomId);
				roomCacheMap.put(roomId, battleGoodsCrossRoomCache);
			}
			
			ConcurrentHashMap<Integer, BattleGoodZoneid> sourceByZoneid = battleGoodsCrossRoomCache.getSourceByZoneid();
			if (sourceByZoneid==null) {
				sourceByZoneid=new ConcurrentHashMap<Integer,BattleGoodZoneid>();
				battleGoodsCrossRoomCache.setSourceByZoneid(sourceByZoneid);
			}
			if (sourceByZoneid.size() <=BattleGoodConst.FIGHT_SIDES) {
				// 初始化房间数据
				BattleGoodZoneid battleGoodZoneid=new BattleGoodZoneid();
				battleGoodZoneid.setRoomId(roomId);
				battleGoodZoneid.setPartId(partId);
				battleGoodZoneid.setFristzoneid(chooseZoneId);
				battleGoodZoneid.setKillBoosids(new HashSet<Integer>());
				int index=sourceByZoneid.size()+1;
				sourceByZoneid.put(index, battleGoodZoneid);
				battleGoodZoneid.setIndex(index);
				battleGoodsCrossRoomCache.getFristZoneidToIndex().put(chooseZoneId, index);
				if(sourceByZoneid.size() == BattleGoodConst.FIGHT_SIDES) {
					//房间已满 换一个
					roomId = BattleGoodSyscache.roomIdCreator.getAndIncrement();
				}
			}
			/*if (sourceByZoneid.size() < BattleGoodConst.FIGHT_SIDES) {
				// 初始化房间数据
				BattleGoodZoneid battleGoodZoneid=new BattleGoodZoneid();
				battleGoodZoneid.setRoomId(roomId);
				battleGoodZoneid.setPartId(partId);
				battleGoodZoneid.setFristzoneid(chooseZoneId);
				battleGoodZoneid.setKillBoosids(new HashSet<Integer>());
				int index=sourceByZoneid.size()+1;
				sourceByZoneid.put(index, battleGoodZoneid);
				battleGoodZoneid.setIndex(index);
				battleGoodsCrossRoomCache.getFristZoneidToIndex().put(chooseZoneId, index);
			}else if(sourceByZoneid.size() == BattleGoodConst.FIGHT_SIDES) {
				//房间已满
				roomId = BattleGoodSyscache.roomIdCreator.getAndIncrement();
				
				LogTool.info("chooseZoneId==" + chooseZoneId+", randomSize="+randomSize + ", randomzonied=" + random+", roomId="+roomId, BattleGoodCrossSysEvent.class);
				battleGoodsCrossRoomCache = roomCacheMap.get(roomId);
				if (battleGoodsCrossRoomCache == null) {
					battleGoodsCrossRoomCache = new BattleGoodsCrossRoomCache();
					battleGoodsCrossRoomCache.setRoomId(roomId);
					roomCacheMap.put(roomId, battleGoodsCrossRoomCache);
				}
				
				sourceByZoneid = battleGoodsCrossRoomCache.getSourceByZoneid();
				if (sourceByZoneid==null) {
					sourceByZoneid=new ConcurrentHashMap<Integer,BattleGoodZoneid>();
					battleGoodsCrossRoomCache.setSourceByZoneid(sourceByZoneid);
				}
				// 初始一个服的
				BattleGoodZoneid battleGoodZoneid=new BattleGoodZoneid();
				battleGoodZoneid.setRoomId(roomId);
				battleGoodZoneid.setPartId(partId);
				battleGoodZoneid.setFristzoneid(chooseZoneId);
				battleGoodZoneid.setKillBoosids(new HashSet<Integer>());
				int index=sourceByZoneid.size()+1;
				battleGoodZoneid.setIndex(index);
				sourceByZoneid.put(index, battleGoodZoneid);
				battleGoodsCrossRoomCache.getFristZoneidToIndex().put(chooseZoneId, index);
			}*/
		}
				
	}


}
