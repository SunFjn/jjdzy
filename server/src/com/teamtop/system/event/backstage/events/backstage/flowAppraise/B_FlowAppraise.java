package com.teamtop.system.event.backstage.events.backstage.flowAppraise;

/**
 * 鉴定流水
 * 
 * @author hepl
 *
 */
public class B_FlowAppraise {
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 角色id
	 */
	private long hid;

	/**
	 * 区号
	 */
	private int zoneid;
	/**
	 * 平台代码 接入平台代号 由SDk转接工程提供给游戏前端
	 */
	private String pfcode;
	/**
	 * 鉴定次数
	 */
	private int appraiseTimes;
	/**
	 * 鉴定奖励，Json字符串
	 */
	private String awardStr;
	/**
	 * 操作时间
	 */
	private int operateTime;

	public long getId() {
		return id;
	}

	public long getHid() {
		return hid;
	}

	public int getZoneid() {
		return zoneid;
	}

	public String getPfcode() {
		return pfcode;
	}

	public int getAppraiseTimes() {
		return appraiseTimes;
	}

	public int getOperateTime() {
		return operateTime;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public void setPfcode(String pfcode) {
		this.pfcode = pfcode;
	}

	public void setAppraiseTimes(int appraiseTimes) {
		this.appraiseTimes = appraiseTimes;
	}

	public void setOperateTime(int operateTime) {
		this.operateTime = operateTime;
	}

	public String getAwardStr() {
		return awardStr;
	}

	public void setAwardStr(String awardStr) {
		this.awardStr = awardStr;
	}

}
