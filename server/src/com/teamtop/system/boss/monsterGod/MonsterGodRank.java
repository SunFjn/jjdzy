package com.teamtop.system.boss.monsterGod;

import com.teamtop.util.db.trans.FieldOrder;
/**
 * 
 *
 */
public class MonsterGodRank {
	/**
	 * 名次
	 */
	@FieldOrder(order = 1)
	private int rankid;
	/**
	 * 玩家id
	 */
	@FieldOrder(order = 2)
	private long hid;
	/**
	 * 伤害
	 */
	@FieldOrder(order = 3)
	private long sumhurt;
	
	public MonsterGodRank() {
		super();
	}
	public MonsterGodRank(int rankid, long hid, long sumhurt) {
		super();
		this.rankid = rankid;
		this.hid = hid;
		this.sumhurt = sumhurt;
	}
	public int getRankid() {
		return rankid;
	}
	public void setRankid(int rankid) {
		this.rankid = rankid;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getSumhurt() {
		return sumhurt;
	}
	public void setSumhurt(long sumhurt) {
		this.sumhurt = sumhurt;
	}
	
	
	
	

}
