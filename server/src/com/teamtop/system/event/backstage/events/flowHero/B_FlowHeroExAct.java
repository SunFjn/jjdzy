package com.teamtop.system.event.backstage.events.flowHero;

public class B_FlowHeroExAct {

	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 角色名
	 */
	private String name;
	/**
	 * 玩家账号
	 */
	private String openid;
	/**
	 * 区号
	 */
	private int zoneid;
	/**
	 * 活动唯一id
	 */
	private int exActId;
	/**
	 * 活动id
	 */
	private int actId;
	/**
	 * 角色等级
	 */
	private int level;
	/**
	 * vip等级
	 */
	private int viplv;
	/**
	 * 领取奖励
	 */
	private String reward;
	/**
	 * 操作类型
	 */
	private int opType;
	/**
	 * 注册系统
	 */
	private String usesys;
	/**
	 * 平台代码
	 */
	private String pfcode;
	/**
	 * 操作时间
	 */
	private int time;
	/**
	 * 登录ip
	 */
	private String loginIp;
	/**
	 * 记录充值或消费元宝
	 */
	private long money;
	/**
	 * 记录领取次数或购买次数
	 */
	private int num;

	/** 六道轮回等级 */
	private int reincarnationLevel;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public int getExActId() {
		return exActId;
	}

	public void setExActId(int exActId) {
		this.exActId = exActId;
	}

	public int getActId() {
		return actId;
	}

	public void setActId(int actId) {
		this.actId = actId;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getViplv() {
		return viplv;
	}

	public void setViplv(int viplv) {
		this.viplv = viplv;
	}

	public String getReward() {
		return reward;
	}

	public void setReward(String reward) {
		this.reward = reward;
	}

	public int getOpType() {
		return opType;
	}

	public void setOpType(int opType) {
		this.opType = opType;
	}

	public String getUsesys() {
		return usesys;
	}

	public void setUsesys(String usesys) {
		this.usesys = usesys;
	}

	public String getPfcode() {
		return pfcode;
	}

	public void setPfcode(String pfcode) {
		this.pfcode = pfcode;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getLoginIp() {
		return loginIp;
	}

	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}

	public long getMoney() {
		return money;
	}

	public void setMoney(long money) {
		this.money = money;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public int getReincarnationLevel() {
		return reincarnationLevel;
	}

	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}

}
