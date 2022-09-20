package com.teamtop.system.tigerPass.model;

public class TigerPassJoiner {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 玩家姓名
	 */
	private String name;
	/**
	 * 雇主id
	 */
	private long guzhuhid;
	
	/**
	 * 我对boss的总伤害
	 */
	private long sumhurt;
	/**
	 * 我对boss的秒伤
	 */
	private long miaoHurt;
	
	
	public TigerPassJoiner() {
		super();
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getGuzhuhid() {
		return guzhuhid;
	}
	public void setGuzhuhid(long guzhuhid) {
		this.guzhuhid = guzhuhid;
	}
	public long getSumhurt() {
		return sumhurt;
	}
	public void setSumhurt(long sumhurt) {
		this.sumhurt = sumhurt;
	}
	public long getMiaoHurt() {
		return miaoHurt;
	}
	public void setMiaoHurt(long miaoHurt) {
		this.miaoHurt = miaoHurt;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	
	

}
