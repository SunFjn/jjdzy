package com.teamtop.system.activity.ativitys.doubleTwelveShop;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class DoubleTwelveShop extends ActivityData {
	/** 商品信息 */
	private Map<Integer, Integer> itemInfoMap;

	public Map<Integer, Integer> getItemInfoMap() {
		return itemInfoMap;
	}

	public void setItemInfoMap(Map<Integer, Integer> itemInfoMap) {
		this.itemInfoMap = itemInfoMap;
	}
}
