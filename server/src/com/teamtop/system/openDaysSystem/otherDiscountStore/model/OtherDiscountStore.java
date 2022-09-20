package com.teamtop.system.openDaysSystem.otherDiscountStore.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class OtherDiscountStore extends AbsOpenDaysSystemModel {

	/** 商品列表，key为商品id，value为已购买数量 */
	private Map<Integer, Integer> goodsMap;

	public Map<Integer, Integer> getGoodsMap() {
		return goodsMap;
	}

	public void setGoodsMap(Map<Integer, Integer> goodsMap) {
		this.goodsMap = goodsMap;
	}

}
