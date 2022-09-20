package com.teamtop.system.battleGoods.cache;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.battleGoods.model.BattleGoodRanker;
import com.teamtop.system.battleGoods.model.BattleGoodZoneid;
import com.teamtop.system.battleGoods.model.BattleGoods;
import com.teamtop.system.battleGoods.model.BattleGoodsBoss;
import com.teamtop.system.battleGoods.model.BattleGoodsBox;
import com.teamtop.system.battleGoods.model.BattleGoodsJoiner;
import com.teamtop.system.battleGoods.model.BattleGoodsNpc;
import com.teamtop.system.scene.RowCol;

/**
 * 3个区一个房间
 * @author jjjjyyy
 *
 */
public class BattleGoodsCrossRoomCache {
	/**
	 * 跨服分组
	 */
	private  int partId;
	/**
	 * 房间id
	 */
	private  int roomId;
	/**
	 * 场景唯一id
	 */
	private  int sceneUnitId=0;
	/**
	 * mvp名字
	 */
	private  String MvpName;
	/**
	 * 已经存在的怪物+boos坐标集合
	 */
	private Set<RowCol> exitPosXy=new HashSet<>();
	/**
	 * 3大区参与过的玩家
	 */
	private  ConcurrentHashMap<Long,BattleGoods> BattleGoodsAllMembers=new ConcurrentHashMap<Long,BattleGoods>();
	
	/**
	 * 参与者缓存 玩家id-》参与者（在副本内的）
	 */
	private  ConcurrentHashMap<Long,BattleGoodsJoiner> BattleGoodsJoinerjoinMap= new ConcurrentHashMap<Long,BattleGoodsJoiner>();
	/**
	 * 地图上的宝箱
	 */
	private  ConcurrentHashMap<Long, BattleGoodsBox> BattleGoodsBoxMap=new  ConcurrentHashMap<Long,BattleGoodsBox>();
	/**
	 * 地图上的小怪
	 */
	private  ConcurrentHashMap<Long,BattleGoodsNpc> BattleGoodsNpcMap= new  ConcurrentHashMap<Long,BattleGoodsNpc>();
	/**
	 * 地图上的boss
	 */
	private  ConcurrentHashMap<Long,BattleGoodsNpc> BattleGoodsBossMap= new  ConcurrentHashMap<Long,BattleGoodsNpc>();
	
	/**
	 * 三个服 总积分 阵营1-3=>BattleGoodZoneid
	 */
	private  ConcurrentHashMap<Integer,BattleGoodZoneid> SourceByZoneid=new ConcurrentHashMap<Integer,BattleGoodZoneid>();
	/***
	 * 三个服首服区号id -> 阵营1-3
	 */
	private ConcurrentHashMap<Integer,Integer> fristZoneidToIndex=new ConcurrentHashMap<Integer, Integer>();
	/***
	 * 三个boss的状态 boss系统id=》boss状态
	 */
	private ConcurrentHashMap<Integer,BattleGoodsBoss> bossInfosMap=new ConcurrentHashMap<Integer,BattleGoodsBoss>();
	/**
	 * 个人积分排行榜
	 * 
	 */
	private List<BattleGoodRanker> battleGoodRankList=new ArrayList<BattleGoodRanker>();
	
	
	public BattleGoodsCrossRoomCache() {
		super();
	}
	public int getPartId() {
		return partId;
	}
	public void setPartId(int partId) {
		this.partId = partId;
	}
	
	
	public int getRoomId() {
		return roomId;
	}
	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}
	public int getSceneUnitId() {
		return sceneUnitId;
	}
	public void setSceneUnitId(int sceneUnitId) {
		this.sceneUnitId = sceneUnitId;
	}
	public ConcurrentHashMap<Long, BattleGoodsJoiner> getBattleGoodsJoinerjoinMap() {
		return BattleGoodsJoinerjoinMap;
	}
	public void setBattleGoodsJoinerjoinMap(ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap) {
		BattleGoodsJoinerjoinMap = battleGoodsJoinerjoinMap;
	}
	public ConcurrentHashMap<Long, BattleGoodsBox> getBattleGoodsBoxMap() {
		return BattleGoodsBoxMap;
	}
	public void setBattleGoodsBoxMap(ConcurrentHashMap<Long, BattleGoodsBox> battleGoodsBoxMap) {
		BattleGoodsBoxMap = battleGoodsBoxMap;
	}
	public ConcurrentHashMap<Long, BattleGoodsNpc> getBattleGoodsNpcMap() {
		return BattleGoodsNpcMap;
	}
	public void setBattleGoodsNpcMap(ConcurrentHashMap<Long, BattleGoodsNpc> battleGoodsNpcMap) {
		BattleGoodsNpcMap = battleGoodsNpcMap;
	}
	public ConcurrentHashMap<Integer, BattleGoodZoneid> getSourceByZoneid() {
		return SourceByZoneid;
	}
	public void setSourceByZoneid(ConcurrentHashMap<Integer, BattleGoodZoneid> sourceByZoneid) {
		SourceByZoneid = sourceByZoneid;
	}
	public ConcurrentHashMap<Integer, Integer> getFristZoneidToIndex() {
		return fristZoneidToIndex;
	}
	public void setFristZoneidToIndex(ConcurrentHashMap<Integer, Integer> fristZoneidToIndex) {
		this.fristZoneidToIndex = fristZoneidToIndex;
	}
	public ConcurrentHashMap<Long, BattleGoods> getBattleGoodsAllMembers() {
		return BattleGoodsAllMembers;
	}
	public void setBattleGoodsAllMembers(ConcurrentHashMap<Long, BattleGoods> battleGoodsAllMembers) {
		BattleGoodsAllMembers = battleGoodsAllMembers;
	}
	public ConcurrentHashMap<Integer, BattleGoodsBoss> getBossInfosMap() {
		return bossInfosMap;
	}
	public void setBossInfosMap(ConcurrentHashMap<Integer, BattleGoodsBoss> bossInfosMap) {
		this.bossInfosMap = bossInfosMap;
	}
	public ConcurrentHashMap<Long, BattleGoodsNpc> getBattleGoodsBossMap() {
		return BattleGoodsBossMap;
	}
	public void setBattleGoodsBossMap(ConcurrentHashMap<Long, BattleGoodsNpc> battleGoodsBossMap) {
		BattleGoodsBossMap = battleGoodsBossMap;
	}
	public Set<RowCol> getExitPosXy() {
		return exitPosXy;
	}
	public void setExitPosXy(Set<RowCol> exitPosXy) {
		this.exitPosXy = exitPosXy;
	}
	public List<BattleGoodRanker> getBattleGoodRankList() {
		return battleGoodRankList;
	}
	public void setBattleGoodRankList(List<BattleGoodRanker> battleGoodRankList) {
		this.battleGoodRankList = battleGoodRankList;
	}
	public String getMvpName() {
		return MvpName;
	}
	public void setMvpName(String mvpName) {
		MvpName = mvpName;
	}
	
	
	

}
