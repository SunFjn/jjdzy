package com.teamtop.system.boss.countryBoss;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 国家boss缓存
 * @author jjjjyyy
 *
 */
public class CountryBossCache {
	/**
	 * 国家boss缓存 国家-》bossid-》正在打的 国家boss
	 */
	@FieldOrder(order = 1)
	private  ConcurrentHashMap<Integer,  CountryBossModel> countryBossMap = UC.reg("countryBossMap", new ConcurrentHashMap<Integer, CountryBossModel>());
	/**
	 * 国家boss缓存 国家-》bossid-》击杀者玩家id
	 */
	@FieldOrder(order = 2)
	private ConcurrentHashMap<Integer,  ConcurrentHashMap<Integer,Long>> killersByCountry=UC.reg("killersByCountry", new ConcurrentHashMap<Integer,  ConcurrentHashMap<Integer,Long>>());
	/**
	 * 国家boss缓存 国家-》bossid-》击杀者玩家id
	 */
	@FieldOrder(order = 3)
	private ConcurrentHashMap<Integer,  ConcurrentHashMap<Integer,CountryRankJioner>> newkillersByCountry=UC.reg("newkillersByCountry", new ConcurrentHashMap<Integer,  ConcurrentHashMap<Integer,CountryRankJioner>>());
	/**
	 * 上次重置时间
	 */
	@FieldOrder(order = 4)
    private  int restTime;
	/**
	 * 三国参与boss有伤害的玩家id
	 */
	@FieldOrder(order = 5)
	private ConcurrentHashMap<Integer,List<Long>> joinerByCountry=UC.reg("joinerByCountry", new ConcurrentHashMap<Integer,List<Long>>());
	/**
	 * 国家boss击杀排行 按国家
	 */
	@FieldOrder(order = 6)
	private List<CountryBossRank> rankList=UC.reg("rankList", new ArrayList<CountryBossRank>());
	/**
	 * 改版
	 */
	@FieldOrder(order = 7)
	private int index;
	
	public CountryBossCache() {
		super();
	}

	public ConcurrentHashMap<Integer, CountryBossModel> getCountryBossMap() {
		return countryBossMap;
	}

	public void setCountryBossMap(ConcurrentHashMap<Integer, CountryBossModel> countryBossMap) {
		this.countryBossMap = countryBossMap;
	}
	public int getRestTime() {
		return restTime;
	}
	public void setRestTime(int restTime) {
		this.restTime = restTime;
	}
	public ConcurrentHashMap<Integer, List<Long>> getJoinerByCountry() {
		return joinerByCountry;
	}
	public void setJoinerByCountry(ConcurrentHashMap<Integer, List<Long>> joinerByCountry) {
		this.joinerByCountry = joinerByCountry;
	}

	public List<CountryBossRank> getRankList() {
		return rankList;
	}

	public void setRankList(List<CountryBossRank> rankList) {
		this.rankList = rankList;
	}

	public ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Long>> getKillersByCountry() {
		return killersByCountry;
	}

	public void setKillersByCountry(ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Long>> killersByCountry) {
		this.killersByCountry = killersByCountry;
	}

	public ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CountryRankJioner>> getNewkillersByCountry() {
		return newkillersByCountry;
	}

	public void setNewkillersByCountry(
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CountryRankJioner>> newkillersByCountry) {
		this.newkillersByCountry = newkillersByCountry;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}
    
    
}
