package com.teamtop.system.event.backstage.events.backstage.loginInfo;

/**
 * 登陆流水记录，每次登陆记录
 * @author hepl
 *
 */
public class B_FlowLoginInfo {
	private long id; //唯一id
	private long hid; //角色id
	private String openid; //平台账号
	private int level; //角色等级
	private int vipLevel;//vip等级
	private int zoneid; //区号
	private int logintime; //登陆时间
	private int regtime; //注册时间
	private String loginip; //登陆ip
	private String usesys; // 注册系统
	private String loginsys; // 登陆系统
	private String loginpfcode; //登陆平台代码
	private String pfcode;//注册平台代码
	private String app_custom;//广告标识
	private long totalStrength;// 总战力
	private int reincarnationLevel;// 六道轮回等级
	/**
	 * 用户国家
	 */
	private String country;
	/**
	 * 用户地区
	 */
	private String region;
	
	public B_FlowLoginInfo() {
		super();
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getVipLevel() {
		return vipLevel;
	}
	public void setVipLevel(int vipLevel) {
		this.vipLevel = vipLevel;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getLogintime() {
		return logintime;
	}
	public void setLogintime(int logintime) {
		this.logintime = logintime;
	}
	public int getRegtime() {
		return regtime;
	}
	public void setRegtime(int regtime) {
		this.regtime = regtime;
	}
	public String getLoginip() {
		return loginip;
	}
	public void setLoginip(String loginip) {
		this.loginip = loginip;
	}
	public String getUsesys() {
		return usesys;
	}
	public void setUsesys(String usesys) {
		this.usesys = usesys;
	}
	
	public String getLoginpfcode() {
		return loginpfcode;
	}
	public void setLoginpfcode(String loginpfcode) {
		this.loginpfcode = loginpfcode;
	}
	public String getPfcode() {
		return pfcode;
	}
	public void setPfcode(String pfcode) {
		this.pfcode = pfcode;
	}
	public String getApp_custom() {
		return app_custom;
	}
	public void setApp_custom(String app_custom) {
		this.app_custom = app_custom;
	}
	public String getLoginsys() {
		return loginsys;
	}
	public void setLoginsys(String loginsys) {
		this.loginsys = loginsys;
	}

	public long getTotalStrength() {
		return totalStrength;
	}

	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}

	public int getReincarnationLevel() {
		return reincarnationLevel;
	}

	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}
	
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	
	
}

