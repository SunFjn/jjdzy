package com.teamtop.system.activity.ativitys.magicDiscount.model;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 神兵折扣：打造次数
 * @author jjjjyyyyouxi
 */
public class MagicDiscount extends ActivityData {
	/**
	 * 打造次数
	 */
	private int count;
	
	public MagicDiscount() {
	}
	
	public MagicDiscount(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
