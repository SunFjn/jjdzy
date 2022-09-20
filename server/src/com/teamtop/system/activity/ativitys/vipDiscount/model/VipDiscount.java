package com.teamtop.system.activity.ativitys.vipDiscount.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class VipDiscount extends ActivityData {
	/**
	 * 已获取现价的vip折扣
	 */
	private Map<Integer,Discount> vipDisMap;
	
	public VipDiscount() {
		
	}
	
	public VipDiscount(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public Map<Integer, Discount> getVipDisMap() {
		return vipDisMap;
	}

	public void setVipDisMap(Map<Integer, Discount> vipDisMap) {
		this.vipDisMap = vipDisMap;
	}
}
