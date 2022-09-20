package com.teamtop.system.account;

import com.teamtop.util.cache.CacheModel;

/**
 * 账号类
 * @author Kyle
 *
 */
public class Account extends CacheModel{
	/**
	 * 账号ID
	 */
	private long id;
	/**
	 * 账号名 
	 */
	private String openid;
	/**
	 * 真实的openid
	 */
	private String oriopenid;
	/**
	 * 区id
	 */
	private int zoneid;
	/**
	 * 注册时间
	 */
	private int createtime;
	/**
	 * 注册IP
	 */
	private String createip;
	/**
	 * 注册渠道(平台)
	 */
	private String pf;
	/**
	 * 小渠道
	 */
	private String pd;
	/**
	 * 角色列表
	 */
	private long hid;
	/**
	 * 腾讯广告位数据
	 */
	private String via;
	/**
	 * 广告标识
	 */
	private String app_custom;
	/**
	 * 平台账户 接入的渠道账户名 由SDk提供给游戏前端，前端上报后端记录，用于定位玩家信息 
	 */
	private String pfopenid;
	/**
	 * 平台代码 接入平台代号 由SDk转接工程提供给游戏前端 
	 */
	private String pfcode;
	/**
	 * 注册系统
	 */
	private String usesys;
	/**
	 * 登陆系统
	 */
	private String loginsys;
	/**
	 * 是否白名单用户，0-否，1-是
	 */
	private int Ismarket;
	/**
	 * 是否到达创建页面，0否，1是
	 */
	private int inCreate;
	/**
	 * 是否充值白名单用户，0-否，1-是
	 */
	private int rechargeWhite;
	/**
	 * 1创角开始 2结束创角 3加在公共资源 4加载配置 5 预加载 6过场动画 7正式进入第一关
	 */
	private int loginstate;
	/**
	 * 是否达到ip注册限制 (0：未验证，1:是限制账号，2：已验证非限制账号)
	 */
	private int overState;
	/**
	 * 用户国家
	 */
	private String country;
	/**
	 * 用户地区
	 */
	private String region;
	
	public Account() {
		super();
	}
	
	
	public String getOriopenid() {
		return oriopenid;
	}
	public void setOriopenid(String oriopenid) {
		this.oriopenid = oriopenid;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
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
	
	public String getPf() {
		return pf;
	}
	public void setPf(String pf) {
		this.pf = pf;
	}
	
	public String getPd() {
		return pd;
	}
	public void setPd(String pd) {
		this.pd = pd;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public String getVia() {
		return via;
	}
	public void setVia(String via) {
		this.via = via;
	}
	public String getApp_custom() {
		return app_custom;
	}
	public void setApp_custom(String app_custom) {
		this.app_custom = app_custom;
	}
	public int getIsmarket() {
		return Ismarket;
	}
	public void setIsmarket(int ismarket) {
		Ismarket = ismarket;
	}
	public int getInCreate() {
		return inCreate;
	}
	public void setInCreate(int inCreate) {
		this.inCreate = inCreate;
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
	public int getRechargeWhite() {
		return rechargeWhite;
	}
	public void setRechargeWhite(int rechargeWhite) {
		this.rechargeWhite = rechargeWhite;
	}
	public String getLoginsys() {
		return loginsys;
	}
	public void setLoginsys(String loginsys) {
		this.loginsys = loginsys;
	}
	public int getLoginstate() {
		return loginstate;
	}
	public void setLoginstate(int loginstate) {
		this.loginstate = loginstate;
	}
	public int getOverState() {
		return overState;
	}
	public void setOverState(int overState) {
		this.overState = overState;
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
