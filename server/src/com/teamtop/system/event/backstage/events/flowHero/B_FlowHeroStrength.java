package com.teamtop.system.event.backstage.events.flowHero;

/**
 * 角色战力流水实体类
 * @author hepl
 *
 */
public class B_FlowHeroStrength {
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 角色等级
	 */
	private int level;
	/**
	 * 增加还是减少 1增加2减少
	 */
	private int addFlag;
	/**
	 * 变化战力
	 */
	private long chargeStrength;
	/**
	 * 变化前的总战力
	 */
	private long oldStrength;
	/**
	 * 变化后的总战力
	 */
	private long totalStrength;
	/**
	 * 操作原因
	 */
	private int reason;
	/**
	 * 区号
	 */
	private int zoneid;
	/**
	 * 操作时间
	 */
	private int operateTime;
	/**
	 * 注册系统
	 */
	private String usesys;
	/**
	 * 平台代码
	 */
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
	public long getOldStrength() {
		return oldStrength;
	}
	public void setOldStrength(long oldStrength) {
		this.oldStrength = oldStrength;
	}
	public long getTotalStrength() {
		return totalStrength;
	}
	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}
	public int getReason() {
		return reason;
	}
	public void setReason(int reason) {
		this.reason = reason;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getOperateTime() {
		return operateTime;
	}
	public void setOperateTime(int operateTime) {
		this.operateTime = operateTime;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
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
	public int getAddFlag() {
		return addFlag;
	}
	public void setAddFlag(int addFlag) {
		this.addFlag = addFlag;
	}
	public long getChargeStrength() {
		return chargeStrength;
	}
	public void setChargeStrength(long chargeStrength) {
		this.chargeStrength = chargeStrength;
	}

	public int getReincarnationLevel() {
		return reincarnationLevel;
	}

	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}
	
}
