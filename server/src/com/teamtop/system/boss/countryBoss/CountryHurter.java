package com.teamtop.system.boss.countryBoss;

import com.teamtop.util.db.trans.FieldOrder;

public class CountryHurter {
	
	@FieldOrder(order = 1)
	private long hid;
	@FieldOrder(order = 2)
	private long hurt;
	@FieldOrder(order = 3)
	private String name;
	
	public CountryHurter(long hid, long hurt, String name) {
		super();
		this.hid = hid;
		this.hurt = hurt;
		this.name = name;
	}
	public CountryHurter() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getHurt() {
		return hurt;
	}
	public void setHurt(long hurt) {
		this.hurt = hurt;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
		CountryHurter other = (CountryHurter) obj;
		if (hid != other.hid)
			return false;
		return true;
	}
	
	
	

}
