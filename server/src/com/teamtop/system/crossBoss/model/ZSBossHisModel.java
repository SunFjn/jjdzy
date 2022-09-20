package com.teamtop.system.crossBoss.model;

import com.teamtop.util.db.trans.FieldOrder;

public class ZSBossHisModel {
	/**id*/
	@FieldOrder(order = 1)
	private long id;
	/**
	 * 名字
	 */
	@FieldOrder(order = 2)
	private String name;
	/**
	 * 伤害
	 */
	@FieldOrder(order = 3)
	private long hurt;
	/**
	 * 国家
	 */
	@FieldOrder(order = 4)
	private int country;
	
	
	
	public ZSBossHisModel() {
		super();
	}
	
	
	public ZSBossHisModel(long id, String name, long hurt, int country) {
		super();
		this.id = id;
		this.name = name;
		this.hurt = hurt;
		this.country = country;
	}


	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getHurt() {
		return hurt;
	}
	public void setHurt(long hurt) {
		this.hurt = hurt;
	}
	public int getCountry() {
		return country;
	}
	public void setCountry(int country) {
		this.country = country;
	}
	
	
	

}
