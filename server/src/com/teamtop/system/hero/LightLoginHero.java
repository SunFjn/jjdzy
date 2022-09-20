package com.teamtop.system.hero;
/**
 * 轻量级的hero
 * @author Administrator
 *
 */
public class LightLoginHero {
	private long id;
	/**
	 * 禁言状态 0:正常 1:禁言
	 */
	private int illegalState;
	/**
	 * 禁言状态的失效时间
	 */
	private int illegalTimeout;
	/**
	 * 禁言原因,通过后台传入赋值
	 */
	private String illegalReason;
	/**
	 * 封禁状态 0:正常 1:封禁
	 */
	private int forbidState;
	/**
	 * 封禁状态的失效时间
	 */
	private int forbidTimeout;
	/**
	 * 封禁原因，通过后台传入赋值
	 */
	private String forbidReason;
	private String name;
	private long aid;
	private String openid;
	private int zoneid;
	private int sex;
	private int job;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getAid() {
		return aid;
	}
	public void setAid(long aid) {
		this.aid = aid;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	public int getIllegalState() {
		return illegalState;
	}
	public void setIllegalState(int illegalState) {
		this.illegalState = illegalState;
	}
	public int getIllegalTimeout() {
		return illegalTimeout;
	}
	public void setIllegalTimeout(int illegalTimeout) {
		this.illegalTimeout = illegalTimeout;
	}
	public String getIllegalReason() {
		return illegalReason;
	}
	public void setIllegalReason(String illegalReason) {
		this.illegalReason = illegalReason;
	}
	public int getForbidState() {
		return forbidState;
	}
	public void setForbidState(int forbidState) {
		this.forbidState = forbidState;
	}
	public int getForbidTimeout() {
		return forbidTimeout;
	}
	public void setForbidTimeout(int forbidTimeout) {
		this.forbidTimeout = forbidTimeout;
	}

	public String getForbidReason() {
		return forbidReason;
	}

	public void setForbidReason(String forbidReason) {
		this.forbidReason = forbidReason;
	}
	
	
}
