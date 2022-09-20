package com.teamtop.hefu;
/**
 * 合服需要删除的玩家
 * @author Administrator
 *
 */
public class DelHero {
	private long hid;
	private String name;
	private int zoneid;
	private long aid;
	private long gangId;
	private int position;
	private int sex;
	private long marryHid;//是否已婚  0表示未婚，1 表示已婚
	private long marriageId;//结婚id
	
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
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public long getAid() {
		return aid;
	}
	public void setAid(long aid) {
		this.aid = aid;
	}
	public long getGangId() {
		return gangId;
	}
	public void setGangId(long gangId) {
		this.gangId = gangId;
	}
	public int getPosition() {
		return position;
	}
	public void setPosition(int position) {
		this.position = position;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	
	public long getMarryHid() {
		return marryHid;
	}
	public void setMarryHid(long marryHid) {
		this.marryHid = marryHid;
	}
	public long getMarriageId() {
		return marriageId;
	}
	public void setMarriageId(long marriageId) {
		this.marriageId = marriageId;
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
		DelHero other = (DelHero) obj;
		if (hid != other.hid)
			return false;
		return true;
	}
	
}
