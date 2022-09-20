package com.teamtop.system.event.backstage.events.flowHero;

public class B_FlowJoinFunction {
	// 隆中对，全民boss。七擒孟获，魔神吕布，烽火狼烟，问鼎天下，单刀赴会
	/** 唯一id */
	private long id;

	/** 角色id */
	private long hid;

	/** 创号职业 */
	private int createJob;

	/** 等级 */
	private int level;

	/** vip等级 */
	private int vipLevel;

	/** 战力 */
	private long strength;

	/** 参与系统id */
	private int sysId;

	/** 系统名称 */
	private String sysName;

	/** 参与时间 */
	private int joinTime;

	/** 区号 */
	private int zoneid;

	/** 注册系统 */
	private String usesys;

	/** 平台代码 */
	private String pfcode;
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

	public int getCreateJob() {
		return createJob;
	}

	public void setCreateJob(int createJob) {
		this.createJob = createJob;
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

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	public String getSysName() {
		return sysName;
	}

	public void setSysName(String sysName) {
		this.sysName = sysName;
	}

	public int getJoinTime() {
		return joinTime;
	}

	public void setJoinTime(int joinTime) {
		this.joinTime = joinTime;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
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

	public int getReincarnationLevel() {
		return reincarnationLevel;
	}

	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}

}
