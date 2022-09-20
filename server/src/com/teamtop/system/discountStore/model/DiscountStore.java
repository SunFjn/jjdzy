package com.teamtop.system.discountStore.model;

import java.util.Map;

public class DiscountStore {
	/** 玩家id */
	private long hid;
	/** 商品列表，key为商品id，value为已购买数量 */
	private Map<Integer, Integer> goodsMap;

	/** 7天后与（8~28)冲突特殊记录时间 */
	private int oneTime;

	/** 7天后与（8~28)冲突特殊记录字段 */
	private int state;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, Integer> getGoodsMap() {
		return goodsMap;
	}

	public void setGoodsMap(Map<Integer, Integer> goodsMap) {
		this.goodsMap = goodsMap;
	}

	public int getOneTime() {
		return oneTime;
	}

	public void setOneTime(int oneTime) {
		this.oneTime = oneTime;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

}
