package com.teamtop.system.shop;

public enum ShopEnum {

	MYSTERY_SHOP(1, "神秘商店"),

	PRESTIGE_SHOP(2, "声望商店"),

	VIP_SHOP(3, "vip商店"),

	GOD_OF_WAR_SHOP(4, "战神宝藏"),

	CROSS_KING_SHOP(5, "乱世宝藏"),

	LONG_ZHONG_TREASURY(6, "隆中宝库"),

	DYNASTY_WARRIORS_TREASURY(7, "无双宝库"),

	CROSS_KING_TREASURY(8, "枭雄宝库"),

	SAN_GUO_TREASURY(9, "三国宝库"),
	
	FIRE_SHOP(10, "烽火商店"),

	ZCBOSS_SHOP(11, "战场商店"),

	YB_SHOP(12, "元宝商店"),

	DISCOUNT_SHOP(13, "折扣商店"),

	CELEBRATION_SHOP(14, "庆典商城"),
	
	SHARE_SHOP(15, "分享宝库"),

	TRIAL_SHOP(16, "试炼商店");

	private int type;

	private String name;

	private ShopEnum(int type, String name) {
		this.type = type;
		this.name = name;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
