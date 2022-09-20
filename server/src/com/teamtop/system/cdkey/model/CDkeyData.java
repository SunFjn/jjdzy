package com.teamtop.system.cdkey.model;

public class CDkeyData {
	/**
	 * 激活码Id
	 */
	private long id;
	/**
	 * 激活码
	 */
	private String cdkey;
	/**
	 * 激活码的类型
	 */
	private int type;
	/**
	 * 是否已被使用 0：未使用，1：已使用
	 */
	private int isUsed;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCdkey() {
		return cdkey;
	}

	public void setCdkey(String cdkey) {
		this.cdkey = cdkey;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getIsUsed() {
		return isUsed;
	}

	public void setIsUsed(int isUsed) {
		this.isUsed = isUsed;
	}

}
