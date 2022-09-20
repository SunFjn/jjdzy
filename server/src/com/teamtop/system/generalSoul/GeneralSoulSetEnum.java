package com.teamtop.system.generalSoul;

public enum GeneralSoulSetEnum {

	caowei(1, "曹魏"), shuhan(2, "蜀汉"), sunwu(3, "孙吴"), qunxiong(4, "群雄");

	private int type;

	private String name;

	private GeneralSoulSetEnum(int type, String name) {
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

	public static String getNameByType(int type) {
		GeneralSoulSetEnum[] arr = values();
		int size = arr.length;
		for (int i = 0; i < size; i++) {
			if (arr[i].getType() == type) {
				return arr[i].getName();
			}
		}
		return "";
	}

}
