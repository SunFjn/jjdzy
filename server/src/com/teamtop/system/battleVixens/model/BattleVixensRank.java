package com.teamtop.system.battleVixens.model;

public class BattleVixensRank {

	/** 玩家id */
	private long hid;

	/** 名字 */
	private String name;

	/** 难度 */
	private int hardType;

	/** 最大通关波数编号 */
	private int maxPassId;

	/** 战力 */
	private long strength;

	public BattleVixensRank() {
		// TODO Auto-generated constructor stub
	}

	public BattleVixensRank(long hid, String name, int hardType, int maxPassId, long strength) {
		super();
		this.hid = hid;
		this.name = name;
		this.hardType = hardType;
		this.maxPassId = maxPassId;
		this.strength = strength;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getHardType() {
		return hardType;
	}

	public void setHardType(int hardType) {
		this.hardType = hardType;
	}

	public int getMaxPassId() {
		return maxPassId;
	}

	public void setMaxPassId(int maxPassId) {
		this.maxPassId = maxPassId;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BattleVixensRank other = (BattleVixensRank) obj;
		if (hid != other.hid)
			return false;
		return true;
	}

}
