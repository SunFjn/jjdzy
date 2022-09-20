package com.teamtop.houtaiHttp.events.switchOnOff;

public enum OnOffTypeEnum {
	WEIXIN_SHARE_ONOFF(1, "微信分享开关"),

	MODIFY_NAME_ONOFF(2, "自定义修改名字开关"),

	EXACT_SWITCH_ONOFF(3, "专属活动开关");

	private int countryType;

	private String countryName;

	private OnOffTypeEnum(int countryType, String countryName) {
		this.countryType = countryType;
		this.countryName = countryName;
	}

	public int getCountryType() {
		return countryType;
	}

	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
}
