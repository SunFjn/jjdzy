package com.teamtop.system.houseShopTask;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 商品购买信息
 * @author Administrator
 *
 */
public class ShopInfo {
	/**
	 * 商品序号
	 */
	@FieldOrder(order=1)
	private int shopIndex;
	/**
	 * 已经购买数量
	 */
	@FieldOrder(order=2)
	private int hasBuy;
	
	
	public ShopInfo() {
		super();
	}


	public int getShopIndex() {
		return shopIndex;
	}


	public void setShopIndex(int shopIndex) {
		this.shopIndex = shopIndex;
	}


	public int getHasBuy() {
		return hasBuy;
	}


	public void setHasBuy(int hasBuy) {
		this.hasBuy = hasBuy;
	}
	
	
	

}
