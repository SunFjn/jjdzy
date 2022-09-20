package com.teamtop.system.crossBoss.cross;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.crossBoss.model.CrossBossRankModel;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;

/**
 * 转生boss
 * @author Administrator
 *
 */
public class ZSBoss {
	
	private int bossid;
	
	private int index;
	
	private int roomId;
	/**
	 * 分区id
	 */
	private int partid;
	
	private List<Integer> zoneids = new ArrayList<Integer>();
	/**
	 * 在打boss的玩家
	 */
	private Map<Long,Hero> heros = new ConcurrentHashMap<Long, Hero>();
	/**
	 * 个人伤害
	 */
	private Map<Long, CrossBossRankModel> heroRankMap = new ConcurrentHashMap<Long, CrossBossRankModel>();
	/**
	 * 国家伤害
	 */
	private Map<Integer, CrossBossRankModel> countryRankMap = new ConcurrentHashMap<Integer, CrossBossRankModel>();
	/**
	 * 个人伤害排名
	 */
	private List<CrossBossRankModel> heroRankList;
	/**
	 * 国家伤害排名
	 */
	private List<CrossBossRankModel> countryRankList;
	/**
	 * hpmax
	 */
	private long hpmax;
	/**
	 * 当前气血
	 */
	private long curhp;
	/**
	 * 最后一击玩家名字
	 */
	private String lastHitName;
	/**
	 * 最后一击玩家id
	 */
	private long lastHitId;
	/**
	 * 打死boss用时
	 */
	private int beatBossDeadTime;
	/**
	 * 战斗属性
	 */
	private FinalFightAttr attr;
	/**
	 * boss攻击的hid
	 */
	private long attHid;
	/**
	 * 这一秒boss受的伤害
	 */
	private double secHurt;
	
	
	public int getBossid() {
		return bossid;
	}
	public void setBossid(int bossid) {
		this.bossid = bossid;
	}
	
	public double getSecHurt() {
		return secHurt;
	}
	public void setSecHurt(double secHurt) {
		this.secHurt = secHurt;
	}
	
	public long getAttHid() {
		return attHid;
	}
	public void setAttHid(long attHid) {
		this.attHid = attHid;
	}
	public FinalFightAttr getAttr() {
		return attr;
	}
	public void setAttr(FinalFightAttr attr) {
		this.attr = attr;
	}
	public int getBeatBossDeadTime() {
		return beatBossDeadTime;
	}
	public void setBeatBossDeadTime(int beatBossDeadTime) {
		this.beatBossDeadTime = beatBossDeadTime;
	}
	public String getLastHitName() {
		return lastHitName;
	}
	public void setLastHitName(String lastHitName) {
		this.lastHitName = lastHitName;
	}
	public long getLastHitId() {
		return lastHitId;
	}
	public void setLastHitId(long lastHitId) {
		this.lastHitId = lastHitId;
	}
	public void setHeros(Map<Long, Hero> heros) {
		this.heros = heros;
	}
	public long getHpmax() {
		return hpmax;
	}
	public void setHpmax(long hpmax) {
		this.hpmax = hpmax;
	}
	public long getCurhp() {
		return curhp;
	}
	public void setCurhp(long curhp) {
		this.curhp = curhp;
	}
	public Map<Long, Hero> getHeros() {
		return heros;
	}
	public Map<Long, CrossBossRankModel> getHeroRankMap() {
		return heroRankMap;
	}
	public void setHeroRankMap(Map<Long, CrossBossRankModel> heroRankMap) {
		this.heroRankMap = heroRankMap;
	}

	public Map<Integer, CrossBossRankModel> getCountryRankMap() {
		return countryRankMap;
	}
	public void setCountryRankMap(Map<Integer, CrossBossRankModel> countryRankMap) {
		this.countryRankMap = countryRankMap;
	}
	public List<CrossBossRankModel> getHeroRankList() {
		if(heroRankList==null){
			heroRankList = new ArrayList<>(heroRankMap.values());
		}
		return heroRankList;
	}
	public void setHeroRankList(List<CrossBossRankModel> heroRankList) {
		this.heroRankList = heroRankList;
	}

	public List<CrossBossRankModel> getCountryRankList() {
		return countryRankList;
	}
	public void setCountryRankList(List<CrossBossRankModel> countryRankList) {
		this.countryRankList = countryRankList;
	}
	public List<Integer> getZoneids() {
		return zoneids;
	}
	public void setZoneids(List<Integer> zoneids) {
		this.zoneids = zoneids;
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	public int getRoomId() {
		return roomId;
	}
	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}
	public int getPartid() {
		return partid;
	}
	public void setPartid(int partid) {
		this.partid = partid;
	}
	
	
}
