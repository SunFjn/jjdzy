package com.teamtop.system.monsterSpirit;

public enum MonsterSpiritEnum {
	
	qinglong(1, "青龙"),
	baihu(2, "白虎"),
	zhuque(3, "朱雀"),
	xuanwu(4, "玄武");
	
	private int type;
	
	private String name;
	
	private MonsterSpiritEnum(int type, String name) {
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

	public static String getNamebyType(int type) {
		MonsterSpiritEnum[] arr = values();
		int size = arr.length;
		for (int i = 0; i < size; i++) {
			if (arr[i].getType() == type) {
				return arr[i].getName();
			}
		}
		return "";
	}

}
