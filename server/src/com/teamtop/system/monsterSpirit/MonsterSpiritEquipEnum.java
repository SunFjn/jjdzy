package com.teamtop.system.monsterSpirit;

import com.teamtop.gameCommon.GameConst;

public enum MonsterSpiritEquipEnum {

	qinglongjiao(GameConst.INDEX_110, "青龙角"),
	qinglongling(GameConst.INDEX_111, "青龙鳞"),
	qinglonghun(GameConst.INDEX_112, "青龙魂"),
	
	baihuya(GameConst.INDEX_112, "白虎牙"),
	baihuzhua(GameConst.INDEX_112, "白虎爪"),
	baihuhun(GameConst.INDEX_112, "白虎魂"),
	
	zhuqueyu(GameConst.INDEX_112, "朱雀羽"),
	zhuqueyi(GameConst.INDEX_112, "朱雀翼"),
	zhuquehun(GameConst.INDEX_112, "朱雀魂"),
	
	xuanwujia(GameConst.INDEX_112, "玄武甲"),
	xuanwuke(GameConst.INDEX_112, "玄武壳"),
	xuanwuhun(GameConst.INDEX_112, "玄武魂");

	private int index;

	private String name;

	private MonsterSpiritEquipEnum(int index, String name) {
		this.index = index;
		this.name = name;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public static String getNameByIndex(int index) {
		for (MonsterSpiritEquipEnum msEnum : values()) {
			if (msEnum.getIndex() == index) {
				return msEnum.getName();
			}
		}
		return "";
	}

}
