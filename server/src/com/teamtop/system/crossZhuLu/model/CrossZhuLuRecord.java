package com.teamtop.system.crossZhuLu.model;

public class CrossZhuLuRecord {
	/** A玩家国家id */
	private int countryId;
	/** A玩家名称 */
	private String name;
	/** 战况类型:1-战胜,2-战败,3-占领 */
	private int type;
	/** 战况参数:城池id */
	private int param;
	/** B玩家国家id */
	private int countryId2;
	/** B玩家名称 */
	private String name2;

	public int getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getParam() {
		return param;
	}

	public void setParam(int param) {
		this.param = param;
	}

	public int getCountryId2() {
		return countryId2;
	}

	public void setCountryId2(int countryId2) {
		this.countryId2 = countryId2;
	}

	public String getName2() {
		return name2;
	}

	public void setName2(String name2) {
		this.name2 = name2;
	}

}
