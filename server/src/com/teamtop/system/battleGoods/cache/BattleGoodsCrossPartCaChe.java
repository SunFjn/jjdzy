package com.teamtop.system.battleGoods.cache;

import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;


/**
 * 大区缓存
 * @author jjjjyyy
 *
 */
public class BattleGoodsCrossPartCaChe {
	/**
	 * 大分区id
	 */
	private int partId;
	/** 大区参赛区id集合 */
	private TreeSet<Integer> zoneIds =new TreeSet<>();
	/** 大区房间 */
	private  ConcurrentHashMap<Integer,BattleGoodsCrossRoomCache> RoomCacheMap= new ConcurrentHashMap<Integer,BattleGoodsCrossRoomCache>();
	
	
	
	
	public BattleGoodsCrossPartCaChe() {
		super();
	}
	
	public int getPartId() {
		return partId;
	}
	public void setPartId(int partId) {
		this.partId = partId;
	}
	public TreeSet<Integer> getZoneIds() {
		return zoneIds;
	}
	public void setZoneIds(TreeSet<Integer> zoneIds) {
		this.zoneIds = zoneIds;
	}
	public ConcurrentHashMap<Integer, BattleGoodsCrossRoomCache> getRoomCacheMap() {
		return RoomCacheMap;
	}
	public void setRoomCacheMap(ConcurrentHashMap<Integer, BattleGoodsCrossRoomCache> roomCacheMap) {
		RoomCacheMap = roomCacheMap;
	}
    
	


}
