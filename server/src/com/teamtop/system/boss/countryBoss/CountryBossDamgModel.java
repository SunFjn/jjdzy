package com.teamtop.system.boss.countryBoss;

import com.teamtop.system.boss.qmboss.BossHurtInfo;
import com.teamtop.system.hero.FinalFightAttr;

public class CountryBossDamgModel {
	/**
	 * hid
	 */
	private long hid;
	/**
	 * 名字
	 */
	private String name;
	/**
	 * 伤害
	 */
	private long hurt;
	/**
	 * bossid  每秒对我的伤害
	 */
	private  BossHurtInfo bossHurtInfo;
	/**
	 * 进入时间
	 */
	private int inTime;
	/**
	 * 战斗属性
	 */
	private FinalFightAttr attrmap;
	
	
	public CountryBossDamgModel() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getHurt() {
		return hurt;
	}
	public void setHurt(long hurt) {
		this.hurt = hurt;
	}
	public BossHurtInfo getBossHurtInfo() {
		return bossHurtInfo;
	}
	public void setBossHurtInfo(BossHurtInfo bossHurtInfo) {
		this.bossHurtInfo = bossHurtInfo;
	}
	public int getInTime() {
		return inTime;
	}
	public void setInTime(int inTime) {
		this.inTime = inTime;
	}
	public FinalFightAttr getAttrmap() {
		return attrmap;
	}
	public void setAttrmap(FinalFightAttr attrmap) {
		this.attrmap = attrmap;
	}
	
	public long getCurhp() {
		long currhp = attrmap.getHp();
		if(currhp<0) currhp=0;
		return currhp;
	}
	
	public void fullHp(){
		attrmap.setHp(attrmap.getHpMax());
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (hid ^ (hid >>> 32));
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
		CountryBossDamgModel other = (CountryBossDamgModel) obj;
		if (hid != other.hid)
			return false;
		return true;
	}

}
