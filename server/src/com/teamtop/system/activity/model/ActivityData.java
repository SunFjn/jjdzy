package com.teamtop.system.activity.model;

public class ActivityData {

	/** 唯一id */
	private long id;

	private long hid;

	/** 活动序号 */
	private int indexId;

	/** 活动id */
	private int actId;

	/** 期数 */
	private int periods;

	/** 活动数据 */
	private String actStr;

	private transient String insertActStr;

	public ActivityData() {
		// TODO Auto-generated constructor stub
	}

	public ActivityData(long hid, int indexId, int actId, int periods) {
		super();
		this.hid = hid;
		this.indexId = indexId;
		this.actId = actId;
		this.periods = periods;
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

	public int getIndexId() {
		return indexId;
	}

	public void setIndexId(int indexId) {
		this.indexId = indexId;
	}

	public int getActId() {
		return actId;
	}

	public void setActId(int actId) {
		this.actId = actId;
	}
	/** 期数 */
	public int getPeriods() {
		return periods;
	}

	public void setPeriods(int periods) {
		this.periods = periods;
	}

	public String getActStr() {
		return actStr;
	}

	public void setActStr(String actStr) {
		this.actStr = actStr;
	}

	public String getInsertActStr() {
		return insertActStr;
	}

	public void setInsertActStr(String insertActStr) {
		this.insertActStr = insertActStr;
	}

}
