package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 敬酒参与者
 * @author jjjjyyy
 *
 */
public class HeFuZhangFeiJoiner {
	
	@FieldOrder(order = 1)
	private long hid;
	@FieldOrder(order = 2)
	private int zuiyiNum;
	@FieldOrder(order = 3)
	private int time;
	@FieldOrder(order = 4)
	private int rank;
	
	public HeFuZhangFeiJoiner() {
		super();
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

	public int getZuiyiNum() {
		return zuiyiNum;
	}



	public void setZuiyiNum(int zuiyiNum) {
		this.zuiyiNum = zuiyiNum;
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
		HeFuZhangFeiJoiner other = (HeFuZhangFeiJoiner) obj;
		if (hid != other.hid)
			return false;
		return true;
	}
	

}
