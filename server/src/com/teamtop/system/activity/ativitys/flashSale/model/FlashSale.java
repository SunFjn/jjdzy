package com.teamtop.system.activity.ativitys.flashSale.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 个人已抢购次数
 * @author jjjjyyyyouxi
 */
public class FlashSale extends ActivityData {
	/**
	 * <抢购表ID,次数>
	 */
	private Map<Integer,Integer> buyMap;
	
	public FlashSale() {
	}
	
	public FlashSale(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public Map<Integer, Integer> getBuyMap() {
		return buyMap;
	}

	public void setBuyMap(Map<Integer, Integer> buyMap) {
		this.buyMap = buyMap;
	}
	
}
