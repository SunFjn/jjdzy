package com.teamtop.system.crossFireBeacon;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.crossFireBeacon.model.FireBeaconModel;
import com.teamtop.system.crossFireBeacon.model.FireBeaconRoom;
import com.teamtop.system.crossFireBeacon.model.FireBeaconServer;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.FieldOrder;

public class CrossFireBeaconCache {

	/** 活动状态 */
	@FieldOrder(order = 1)
	private byte fireBeaconState;

	/** 上届mvp */
	@FieldOrder(order = 2)
	private String LastMvp = "";

	/** 参赛区 */
	@FieldOrder(order = 3)
	private TreeSet<Integer> zoneIds = UC.reg("crossFireBeaconZoneIds", new TreeSet<>());

	/**
	 * 参数玩家激活 key:玩家id，value:玩家数据
	 */
	@FieldOrder(order = 4)
	private ConcurrentHashMap<Long, FireBeaconModel> playerMap = UC.reg("crossFireBeaconPlayerMap", new ConcurrentHashMap<>());

	/**
	 * 房间集合 key:房间id, value:房间数据
	 */
	@FieldOrder(order = 5)
	private Map<Integer, FireBeaconRoom> roomMap = UC.reg("crossFireBeaconRoomMap", new HashMap<>());

	/**
	 * 区数据集合 key:zoneid, value:区参赛数据
	 */
	@FieldOrder(order = 6)
	private Map<Integer, FireBeaconServer> zoneDataMap = UC.reg("crossFireBeaconZoneDataMap", new HashMap<>());

	/** 上届mvp头像 */
	@FieldOrder(order = 7)
	private int LastMvpIcon = 0;

	/** 上届mvp头像框 */
	@FieldOrder(order = 8)
	private int LastMvpFrame = 0;

	/** 参赛区 */
	@FieldOrder(order = 9)
	private Map<Integer, Long> zoneIdStrength = UC.reg("crossFireBeaconzoneIdStrength", new HashMap<>());

	/** 参赛区开服时间 */
	@FieldOrder(order = 10)
	private Map<Integer, Integer> zoneIdOpenServerTime = UC.reg("crossFireBeaconZoneIdOpenServerTime", new HashMap<>());

	public byte getFireBeaconState() {
		return fireBeaconState;
	}

	public void setFireBeaconState(byte fireBeaconState) {
		this.fireBeaconState = fireBeaconState;
	}

	public String getLastMvp() {
		return LastMvp;
	}

	public void setLastMvp(String lastMvp) {
		LastMvp = lastMvp;
	}

	public TreeSet<Integer> getZoneIds() {
		return zoneIds;
	}

	public void setZoneIds(TreeSet<Integer> zoneIds) {
		this.zoneIds.addAll(zoneIds);
	}

	public ConcurrentHashMap<Long, FireBeaconModel> getPlayerMap() {
		return playerMap;
	}

	public void setPlayerMap(ConcurrentHashMap<Long, FireBeaconModel> playerMap) {
		this.playerMap.putAll(playerMap);
	}

	public Map<Integer, FireBeaconRoom> getRoomMap() {
		return roomMap;
	}

	public void setRoomMap(Map<Integer, FireBeaconRoom> roomMap) {
		this.roomMap.putAll(roomMap);
	}

	public Map<Integer, FireBeaconServer> getZoneDataMap() {
		return zoneDataMap;
	}

	public void setZoneDataMap(Map<Integer, FireBeaconServer> zoneDataMap) {
		this.zoneDataMap.putAll(zoneDataMap);
	}

	public int getLastMvpIcon() {
		return LastMvpIcon;
	}

	public void setLastMvpIcon(int lastMvpIcon) {
		LastMvpIcon = lastMvpIcon;
	}

	public int getLastMvpFrame() {
		return LastMvpFrame;
	}

	public void setLastMvpFrame(int lastMvpFrame) {
		LastMvpFrame = lastMvpFrame;
	}

	public Map<Integer, Long> getZoneIdStrength() {
		return zoneIdStrength;
	}

	public void setZoneIdStrength(Map<Integer, Long> zoneIdStrength) {
		this.zoneIdStrength = zoneIdStrength;
	}

	public Map<Integer, Integer> getZoneIdOpenServerTime() {
		return zoneIdOpenServerTime;
	}

	public void setZoneIdOpenServerTime(Map<Integer, Integer> zoneIdOpenServerTime) {
		this.zoneIdOpenServerTime = zoneIdOpenServerTime;
	}

}
