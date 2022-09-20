package com.teamtop.system.shop.model;

import java.util.Map;

public class ShopData {

	private long hid;

	/**
	 * 已购买物品信息
	 */
	private Map<Integer, Map<Integer, Integer>> shoppingMap;

	/**
	 * 刷新到的物品信息
	 * <key:商店类型，value:<key:商品索引，value:商品格子>>
	 */
	private Map<Integer, Map<Integer, Integer>> goodsMap;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Map<Integer, Integer>> getShoppingMap() {
		return shoppingMap;
	}

	public void setShoppingMap(Map<Integer, Map<Integer, Integer>> shoppingMap) {
		this.shoppingMap = shoppingMap;
	}

	public Map<Integer, Map<Integer, Integer>> getGoodsMap() {
		return goodsMap;
	}

	public void setGoodsMap(Map<Integer, Map<Integer, Integer>> goodsMap) {
		this.goodsMap = goodsMap;
	}

}
