package com.teamtop.system.zcBoss;

public class ZcBossJoiner {
	
	private long hid;
	
	private int inBossId;
	
	private long hp;//气血
	
	private long huDun;//护盾
	
	private int timeBattleBegin;//开始进入战斗的时间，超过这个时间就强制拉入战斗
	
	
	public ZcBossJoiner() {
		super();
	}
	
	
	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getInBossId() {
		return inBossId;
	}

	public void setInBossId(int inBossId) {
		this.inBossId = inBossId;
	}


	public long getHp() {
		return hp;
	}

	public void setHp(long hp) {
		this.hp = hp;
	}

	public long getHuDun() {
		return huDun;
	}
	public void setHuDun(long huDun) {
		this.huDun = huDun;
	}


	public int getTimeBattleBegin() {
		return timeBattleBegin;
	}


	public void setTimeBattleBegin(int timeBattleBegin) {
		this.timeBattleBegin = timeBattleBegin;
	}


	
	

}
