package com.teamtop.system.activity.ativitys.arenaFight.cross;

public class ArenaRewardTemp {

	public ArenaRewardTemp() {
		// TODO Auto-generated constructor stub
	}

	public ArenaRewardTemp(long hid, int arenaId) {
		super();
		this.hid = hid;
		this.arenaId = arenaId;
	}

	private long hid;

	private int arenaId;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getArenaId() {
		return arenaId;
	}

	public void setArenaId(int arenaId) {
		this.arenaId = arenaId;
	}

}
