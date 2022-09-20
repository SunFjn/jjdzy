package com.teamtop.system.boss.countryBoss;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class CountryBossModel {
	/**
	 * bossindex
	 */
	@FieldOrder(order = 1)
	private int bossId;
	/**
	 * 国家
	 */
	@FieldOrder(order = 2)
	private int countryType;
	/**
	 * hpmax
	 */
	@FieldOrder(order = 3)
	private double hpmax;
	/**
	 * 当前气血
	 */
	@FieldOrder(order = 4)
	private double curhp;
	/**
	 * 伤害排名
	 */
	private List<CountryBossDamgModel> rankList = Collections.synchronizedList(new ArrayList<CountryBossDamgModel>());
	/**
	 * 场景中的玩家
	 */
	private List<Long> inHeros=Collections.synchronizedList(new ArrayList<Long>());;

	

	
	public CountryBossModel() {
		super();
	}
	public int getBossId() {
		return bossId;
	}
	public void setBossId(int bossId) {
		this.bossId = bossId;
	}
	public int getCountryType() {
		return countryType;
	}
	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}
	public List<Long> getInHeros() {
		return inHeros;
	}
	public void setInHeros(List<Long> inHeros) {
		this.inHeros = inHeros;
	}
	public List<CountryBossDamgModel> getRankList() {
		return rankList;
	}
	public void setRankList(List<CountryBossDamgModel> rankList) {
		this.rankList = rankList;
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
	
	
	

}
