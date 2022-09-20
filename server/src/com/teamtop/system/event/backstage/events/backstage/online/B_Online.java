package com.teamtop.system.event.backstage.events.backstage.online;
/**
 * 在线人数记录
 * @author kyle
 *
 */
public class B_Online {
	private long id;//ID
	private int onlineNum;//在线人数
	private int time;//时间戳
	private int ipNum;//在线IP数
	private String pfcode;//平台代码
	private int zoneid;//区号
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getOnlineNum() {
		return onlineNum;
	}
	public void setOnlineNum(int onlineNum) {
		this.onlineNum = onlineNum;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getIpNum() {
		return ipNum;
	}
	public void setIpNum(int ipNum) {
		this.ipNum = ipNum;
	}
	
	public String getPfcode() {
		return pfcode;
	}
	public void setPfcode(String pfcode) {
		this.pfcode = pfcode;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	
	
}
