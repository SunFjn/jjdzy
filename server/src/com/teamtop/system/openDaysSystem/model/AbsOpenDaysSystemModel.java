package com.teamtop.system.openDaysSystem.model;

import java.util.HashSet;
import java.util.Set;

public class AbsOpenDaysSystemModel {

	/** 数据库唯一id */
	private long id;

	private long hid;

	/** 配置表唯一id */
	private int uid;

	/** 系统id */
	private int sysid;

	/** 期数 */
	private int qs;

	/** 个人系统详细数据 */
	private String opSysStr;

	private transient String insertActStr;

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

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public int getSysid() {
		return sysid;
	}

	public void setSysid(int sysid) {
		this.sysid = sysid;
	}

	public int getQs() {
		return qs;
	}

	public void setQs(int qs) {
		this.qs = qs;
	}

	public String getOpSysStr() {
		return opSysStr;
	}

	public void setOpSysStr(String opSysStr) {
		this.opSysStr = opSysStr;
	}

	public String getInsertActStr() {
		return insertActStr;
	}

	public void setInsertActStr(String insertActStr) {
		this.insertActStr = insertActStr;
	}

}
