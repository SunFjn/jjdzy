package com.teamtop.system.event.backstage.events.flowHero;

/**
 * 角色经验流水实体类
 * @author hepl
 *
 */
public class B_FlowHeroExp {
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 等级
	 */
	private int level;
	/**
	 * 经验
	 */
	private long exp;
	/**
	 * 变化的经验
	 */
	private long addExp;
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
	 * 0增加，1减少
	 */
	private int addFlag;
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
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public long getExp() {
		return exp;
	}
	public void setExp(long exp) {
		this.exp = exp;
	}
	public long getAddExp() {
		return addExp;
	}
	public void setAddExp(long addExp) {
		this.addExp = addExp;
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
	public int getAddFlag() {
		return addFlag;
	}
	public void setAddFlag(int addFlag) {
		this.addFlag = addFlag;
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
