package com.teamtop.system.linglongge.model;

import com.teamtop.util.db.trans.FieldOrder;

public class LingLongGeRankZoneid {
	/**区 */
	@FieldOrder(order = 1)
	private int zoneid;
	/**区积分 */
	@FieldOrder(order = 2)
	private int score;
	/**区积分达到时间 */
	@FieldOrder(order = 3)
	private int reachTime;
	
	public LingLongGeRankZoneid() {
		super();
	}
	
	
	public LingLongGeRankZoneid(int zoneid, int score, int reachTime) {
		super();
		this.zoneid = zoneid;
		this.score = score;
		this.reachTime = reachTime;
	}


	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public int getReachTime() {
		return reachTime;
	}
	public void setReachTime(int reachTime) {
		this.reachTime = reachTime;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LingLongGeRankZoneid other = (LingLongGeRankZoneid) obj;
		if (zoneid != other.zoneid)
			return false;
		return true;
	}

	
}
