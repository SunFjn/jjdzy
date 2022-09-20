package com.teamtop.system.boss.qmboss;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;

/**
 * 全民boss
 * @author Administrator
 *
 */
public class QMBoss {
	/**
	 * bossindex
	 */
	private int bossId;
	/**
	 * 状态 0：未刷新，1：已刷新
	 */
	private int state;
	/**
	 * 下次重生时间
	 */
	private int nextReliveTime;
	/**
	 * 在场景里面的玩家
	 */
	private Map<Long, Hero> inheroMap = new ConcurrentHashMap<Long, Hero>();
	/**
	 * 伤害排名
	 */
	private List<QMBossDamgRankModel> rankList = Collections.synchronizedList(new ArrayList<QMBossDamgRankModel>());
	/**
	 * 击杀记录
	 */
	private QMBossKillModel killer;
	/**
	 * hpmax
	 */
	private double hpmax;
	/**
	 * 当前气血
	 */
	private double curhp;
	/**
	 * 战斗属性
	 */
	private FinalFightAttr attr;
	
	public FinalFightAttr getAttr() {
		return attr;
	}
	public void setAttr(FinalFightAttr attr) {
		this.attr = attr;
	}
	public Map<Long, Hero> getInheroMap() {
		return inheroMap;
	}
	public void setInheroMap(Map<Long, Hero> inheroMap) {
		this.inheroMap = inheroMap;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getNextReliveTime() {
		return nextReliveTime;
	}
	public void setNextReliveTime(int nextReliveTime) {
		this.nextReliveTime = nextReliveTime;
	}
	public List<QMBossDamgRankModel> getRankList() {
		return rankList;
	}
	public void setRankList(List<QMBossDamgRankModel> rankList) {
		this.rankList = rankList;
	}
	
	public QMBossKillModel getKiller() {
		return killer;
	}
	public void setKiller(QMBossKillModel killer) {
		this.killer = killer;
	}
	public double getHpmax() {
		return hpmax;
	}
	public void setHpmax(double hpmax) {
		this.hpmax = hpmax;
	}
	public double getCurhp() {
		return curhp;
	}
	public void setCurhp(double curhp) {
		this.curhp = curhp;
	}
	public int getBossId() {
		return bossId;
	}
	public void setBossId(int bossId) {
		this.bossId = bossId;
	}
	
}
