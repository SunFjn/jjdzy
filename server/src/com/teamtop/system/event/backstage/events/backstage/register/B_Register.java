package com.teamtop.system.event.backstage.events.backstage.register;
/**
 * 注册人model
 * @author kyle
 */
public class B_Register {
	/**
	 * 游戏账号ID 必须全局唯一
	 */
	private String openid;
	/**
	 * 区号
	 */
	private int zoneid;
	/**
	 * 平台账户 接入的渠道账户名 由SDk提供给游戏前端，前端上报后端记录，用于定位玩家信息 
	 */
	private String pfopenid;
	/**
	 * 平台代码 接入平台代号 由SDk转接工程提供给游戏前端  注册pfcode
	 */
	private String pfcode;
	/**
	 * 注册系统
	 */
	private String usesys;
	/**
	 * 注册时间
	 */
	private int createtime;
	/**
	 * 注册IP
	 */
	private String createip;
	/**
	 * 广告标识
	 */
	private String app_custom;
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 角色名字
	 */
	private String name;
	/**
	 * 注册职业
	 */
	private int job;
	/**
	 * 用户国家
	 */
	private String country;
	/**
	 * 用户地区
	 */
	private String region;
	
	
	public B_Register() {
		super();
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
	public String getPfopenid() {
		return pfopenid;
	}
	public void setPfopenid(String pfopenid) {
		this.pfopenid = pfopenid;
	}
	public String getPfcode() {
		return pfcode;
	}
	public void setPfcode(String pfcode) {
		this.pfcode = pfcode;
	}
	public String getUsesys() {
		return usesys;
	}
	public void setUsesys(String usesys) {
		this.usesys = usesys;
	}
	public int getCreatetime() {
		return createtime;
	}
	public void setCreatetime(int createtime) {
		this.createtime = createtime;
	}
	public String getCreateip() {
		return createip;
	}
	public void setCreateip(String createip) {
		this.createip = createip;
	}
	public String getApp_custom() {
		return app_custom;
	}
	public void setApp_custom(String app_custom) {
		this.app_custom = app_custom;
	}
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
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
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
