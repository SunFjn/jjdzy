package com.teamtop.system.guanqia;
/**
 * 关卡排行数据
 *
 */
public class GuanqiaRank {
	private long hid;
	private int guanqia;
	private String name;
	private long totalStrength;
	private int timeTopGuanQia;
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	
	public int getGuanqia() {
		return guanqia;
	}
	public int getTimeTopGuanQia() {
		return timeTopGuanQia;
	}
	public void setTimeTopGuanQia(int timeTopGuanQia) {
		this.timeTopGuanQia = timeTopGuanQia;
	}
	public void setGuanqia(int guanqia) {
		this.guanqia = guanqia;
	}
	public long getTotalStrength() {
		return totalStrength;
	}
	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
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
		GuanqiaRank other = (GuanqiaRank) obj;
		if (hid != other.hid)
			return false;
		return true;
	}
	
}
