package com.teamtop.system.event.backstage.events.backstage.loginInfo;

public class B_FlowLoginout {
	//平台账号、玩家名字。平台、区号、当前任务名称、退出时上一次任务完成时间、退出时上一次完成的任务名称、登出时等级、等出时VIP等级、登出时间。
	private long id; //唯一id
	private long hid; //角色id
	private String openid; //平台账号
	private int job;//角色职业
	private int level; //角色等级
	private int vipLevel;//vip等级
	private int zoneid; //区号
	private String loginpfcode; //登陆平台代码
	private String pfcode;//注册平台代码
	private String nowTask;//当前任务名称
	private String beforeTask;//上一个任务
	private int beforeTime;//上一次任务完成时间
	private int logoutTime;//登出时间
	private long totalStrength;//总战力
	private int reincarnationLevel;// 六道轮回等级
	
	
	public B_FlowLoginout() {
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
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
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
	public String getNowTask() {
		return nowTask;
	}
	public void setNowTask(String nowTask) {
		this.nowTask = nowTask;
	}
	public String getBeforeTask() {
		return beforeTask;
	}
	public void setBeforeTask(String beforeTask) {
		this.beforeTask = beforeTask;
	}
	public int getBeforeTime() {
		return beforeTime;
	}
	public void setBeforeTime(int beforeTime) {
		this.beforeTime = beforeTime;
	}
	public int getLogoutTime() {
		return logoutTime;
	}
	public void setLogoutTime(int logoutTime) {
		this.logoutTime = logoutTime;
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
	
	
}
