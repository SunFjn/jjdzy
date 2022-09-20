package com.teamtop.system.crossWenDingTianXia.model;

public class CrossWenDingTianXiaTop10Strength {

	private int zid;
	private long top10StrengthAll;//该区前10总战力
	/** 开服时间 */
	private int openServerTime;
	private int rank;
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		CrossWenDingTianXiaTop10Strength model = (CrossWenDingTianXiaTop10Strength) obj;
		if(this.zid != model.getZid()){
			return false;
		}
		return true;
	}
	public int getZid() {
		return zid;
	}
	public void setZid(int zid) {
		this.zid = zid;
	}
	public long getTop10StrengthAll() {
		return top10StrengthAll;
	}
	public void setTop10StrengthAll(long top10StrengthAll) {
		this.top10StrengthAll = top10StrengthAll;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}

	public int getOpenServerTime() {
		return openServerTime;
	}

	public void setOpenServerTime(int openServerTime) {
		this.openServerTime = openServerTime;
	}
}
