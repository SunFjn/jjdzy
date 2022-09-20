package com.teamtop.system.crossFireBeacon.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.teamtop.util.common.ConcurrentHashSet;
import com.teamtop.util.db.trans.FieldOrder;

public class FireBeaconRoom {

	@FieldOrder(order = 1)
	/** 房间id*/
	private int roomId;
	
	@FieldOrder(order = 2)
	/** 比赛区 */
	private List<Integer> zoneBelong = new ArrayList<>();

	@FieldOrder(order = 3)
	/** 都城数据 */
	private Map<Integer, FireBeaconCity> citys = new HashMap<>();

	@FieldOrder(order = 4)
	/** 个人排行 */
	private TreeSet<FireBeaconModel> personalRankList = new TreeSet<>();

	@FieldOrder(order = 5)
	/** 参数玩家 */
	private Set<Long> members = new ConcurrentHashSet<>();

	@FieldOrder(order = 6)
	/** 需显示的玩家 */
	private ConcurrentHashSet<Long> showList = new ConcurrentHashSet<>();

	@FieldOrder(order = 7)
	/** 区排行 */
	private TreeSet<FireBeaconServer> zoneRankList = new TreeSet<>();

	/**
	 * 战斗集合<key:玩家id, >
	 */
	private ConcurrentHashMap<Long, Long> battleMap = new ConcurrentHashMap<>();

	/** */
	private ConcurrentHashMap<Long, BattleInfo> battleInfoMap = new ConcurrentHashMap<>();;

	@FieldOrder(order = 8)
	private int battleId;
	
	/** 战斗id生成器 */
	private AtomicInteger battleIdCreator = new AtomicInteger(1);

	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public List<Integer> getZoneBelong() {
		return zoneBelong;
	}

	public void setZoneBelong(List<Integer> zoneBelong) {
		this.zoneBelong = zoneBelong;
	}

	public Map<Integer, FireBeaconCity> getCitys() {
		return citys;
	}

	public void setCitys(Map<Integer, FireBeaconCity> citys) {
		this.citys = citys;
	}

	public TreeSet<FireBeaconModel> getPersonalRankList() {
		return personalRankList;
	}

	public void setPersonalRankList(TreeSet<FireBeaconModel> personalRankList) {
		this.personalRankList = personalRankList;
	}

	public Set<Long> getMembers() {
		return members;
	}

	public void setMembers(Set<Long> members) {
		this.members = members;
	}

	public ConcurrentHashSet<Long> getShowList() {
		return showList;
	}

	public void setShowList(ConcurrentHashSet<Long> showList) {
		this.showList = showList;
	}

	public TreeSet<FireBeaconServer> getZoneRankList() {
		return zoneRankList;
	}

	public void setZoneRankList(TreeSet<FireBeaconServer> zoneRankList) {
		this.zoneRankList = zoneRankList;
	}

	public ConcurrentHashMap<Long, Long> getBattleMap() {
		return battleMap;
	}

	public void setBattleMap(ConcurrentHashMap<Long, Long> battleMap) {
		this.battleMap = battleMap;
	}

	public ConcurrentHashMap<Long, BattleInfo> getBattleInfoMap() {
		return battleInfoMap;
	}

	public void setBattleInfoMap(ConcurrentHashMap<Long, BattleInfo> battleInfoMap) {
		this.battleInfoMap = battleInfoMap;
	}

	public int getBattleId() {
		return battleIdCreator.get();
	}

	public void setBattleId(int battleId) {
		this.battleId = battleId;
		setBattleIdCreator(battleId);
	}

	public int getBattleIdCreator() {
		return battleIdCreator.getAndIncrement();
	}

	public void setBattleIdCreator(int bid) {
		this.battleIdCreator.set(bid);
	}

}
