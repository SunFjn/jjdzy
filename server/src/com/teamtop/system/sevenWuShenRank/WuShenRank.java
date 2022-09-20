package com.teamtop.system.sevenWuShenRank;

import com.teamtop.util.db.trans.FieldOrder;

public class WuShenRank {
	@FieldOrder(order = 1)
	private int type;
	@FieldOrder(order = 2)
	private int rank;
	@FieldOrder(order = 3)
	private long hid;
	@FieldOrder(order = 4)
	private long count;
	@FieldOrder(order = 5)
	private int time;
	
	
	public WuShenRank() {
		super();
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getCount() {
		return count;
	}
	public void setCount(long count) {
		this.count = count;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WuShenRank other = (WuShenRank) obj;
		if (hid != other.hid)
			return false;
		return true;
	}
	
	
	

}
