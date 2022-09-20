package com.teamtop.system.event.backstage.events.flowHero;

/**
 * 角色货币（银两、绑银、元宝、礼券）流水实体类
 * @author hepl
 *
 */
public class B_FlowHeroMoney {
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
	 * 货币类型
	 */
	private int type;
	/**
	 * 货币变化后的值
	 */
	private long totalNum;
	/**
	 * 货币变化的值
	 */
	private long changeNum;
	/**
	 * 操作原因
	 */
	private int reason;
	/**
	 * 区号
	 */
	private int zoneid;
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
	private int operateTime;
	/**
	 * 1增加，2减少，3内部元宝增加，4内部元宝减少
	 */
	private int addFlag;
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
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public long getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(long totalNum) {
		this.totalNum = totalNum;
	}
	public long getChangeNum() {
		return changeNum;
	}
	public void setChangeNum(long changeNum) {
		this.changeNum = changeNum;
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
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}

	public int getReincarnationLevel() {
		return reincarnationLevel;
	}

	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}

}
