package com.teamtop.system.crossSelectKing.local;

import com.teamtop.util.db.trans.FieldOrder;

public class CrossSelectKingBet {
	@FieldOrder(order = 1)
	private long hid;
	@FieldOrder(order = 2)
	private int bang;
	@FieldOrder(order = 3)
	private int round;
	@FieldOrder(order = 4)
	private int count;
	@FieldOrder(order = 5)
	private int win;
	@FieldOrder(order = 6)//0没有发奖励 1已经发过奖励
	private int award;
	
	public CrossSelectKingBet() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getBang() {
		return bang;
	}
	public void setBang(int bang) {
		this.bang = bang;
	}
	public int getRound() {
		return round;
	}
	public void setRound(int round) {
		this.round = round;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getWin() {
		return win;
	}
	public void setWin(int win) {
		this.win = win;
	}
	public int getAward() {
		return award;
	}
	public void setAward(int award) {
		this.award = award;
	}
	
	
	
	

}
