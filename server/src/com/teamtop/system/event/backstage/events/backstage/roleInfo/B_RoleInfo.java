package com.teamtop.system.event.backstage.events.backstage.roleInfo;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 后台玩家信息表
 * @author jjjjyyy
 */
public class B_RoleInfo extends CacheModel{
	/**
	 * 游戏账号ID 必须全局唯一
	 */
	@FieldOrder(order = 1)
	private String openid;
	/**
	 * 玩家id
	 */
	@FieldOrder(order = 2)
	private long id;
	/**
	 * 区号
	 */
	@FieldOrder(order = 3)
	private int zoneid;
	/**
	 * 平台账户 接入的渠道账户名 由SDk提供给游戏前端，前端上报后端记录，用于定位玩家信息 
	 */
	@FieldOrder(order = 4)
	private String pfopenid;
	/**
	 * 平台代码 接入平台代号 由SDk转接工程提供给游戏前端 
	 */
	@FieldOrder(order = 5)
	private String pfcode;
	/**
	 * 注册系统
	 */
	@FieldOrder(order = 6)
	private String usesys;
	/**
	 * 注册IP
	 */
	@FieldOrder(order = 7)
	private String createip;
	/**
	 * 名字
	 */
	@FieldOrder(order = 8)
	private String name;
	/**
	 * 角色等级
	 */
	@FieldOrder(order = 9)
	private int level;
	/**
	 * 玩家总战力
	 */
	@FieldOrder(order = 10)
	private long totalStrength;
	/**
	 * 铜钱
	 */
	@FieldOrder(order = 11)
	private long coin;
	/**
	 * 元宝
	 */
	@FieldOrder(order = 12)
	private long yuanbao;
	/**
	 * vip
	 */
	@FieldOrder(order = 13)
	private int vip;
	/**
	 * 广告标识
	 */
	@FieldOrder(order = 14)
	private String app_custom;
	/**
	 * 充值累计金额(元)
	 */
	@FieldOrder(order = 15)
	private long SumMoney;
	/**
	 * 是否为首服用户  这个角色是否为此平台账号下的首服用户 0待查，1是，2否
	 */
	@FieldOrder(order = 16)
	private int isOld;
	/**
	 * 创角时间  创建角色时间 
	 */
	@FieldOrder(order = 17)
	private int createHeroTime;
	/**
	 * 注册时间  用户注册时间 
	 */
	@FieldOrder(order = 18)
	private int RegisterTime;
	/**
	 * 最近一次充值时间
	 */	
	@FieldOrder(order = 19)
	private int recentlyRechargeTime;
	/**
	 * 最后更新时间  此字段为我们拉取数据的判定条件，必须存在并实时记录 
	 */
	@FieldOrder(order = 20)
	private int updateTime;
	/** 六道轮回等级 */
	@FieldOrder(order = 21)
	private int reincarnationLevel;
	/**
	 * 用户国家
	 */
	private String country;
	/**
	 * 用户地区
	 */
	private String region;
	
	public B_RoleInfo() {
		super();
	}
	
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public String getCreateip() {
		return createip;
	}
	public void setCreateip(String createip) {
		this.createip = createip;
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
	public long getTotalStrength() {
		return totalStrength;
	}
	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}
	public long getCoin() {
		return coin;
	}
	public void setCoin(long coin) {
		this.coin = coin;
	}
	public long getYuanbao() {
		return yuanbao;
	}
	public void setYuanbao(long yuanbao) {
		this.yuanbao = yuanbao;
	}
	public int getVip() {
		return vip;
	}
	public void setVip(int vip) {
		this.vip = vip;
	}
	public String getApp_custom() {
		return app_custom;
	}
	public void setApp_custom(String app_custom) {
		this.app_custom = app_custom;
	}
	public long getSumMoney() {
		return SumMoney;
	}
	public void setSumMoney(long sumMoney) {
		SumMoney = sumMoney;
	}
	public int getIsOld() {
		return isOld;
	}
	public void setIsOld(int isOld) {
		this.isOld = isOld;
	}
	public int getCreateHeroTime() {
		return createHeroTime;
	}
	public void setCreateHeroTime(int createHeroTime) {
		this.createHeroTime = createHeroTime;
	}
	public int getRegisterTime() {
		return RegisterTime;
	}
	public void setRegisterTime(int registerTime) {
		RegisterTime = registerTime;
	}
	public int getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(int updateTime) {
		this.updateTime = updateTime;
	}

	public int getRecentlyRechargeTime() {
		return recentlyRechargeTime;
	}

	public void setRecentlyRechargeTime(int recentlyRechargeTime) {
		this.recentlyRechargeTime = recentlyRechargeTime;
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
