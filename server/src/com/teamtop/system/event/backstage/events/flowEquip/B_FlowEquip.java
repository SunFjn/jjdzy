package com.teamtop.system.event.backstage.events.flowEquip;

/**
 * 装备状态流水
 * @author hepl
 *
 */
public class B_FlowEquip {
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 穿戴职业，只有穿戴的装备才有值，默认为0
	 */
	private int job;
	/**
	 * 装备唯一id
	 */
	private long equipId;
	/**
	 * 装备系统id
	 */
	private int sysId;
	/**
	 * 状态 1 在背包中  2 在仓库 3 在身上  4 在交易中/市场上 5在当铺 6在邮件
	 */
	private int state;
	/**
	 * 附加属性的系数
	 */
	private int attrAdd;
	/**
	 * 穿戴身上的位置
	 */
	private int bodyIndex;
	/**
	 * 增加或减少，0不变，1增加，2减少
	 */
	private int isadd;
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
	public long getEquipId() {
		return equipId;
	}
	public void setEquipId(long equipId) {
		this.equipId = equipId;
	}
	public int getSysId() {
		return sysId;
	}
	public void setSysId(int sysId) {
		this.sysId = sysId;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getIsadd() {
		return isadd;
	}
	public void setIsadd(int isadd) {
		this.isadd = isadd;
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
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	public int getAttrAdd() {
		return attrAdd;
	}
	public void setAttrAdd(int attrAdd) {
		this.attrAdd = attrAdd;
	}
	public int getBodyIndex() {
		return bodyIndex;
	}
	public void setBodyIndex(int bodyIndex) {
		this.bodyIndex = bodyIndex;
	}
}
