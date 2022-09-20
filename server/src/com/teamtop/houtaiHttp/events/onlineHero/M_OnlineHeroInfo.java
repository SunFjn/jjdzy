package com.teamtop.houtaiHttp.events.onlineHero;
/**
 * 在线角色数据model
 * @author kyle
 *
 */
public class M_OnlineHeroInfo {
	//区号
	private int zoneid;
	//角色id
	private long hid;
	//角色名
	private String name;
	//等级 
	private int level;
	//转生等级
	private int rebornlv;
	//职业 1战士，2谋士，3舞者
	private int job;
	//元宝
	private long glod;
	//铜币
	private long coin;
	//登入时间 (时间戳)
	private int loginTime;
	//在线时间 (单位:秒)
	private int onlineTime;
	//异常状态 0:正常 1:禁言
	private int illegalState;
	//封号状态 0:正常 1:封号 2:封号处理问题
	private int forbidState;
	
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
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	public int getLoginTime() {
		return loginTime;
	}
	public void setLoginTime(int loginTime) {
		this.loginTime = loginTime;
	}
	public int getOnlineTime() {
		return onlineTime;
	}
	public void setOnlineTime(int onlineTime) {
		this.onlineTime = onlineTime;
	}
	public int getIllegalState() {
		return illegalState;
	}
	public void setIllegalState(int illegalState) {
		this.illegalState = illegalState;
	}
	public long getGlod() {
		return glod;
	}
	public void setGlod(long glod) {
		this.glod = glod;
	}
	public int getForbidState() {
		return forbidState;
	}
	public void setForbidState(int forbidState) {
		this.forbidState = forbidState;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getRebornlv() {
		return rebornlv;
	}
	public void setRebornlv(int rebornlv) {
		this.rebornlv = rebornlv;
	}
	public long getCoin() {
		return coin;
	}
	public void setCoin(long coin) {
		this.coin = coin;
	}
}
