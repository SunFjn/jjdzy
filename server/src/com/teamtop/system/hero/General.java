package com.teamtop.system.hero;

import com.teamtop.util.cache.CacheModel;

/**
 * 将领
 * @author Administrator
 *
 */
public class General extends CacheModel{
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 职业
	 */
	private int job;
	/**
	 * 角色面板将领索引，从0开始
	 */
	private int pos;
	/**
	 * 战力
	 */
	private int strength;
	
	public int getStrength() {
		return strength;
	}
	public void setStrength(int strength) {
		this.strength = strength;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	public int getPos() {
		return pos;
	}
	public void setPos(int pos) {
		this.pos = pos;
	}
	
	
}
