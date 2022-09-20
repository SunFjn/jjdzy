package com.teamtop.system.boss.countryBoss;

import com.teamtop.util.db.trans.FieldOrder;

public class CountryBossRank {
	/**
	 * 国家id
	 */
	@FieldOrder(order = 1)
	private int type;
	/**
	 * 击杀boss数量
	 */
	@FieldOrder(order = 2)
	private int diebossnum;
	/**
	 * 击杀时间
	 */
	@FieldOrder(order = 3)
	private int killtime;
	
	
	
	public CountryBossRank() {
		super();
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getDiebossnum() {
		return diebossnum;
	}
	public void setDiebossnum(int diebossnum) {
		this.diebossnum = diebossnum;
	}
	public int getKilltime() {
		return killtime;
	}
	public void setKilltime(int killtime) {
		this.killtime = killtime;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + type;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CountryBossRank other = (CountryBossRank) obj;
		if (type != other.type)
			return false;
		return true;
	}
	
	
	

}
