package com.teamtop.system.activity.ativitys.caoCaoCome;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.boss.qmboss.QMBossDamgRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.cache.union.UC;

public class CaoCaoComeCache {
	/**
	 * boss状态
	 */
	private  int state;
	
	private  int openTime;
	
	private CaoCaoBoss caoCaoBoss;
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
	 * boss被击杀 用的时间
	 */
	private  int bossDieTime;
	/**
	 * 击杀者id
	 */
	private  long skillerId;

	public CaoCaoComeCache() {
		super();
	}

	public CaoCaoBoss getCaoCaoBoss() {
		return caoCaoBoss;
	}
	public void setCaoCaoBoss(CaoCaoBoss caoCaoBoss) {
		this.caoCaoBoss = caoCaoBoss;
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
	public int getBossDieTime() {
		return bossDieTime;
	}
	public void setBossDieTime(int bossDieTime) {
		this.bossDieTime = bossDieTime;
	}
	public long getSkillerId() {
		return skillerId;
	}
	public void setSkillerId(long skillerId) {
		this.skillerId = skillerId;
	}


}
