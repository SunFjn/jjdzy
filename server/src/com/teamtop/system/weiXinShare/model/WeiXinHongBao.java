package com.teamtop.system.weiXinShare.model;

import com.teamtop.util.db.trans.FieldOrder;

public class WeiXinHongBao {

	/** 可领取分享币数量 */
	@FieldOrder(order = 1)
	private int shareCoin;
	/** 红包领取状态:0-可领取,1-已领取 */
	@FieldOrder(order = 2)
	private int state;
	/** 当前位置 */
	@FieldOrder(order = 3)
	private int id;

	public WeiXinHongBao() {

	}

	public int getShareCoin() {
		return shareCoin;
	}

	public void setShareCoin(int shareCoin) {
		this.shareCoin = shareCoin;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
