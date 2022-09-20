package com.teamtop.util.db.trans.objbyte2.test;

import com.teamtop.util.db.trans.FieldOrder;

public class T2 {
	@FieldOrder(order = 1)
	private int id;
	@FieldOrder(order = 2)
	private String name;
	@FieldOrder(order = 3)
	private int[] reward;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int[] getReward() {
		return reward;
	}
	public void setReward(int[] reward) {
		this.reward = reward;
	}
	
}
