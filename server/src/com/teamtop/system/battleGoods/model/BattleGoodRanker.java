package com.teamtop.system.battleGoods.model;

public class BattleGoodRanker {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 所属大区id
	 */
	private int fristzoneid;
	/**
	 * 玩家名字
	 */
	private String name;
	/**
	 * 当前积分
	 */
	private int source;
	/**
	 * 积分达到的时间
	 */
	private int sourceTime;
	
	
	
	
	public BattleGoodRanker() {
		super();
	}
	public BattleGoodRanker(long hid, int fristzoneid, String name, int source, int sourceTime) {
		super();
		this.hid = hid;
		this.fristzoneid = fristzoneid;
		this.name = name;
		this.source = source;
		this.sourceTime = sourceTime;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getFristzoneid() {
		return fristzoneid;
	}
	public void setFristzoneid(int fristzoneid) {
		this.fristzoneid = fristzoneid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getSource() {
		return source;
	}
	public void setSource(int source) {
		this.source = source;
	}
	public int getSourceTime() {
		return sourceTime;
	}
	public void setSourceTime(int sourceTime) {
		this.sourceTime = sourceTime;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BattleGoodRanker other = (BattleGoodRanker) obj;
		if (hid != other.hid)
			return false;
		return true;
	}
	

}
