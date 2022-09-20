package com.teamtop.system.boss.monsterGod;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.boss.qmboss.QMBossDamgRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.cache.union.UC;

/**
 * 魔神吕布公共缓存
 * @author jjjjyyy
 *
 */
public class MonsterGodCache {
	/**
	 * 0未开启 魔神第一阶段1 魔神第二阶段2 魔神第三阶段3 boss已被击杀4
	 */
	private  int state;
	
	private  int openTime;
	
	private  GodBoss gogBoss;
	/**
	 * 当前参与的人
	 */
	private  ConcurrentHashMap<Long, Hero> inheroMap = UC.reg("monsterGodInheroMap", new ConcurrentHashMap<Long, Hero>());
	/**
	 * 死亡时间
	 */
	private ConcurrentHashMap<Long, Integer> diehero = UC.reg("monsterGodDiehero", new ConcurrentHashMap<Long,Integer>());
	/**
	 * 伤害排名
	 */
	private  List<QMBossDamgRankModel> rankList = UC.reg("monsterGodRankList", Collections.synchronizedList(new ArrayList<QMBossDamgRankModel>()));
	/**
	 * boss被击杀后的cd
	 */
	private  int bossCDTime;
	/**
	 * 击杀者id
	 */
	private  long skillerId;



	public MonsterGodCache() {
		super();
	}
	public GodBoss getGogBoss() {
		return gogBoss;
	}
	public void setGogBoss(GodBoss gogBoss) {
		this.gogBoss = gogBoss;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public ConcurrentHashMap<Long, Hero> getInheroMap() {
		return inheroMap;
	}
	public void setInheroMap(ConcurrentHashMap<Long, Hero> inheroMap) {
		this.inheroMap = inheroMap;
	}
	public List<QMBossDamgRankModel> getRankList() {
		return rankList;
	}
	public void setRankList(List<QMBossDamgRankModel> rankList) {
		this.rankList = rankList;
	}
	public ConcurrentHashMap<Long, Integer> getDiehero() {
		return diehero;
	}
	public void setDiehero(ConcurrentHashMap<Long, Integer> diehero) {
		this.diehero = diehero;
	}
	public int getOpenTime() {
		return openTime;
	}
	public void setOpenTime(int openTime) {
		this.openTime = openTime;
	}
	public int getBossCDTime() {
		return bossCDTime;
	}
	public void setBossCDTime(int bossCDTime) {
		this.bossCDTime = bossCDTime;
	}
	public long getSkillerId() {
		return skillerId;
	}
	public void setSkillerId(long skillerId) {
		this.skillerId = skillerId;
	}

}
