package com.teamtop.system.crossTeamKing.cross;

import com.teamtop.util.db.trans.FieldOrder;

public class TeamKingRanker {
	
	@FieldOrder(order = 1)
	private long hid;
	@FieldOrder(order = 2)
	private int partid;
	@FieldOrder(order = 3)
	private int rebornType;
	@FieldOrder(order = 4)
	private int jf;
	@FieldOrder(order = 5)
	private int time;
	@FieldOrder(order = 6)
	private String name;
	@FieldOrder(order = 7)
	private int rank;
	@FieldOrder(order = 8)
	private long totalStrength;
	
	
	
	
	public TeamKingRanker() {
		super();
	}
	
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getPartid() {
		return partid;
	}
	public void setPartid(int partid) {
		this.partid = partid;
	}
	public int getRebornType() {
		return rebornType;
	}
	public void setRebornType(int rebornType) {
		this.rebornType = rebornType;
	}
	public int getJf() {
		return jf;
	}
	public void setJf(int jf) {
		this.jf = jf;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	
	public long getTotalStrength() {
		return totalStrength;
	}

	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TeamKingRanker other = (TeamKingRanker) obj;
		if (hid != other.hid)
			return false;
		return true;
	}
	
	
	
	
	

}
