package com.teamtop.system.boss.countryBoss;

import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class CountryRankJioner {
	/**
	 * 击杀者id
	 */
	@FieldOrder(order = 1)
	private long killerid;
	/**
	 * 伤害排行榜
	 */
	@FieldOrder(order = 2)	
	private List<CountryHurter> hurtRankArr;
	
	
	public CountryRankJioner() {
		super();
	}
	
	public long getKillerid() {
		return killerid;
	}
	public void setKillerid(long killerid) {
		this.killerid = killerid;
	}

	public List<CountryHurter> getHurtRankArr() {
		return hurtRankArr;
	}

	public void setHurtRankArr(List<CountryHurter> hurtRankArr) {
		this.hurtRankArr = hurtRankArr;
	}
	
	
	
	
	

}
